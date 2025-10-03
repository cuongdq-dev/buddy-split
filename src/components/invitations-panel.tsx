"use client";

import { Button } from "@buddy/components/ui/button";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Check, X, Users, Clock } from "lucide-react";
import { Card } from "@buddy/components/ui/card";
import { ScrollArea } from "@buddy/components/ui/scroll-area";

interface Invitation {
  id: string;
  groupName: string;
  groupAvatar: string;
  invitedBy: string;
  invitedByEmail: string;
  memberCount: number;
  invitedAt: string;
}

interface InvitationsPanelProps {
  invitations: Invitation[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function InvitationsPanel({
  invitations,
  onAccept,
  onReject,
}: InvitationsPanelProps) {
  if (invitations.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No pending invitations</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-3 p-4">
        {invitations.map((invitation) => (
          <Card
            key={invitation.id}
            className="p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 text-xl shadow-sm">
                <AvatarFallback className="text-xl bg-gradient-to-br from-primary/20 to-accent/20">
                  {invitation.groupAvatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    {invitation.groupName}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Invited by{" "}
                    <span className="font-medium text-foreground">
                      {invitation.invitedBy}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {invitation.invitedByEmail}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{invitation.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{invitation.invitedAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => onAccept(invitation.id)}
                    className="flex-1 h-8 gap-1.5 shadow-sm hover:shadow-md transition-all"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReject(invitation.id)}
                    className="flex-1 h-8 gap-1.5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                  >
                    <X className="h-3.5 w-3.5" />
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
