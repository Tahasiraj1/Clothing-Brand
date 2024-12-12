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
        <SelectTrigger className='w-[180px] rounded-full bg-lime-100 border-emerald-600 focus:ring-0'>
            <SelectValue placeholder='Select order type' />
        </SelectTrigger>
        <SelectContent className="bg-lime-200 rounded-xl border border-emerald-600 drop-shadow-2xl">
            <SelectGroup>
                <SelectLabel>Order Types</SelectLabel>
                {orderTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="hover:bg-lime-100">
                        {type.label}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
  )
}

export default OrdersTypeSelector
