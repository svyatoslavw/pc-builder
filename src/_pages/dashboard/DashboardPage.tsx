"use client"

import Image from "next/image"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { createClient } from "@/shared/api/client"
import { EnumOrderStatus, IOrder } from "@/shared/lib/types"
import { formatDate } from "@/shared/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000
  }
]

async function updateOrderStatus(id: string, status: EnumOrderStatus) {
  const supabase = createClient()
  console.log("@@upd")

  const { data, error } = await supabase
    .from("orders")
    .update({
      status: status
    })
    .eq("id", id)

  if (error) {
    console.log(error.message)
  }
}

const DashboardPage = ({ orders }: { orders: IOrder[] }) => {
  return (
    <>
      <div className="p-5 flex gap-5 w-full">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made {orders.length} sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {orders &&
                orders.map((order) => (
                  <div className="flex items-center" key={order.id}>
                    <Image
                      src="https://ui-avatars.com/api/?background=171717&color=ffffff&bold=true&name=P+B"
                      className="rounded-lg"
                      alt="Avatar"
                      width={36}
                      height={36}
                    />
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{order.user_email}</p>
                      <p className="text-sm text-muted-foreground tracking-tight">{order.system_id}</p>
                    </div>
                    <div className="ml-auto font-medium">+$100.00</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full px-5 pb-5 h-full">
        <Card className="h-full w-full">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.user_email}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{order.system_id}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Select onValueChange={(value) => updateOrderStatus(order.id, value as EnumOrderStatus)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={order.status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.values(EnumOrderStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(order.created_at)}</TableCell>
                    <TableCell className="text-right">$100.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export { DashboardPage }
