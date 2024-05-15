import { createClient } from "@/shared/api/client"
import { EnumOrderStatus, IOrder } from "@/shared/lib/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

const UpdateOrderStatus = ({ order }: { order: IOrder }) => {
  async function updateStatusHandler(id: string, status: EnumOrderStatus) {
    const supabase = createClient()
    console.log("@@upd")

    const { error } = await supabase
      .from("orders")
      .update({
        status: status
      })
      .eq("id", id)

    if (error) {
      console.log(error.message)
    }
  }

  return (
    <Select onValueChange={(value) => updateStatusHandler(order.id, value as EnumOrderStatus)}>
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
  )
}

export default UpdateOrderStatus
