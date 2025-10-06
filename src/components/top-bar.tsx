"use client";

import { InvitationsPanel } from "@buddy/components/invitations-panel";
import { LanguageSwitcher } from "@buddy/components/language-switcher";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@buddy/components/ui/avatar";
import { Badge } from "@buddy/components/ui/badge";
import { Button } from "@buddy/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@buddy/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@buddy/components/ui/popover";
import { HttpMethod, invokeRequest } from "@buddy/lib/api-core";
import { useAuth } from "@buddy/lib/auth-context";
import { useI18n } from "@buddy/lib/i18n-context";
import { Bell, LogOut, Plus, Settings, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopBarProps {
  groupName: string;
  onAddExpense: () => void;
  onAddMember: () => void;
}

const mockInvitations = [
  {
    id: "1",
    groupName: "Summer BBQ Party",
    groupAvatar: "🍔",
    invitedBy: "Sarah Johnson",
    invitedByEmail: "sarah.j@gmail.com",
    memberCount: 6,
    invitedAt: "2 hours ago",
  },
  {
    id: "2",
    groupName: "Ski Trip 2024",
    groupAvatar: "⛷️",
    invitedBy: "Mike Chen",
    invitedByEmail: "mike.chen@gmail.com",
    memberCount: 8,
    invitedAt: "1 day ago",
  },
  {
    id: "3",
    groupName: "Board Game Night",
    groupAvatar: "🎲",
    invitedBy: "Emma Wilson",
    invitedByEmail: "emma.w@gmail.com",
    memberCount: 5,
    invitedAt: "3 days ago",
  },
];

export function TopBar({ groupName, onAddExpense, onAddMember }: TopBarProps) {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [invitations, setInvitations] = useState(mockInvitations);
  const [isInvitationsOpen, setIsInvitationsOpen] = useState(false);

  const handleAcceptInvitation = (id: string) => {
    console.log("[v0] Accepting invitation:", id);
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const handleRejectInvitation = (id: string) => {
    console.log("[v0] Rejecting invitation:", id);
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  const handleLogout = () => {
    invokeRequest({
      method: HttpMethod.POST,
      baseURL: "/auth/logout",
      onHandleError: () => {},
      onSuccess: async (res) => {
        await logout();
      },
    });
  };

  return (
    <div className="h-16 md:h-20 border-b border-border bg-card/95 backdrop-blur-sm px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div className="flex-1 min-w-0 ml-14 lg:ml-0">
        <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
          {groupName}
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
          {t("topBar.subtitle")}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSwitcher />

        <Button
          onClick={onAddMember}
          variant="outline"
          size="sm"
          className="hidden md:flex shadow-sm hover:shadow-md transition-all bg-transparent"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {t("topBar.addMember")}
        </Button>

        <Popover open={isInvitationsOpen} onOpenChange={setIsInvitationsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <Bell className="h-5 w-5" />
              {invitations.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse">
                  {invitations.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0" align="end">
            <div className="border-b border-border p-4">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                {t("topBar.invitations")}
                {invitations.length > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {invitations.length}
                  </Badge>
                )}
              </h3>
            </div>
            <InvitationsPanel
              invitations={invitations}
              onAccept={handleAcceptInvitation}
              onReject={handleRejectInvitation}
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={onAddExpense}
          size="sm"
          className="shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">{t("topBar.addExpense")}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:ring-2 hover:ring-primary/20"
            >
              <Avatar className="h-9 w-9 md:h-10 md:w-10 ring-2 ring-primary/10">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onAddMember} className="md:hidden">
              <UserPlus className="mr-2 h-4 w-4" />
              {t("topBar.addMember")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              {t("topBar.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              {t("topBar.settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("topBar.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
