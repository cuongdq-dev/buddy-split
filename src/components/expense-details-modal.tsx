"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@buddy/components/ui/dialog";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Badge } from "@buddy/components/ui/badge";
import { Card, CardContent } from "@buddy/components/ui/card";
import { Separator } from "@buddy/components/ui/separator";
import { Calendar, User, Users, ArrowRight } from "lucide-react";

interface ExpenseDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: {
    id: string;
    title: string;
    payer: string;
    payerAvatar: string;
    total: number;
    date: string;
    participants: number;
    category: string;
  } | null;
}

export function ExpenseDetailsModal({
  open,
  onOpenChange,
  expense,
}: ExpenseDetailsModalProps) {
  if (!expense) return null;

  const perPerson = expense.total / expense.participants;
  const settlements = [
    {
      from: "Mike Johnson",
      fromAvatar: "MJ",
      to: expense.payer,
      toAvatar: expense.payerAvatar,
      amount: perPerson,
    },
    {
      from: "Emma Wilson",
      fromAvatar: "EW",
      to: expense.payer,
      toAvatar: expense.payerAvatar,
      amount: perPerson,
    },
    {
      from: "You",
      fromAvatar: "JD",
      to: expense.payer,
      toAvatar: expense.payerAvatar,
      amount: perPerson,
    },
  ].filter((s) => s.from !== expense.payer);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            View breakdown and settlement suggestions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Expense Info */}
          <Card className="border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {expense.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{expense.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      <span>{expense.participants} people</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-3xl font-bold text-foreground">
                    ${expense.total.toFixed(2)}
                  </p>
                  <Badge variant="secondary">{expense.category}</Badge>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-foreground font-semibold">
                    {expense.payerAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Paid by</p>
                  <p className="font-semibold text-foreground">
                    {expense.payer}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Split Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Split Breakdown</h4>
            <Card className="border-border">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Per person
                  </span>
                  <span className="font-semibold text-foreground">
                    ${perPerson.toFixed(2)}
                  </span>
                </div>
                <Separator />
                {Array.from({ length: expense.participants }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {i === 0
                          ? expense.payer
                          : i === 1
                          ? "Mike Johnson"
                          : i === 2
                          ? "Emma Wilson"
                          : "You"}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      ${perPerson.toFixed(2)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Settlement Suggestions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">
              Settlement Suggestions
            </h4>
            <div className="space-y-2">
              {settlements.map((settlement, i) => (
                <Card key={i} className="border-border bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-background text-foreground font-semibold">
                            {settlement.fromAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">
                          {settlement.from}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        <span className="text-lg font-bold text-primary">
                          ${settlement.amount.toFixed(2)}
                        </span>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">
                          {settlement.to}
                        </span>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-background text-foreground font-semibold">
                            {settlement.toAvatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
