import { PrismaClient } from '@prisma/client'
import DashboardClient from '@/components/Dashboard';

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const orders = await prisma.order.findMany({
    include: {
      customerDetails: true,
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return <DashboardClient orders={orders} />
}
