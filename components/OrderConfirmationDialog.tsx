import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'
import { useCart } from '@/lib/CartContext';

interface OrderConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

export default function OrderConfirmationDialog({ isOpen, onClose, orderId }: OrderConfirmationDialogProps) {
  const [isCopied, setIsCopied] = useState(false)
  const { clearCart } = useCart();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderId).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const handleDialogClose = () => {
    onClose();
    clearCart();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Confirmed!</DialogTitle>
          <DialogDescription>
            Your order has been successfully placed. Here&apos;s your order ID:
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
          <span className="font-mono text-lg">{orderId}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}