"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface EarningsChartProps {
  period: string
}

export function EarningsChart({ period }: EarningsChartProps) {
  // Sample data for different periods
  const dailyData = [
    { hour: "6 AM", earnings: 0, tips: 0 },
    { hour: "8 AM", earnings: 8.5, tips: 2.5 },
    { hour: "10 AM", earnings: 7.75, tips: 3 },
    { hour: "12 PM", earnings: 12.25, tips: 4.5 },
    { hour: "2 PM", earnings: 9.5, tips: 3.25 },
    { hour: "4 PM", earnings: 0, tips: 0 },
    { hour: "6 PM", earnings: 0, tips: 0 },
    { hour: "8 PM", earnings: 0, tips: 0 },
  ]

  const weeklyData = [
    { day: "Mon", earnings: 32.5, tips: 12.75 },
    { day: "Tue", earnings: 28.75, tips: 10.5 },
    { day: "Wed", earnings: 35.25, tips: 15.25 },
    { day: "Thu", earnings: 42.5, tips: 15.25 },
    { day: "Fri", earnings: 0, tips: 0 },
    { day: "Sat", earnings: 0, tips: 0 },
    { day: "Sun", earnings: 0, tips: 0 },
  ]

  const monthlyData = [
    { week: "Week 1", earnings: 225.5, tips: 87.5 },
    { week: "Week 2", earnings: 245.75, tips: 92.25 },
    { week: "Week 3", earnings: 238.5, tips: 85.75 },
    { week: "Week 4", earnings: 265.5, tips: 95.25 },
  ]

  const yearlyData = [
    { month: "Jan", earnings: 975.25, tips: 345.75 },
    { month: "Feb", earnings: 1025.5, tips: 375.25 },
    { month: "Mar", earnings: 1125.75, tips: 425.5 },
    { month: "Apr", earnings: 1050.25, tips: 385.75 },
    { month: "May", earnings: 1175.5, tips: 435.25 },
    { month: "Jun", earnings: 1225.75, tips: 450.5 },
    { month: "Jul", earnings: 1275.25, tips: 475.75 },
    { month: "Aug", earnings: 1150.5, tips: 425.25 },
    { month: "Sep", earnings: 1075.75, tips: 395.5 },
    { month: "Oct", earnings: 1125.25, tips: 415.75 },
    { month: "Nov", earnings: 0, tips: 0 },
    { month: "Dec", earnings: 0, tips: 0 },
  ]

  const getData = () => {
    switch (period) {
      case "day":
        return dailyData
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return weeklyData
    }
  }

  const getXAxisKey = () => {
    switch (period) {
      case "day":
        return "hour"
      case "week":
        return "day"
      case "month":
        return "week"
      case "year":
        return "month"
      default:
        return "day"
    }
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={getData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={getXAxisKey()} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="earnings" name="Base Pay" fill="#3b82f6" />
        <Bar dataKey="tips" name="Tips" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  )
}
