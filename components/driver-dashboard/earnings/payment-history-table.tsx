"use client"
import { ArrowUpDown, Download, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const payments = [
  {
    id: "PAY-1234",
    date: "Nov 1, 2023",
    amount: "$245.75",
    period: "Oct 25 - Oct 31, 2023",
    status: "completed",
    method: "Direct Deposit",
  },
  {
    id: "PAY-1233",
    date: "Oct 25, 2023",
    amount: "$238.50",
    period: "Oct 18 - Oct 24, 2023",
    status: "completed",
    method: "Direct Deposit",
  },
  {
    id: "PAY-1232",
    date: "Oct 18, 2023",
    amount: "$225.25",
    period: "Oct 11 - Oct 17, 2023",
    status: "completed",
    method: "Direct Deposit",
  },
  {
    id: "PAY-1231",
    date: "Oct 11, 2023",
    amount: "$265.50",
    period: "Oct 4 - Oct 10, 2023",
    status: "completed",
    method: "Direct Deposit",
  },
  {
    id: "PAY-1230",
    date: "Oct 4, 2023",
    amount: "$242.75",
    period: "Sep 27 - Oct 3, 2023",
    status: "completed",
    method: "Direct Deposit",
  },
]

export function PaymentHistoryTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>
              <div className="flex items-center">
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.id}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.period}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700">
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download receipt
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Contact support</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
