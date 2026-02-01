import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star,
  Minus,
  Plus,
  Check,
  ChevronRight,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui-custom/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useNotificationStore } from '@/store/notificationStore';
import { mockProducts, mockReviews, getVendorById, getProductsByCategory } from '@/data/mockData';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = mockProducts.find(p => p.slug === slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { addNotification } = useNotificationStore();

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const vendor = getVendorById(product.vendorId);
  const reviews = mockReviews.filter(r => r.productId === product.id);
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);
  
  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscountPercentage(product.price, product.compareAtPrice || 0);
  const isOutOfStock = product.inventory === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant,
      name: product.name,
      image: product.images[0]?.url || '',
      price: product.price,
      quantity,
      vendorId: product.vendorId,
      vendorName: vendor?.storeName || 'Unknown Vendor',
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

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-purple-600">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  -{discount}%
                </Badge>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      selectedImage === index 
                        ? 'border-purple-500' 
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Vendor */}
            {vendor && (
              <Link 
                to={`/vendors/${vendor.storeSlug}`}
                className="flex items-center gap-2 text-sm text-gray-500 mb-3 hover:text-purple-600"
              >
                <Store className="w-4 h-4" />
                {vendor.storeName}
              </Link>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    )}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">
                ({product.reviewCount} reviews)
              </span>
              <span className="text-gray-300">|</span>
              <span className={cn(
                'text-sm',
                product.inventory > 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-purple-600">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 mb-6">
              {product.shortDescription || product.description}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Select Variant</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={cn(
                        'px-4 py-2 border rounded-lg text-sm transition-colors',
                        selectedVariant === variant.id
                          ? 'border-purple-500 bg-purple-50 text-purple-600'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      {variant.options.map(o => o.value).join(' / ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                  disabled={quantity >= product.inventory}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 bg-gradient-purple hover:opacity-90"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleItem(product.id)}
                className={cn(isWishlisted && 'bg-red-50 border-red-200 text-red-500')}
              >
                <Heart className={cn('w-5 h-5', isWishlisted && 'fill-current')} />
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent py-3"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-transparent py-3"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="pt-6">
            {product.attributes && product.attributes.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {product.attributes.map((attr, index) => (
                  <div key={index} className="flex border-b pb-2">
                    <span className="font-medium w-1/3">{attr.name}</span>
                    <span className="text-gray-600">{attr.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.customerAvatar}
                        alt={review.customerName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{review.customerName}</span>
                          {review.isVerifiedPurchase && (
                            <Badge variant="secondary" className="text-xs">
                              <Check className="w-3 h-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-4 h-4',
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                        {review.title && (
                          <h4 className="font-medium mb-1">{review.title}</h4>
                        )}
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ShoppingCart icon component
function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
      />
    </svg>
  );
}
