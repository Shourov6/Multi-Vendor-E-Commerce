import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui-custom/StatsCard';
import { OrderStatusBadge } from '@/components/ui-custom/OrderStatusBadge';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockOrders, mockProducts, mockVendors } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// Chart data
const salesData = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 5000, orders: 32 },
  { name: 'Thu', revenue: 4500, orders: 28 },
  { name: 'Fri', revenue: 6000, orders: 42 },
  { name: 'Sat', revenue: 7500, orders: 56 },
  { name: 'Sun', revenue: 6800, orders: 48 },
];

const recentOrders = mockOrders.slice(0, 5);
const lowStockProducts = mockProducts.filter(p => p.inventory <= p.lowStockThreshold).slice(0, 5);

export function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar type="admin" isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Export Report</Button>
              <Button className="bg-gradient-purple">+ Add Product</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Revenue"
              value={125430}
              previousValue={110250}
              format="currency"
              icon={DollarSign}
            />
            <StatsCard
              title="Total Orders"
              value={892}
              previousValue={756}
              format="number"
              icon={ShoppingBag}
            />
            <StatsCard
              title="Total Customers"
              value={456}
              previousValue={420}
              format="number"
              icon={Users}
            />
            <StatsCard
              title="Active Vendors"
              value={48}
              previousValue={45}
              format="number"
              icon={Store}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
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
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#7c3aed"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Vendors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVendors.slice(0, 5).map((vendor, index) => (
                    <div key={vendor.id} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                      <img
                        src={vendor.storeLogo}
                        alt={vendor.storeName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{vendor.storeName}</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(vendor.totalSales)} sales
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/orders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Order</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Customer</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Amount</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="py-3 px-2">
                            <Link 
                              to={`/admin/orders/${order.id}`}
                              className="font-medium text-purple-600 hover:underline"
                            >
                              #{order.orderNumber}
                            </Link>
                          </td>
                          <td className="py-3 px-2 text-sm">{order.customer.name}</td>
                          <td className="py-3 px-2 text-sm font-medium">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="py-3 px-2">
                            <OrderStatusBadge status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alerts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Stock Alerts</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/admin/products">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-red-600">
                          {product.inventory} left
                        </p>
                        <p className="text-xs text-gray-500">
                          Threshold: {product.lowStockThreshold}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
