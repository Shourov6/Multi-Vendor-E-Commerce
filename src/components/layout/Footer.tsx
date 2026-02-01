import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguageStore, t } from '@/lib/i18n';

export function Footer() {
  const { language } = useLanguageStore();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('freeShipping', language)}</p>
                <p className="text-sm text-gray-400">{t('freeShippingDesc', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('easyReturnsTitle', language)}</p>
                <p className="text-sm text-gray-400">{t('easyReturnsDesc', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('securePaymentTitle', language)}</p>
                <p className="text-sm text-gray-400">{t('securePaymentDesc', language)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{t('multiplePaymentsTitle', language)}</p>
                <p className="text-sm text-gray-400">{t('multiplePaymentsDesc', language)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
                <span className="text-xl font-bold text-white">ম</span>
              </div>
              <span className="text-xl font-bold text-white">{t('brandName', language)}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              {language === 'bn' 
                ? 'আপনার প্রিমিয়ার বাংলাদেশি মার্কেটপ্লেস। যাচাইকৃত বিক্রেতাদের কাছ থেকে হাজারো পণ্য সেরা দামে।'
                : 'Your premier Bangladeshi marketplace. Discover thousands of products from verified vendors at unbeatable prices.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>support@meaw.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>+৮৮০ ৯৬৭৮-০০০০০০</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>গুলশান, ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'সাধারণ প্রশ্ন' : 'FAQ'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-purple-400 transition-colors">
                  ব্লগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === 'bn' ? 'কাস্টমার সার্ভিস' : 'Customer Service'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="hover:text-purple-400 transition-colors">
                  {t('myAccount', language)}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking'}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'রিটার্ন পলিসি' : 'Returns Policy'}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-purple-400 transition-colors">
                  {language === 'bn' ? 'ডেলিভারি তথ্য' : 'Shipping Info'}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {language === 'bn' ? 'বিক্রেতাদের জন্য' : 'For Vendors'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/vendor/apply" className="hover:text-purple-400 transition-colors">
                  {t('vendorApply', language)}
                </Link>
              </li>
              <li>
                <Link to="/vendor/login" className="hover:text-purple-400 transition-colors">
                  {t('vendorLogin', language)}
                </Link>
              </li>
              <li>
                <Link to="/vendor/terms" className="hover:text-purple-400 transition-colors">
                  {t('vendorTerms', language)}
                </Link>
              </li>
              <li>
                <Link to="/vendor/fees" className="hover:text-purple-400 transition-colors">
                  {t('commissionRates', language)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-lg">
                {language === 'bn' ? 'নিউজলেটার সাবস্ক্রাইব করুন' : 'Subscribe to our newsletter'}
              </h3>
              <p className="text-gray-400">
                {language === 'bn' 
                  ? 'সর্বশেষ অফার এবং আপডেট আপনার ইনবক্সে পান'
                  : 'Get the latest deals and updates delivered to your inbox'
                }
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Enter your email'}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 w-full md:w-72"
              />
              <Button className="bg-gradient-purple hover:opacity-90 shrink-0">
                {language === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © ২০২৪ {t('brandName', language)}. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="hover:text-purple-400 transition-colors">
                {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
              </Link>
              <Link to="/terms" className="hover:text-purple-400 transition-colors">
                {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
