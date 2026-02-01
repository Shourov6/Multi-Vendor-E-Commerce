import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  Store,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Bell,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useLanguageStore, t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin, isVendor } = useAuthStore();
  const { itemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { unreadCount } = useNotificationStore();
  const { language, toggleLanguage } = useLanguageStore();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: t('home', language), href: '/' },
    { label: t('products', language), href: '/products' },
    { label: t('categories', language), href: '/categories' },
    { label: t('vendors', language), href: '/vendors' },
    { label: t('deals', language), href: '/deals' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white py-4'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
              <span className="text-xl font-bold text-white">ম</span>
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              {t('brandName', language)}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder={t('search', language)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'bn' ? 'বাংলা' : 'EN'}
              </span>
            </Button>

            {/* Notifications */}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hidden sm:flex"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <p className="font-semibold">{language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}</p>
                  </div>
                  <div className="max-h-64 overflow-auto">
                    <p className="p-4 text-sm text-gray-500 text-center">
                      {language === 'bn' ? 'কোনো নতুন নোটিফিকেশন নেই' : 'No new notifications'}
                    </p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden sm:flex"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:inline text-sm font-medium">
                      {user?.name}
                    </span>
                    <ChevronDown className="w-4 h-4 hidden md:inline" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-3 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    <User className="w-4 h-4 mr-2" />
                    {t('myAccount', language)}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('myOrders', language)}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                    <Heart className="w-4 h-4 mr-2" />
                    {t('wishlist', language)}
                  </DropdownMenuItem>

                  {(isAdmin() || isVendor()) && (
                    <>
                      <DropdownMenuSeparator />
                      {isAdmin() && (
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          {t('adminDashboard', language)}
                        </DropdownMenuItem>
                      )}
                      {isVendor() && (
                        <DropdownMenuItem onClick={() => navigate('/vendor')}>
                          <Store className="w-4 h-4 mr-2" />
                          {t('vendorDashboard', language)}
                        </DropdownMenuItem>
                      )}
                    </>
                  )}

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('logout', language)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex"
                >
                  {t('login', language)}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-gradient-purple hover:opacity-90"
                >
                  {t('signup', language)}
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Language Toggle */}
                  <div className="mb-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={toggleLanguage}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
                    </Button>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="search"
                        placeholder={t('search', language)}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10"
                      />
                    </div>
                  </form>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {!isAuthenticated && (
                    <div className="mt-auto pt-6 border-t space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/login');
                        }}
                      >
                        {t('login', language)}
                      </Button>
                      <Button
                        className="w-full bg-gradient-purple"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/register');
                        }}
                      >
                        {t('signup', language)}
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
