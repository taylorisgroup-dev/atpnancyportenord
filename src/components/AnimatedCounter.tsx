import { useState, useEffect, useRef, useCallback } from 'react';

interface AnimatedCounterProps {
  value: string;
  label: string;
  color?: string;
  prefix?: string;
  suffix?: string;
}

function parseNumericValue(raw: string): number {
  // Remove spaces, + signs, and non-numeric chars (except digits)
  const cleaned = raw.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

function formatNumber(n: number): string {
  // Format with space thousands separator (French style)
  return n.toLocaleString('fr-FR');
}

export const AnimatedCounter = ({
  value,
  label,
  color = 'var(--atp-blue)',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) => {
  const target = parseNumericValue(value);
  // Detect trailing '+' or other suffix in the raw value
  const trailingSuffix = value.trim().endsWith('+') ? '+' : '';
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [hasAnimated, target]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animate, hasAnimated]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '20px 16px',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          color,
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        {prefix}
        {formatNumber(displayValue)}
        {trailingSuffix}
        {suffix}
      </div>
      <div
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
    </div>
  );
};
