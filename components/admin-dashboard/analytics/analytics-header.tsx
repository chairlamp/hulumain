"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, CalendarIcon, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

export function AnalyticsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track performance metrics and business insights</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-[240px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Data</SelectItem>
            <SelectItem value="orders">Orders</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="customers">Customers</SelectItem>
            <SelectItem value="drivers">Drivers</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>

        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
