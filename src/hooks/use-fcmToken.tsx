"use client";

import { useEffect, useRef, useState } from "react";
import type { Unsubscribe } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { fetchToken, messaging } from "../../firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/** Giữ nguyên hàm request permission của bạn */
async function getNotificationPermissionAndToken() {
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return null;
  }

  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  console.log("Notification permission not granted.");
  return null;
}

const useFcmToken = () => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const retryLoadToken = useRef(0);
  const isLoading = useRef(false);

  // Ref để tránh hiển thị duplicate notification/toast cho cùng 1 message id
  const seenMessageIds = useRef<Set<string>>(new Set());

  const loadToken = async () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const loadedToken = await getNotificationPermissionAndToken();

    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info(
        "%cPush Notifications issue - permission denied",
        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
      );
      isLoading.current = false;
      return;
    }
    if (!loadedToken) {
      if (retryLoadToken.current >= 3) {
        alert("Unable to load token, refresh the browser");
        console.info(
          "%cPush Notifications issue - unable to load token after 3 retries",
          "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      // gọi đệ quy (chú ý: không lặp vô hạn vì giới hạn retry)
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(loadedToken);
    isLoading.current = false;
  };

  useEffect(() => {
    if ("Notification" in window) {
      loadToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let unsubscribeFn: Unsubscribe | null = null;

    const setupListener = async () => {
      if (!token) return;

      // messaging() có thể trả Promise hoặc instance tùy implement của bạn
      const m = await messaging();
      if (!m) return;

      // onMessage trả unsubscribe function (synchronous in v9 modular, nhưng để an toàn ta coi là return value)
      const unsub = onMessage(m, (payload) => {
        // Nếu payload có id (server nên gửi một id trong data để tránh duplicate)
        const id = payload?.data?.messageId || payload?.messageId || "";

        if (id) {
          if (seenMessageIds.current.has(id)) {
            // đã thấy rồi -> bỏ qua
            return;
          }
          seenMessageIds.current.add(id);
        }

        // Nếu permission chưa được cấp thì bỏ
        if (Notification.permission !== "granted") return;

        // Lấy link (có thể nằm ở fcmOptions.link hoặc data.link)
        const link =
          (payload as any).fcmOptions?.link || (payload as any).data?.link;

        // Nếu tab đang visible -> chỉ hiển thị toast/UI, KHÔNG gọi Notification hệ thống
        const isVisible =
          typeof document !== "undefined" &&
          document.visibilityState === "visible";

        const title =
          payload.notification?.title ||
          (payload as any).data?.title ||
          "New message";
        const body =
          payload.notification?.body || (payload as any).data?.body || "";

        // Hiển thị toast UI luôn (user đang active sẽ thấy toast)
        toast.info(`${title}${body ? `: ${body}` : ""}`, {
          action: link
            ? {
                label: "Visit",
                onClick: () => {
                  router.push(link);
                },
              }
            : undefined,
        });

        // Nếu tab không visible -> show hệ thống notification (service worker background thường lo việc này,
        // nhưng nếu bạn muốn show từ foreground script khi tab bị hidden, thì làm ở đây)
        if (!isVisible) {
          try {
            const n = new Notification(title, {
              body,
              data: link ? { url: link } : undefined,
            });

            n.onclick = (event) => {
              event.preventDefault();
              // event.target may not always have .data; use notification.data
              const url =
                (event as any)?.target?.data?.url || (n as any).data?.url;
              if (url) {
                window.focus();
                router.push(url);
              }
            };
          } catch (err) {
            console.error("Failed to create Notification:", err);
          }
        }
      });

      unsubscribeFn = () => {
        try {
          if (typeof unsub === "function") unsub();
        } catch (e) {
          // some versions return an object with unsubscribe()
          if (unsub && typeof (unsub as any).unsubscribe === "function") {
            (unsub as any).unsubscribe();
          }
        }
      };
    };

    setupListener();

    return () => {
      if (unsubscribeFn) unsubscribeFn();
    };
  }, [token, router]);

  return { token, notificationPermissionStatus };
};

export default useFcmToken;
