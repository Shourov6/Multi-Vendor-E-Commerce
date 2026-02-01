import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Star,
  TrendingUp,
  Eye,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui-custom/StatsCard';
import { OrderStatusBadge } from '@/components/ui-custom/OrderStatusBadge';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockOrders } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock vendor data
const vendorData = {
  storeName: 'TechHub Store',
  totalRevenue: 45230,
  totalOrders: 324,
  totalProducts: 45,
  averageRating: 4.8,
  storeViews: 12560,
  conversionRate: 3.2,
  commissionRate: 0.15,
  pendingPayout: 3250,
  totalPayout: 38450,
};

// Chart data
const salesData = [
  { name: 'Week 1', sales: 4200 },
  { name: 'Week 2', sales: 5100 },
  { name: 'Week 3', sales: 4800 },
  { name: 'Week 4', sales: 6200 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 89, revenue: 17791 },
  { name: 'Smart Watch Pro', sales: 56, revenue: 16794 },
  { name: 'Laptop Stand', sales: 134, revenue: 6697 },
  { name: '4K Webcam', sales: 42, revenue: 5459 },
];

export function VendorDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const vendorOrders = mockOrders.filter(o => 
    o.items.some(item => item.vendorId === '1')
  ).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar type="vendor" isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {vendorData.storeName}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/vendor/settings">Store Settings</Link>
              </Button>
              <Button className="bg-gradient-purple" asChild>
                <Link to="/vendor/products/new">+ Add Product</Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Revenue"
              value={vendorData.totalRevenue}
              previousValue={38450}
              format="currency"
              icon={DollarSign}
            />
            <StatsCard
              title="Total Orders"
              value={vendorData.totalOrders}
              previousValue={289}
              format="number"
              icon={ShoppingBag}
            />
            <StatsCard
              title="Products"
              value={vendorData.totalProducts}
              format="number"
              icon={Package}
            />
            <StatsCard
              title="Store Rating"
              value={vendorData.averageRating}
              format="number"
              icon={Star}
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Store Views</p>
                    <p className="text-2xl font-bold">{formatNumber(vendorData.storeViews)}</p>
                    <div className="flex items-center gap-1 mt-2 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
                    <p className="text-2xl font-bold">{vendorData.conversionRate}%</p>
                    <div className="flex items-center gap-1 mt-2 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+0.8%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending Payout</p>
                    <p className="text-2xl font-bold">{formatCurrency(vendorData.pendingPayout)}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Next payout: Jan 30
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="sales" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-medium flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} sold</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/vendor/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Order</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Product</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Amount</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-3 px-2">
                          <Link 
                            to={`/vendor/orders/${order.id}`}
                            className="font-medium text-purple-600 hover:underline"
                          >
                            #{order.orderNumber}
                          </Link>
                        </td>
                        <td className="py-3 px-2 text-sm">
                          {order.items[0]?.name}
                          {order.items.length > 1 && (
                            <span className="text-gray-500">
                              {' '}+ {order.items.length - 1} more
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-sm">{order.customer.name}</td>
                        <td className="py-3 px-2 text-sm font-medium">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="py-3 px-2">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/vendor/orders/${order.id}`}>
                              View
                              <ArrowUpRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
