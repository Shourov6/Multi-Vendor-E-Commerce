import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ShoppingBag, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuthStore } from '@/store/authStore';
import { useLanguageStore, t } from '@/lib/i18n';
import type { UserRole } from '@/types';
import { cn } from '@/lib/utils';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const { language, toggleLanguage } = useLanguageStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (password !== confirmPassword) {
      return;
    }
    
    try {
      await register({ email, password, name, role });
      navigate('/');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
              <span className="text-xl font-bold text-white">ম</span>
            </div>
            <span className="text-xl font-bold text-gradient">{t('brandName', language)}</span>
          </Link>

          {/* Language Toggle */}
          <div className="flex justify-center mb-6">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              {language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('createAccount', language)}
            </h1>
            <p className="text-gray-600">
              {language === 'bn'
                ? 'আমাদের মার্কেটপ্লেসে যোগ দিন এবং শপিং বা বিক্রয় শুরু করুন'
                : 'Join our marketplace and start shopping or selling'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-2">
              <Label>{language === 'bn' ? 'আমি চাই' : 'I want to'}</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
                  <Label
                    htmlFor="customer"
                    className={cn(
                      'flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors',
                      'peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50',
                      'hover:border-purple-200'
                    )}
                  >
                    <ShoppingBag className="w-6 h-6 mb-2 text-purple-600" />
                    <span className="font-medium">{language === 'bn' ? 'কিনুন' : 'Shop'}</span>
                    <span className="text-xs text-gray-500">{language === 'bn' ? 'পণ্য কিনুন' : 'Buy products'}</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="vendor" id="vendor" className="peer sr-only" />
                  <Label
                    htmlFor="vendor"
                    className={cn(
                      'flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors',
                      'peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50',
                      'hover:border-purple-200'
                    )}
                  >
                    <Building2 className="w-6 h-6 mb-2 text-purple-600" />
                    <span className="font-medium">{language === 'bn' ? 'বিক্রি করুন' : 'Sell'}</span>
                    <span className="text-xs text-gray-500">{language === 'bn' ? 'বিক্রেতা হন' : 'Become a vendor'}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t('fullName', language)}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder={language === 'bn' ? 'আপনার পুরো নাম' : 'Enter your full name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email', language)}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'bn' ? 'আপনার ইমেইল' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password', language)}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={language === 'bn' ? 'একটি পাসওয়ার্ড তৈরি করুন' : 'Create a password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirmPassword', language)}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm your password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {password !== confirmPassword && confirmPassword && (
                <p className="text-sm text-red-500">
                  {language === 'bn' ? 'পাসওয়ার্ড মিলছে না' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
                required
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                {language === 'bn' ? 'আমি সম্মত' : 'I agree to the'}{' '}
                <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                  {language === 'bn' ? 'শর্তাবলী' : 'Terms of Service'}
                </Link>{' '}
                {language === 'bn' ? 'এবং' : 'and'}{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                  {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-purple hover:opacity-90"
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t('createAccount', language)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('hasAccount', language)}{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                {t('login', language)}
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === 'bn' ? 'অথবা চালিয়ে যান' : 'Or continue with'}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
          alt="Shopping"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-violet-900/80" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'bn' ? 'MeaW-এ যোগ দিন' : 'Join MeaW Today'}
            </h2>
            <p className="text-lg text-white/80">
              {language === 'bn'
                ? 'একটি অ্যাকাউন্ট তৈরি করে এক্সক্লুসিভ ডিল, অর্ডার ট্র্যাকিং এবং আরও অনেক কিছু উপভোগ করুন।'
                : 'Create an account to unlock exclusive deals, track your orders, and more.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
