"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/admin-dashboard/settings/account-settings"
import { AppSettings } from "@/components/admin-dashboard/settings/app-settings"
import { NotificationSettings } from "@/components/admin-dashboard/settings/notification-settings"
import { SecuritySettings } from "@/components/admin-dashboard/settings/security-settings"
import { ApiSettings } from "@/components/admin-dashboard/settings/api-settings"
import { TeamSettings } from "@/components/admin-dashboard/settings/team-settings"
import { BillingSettings } from "@/components/admin-dashboard/settings/billing-settings"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="app">Application</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="app" className="mt-6">
        <AppSettings />
      </TabsContent>
      <TabsContent value="notifications" className="mt-6">
        <NotificationSettings />
      </TabsContent>
      <TabsContent value="security" className="mt-6">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="api" className="mt-6">
        <ApiSettings />
      </TabsContent>
      <TabsContent value="team" className="mt-6">
        <TeamSettings />
      </TabsContent>
      <TabsContent value="billing" className="mt-6">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  )
}
