"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@buddy/components/ui/card";
import { Button } from "@buddy/components/ui/button";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Badge } from "@buddy/components/ui/badge";
import {
  TrendingUp,
  Plus,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useI18n } from "@buddy/lib/i18n-context";

interface DashboardTabProps {
  onAddExpense: () => void;
  onCreateGroup: () => void;
}

export function DashboardTab({
  onAddExpense,
  onCreateGroup,
}: DashboardTabProps) {
  const { t } = useI18n();

  const recentActivities = [
    {
      id: "1",
      type: "expense",
      title: "Hotel Booking added",
      user: "Sarah Chen",
      avatar: "SC",
      amount: 450.0,
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "settlement",
      title: "You paid Mike Johnson",
      user: "You",
      avatar: "JD",
      amount: 125.5,
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "expense",
      title: "Dinner expense added",
      user: "Mike Johnson",
      avatar: "MJ",
      amount: 125.5,
      time: "1 day ago",
    },
    {
      id: "4",
      type: "expense",
      title: "Uber ride added",
      user: "You",
      avatar: "JD",
      amount: 45.0,
      time: "1 day ago",
    },
    {
      id: "5",
      type: "settlement",
      title: "Emma paid you",
      user: "Emma Wilson",
      avatar: "EW",
      amount: 87.25,
      time: "2 days ago",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border bg-gradient-to-br from-primary/10 to-background shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">
                  {t("dashboard.totalPaid")}
                </p>
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">$262.50</p>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.acrossAllGroups")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-destructive/10 to-background shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">
                  {t("dashboard.totalOwed")}
                </p>
                <ArrowDownRight className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">$186.30</p>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.toBeSettled")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-accent/10 to-background shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground font-medium">
                  {t("dashboard.netBalance")}
                </p>
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent mb-1">+$76.20</p>
              <p className="text-xs text-muted-foreground">
                {t("dashboard.youreOwed")}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("dashboard.quickActions")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={onCreateGroup}
              className="h-auto py-4 justify-start bg-transparent"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">
                    {t("dashboard.createGroup.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.createGroup.description")}
                  </p>
                </div>
              </div>
            </Button>

            <Button
              onClick={onAddExpense}
              className="h-auto py-4 justify-start bg-transparent"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Receipt className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">
                    {t("dashboard.addExpense.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.addExpense.description")}
                  </p>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">
              {t("dashboard.recentActivities")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-background">
                    <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-foreground font-semibold">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-sm ${
                      activity.type === "settlement"
                        ? "text-accent"
                        : "text-foreground"
                    }`}
                  >
                    ${activity.amount.toFixed(2)}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {t(`dashboard.${activity.type}`)}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
