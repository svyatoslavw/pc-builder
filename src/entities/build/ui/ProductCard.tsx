import { GlobeIcon, GlobeLockIcon, StarIcon } from "lucide-react"
import Image from "next/image"

import type { IProduct } from "../../../shared/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../../../shared/ui/card"

const ProductCharacteristics = ({ product }: { product: IProduct }) => {
  const item = (label: string, value: string | number) => (
    <div className="text-xs px-2 py-1 border bg-gray-100 rounded">
      {value} {label}
    </div>
  )
  if ("cores" in product && "ghz" in product && "threads" in product) {
    return (
      <>
        {item("Cores", product.cores)}
        {item("GHz", product.ghz)}
        {item("Threads", product.threads)}
      </>
    )
  } else if ("chipset" in product && "sockets" in product && "compatible_ram" in product) {
    return (
      <>
        {item("Chipset", product.chipset)}
        {item("", product.sockets)}
        {item("", product.compatible_ram)}
      </>
    )
  } else if ("cooling" in product && "memory_size" in product && "memory_type" in product) {
    return (
      <>
        {item("Cooling", product.cooling)}
        {item("GB", product.memory_size)}
        {item("", product.memory_type)}
      </>
    )
  } else if ("size" in product && "type" in product && "ghz" in product) {
    return (
      <>
        {item("GB", product.size)}
        {item("", product.type)}
        {item("GHz", product.ghz)}
      </>
    )
  } else if ("watt" in product) {
    return <>{item("W", product.watt)}</>
  } else if ("drive_size" in product) {
    return <>{item("", product.drive_size)}</>
  } else if ("ssd_size" in product) {
    return <>{item("", product.ssd_size)}</>
  } else if ("windows" in product) {
    return <>{item("Windows", product.windows)}</>
  } else {
    return null
  }
}

interface IProductCardProps {
  product: IProduct
  children?: React.ReactNode
}

const ProductCard = ({ product, children }: IProductCardProps) => {
  return (
    <Card className="relative aspect-square">
      <CardHeader className="font-semibold text-base h-28 pb-0">
        <h3 className="line-clamp-2 w-5/6">{product.name}</h3>
        <div className="flex gap-1 text-xs items-center">
          <StarIcon size={16} color="black" fill="black" />
          {product.rating}
        </div>
      </CardHeader>
      <CardDescription className="flex justify-center h-56">
        <Image
          src={product.image_url}
          alt={product.name}
          width={220}
          height={220}
          draggable={false}
          className="object-contain select-none"
        />
      </CardDescription>
      <CardContent className="flex flex-wrap gap-1 py-2">
        <ProductCharacteristics product={product} />
      </CardContent>
      <CardFooter className="flex justify-between items-end">
        <div className="flex items-end">
          {product.in_stock ? <GlobeIcon size={18} className="text-green-600" /> : <GlobeLockIcon size={18} className="text-red-600" />}
          <p className="ml-1 text-xs">{product.in_stock ? "In Stock" : "Not Available"} </p>
        </div>
        <p className="text-xl font-semibold underline">{product.price}$</p>
      </CardFooter>
      {children}
    </Card>
  )
}

export { ProductCard }
