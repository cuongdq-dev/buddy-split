"use client";

import { useState } from "react";
import { Card, CardContent } from "@buddy/components/ui/card";
import { Avatar, AvatarFallback } from "@buddy/components/ui/avatar";
import { Badge } from "@buddy/components/ui/badge";
import { Calendar, User, Users } from "lucide-react";
import { ExpenseDetailsModal } from "@buddy/components/expense-details-modal";

interface Expense {
  id: string;
  title: string;
  payer: string;
  payerAvatar: string;
  total: number;
  date: string;
  participants: number;
  category: string;
}

const expenses: Expense[] = [
  {
    id: "1",
    title: "Hotel Booking - Beachside Resort",
    payer: "Sarah Chen",
    payerAvatar: "SC",
    total: 450.0,
    date: "Mar 15, 2024",
    participants: 5,
    category: "Accommodation",
  },
  {
    id: "2",
    title: "Dinner at Seafood Restaurant",
    payer: "Mike Johnson",
    payerAvatar: "MJ",
    total: 125.5,
    date: "Mar 14, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "3",
    title: "Uber to Airport",
    payer: "You",
    payerAvatar: "JD",
    total: 45.0,
    date: "Mar 14, 2024",
    participants: 3,
    category: "Transport",
  },
  {
    id: "4",
    title: "Grocery Shopping",
    payer: "Emma Wilson",
    payerAvatar: "EW",
    total: 87.25,
    date: "Mar 13, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "5",
    title: "Concert Tickets",
    payer: "Alex Kim",
    payerAvatar: "AK",
    total: 280.0,
    date: "Mar 12, 2024",
    participants: 4,
    category: "Entertainment",
  },
  {
    id: "6",
    title: "Gas Station Fill-up",
    payer: "Chris Lee",
    payerAvatar: "CL",
    total: 65.0,
    date: "Mar 12, 2024",
    participants: 3,
    category: "Transport",
  },
  {
    id: "7",
    title: "Breakfast Cafe",
    payer: "Sarah Chen",
    payerAvatar: "SC",
    total: 42.5,
    date: "Mar 11, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "8",
    title: "Museum Entry Tickets",
    payer: "Mike Johnson",
    payerAvatar: "MJ",
    total: 75.0,
    date: "Mar 11, 2024",
    participants: 5,
    category: "Entertainment",
  },
  {
    id: "9",
    title: "Pharmacy - Sunscreen & Meds",
    payer: "Emma Wilson",
    payerAvatar: "EW",
    total: 38.75,
    date: "Mar 10, 2024",
    participants: 5,
    category: "Health",
  },
  {
    id: "10",
    title: "Lunch at Italian Restaurant",
    payer: "You",
    payerAvatar: "JD",
    total: 95.0,
    date: "Mar 10, 2024",
    participants: 4,
    category: "Food",
  },
  {
    id: "11",
    title: "Boat Tour Rental",
    payer: "Alex Kim",
    payerAvatar: "AK",
    total: 180.0,
    date: "Mar 9, 2024",
    participants: 5,
    category: "Entertainment",
  },
  {
    id: "12",
    title: "Snacks & Drinks - Convenience Store",
    payer: "Chris Lee",
    payerAvatar: "CL",
    total: 28.5,
    date: "Mar 9, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "13",
    title: "Parking Fees - Downtown",
    payer: "Sarah Chen",
    payerAvatar: "SC",
    total: 25.0,
    date: "Mar 8, 2024",
    participants: 3,
    category: "Transport",
  },
  {
    id: "14",
    title: "BBQ Supplies & Meat",
    payer: "Mike Johnson",
    payerAvatar: "MJ",
    total: 112.0,
    date: "Mar 8, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "15",
    title: "Beach Equipment Rental",
    payer: "Emma Wilson",
    payerAvatar: "EW",
    total: 55.0,
    date: "Mar 7, 2024",
    participants: 5,
    category: "Entertainment",
  },
  {
    id: "16",
    title: "Coffee Shop Morning",
    payer: "You",
    payerAvatar: "JD",
    total: 22.5,
    date: "Mar 7, 2024",
    participants: 4,
    category: "Food",
  },
  {
    id: "17",
    title: "Taxi to Hotel",
    payer: "Alex Kim",
    payerAvatar: "AK",
    total: 35.0,
    date: "Mar 6, 2024",
    participants: 5,
    category: "Transport",
  },
  {
    id: "18",
    title: "Welcome Dinner - Thai Restaurant",
    payer: "Chris Lee",
    payerAvatar: "CL",
    total: 145.0,
    date: "Mar 6, 2024",
    participants: 5,
    category: "Food",
  },
  {
    id: "19",
    title: "Airport Lounge Access",
    payer: "Sarah Chen",
    payerAvatar: "SC",
    total: 90.0,
    date: "Mar 5, 2024",
    participants: 3,
    category: "Travel",
  },
  {
    id: "20",
    title: "Travel Insurance",
    payer: "Mike Johnson",
    payerAvatar: "MJ",
    total: 125.0,
    date: "Mar 5, 2024",
    participants: 5,
    category: "Travel",
  },
];

export function ExpensesTab() {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="h-full overflow-y-auto p-4 md:p-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {/* Summary Card */}
          <Card className="border-border bg-gradient-to-br from-primary/10 via-accent/5 to-background shadow-xl">
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                    Total Spent
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    $707.75
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                    Your Share
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    $141.55
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 font-medium">
                    You Owe
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-destructive">
                    $96.55
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          <div className="space-y-3">
            {expenses.map((expense, index) => (
              <Card
                key={expense.id}
                onClick={() => handleExpenseClick(expense)}
                className="border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg group animate-in fade-in slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 w-full sm:w-auto">
                      <Avatar className="h-11 w-11 md:h-12 md:w-12 flex-shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-muted to-muted/50 text-foreground font-semibold">
                          {expense.payerAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base leading-tight">
                          {expense.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 flex-shrink-0" />
                            <span className="truncate">{expense.payer}</span>
                          </div>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{expense.date}</span>
                          </div>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{expense.participants} people</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 w-full sm:w-auto flex-shrink-0">
                      <Badge
                        variant="secondary"
                        className="text-xs order-2 sm:order-1"
                      >
                        {expense.category}
                      </Badge>
                      <p className="text-xl md:text-2xl font-bold text-foreground order-1 sm:order-2">
                        ${expense.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ExpenseDetailsModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        expense={selectedExpense}
      />
    </>
  );
}
