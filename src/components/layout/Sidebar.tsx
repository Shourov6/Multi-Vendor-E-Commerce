import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Store,
  CreditCard,
  Settings,
  BarChart3,
  MessageSquare,
  Tag,
  Truck,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  type: 'admin' | 'vendor' | 'customer';
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Vendors', href: '/admin/vendors', icon: Store },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Shipping', href: '/admin/shipping', icon: Truck },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Support', href: '/admin/support', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

const vendorNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
  { label: 'Orders', href: '/vendor/orders', icon: ShoppingBag },
  { label: 'Products', href: '/vendor/products', icon: Package },
  { label: 'Inventory', href: '/vendor/inventory', icon: BarChart3 },
  { label: 'Customers', href: '/vendor/customers', icon: Users },
  { label: 'Reviews', href: '/vendor/reviews', icon: MessageSquare },
  { label: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
  { label: 'Payments', href: '/vendor/payments', icon: CreditCard },
  { label: 'Store Settings', href: '/vendor/settings', icon: Store },
  { label: 'Support', href: '/vendor/support', icon: HelpCircle },
];

const customerNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
  { label: 'My Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Wishlist', href: '/wishlist', icon: Package },
  { label: 'Addresses', href: '/account/addresses', icon: Truck },
  { label: 'Payment Methods', href: '/account/payments', icon: CreditCard },
  { label: 'Reviews', href: '/account/reviews', icon: MessageSquare },
  { label: 'Settings', href: '/account/settings', icon: Settings },
  { label: 'Help', href: '/support', icon: HelpCircle },
];

export function Sidebar({ type, isCollapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const navItems = type === 'admin' 
    ? adminNavItems 
    : type === 'vendor' 
    ? vendorNavItems 
    : customerNavItems;

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle?.();
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 z-40 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="w-8 h-8"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href ||
                location.pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                      collapsed && 'justify-center'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-purple rounded-lg p-4 text-white">
              <p className="text-sm font-medium mb-1">Need Help?</p>
              <p className="text-xs opacity-80 mb-3">
                Contact our support team
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full text-xs"
                asChild
              >
                <Link to="/support">Get Support</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
