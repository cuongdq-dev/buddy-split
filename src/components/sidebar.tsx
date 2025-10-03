"use client";

import { Button } from "@buddy/components/ui/button";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Badge } from "@buddy/components/ui/badge";
import { Plus, Users, X, TrendingUp } from "lucide-react";
import { cn } from "@buddy/lib/utils";

interface SidebarProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
  onCreateGroup: () => void;
  onClose?: () => void;
}

const groups = [
  {
    name: "Weekend Trip",
    avatar: "🏖️",
    members: 5,
    balance: 45.5,
    color: "from-blue-500/20 to-cyan-500/20",
    unread: 3,
  },
  {
    name: "Roommates",
    avatar: "🏠",
    members: 3,
    balance: -23.0,
    color: "from-purple-500/20 to-pink-500/20",
    unread: 0,
  },
  {
    name: "Office Lunch",
    avatar: "🍕",
    members: 8,
    balance: 12.75,
    color: "from-orange-500/20 to-red-500/20",
    unread: 5,
  },
  {
    name: "Vacation 2024",
    avatar: "✈️",
    members: 4,
    balance: 0,
    color: "from-green-500/20 to-emerald-500/20",
    unread: 0,
  },
  {
    name: "Gym Buddies",
    avatar: "💪",
    members: 6,
    balance: 18.25,
    color: "from-red-500/20 to-orange-500/20",
    unread: 2,
  },
  {
    name: "Book Club",
    avatar: "📚",
    members: 7,
    balance: -15.5,
    color: "from-indigo-500/20 to-purple-500/20",
    unread: 0,
  },
  {
    name: "Hiking Group",
    avatar: "⛰️",
    members: 5,
    balance: 32.0,
    color: "from-green-500/20 to-teal-500/20",
    unread: 1,
  },
  {
    name: "Movie Night",
    avatar: "🎬",
    members: 4,
    balance: -8.75,
    color: "from-pink-500/20 to-rose-500/20",
    unread: 0,
  },
  {
    name: "Coffee Lovers",
    avatar: "☕",
    members: 9,
    balance: 5.5,
    color: "from-amber-500/20 to-yellow-500/20",
    unread: 7,
  },
  {
    name: "Gaming Squad",
    avatar: "🎮",
    members: 6,
    balance: 22.0,
    color: "from-violet-500/20 to-purple-500/20",
    unread: 0,
  },
  {
    name: "Cooking Class",
    avatar: "👨‍🍳",
    members: 5,
    balance: -12.25,
    color: "from-orange-500/20 to-amber-500/20",
    unread: 0,
  },
  {
    name: "Beach Volleyball",
    avatar: "🏐",
    members: 8,
    balance: 0,
    color: "from-cyan-500/20 to-blue-500/20",
    unread: 4,
  },
  {
    name: "Photography Club",
    avatar: "📷",
    members: 4,
    balance: 28.5,
    color: "from-slate-500/20 to-gray-500/20",
    unread: 0,
  },
  {
    name: "Yoga Sessions",
    avatar: "🧘",
    members: 7,
    balance: -6.0,
    color: "from-teal-500/20 to-cyan-500/20",
    unread: 0,
  },
];

export function Sidebar({
  selectedGroup,
  onSelectGroup,
  onCreateGroup,
  onClose,
}: SidebarProps) {
  return (
    <div className="w-80 h-full border-r border-border bg-card/95 backdrop-blur-sm flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="font-bold text-xl text-foreground">Groups</h2>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <Button
          onClick={onCreateGroup}
          className="w-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          size="default"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Group
        </Button>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {groups.map((group) => (
          <button
            key={group.name}
            onClick={() => onSelectGroup(group.name)}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 relative",
              "hover:bg-muted/80 hover:scale-[1.02] hover:shadow-md",
              "border border-transparent",
              selectedGroup === group.name &&
                "bg-gradient-to-r shadow-lg border-primary/20",
              selectedGroup === group.name && group.color
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 text-2xl shadow-md">
                <AvatarFallback className="text-2xl bg-background">
                  {group.avatar}
                </AvatarFallback>
              </Avatar>
              {group.unread > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground border-2 border-card">
                  {group.unread}
                </Badge>
              )}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {group.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">
                  {group.members} members
                </p>
                {group.balance !== 0 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <p
                      className={cn(
                        "text-xs font-medium flex items-center gap-1",
                        group.balance > 0 ? "text-accent" : "text-destructive"
                      )}
                    >
                      <TrendingUp className="h-3 w-3" />
                      {group.balance > 0 ? "+" : ""}$
                      {Math.abs(group.balance).toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Groups</span>
          <span className="font-semibold text-foreground">{groups.length}</span>
        </div>
      </div>
    </div>
  );
}
