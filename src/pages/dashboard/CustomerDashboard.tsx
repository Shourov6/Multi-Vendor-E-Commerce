import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Star,
  Package,
  ChevronRight,
  Clock,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderStatusBadge } from '@/components/ui-custom/OrderStatusBadge';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { mockOrders } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

export function CustomerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();

  const customerOrders = mockOrders.filter(o => o.customerId === user?.id);
  const recentOrders = customerOrders.slice(0, 5);

  // Stats
  const totalOrders = customerOrders.length;
  const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = customerOrders.filter(o => 
    ['pending', 'confirmed', 'processing'].includes(o.status)
  ).length;
  const deliveredOrders = customerOrders.filter(o => o.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar type="customer" isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`
        transition-all duration-300 pt-16
        ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalOrders}</p>
                    <p className="text-xs text-gray-500">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{deliveredOrders}</p>
                    <p className="text-xs text-gray-500">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingOrders}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{wishlistItems.length}</p>
                    <p className="text-xs text-gray-500">Wishlist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/orders">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {recentOrders.length > 0 ? (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div 
                          key={order.id} 
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <Link 
                                to={`/orders/${order.id}`}
                                className="font-medium text-purple-600 hover:underline"
                              >
                                #{order.orderNumber}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {formatDate(order.createdAt)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(order.total)}</p>
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No orders yet</p>
                      <Button variant="outline" className="mt-3" asChild>
                        <Link to="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Tracking */}
              {pendingOrders > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Track Your Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {customerOrders
                        .filter(o => o.status === 'shipped')
                        .slice(0, 2)
                        .map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="font-medium">#{order.orderNumber}</p>
                                <p className="text-sm text-gray-500">
                                  Expected delivery: {formatDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))}
                                </p>
                              </div>
                              <Truck className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="relative">
                              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2" />
                              <div className="absolute left-0 w-2/3 h-1 bg-purple-600 -translate-y-1/2" />
                              <div className="relative flex justify-between">
                                {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                                  <div key={step} className="flex flex-col items-center">
                                    <div className={`
                                      w-4 h-4 rounded-full border-2 
                                      ${index <= 2 ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}
                                    `} />
                                    <span className="text-xs mt-1 text-gray-500">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Spent</span>
                      <span className="font-bold">{formatCurrency(totalSpent)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-medium">
                        {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link 
                      to="/account/addresses"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>My Addresses</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link 
                      to="/account/payments"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span>Payment Methods</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link 
                      to="/account/reviews"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-gray-400" />
                        <span>My Reviews</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link 
                      to="/wishlist"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-gray-400" />
                        <span>My Wishlist</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Need Help */}
              <Card className="bg-gradient-purple text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Our support team is available 24/7 to assist you with any questions.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link to="/support">Contact Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
