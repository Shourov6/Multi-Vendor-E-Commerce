import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Dumbbell, 
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui-custom/ProductCard';
import { mockProducts, mockCategories } from '@/data/mockData';
import { useLanguageStore, t } from '@/lib/i18n';

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  '1': Smartphone,
  '2': Shirt,
  '3': Home,
  '4': ShoppingBag,
  '5': Sparkles,
  '6': Dumbbell,
};

export function HomePage() {
  const { language } = useLanguageStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    [heroRef, categoriesRef, productsRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const featuredProducts = mockProducts.slice(0, 8);
  const newArrivals = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-24 pb-16 overflow-hidden opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4">
                {language === 'bn' ? 'নতুন কালেকশন ২০২৪' : 'New Collection 2024'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {language === 'bn' 
                  ? 'সেরা বিক্রেতাদের কাছ থেকে অসাধারণ ডিল আবিষ্কার করুন'
                  : 'Discover Amazing Deals from Top Vendors'
                }
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                {language === 'bn'
                  ? 'হাজারো যাচাইকৃত বাংলাদেশি বিক্রেতার কাছ থেকে কিনুন। সেরা দামে সবকিছু পান দ্রুত ডেলিভারি এবং নিরাপদ পেমেন্টের সাথে।'
                  : 'Shop from thousands of verified Bangladeshi vendors. Find everything you need at unbeatable prices with fast shipping and secure payments.'
                }
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90"
                  asChild
                >
                  <Link to="/products">
                    {t('shopNow', language)}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/vendor/apply">{t('becomeVendor', language)}</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold">৫০,০০০+</p>
                  <p className="text-white/70 text-sm">{language === 'bn' ? 'পণ্য' : 'Products'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">১,০০০+</p>
                  <p className="text-white/70 text-sm">{language === 'bn' ? 'বিক্রেতা' : 'Vendors'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">১ লাখ+</p>
                  <p className="text-white/70 text-sm">{language === 'bn' ? 'গ্রাহক' : 'Customers'}</p>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600"
                alt="Shopping"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {language === 'bn' ? 'নিরাপদ শপিং' : 'Secure Shopping'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'bn' ? '১০০% সুরক্ষিত' : '100% Protected'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{t('freeShipping', language)}</p>
                <p className="text-xs text-gray-500">{t('freeShippingDesc', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{t('securePaymentTitle', language)}</p>
                <p className="text-xs text-gray-500">{t('securePaymentDesc', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {language === 'bn' ? '২৪/৭ সাপোর্ট' : '24/7 Support'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'bn' ? 'সর্বদা সহায়তা' : 'Always here to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {language === 'bn' ? 'গুণগত মান' : 'Quality Guaranteed'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'bn' ? 'যাচাইকৃত পণ্য' : 'Verified products'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={categoriesRef}
        className="py-16 bg-gray-50 opacity-0"
        style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('shopByCategory', language)}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('browseCategories', language)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mockCategories.map((category) => {
              const Icon = categoryIcons[category.id] || ShoppingBag;
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {language === 'bn' ? category.name : category.nameEn}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.productCount} {language === 'bn' ? 'পণ্য' : 'products'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section 
        ref={productsRef}
        className="py-16 opacity-0"
        style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('featuredProducts', language)}
              </h2>
              <p className="text-gray-600">
                {language === 'bn' 
                  ? 'আমাদের শীর্ষ বিক্রেতাদের কাছ থেকে বাছাই করা পণ্য'
                  : 'Handpicked products from our top vendors'
                }
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                {t('viewAll', language)}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in-up"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="Fashion Sale"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <p className="text-sm font-medium mb-2">
                    {language === 'bn' ? '৫০% পর্যন্ত ছাড়' : 'Up to 50% Off'}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">
                    {language === 'bn' ? 'ফ্যাশন সেল' : 'Fashion Week Sale'}
                  </h3>
                  <Button className="bg-white text-purple-600 hover:bg-white/90">
                    {t('shopNow', language)}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl group">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800"
                alt="Electronics"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <p className="text-sm font-medium mb-2">
                    {language === 'bn' ? 'নতুন পণ্য' : 'New Arrivals'}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">
                    {language === 'bn' ? 'লেটেস্ট ইলেকট্রনিক্স' : 'Latest Electronics'}
                  </h3>
                  <Button className="bg-white text-gray-900 hover:bg-white/90">
                    {language === 'bn' ? 'এক্সপ্লোর করুন' : 'Explore'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('newArrivals', language)}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'bn'
                ? 'আমাদের মার্কেটপ্লেসে নতুন যোগ হওয়া পণ্য দেখুন'
                : 'Check out the latest products added to our marketplace'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-purple rounded-3xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'bn' 
                ? 'MeaW-এ বিক্রয় শুরু করুন'
                : 'Start Selling on MeaW'
              }
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {language === 'bn'
                ? 'হাজারো সফল বিক্রেতার সাথে যোগ দিন এবং লাখো গ্রাহকের কাছে পৌঁছান। আজই আপনার অনলাইন ব্যবসা শুরু করুন।'
                : 'Join thousands of successful vendors and reach millions of customers. Start your online business today.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-white/90"
                asChild
              >
                <Link to="/vendor/apply">{t('becomeVendor', language)}</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
