"use client";

import { useState } from "react";
import { Sidebar } from "@buddy/components/sidebar";
import { TopBar } from "@buddy/components/top-bar";
import { ChatTab } from "@buddy/components/chat-tab";
import { ExpensesTab } from "@buddy/components/expenses-tab";
import { DashboardTab } from "@buddy/components/dashboard-tab";
import { CreateGroupModal } from "@buddy/components/create-group-modal";
import { AddExpenseModal } from "@buddy/components/add-expense-modal";
import { AddMemberModal } from "@buddy/components/add-member-modal";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@buddy/components/ui/tabs";
import { Button } from "@buddy/components/ui/button";
import { Menu, X } from "lucide-react";

export function MainApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("Weekend Trip");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-0 transform transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          selectedGroup={selectedGroup}
          onSelectGroup={(group) => {
            setSelectedGroup(group);
            setIsMobileSidebarOpen(false);
          }}
          onCreateGroup={() => {
            setIsCreateGroupOpen(true);
            setIsMobileSidebarOpen(false);
          }}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full shadow-lg bg-card"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            {isMobileSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        <TopBar
          groupName={selectedGroup}
          onAddExpense={() => setIsAddExpenseOpen(true)}
          onAddMember={() => setIsAddMemberOpen(true)}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <div className="border-b border-border px-4 md:px-6 bg-card/50 backdrop-blur-sm">
              <TabsList className="bg-transparent h-12 gap-1">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger
                  value="expenses"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  Expenses
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="dashboard"
              className="flex-1 m-0 overflow-hidden"
            >
              <DashboardTab
                onAddExpense={() => setIsAddExpenseOpen(true)}
                onCreateGroup={() => setIsCreateGroupOpen(true)}
              />
            </TabsContent>

            <TabsContent value="chat" className="flex-1 m-0 overflow-hidden">
              <ChatTab />
            </TabsContent>

            <TabsContent
              value="expenses"
              className="flex-1 m-0 overflow-hidden"
            >
              <ExpensesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <CreateGroupModal
        open={isCreateGroupOpen}
        onOpenChange={setIsCreateGroupOpen}
      />
      <AddExpenseModal
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
      />
      <AddMemberModal
        open={isAddMemberOpen}
        onOpenChange={setIsAddMemberOpen}
        groupName={selectedGroup}
      />
    </div>
  );
}
