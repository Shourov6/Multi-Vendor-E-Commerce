import { Badge } from '@/components/ui/badge';
import type { OrderStatus, PaymentStatus } from '@/types';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  processing: {
    label: 'Processing',
    className: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
};

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  pending: {
    label: 'Payment Pending',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  authorized: {
    label: 'Authorized',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  paid: {
    label: 'Paid',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  partially_refunded: {
    label: 'Partially Refunded',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  refunded: {
    label: 'Refunded',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = orderStatusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = paymentStatusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
