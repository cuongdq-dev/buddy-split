"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@buddy/components/ui/dialog";
import { Button } from "@buddy/components/ui/button";
import { Input } from "@buddy/components/ui/input";
import { Label } from "@buddy/components/ui/label";
import { Textarea } from "@buddy/components/ui/textarea";
import { useI18n } from "@buddy/lib/i18n-context";

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupModal({
  open,
  onOpenChange,
}: CreateGroupModalProps) {
  const { t } = useI18n();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    // Handle group creation
    console.log("Creating group:", { groupName, description });
    onOpenChange(false);
    setGroupName("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("createGroup.title")}</DialogTitle>
          <DialogDescription>{t("createGroup.description")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">{t("createGroup.groupName")}</Label>
            <Input
              id="group-name"
              placeholder={t("createGroup.groupNamePlaceholder")}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              {t("createGroup.descriptionLabel")}
            </Label>
            <Textarea
              id="description"
              placeholder={t("createGroup.descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("createGroup.cancel")}
          </Button>
          <Button onClick={handleCreate} disabled={!groupName.trim()}>
            {t("createGroup.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
