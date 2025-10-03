"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@buddy/components/ui/dialog";
import { Button } from "@buddy/components/ui/button";
import { Input } from "@buddy/components/ui/input";
import { Label } from "@buddy/components/ui/label";
import { Mail, UserPlus, X } from "lucide-react";
import { Badge } from "@buddy/components/ui/badge";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
}

export function AddMemberModal({
  open,
  onOpenChange,
  groupName,
}: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const handleAddEmail = () => {
    if (email && email.includes("@") && !invitedEmails.includes(email)) {
      setInvitedEmails([...invitedEmails, email]);
      setEmail("");
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedEmails(invitedEmails.filter((e) => e !== emailToRemove));
  };

  const handleSendInvites = () => {
    console.log(
      "[v0] Sending invites to:",
      invitedEmails,
      "for group:",
      groupName
    );
    // Reset and close
    setInvitedEmails([]);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add Members to {groupName}
          </DialogTitle>
          <DialogDescription>
            Invite people to join this group by entering their Gmail addresses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Gmail Address</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="friend@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                  className="pl-9"
                />
              </div>
              <Button
                onClick={handleAddEmail}
                size="default"
                disabled={!email || !email.includes("@")}
              >
                Add
              </Button>
            </div>
          </div>

          {invitedEmails.length > 0 && (
            <div className="space-y-2">
              <Label>Pending Invitations ({invitedEmails.length})</Label>
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg border border-border max-h-32 overflow-y-auto">
                {invitedEmails.map((invitedEmail) => (
                  <Badge
                    key={invitedEmail}
                    variant="secondary"
                    className="pl-3 pr-1 py-1.5 gap-2"
                  >
                    <span className="text-sm">{invitedEmail}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-destructive/20"
                      onClick={() => handleRemoveEmail(invitedEmail)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSendInvites}
            disabled={invitedEmails.length === 0}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Send {invitedEmails.length} Invitation
            {invitedEmails.length !== 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
