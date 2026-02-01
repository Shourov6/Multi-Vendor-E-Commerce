import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn, formatNumber, formatCurrency } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'number' | 'currency' | 'percentage';
  icon: React.ElementType;
  description?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({
  title,
  value,
  previousValue,
  format = 'number',
  icon: Icon,
  description,
  className,
  trend,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Calculate trend if not provided
  const calculatedTrend = trend || (previousValue !== undefined
    ? value > previousValue
      ? 'up'
      : value < previousValue
      ? 'down'
      : 'neutral'
    : 'neutral');

  const trendPercentage = previousValue
    ? ((value - previousValue) / previousValue) * 100
    : 0;



  // Animate count up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1500;
            const startTime = performance.now();
            const startValue = 0;

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = startValue + (value - startValue) * easeOut;
              
              setDisplayValue(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const displayFormattedValue = format === 'currency'
    ? formatCurrency(displayValue)
    : format === 'percentage'
    ? `${Math.round(displayValue)}%`
    : formatNumber(Math.round(displayValue));

  return (
    <Card ref={cardRef} className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {displayFormattedValue}
            </p>
            
            {/* Trend */}
            {previousValue !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {calculatedTrend === 'up' && (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">
                      +{Math.abs(trendPercentage).toFixed(1)}%
                    </span>
                  </>
                )}
                {calculatedTrend === 'down' && (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">
                      -{Math.abs(trendPercentage).toFixed(1)}%
                    </span>
                  </>
                )}
                {calculatedTrend === 'neutral' && (
                  <>
                    <Minus className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">0%</span>
                  </>
                )}
                <span className="text-sm text-gray-400 ml-1">vs last period</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-gray-400 mt-2">{description}</p>
            )}
          </div>

          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            calculatedTrend === 'up' && 'bg-green-50',
            calculatedTrend === 'down' && 'bg-red-50',
            calculatedTrend === 'neutral' && 'bg-purple-50'
          )}>
            <Icon className={cn(
              'w-6 h-6',
              calculatedTrend === 'up' && 'text-green-500',
              calculatedTrend === 'down' && 'text-red-500',
              calculatedTrend === 'neutral' && 'text-purple-500'
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
