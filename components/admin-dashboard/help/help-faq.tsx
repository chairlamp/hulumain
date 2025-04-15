"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search } from "lucide-react"

interface HelpFAQProps {
  searchQuery: string
}

export function HelpFAQ({ searchQuery }: HelpFAQProps) {
  // Define FAQ items
  const faqItems = [
    {
      id: "faq-1",
      question: "How do I assign a driver to an order?",
      answer:
        "To assign a driver to an order, go to the Orders page, find the order you want to assign, click the actions menu (three dots), and select 'Assign driver'. You'll see a list of available drivers that you can choose from. Alternatively, you can also assign orders from the Drivers page by selecting a driver and clicking 'Assign Order'.",
    },
    {
      id: "faq-2",
      question: "How do I track a driver's current location?",
      answer:
        "You can track a driver's current location by going to the Drivers page, clicking on the driver you want to track, and then navigating to the 'Deliveries' tab. There you'll see a map showing their current location and route. Note that this feature requires drivers to have the mobile app installed and location services enabled.",
    },
    {
      id: "faq-3",
      question: "How do I cancel an order?",
      answer:
        "To cancel an order, go to the Orders page, find the order you want to cancel, click the actions menu (three dots), and select 'Cancel order'. You'll be asked to confirm the cancellation and optionally provide a reason. Once cancelled, the order status will be updated and the customer will be notified if notification settings are enabled.",
    },
    {
      id: "faq-4",
      question: "How do I add a new customer?",
      answer:
        "To add a new customer, go to the Customers page and click the 'Add Customer' button in the top right corner. Fill out the required information in the form that appears, including name, contact details, and address. You can also add optional information like payment methods and notes. Click 'Save' when you're done to create the customer record.",
    },
    {
      id: "faq-5",
      question: "How do I view analytics for a specific time period?",
      answer:
        "To view analytics for a specific time period, go to the Analytics page and click on the date range selector at the top of the page. You can choose from preset options like 'Last 7 days' or 'This month', or select 'Custom range' to specify exact start and end dates. The analytics will automatically update to reflect data from your selected time period.",
    },
    {
      id: "faq-6",
      question: "How do I export order data?",
      answer:
        "To export order data, go to the Orders page and click the 'Export' button in the top right corner. You can choose to export all orders or only the filtered/selected orders. The data will be downloaded as a CSV or Excel file that you can open in spreadsheet software. The export includes all visible columns from the orders table.",
    },
    {
      id: "faq-7",
      question: "How do I add a new team member?",
      answer:
        "To add a new team member, go to Settings > Team and click the 'Invite Member' button. Enter their email address, select their role (Administrator, Manager, Support, or Viewer), and optionally add a personal message. Click 'Send Invitation' to email them an invitation link. They'll need to create an account or sign in to accept the invitation.",
    },
    {
      id: "faq-8",
      question: "How do I change my password?",
      answer:
        "To change your password, go to Settings > Security and find the Password section. Enter your current password for verification, then enter and confirm your new password. Click 'Update Password' to save the changes. Make sure to use a strong, unique password that includes a mix of letters, numbers, and special characters.",
    },
    {
      id: "faq-9",
      question: "How do I set up notifications?",
      answer:
        "To set up notifications, go to Settings > Notifications. You'll see tabs for Email, Push, and SMS notifications. In each tab, you can toggle which events you want to be notified about. For example, you can choose to receive email notifications for new orders but not for order status changes. Remember to click 'Save Preferences' after making your selections.",
    },
    {
      id: "faq-10",
      question: "How do I view a driver's performance metrics?",
      answer:
        "To view a driver's performance metrics, go to the Drivers page and click on the driver you want to evaluate. Navigate to the 'Performance' tab to see detailed metrics including on-time delivery rate, customer satisfaction rating, order acceptance rate, and average delivery time. You'll also see a weekly activity chart and recent customer feedback.",
    },
    {
      id: "faq-11",
      question: "How do I update my company information?",
      answer:
        "To update your company information, go to Settings > Application and find the General Settings section. Here you can update your company name, support email, contact phone, and business hours. Click 'Save Changes' after making your updates. This information may be displayed to customers in communications, so keep it accurate and professional.",
    },
    {
      id: "faq-12",
      question: "How do I contact support?",
      answer:
        "You can contact support by clicking the 'Contact Support' button at the bottom of the Help Center. Alternatively, you can email support@deliveryadmin.com, use the live chat feature (available Monday-Friday, 9am-5pm EST), or call +1 (555) 123-4567. For technical issues, please include a detailed description of the problem, steps to reproduce, screenshots if applicable, and your browser/device information.",
    },
  ]

  // Filter FAQ items based on search query
  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqItems

  return (
    <div className="space-y-6">
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-10">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No results found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any FAQs matching your search. Try using different keywords or browse all FAQs.
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base font-medium">{item.question}</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
