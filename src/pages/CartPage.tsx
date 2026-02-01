import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Tag,
  Truck,
  Shield,
  Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { formatCurrency } from '@/lib/utils';


export function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { 
    items, 
    subtotal, 
    taxAmount, 
    shippingAmount, 
    discountAmount, 
    total,
    updateQuantity, 
    removeItem,
    applyDiscount,
    removeDiscount,
  } = useCartStore();
  
  const [discountCode, setDiscountCode] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    
    setIsApplyingDiscount(true);
    setDiscountError(null);
    
    const success = await applyDiscount(discountCode);
    
    if (!success) {
      setDiscountError('Invalid discount code');
    }
    
    setIsApplyingDiscount(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="bg-gradient-purple hover:opacity-90">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart ({items.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 grid md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <Link 
                        to={`/products/${item.productId}`}
                        className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/products/${item.productId}`}
                          className="font-medium text-gray-900 hover:text-purple-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.vendorName}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-600 mt-2 flex items-center gap-1 md:hidden"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden text-gray-500 mr-2">Price:</span>
                      <span className="font-medium">
                        {formatCurrency(item.price)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-center">
                      <span className="md:hidden text-gray-500 mr-2">Qty:</span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-medium w-10 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                      <span className="font-bold text-purple-600">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 hidden md:block"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/products">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Discount Code */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    disabled={discountAmount > 0}
                  />
                  {discountAmount > 0 ? (
                    <Button 
                      variant="outline" 
                      onClick={removeDiscount}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleApplyDiscount}
                      disabled={isApplyingDiscount || !discountCode.trim()}
                    >
                      <Tag className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {discountError && (
                  <p className="text-sm text-red-500 mt-1">{discountError}</p>
                )}
                {discountAmount > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    Discount applied!
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shippingAmount === 0 
                      ? 'Free' 
                      : formatCurrency(shippingAmount)
                    }
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                size="lg"
                className="w-full bg-gradient-purple hover:opacity-90 mb-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Features */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-purple-600" />
                  Free shipping on orders over $100
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Easy returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
