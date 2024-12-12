"use client"

import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
const orderTypes = [
    { value: 'pending', label: 'Pending Orders', href: '/dashboard' },
    { value: 'confirmed', label: 'Confirmed Orders', href: '/dashboard/confirmed-orders' },
    { value: 'dispatched', label: 'Dispatched Orders', href: '/dashboard/dispatched-orders' },
]


const OrdersTypeSelector = ({ currentPage }: { currentPage: string }) => {
    const router = useRouter();

    const handleValueChange = (value: string) => {
        const selectedType = orderTypes.find(type => type.value === value);
        if (selectedType) {
            router.push(selectedType.href)
        }
    }
  return (
    <Select onValueChange={handleValueChange} value={currentPage}>
        <SelectTrigger className="w-[180px] text-black">
            <SelectValue placeholder='Select order type' />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Order Types</SelectLabel>
                {orderTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                        {type.label}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default OrdersTypeSelector
