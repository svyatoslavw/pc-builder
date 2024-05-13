"use client"

import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { createClient } from "@/shared/api/client"
import { IProcessor } from "@/shared/lib/types"

const DATA = [
  {
    goal: 400
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 239
  },
  {
    goal: 300
  },
  {
    goal: 200
  },
  {
    goal: 278
  },
  {
    goal: 189
  },
  {
    goal: 349
  }
]

async function GetTestArray() {
  const supabase = createClient()

  const { data: products, error } = await supabase.from("processor").select("*")

  if (error) {
    console.log(error.message)
  }

  return (products as IProcessor[]) || []
}

const DashboardPage = () => {
  return (
    <div className="mt-3 h-[120px] w-1/3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DATA}>
          <Bar
            dataKey="goal"
            style={
              {
                fill: "#000000",
                opacity: 0.9
              } as React.CSSProperties
            }
          />
        </BarChart>
      </ResponsiveContainer>
      asdas
    </div>
  )
}

export { DashboardPage }
