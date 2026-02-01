import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useNotificationStore } from '@/store/notificationStore';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  showVendor?: boolean;
}

export function ProductCard({ product, className, showVendor = true }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addNotification } = useNotificationStore();

  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscountPercentage(product.price, product.compareAtPrice || 0);
  const isLowStock = product.inventory <= product.lowStockThreshold;
  const isOutOfStock = product.inventory === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0]?.url || '',
      price: product.price,
      quantity: 1,
      vendorId: product.vendorId,
      vendorName: 'Vendor Name', // Would come from product.vendor
      maxQuantity: product.inventory,
    });

    addNotification({
      userId: 'current-user',
      type: 'order',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`,
      isRead: false,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-gray-200 overflow-hidden',
        'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {/* Image Container */}
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="bg-gray-800 text-white">
              Out of Stock
            </Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge variant="secondary" className="bg-orange-500 text-white">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              'w-9 h-9 rounded-full shadow-md',
              isWishlisted && 'bg-red-50 text-red-500'
            )}
            onClick={handleToggleWishlist}
          >
            <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="w-9 h-9 rounded-full shadow-md"
            asChild
          >
            <Link to={`/products/${product.slug}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Vendor */}
        {showVendor && (
          <p className="text-xs text-gray-500 mb-1">
            Store Name
          </p>
        )}

        {/* Title */}
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-purple-600">
              {formatCurrency(product.price)}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>

          <Button
            size="sm"
            className={cn(
              'bg-gradient-purple hover:opacity-90',
              isOutOfStock && 'opacity-50 cursor-not-allowed'
            )}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
