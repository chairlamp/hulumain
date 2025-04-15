"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  BarChart3,
  Settings,
  Search,
  FileText,
  MessageSquare,
  Bell,
  Shield,
  CreditCard,
  User,
} from "lucide-react"

interface HelpGuidesProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function HelpGuides({ searchQuery, setSearchQuery }: HelpGuidesProps) {
  // Define all help topics
  const helpTopics = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      description: "Learn how to use the main dashboard",
      topics: [
        {
          id: "dashboard-overview",
          title: "Dashboard Overview",
          content: (
            <div className="space-y-4">
              <p>
                The dashboard provides a quick overview of your delivery operations with key metrics and recent orders.
              </p>
              <h4 className="text-sm font-medium">Key Metrics</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Total Revenue: Shows your current revenue with comparison to previous period</li>
                <li>Active Orders: Displays orders currently in progress</li>
                <li>Active Drivers: Shows how many drivers are currently working</li>
                <li>Customers: Total customer count with new additions</li>
              </ul>
              <h4 className="text-sm font-medium">Recent Orders</h4>
              <p className="text-sm">
                The recent orders table shows your latest orders with their status, allowing you to quickly monitor
                recent activity.
              </p>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Click on any order in the table to view its complete details.
              </div>
            </div>
          ),
        },
        {
          id: "dashboard-navigation",
          title: "Navigation",
          content: (
            <div className="space-y-4">
              <p>The dashboard has two navigation areas:</p>
              <h4 className="text-sm font-medium">Top Navigation Bar</h4>
              <p className="text-sm">Contains your profile menu, theme toggle, and main section links.</p>
              <h4 className="text-sm font-medium">Sidebar Navigation</h4>
              <p className="text-sm">Provides access to all main sections of the dashboard:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Overview (Dashboard)</li>
                <li>Orders</li>
                <li>Drivers</li>
                <li>Customers</li>
                <li>Analytics</li>
                <li>Settings</li>
                <li>Help</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> On mobile devices, the sidebar can be accessed via the menu button in the top left
                corner.
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "orders",
      title: "Orders",
      icon: Package,
      description: "Managing and tracking delivery orders",
      topics: [
        {
          id: "orders-overview",
          title: "Orders Overview",
          content: (
            <div className="space-y-4">
              <p>The Orders page allows you to manage all delivery orders in your system.</p>
              <h4 className="text-sm font-medium">Order List</h4>
              <p className="text-sm">The main table shows all orders with key information:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Order ID: Unique identifier for each order</li>
                <li>Customer: Name of the customer who placed the order</li>
                <li>Address: Delivery location</li>
                <li>Items: Number of items in the order</li>
                <li>Total: Order amount</li>
                <li>Status: Current status (pending, in-transit, delivered, cancelled)</li>
                <li>Driver: Assigned delivery driver</li>
                <li>Date: When the order was placed</li>
              </ul>
            </div>
          ),
        },
        {
          id: "orders-management",
          title: "Order Management",
          content: (
            <div className="space-y-4">
              <p>You can perform several actions to manage orders:</p>
              <h4 className="text-sm font-medium">Viewing Order Details</h4>
              <p className="text-sm">
                Click on the eye icon or select "View details" from the actions menu to see complete order information.
              </p>
              <h4 className="text-sm font-medium">Assigning Drivers</h4>
              <p className="text-sm">For pending orders, you can assign a driver:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Click "Assign driver" from the actions menu</li>
                <li>Select an available driver from the list</li>
                <li>Confirm the assignment</li>
              </ol>
              <h4 className="text-sm font-medium">Updating Order Status</h4>
              <p className="text-sm">
                Change an order's status by selecting "Update status" and choosing the new status.
              </p>
              <h4 className="text-sm font-medium">Cancelling Orders</h4>
              <p className="text-sm">
                If needed, you can cancel an order by selecting "Cancel order" from the actions menu.
              </p>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Note:</strong> Cancelled orders cannot be reinstated. You'll need to create a new order if
                necessary.
              </div>
            </div>
          ),
        },
        {
          id: "orders-filtering",
          title: "Searching and Filtering Orders",
          content: (
            <div className="space-y-4">
              <p>The Orders page provides several ways to find specific orders:</p>
              <h4 className="text-sm font-medium">Search</h4>
              <p className="text-sm">Use the search box to find orders by ID, customer name, or address.</p>
              <h4 className="text-sm font-medium">Status Filter</h4>
              <p className="text-sm">Filter orders by their current status using the status dropdown.</p>
              <h4 className="text-sm font-medium">Advanced Filtering</h4>
              <p className="text-sm">Click the filter icon to access additional filtering options:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Date range</li>
                <li>Driver</li>
                <li>Customer</li>
                <li>Order value</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> You can combine search and filters to narrow down results even further.
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "drivers",
      title: "Drivers",
      icon: Truck,
      description: "Managing delivery drivers",
      badge: "New",
      topics: [
        {
          id: "drivers-overview",
          title: "Drivers Overview",
          content: (
            <div className="space-y-4">
              <p>The Drivers page allows you to manage your delivery personnel and track their performance.</p>
              <h4 className="text-sm font-medium">Driver List</h4>
              <p className="text-sm">The main table shows all drivers with key information:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Driver: Name and ID</li>
                <li>Contact: Phone number and email</li>
                <li>Location: Current city/area</li>
                <li>Status: Current status (active, on-delivery, offline, inactive)</li>
                <li>Rating: Customer satisfaction rating</li>
                <li>Deliveries: Total completed deliveries</li>
                <li>Vehicle: Type of vehicle used</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Click on any driver to view their complete profile and performance metrics.
              </div>
            </div>
          ),
        },
        {
          id: "driver-details",
          title: "Driver Details",
          content: (
            <div className="space-y-4">
              <p>The driver details view provides comprehensive information about each driver:</p>
              <h4 className="text-sm font-medium">Profile Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Contact information (email, phone, location)</li>
                <li>Vehicle details</li>
                <li>Basic statistics (rating, completed deliveries, on-time rate)</li>
                <li>Earnings overview (today, week, month)</li>
                <li>Current delivery assignment (if applicable)</li>
              </ul>
              <h4 className="text-sm font-medium">Performance Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Detailed performance metrics</li>
                <li>Weekly activity chart</li>
                <li>Recent customer feedback</li>
              </ul>
              <h4 className="text-sm font-medium">Deliveries Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Recent delivery history</li>
                <li>Delivery map showing routes</li>
              </ul>
            </div>
          ),
        },
        {
          id: "driver-management",
          title: "Driver Management",
          content: (
            <div className="space-y-4">
              <p>You can perform several actions to manage drivers:</p>
              <h4 className="text-sm font-medium">Adding a New Driver</h4>
              <p className="text-sm">Click the "Add Driver" button and fill out the required information.</p>
              <h4 className="text-sm font-medium">Assigning Orders</h4>
              <p className="text-sm">For active drivers without current assignments:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Open the driver details</li>
                <li>Click "Assign Order"</li>
                <li>Select an available order from the list</li>
                <li>Confirm the assignment</li>
              </ol>
              <h4 className="text-sm font-medium">Communicating with Drivers</h4>
              <p className="text-sm">You can contact drivers directly:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Click "Message Driver" to send an in-app message</li>
                <li>Click "Call Driver" to initiate a phone call</li>
              </ul>
              <h4 className="text-sm font-medium">Managing Driver Status</h4>
              <p className="text-sm">
                Change a driver's status by selecting the appropriate option from the actions menu.
              </p>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Note:</strong> Deactivating a driver will prevent them from receiving new orders but won't
                affect their current assignments.
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "customers",
      title: "Customers",
      icon: Users,
      description: "Managing customer information",
      topics: [
        {
          id: "customers-overview",
          title: "Customers Overview",
          content: (
            <div className="space-y-4">
              <p>The Customers page allows you to manage your customer database and view customer details.</p>
              <h4 className="text-sm font-medium">Customer List</h4>
              <p className="text-sm">The main table shows all customers with key information:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Customer: Name and email</li>
                <li>Contact: Phone number and email</li>
                <li>Location: Address</li>
                <li>Orders: Total number of orders placed</li>
                <li>Total Spent: Lifetime value</li>
                <li>Last Order: Date of most recent order</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Click on any customer to view their complete profile and order history.
              </div>
            </div>
          ),
        },
        {
          id: "customer-details",
          title: "Customer Details",
          content: (
            <div className="space-y-4">
              <p>The customer details view provides comprehensive information about each customer:</p>
              <h4 className="text-sm font-medium">Profile Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Contact information (email, phone, address)</li>
                <li>Customer statistics (total orders, total spent)</li>
                <li>Account information (join date, status)</li>
                <li>Payment methods</li>
              </ul>
              <h4 className="text-sm font-medium">Orders Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Complete order history</li>
                <li>Order analytics</li>
              </ul>
              <h4 className="text-sm font-medium">Notes Tab</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Customer-specific notes</li>
                <li>Option to add new notes</li>
              </ul>
            </div>
          ),
        },
        {
          id: "customer-management",
          title: "Customer Management",
          content: (
            <div className="space-y-4">
              <p>You can perform several actions to manage customers:</p>
              <h4 className="text-sm font-medium">Adding a New Customer</h4>
              <p className="text-sm">Click the "Add Customer" button and fill out the required information.</p>
              <h4 className="text-sm font-medium">Editing Customer Information</h4>
              <p className="text-sm">
                Open the customer details and click "Edit Customer" to update their information.
              </p>
              <h4 className="text-sm font-medium">Contacting Customers</h4>
              <p className="text-sm">You can contact customers directly:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Click "Send Email" to compose an email</li>
                <li>View phone number to initiate a call</li>
              </ul>
              <h4 className="text-sm font-medium">Managing Favorites</h4>
              <p className="text-sm">
                Mark important customers as favorites for quick access by clicking the star icon.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
      description: "Business insights and reporting",
      topics: [
        {
          id: "analytics-overview",
          title: "Analytics Overview",
          content: (
            <div className="space-y-4">
              <p>The Analytics page provides insights into your delivery operations with various charts and metrics.</p>
              <h4 className="text-sm font-medium">Key Metrics</h4>
              <p className="text-sm">The top section displays important business metrics:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Total Revenue: Financial performance with trend</li>
                <li>Total Orders: Order volume with trend</li>
                <li>New Customers: Customer acquisition rate</li>
                <li>Average Delivery Time: Operational efficiency</li>
                <li>Active Drivers: Driver availability</li>
                <li>Customer Satisfaction: Overall service quality</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Hover over any metric to see more detailed information.
              </div>
            </div>
          ),
        },
        {
          id: "analytics-charts",
          title: "Charts and Visualizations",
          content: (
            <div className="space-y-4">
              <p>The Analytics page includes several charts to visualize your data:</p>
              <h4 className="text-sm font-medium">Sales Overview</h4>
              <p className="text-sm">Line chart showing revenue and order volume over time.</p>
              <h4 className="text-sm font-medium">Customer Breakdown</h4>
              <p className="text-sm">Pie chart showing new vs. returning customers.</p>
              <h4 className="text-sm font-medium">Orders by Category</h4>
              <p className="text-sm">Bar chart showing distribution of order types.</p>
              <h4 className="text-sm font-medium">Delivery Performance</h4>
              <p className="text-sm">Pie chart showing on-time delivery metrics.</p>
              <h4 className="text-sm font-medium">Monthly Revenue Trend</h4>
              <p className="text-sm">Bar chart showing revenue performance over the past year.</p>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Click on chart legends to toggle data series on and off.
              </div>
            </div>
          ),
        },
        {
          id: "analytics-filtering",
          title: "Filtering and Date Ranges",
          content: (
            <div className="space-y-4">
              <p>You can customize the analytics view in several ways:</p>
              <h4 className="text-sm font-medium">Date Range Selection</h4>
              <p className="text-sm">Click the date range selector to choose a specific time period:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Today</li>
                <li>Last 7 days</li>
                <li>Last 30 days</li>
                <li>This month</li>
                <li>Last month</li>
                <li>Custom range</li>
              </ul>
              <h4 className="text-sm font-medium">Data Filtering</h4>
              <p className="text-sm">Use the filter dropdown to focus on specific data types:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>All Data</li>
                <li>Orders</li>
                <li>Revenue</li>
                <li>Customers</li>
                <li>Drivers</li>
              </ul>
              <h4 className="text-sm font-medium">Exporting Data</h4>
              <p className="text-sm">Click the "Export" button to download analytics data in CSV or Excel format.</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: Settings,
      description: "Configure your dashboard",
      topics: [
        {
          id: "account-settings",
          title: "Account Settings",
          icon: User,
          content: (
            <div className="space-y-4">
              <p>The Account Settings tab allows you to manage your personal profile and preferences.</p>
              <h4 className="text-sm font-medium">Profile Information</h4>
              <p className="text-sm">Update your personal details:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Name</li>
                <li>Email address</li>
                <li>Profile picture</li>
                <li>Bio</li>
                <li>Role</li>
              </ul>
              <h4 className="text-sm font-medium">Preferences</h4>
              <p className="text-sm">Customize your experience:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Language</li>
                <li>Timezone</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Note:</strong> The "Delete Account" option in the Danger Zone will permanently remove your
                account and cannot be undone.
              </div>
            </div>
          ),
        },
        {
          id: "app-settings",
          title: "Application Settings",
          icon: Settings,
          content: (
            <div className="space-y-4">
              <p>The Application Settings tab allows you to configure general dashboard settings.</p>
              <h4 className="text-sm font-medium">General Settings</h4>
              <p className="text-sm">Configure basic information:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Company name</li>
                <li>Support email</li>
                <li>Contact phone</li>
                <li>Business hours</li>
              </ul>
              <h4 className="text-sm font-medium">Display Settings</h4>
              <p className="text-sm">Customize the appearance:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Dark mode</li>
                <li>Compact mode</li>
                <li>Font size</li>
                <li>Date and time formats</li>
              </ul>
              <h4 className="text-sm font-medium">Delivery Settings</h4>
              <p className="text-sm">Configure delivery-specific options:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Default delivery radius</li>
                <li>Standard delivery fee</li>
                <li>Auto-assign drivers</li>
                <li>Live tracking</li>
              </ul>
            </div>
          ),
        },
        {
          id: "notification-settings",
          title: "Notification Settings",
          icon: Bell,
          content: (
            <div className="space-y-4">
              <p>The Notification Settings tab allows you to configure how you receive alerts.</p>
              <h4 className="text-sm font-medium">Email Notifications</h4>
              <p className="text-sm">Configure which emails you receive:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>New orders</li>
                <li>Order status changes</li>
                <li>Order cancellations</li>
                <li>Driver assignments</li>
                <li>System updates</li>
                <li>Security alerts</li>
              </ul>
              <h4 className="text-sm font-medium">Push Notifications</h4>
              <p className="text-sm">Configure browser and mobile alerts:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>New orders</li>
                <li>Order status changes</li>
                <li>Urgent orders</li>
                <li>Critical alerts</li>
              </ul>
              <h4 className="text-sm font-medium">SMS Notifications</h4>
              <p className="text-sm">Configure text message alerts:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>New orders</li>
                <li>Urgent orders</li>
                <li>Critical alerts</li>
              </ul>
            </div>
          ),
        },
        {
          id: "security-settings",
          title: "Security Settings",
          icon: Shield,
          content: (
            <div className="space-y-4">
              <p>The Security Settings tab allows you to manage account security.</p>
              <h4 className="text-sm font-medium">Password</h4>
              <p className="text-sm">Update your password by providing:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Current password</li>
                <li>New password</li>
                <li>Confirm new password</li>
              </ul>
              <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
              <p className="text-sm">Enable 2FA for additional security:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Toggle the 2FA switch</li>
                <li>Scan the QR code with an authenticator app</li>
                <li>Enter the verification code</li>
                <li>Save your backup codes</li>
              </ol>
              <h4 className="text-sm font-medium">Login Sessions</h4>
              <p className="text-sm">View and manage active sessions on different devices.</p>
              <h4 className="text-sm font-medium">Login History</h4>
              <p className="text-sm">Review recent login activity to monitor for suspicious access.</p>
            </div>
          ),
        },
        {
          id: "api-settings",
          title: "API Settings",
          icon: FileText,
          content: (
            <div className="space-y-4">
              <p>The API Settings tab allows you to manage API keys and webhooks for external integrations.</p>
              <h4 className="text-sm font-medium">API Keys</h4>
              <p className="text-sm">Manage your API authentication:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>View live and test API keys</li>
                <li>Regenerate keys as needed</li>
                <li>Copy keys to clipboard</li>
              </ul>
              <h4 className="text-sm font-medium">Webhooks</h4>
              <p className="text-sm">Configure event notifications:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Set webhook URL</li>
                <li>Select events to trigger webhooks</li>
                <li>Test webhook delivery</li>
              </ul>
              <h4 className="text-sm font-medium">API Rate Limits</h4>
              <p className="text-sm">Configure usage limits:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Requests per minute</li>
                <li>Burst limit</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Security Note:</strong> Never share your live API keys. If compromised, regenerate them
                immediately.
              </div>
            </div>
          ),
        },
        {
          id: "team-settings",
          title: "Team Settings",
          icon: Users,
          content: (
            <div className="space-y-4">
              <p>The Team Settings tab allows you to manage team members and their access levels.</p>
              <h4 className="text-sm font-medium">Team Members</h4>
              <p className="text-sm">Manage your team:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>View all team members</li>
                <li>Invite new members</li>
                <li>Change member roles</li>
                <li>Deactivate accounts</li>
              </ul>
              <h4 className="text-sm font-medium">Roles and Permissions</h4>
              <p className="text-sm">Understand different access levels:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Administrator: Full access to all features</li>
                <li>Manager: Can manage orders, customers, and drivers</li>
                <li>Support: Can view and update orders and customer information</li>
                <li>Viewer: Read-only access to data</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> Assign the minimum necessary permissions to each team member for better security.
              </div>
            </div>
          ),
        },
        {
          id: "billing-settings",
          title: "Billing Settings",
          icon: CreditCard,
          content: (
            <div className="space-y-4">
              <p>The Billing Settings tab allows you to manage your subscription and payment information.</p>
              <h4 className="text-sm font-medium">Current Plan</h4>
              <p className="text-sm">View and manage your subscription:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Plan details</li>
                <li>Next billing date</li>
                <li>Change or cancel plan</li>
              </ul>
              <h4 className="text-sm font-medium">Payment Method</h4>
              <p className="text-sm">Manage your payment information:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>View current payment method</li>
                <li>Update payment details</li>
              </ul>
              <h4 className="text-sm font-medium">Usage</h4>
              <p className="text-sm">Monitor your resource usage:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Orders (used/limit)</li>
                <li>Drivers (used/limit)</li>
                <li>API calls (used/limit)</li>
              </ul>
              <h4 className="text-sm font-medium">Billing History</h4>
              <p className="text-sm">Access past invoices and payment records.</p>
            </div>
          ),
        },
      ],
    },
    {
      id: "help",
      title: "Help & Support",
      icon: MessageSquare,
      description: "Get assistance and learn how to use the dashboard",
      topics: [
        {
          id: "help-overview",
          title: "Help Center Overview",
          content: (
            <div className="space-y-4">
              <p>The Help Center provides resources to help you use the delivery admin dashboard effectively.</p>
              <h4 className="text-sm font-medium">Available Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Guides: Step-by-step instructions for common tasks</li>
                <li>FAQ: Answers to frequently asked questions</li>
                <li>Video Tutorials: Visual demonstrations of features</li>
              </ul>
              <h4 className="text-sm font-medium">Search</h4>
              <p className="text-sm">
                Use the search box at the top of the Help Center to find specific topics quickly.
              </p>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Tip:</strong> If you can't find what you're looking for, contact support using the "Contact
                Support" button.
              </div>
            </div>
          ),
        },
        {
          id: "contact-support",
          title: "Contacting Support",
          content: (
            <div className="space-y-4">
              <p>If you need additional help, you can contact our support team.</p>
              <h4 className="text-sm font-medium">Support Options</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Email: support@deliveryadmin.com</li>
                <li>Live Chat: Available Monday-Friday, 9am-5pm EST</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
              <h4 className="text-sm font-medium">Submitting a Support Ticket</h4>
              <p className="text-sm">For technical issues, please include:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Detailed description of the problem</li>
                <li>Steps to reproduce the issue</li>
                <li>Screenshots if applicable</li>
                <li>Browser and device information</li>
              </ul>
              <div className="rounded-md bg-muted p-3 text-sm">
                <strong>Response Time:</strong> We aim to respond to all support requests within 24 hours during
                business days.
              </div>
            </div>
          ),
        },
      ],
    },
  ]

  // Filter topics based on search query
  const filteredTopics = searchQuery
    ? helpTopics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.topics.some(
            (subtopic) =>
              subtopic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              subtopic.content.props.children.some(
                (child) => typeof child === "string" && child.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
          ),
      )
    : helpTopics

  return (
    <div className="space-y-6">
      {filteredTopics.length === 0 ? (
        <div className="text-center py-10">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No results found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any help topics matching your search. Try using different keywords or browse all topics.
          </p>
          <Button className="mt-4" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      ) : (
        filteredTopics.map((topic) => (
          <div key={topic.id} className="space-y-4">
            <div className="flex items-center gap-2">
              <topic.icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{topic.title}</h2>
              {topic.badge && <Badge className="bg-primary text-primary-foreground">{topic.badge}</Badge>}
            </div>
            <p className="text-muted-foreground">{topic.description}</p>
            <Accordion type="single" collapsible className="w-full">
              {topic.topics.map((subtopic) => (
                <AccordionItem key={subtopic.id} value={subtopic.id}>
                  <AccordionTrigger className="text-base font-medium">{subtopic.title}</AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">{subtopic.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Separator />
          </div>
        ))
      )}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </div>
  )
}
