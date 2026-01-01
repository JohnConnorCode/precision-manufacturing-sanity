"use client";

import { usePrefersReducedMotion } from '@/lib/motion';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getGradientTextStyle } from '@/lib/theme-utils';
import { typography, spacing, colors } from '@/lib/design-system';
import { portableTextToPlainTextMemoized as portableTextToPlainText } from '@/lib/performance';
import { SafeMotionSpan, SafeMotionP } from '@/components/ui/safe-motion';
import { HEADER_SEQUENCE } from '@/lib/animation-config';

interface SectionHeaderProps {
  /**
   * Optional eyebrow text (small text above heading)
   */
  eyebrow?: string;

  /**
   * First word of heading (regular color)
   */
  word1?: string;

  /**
   * Second word of heading (gradient color)
   */
  word2?: string;

  /**
   * Alternative: Single heading string (will be used if word1/word2 not provided)
   */
  heading?: string;

  /**
   * Which word(s) to apply gradient to when using single heading
   * - 'first': gradient on first word
   * - 'last': gradient on last word
   * - 'last-2': gradient on last 2 words (keeps them together)
   * - 'last-3': gradient on last 3 words (keeps them together)
   * - number: gradient starts at this word index
   * @default 'last'
   */
  gradientWordPosition?: 'first' | 'last' | 'last-2' | 'last-3' | number;

  /**
   * Description text below heading
   */
  description?: string;

  /**
   * Center align the text
   * @default true
   */
  centered?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Maximum width for description text
   * @default 'max-w-3xl'
   */
  descriptionMaxWidth?: string;
}

/**
 * Reusable section header component with consistent sequential animations.
 *
 * Features:
 * - Sequential animation: eyebrow → word1 → word2 → description
 * - Gradient text on second word for visual consistency
 * - Respects reduced motion preferences
 * - Uses theme colors from ThemeContext
 * - Supports both two-word structure and single heading with gradient word
 * - Uses SafeMotion pattern for reliable animations after page refresh
 */
export default function SectionHeader({
  eyebrow,
  word1,
  word2,
  heading,
  gradientWordPosition = 'last',
  description,
  centered = true,
  className = '',
  descriptionMaxWidth = 'max-w-3xl',
}: SectionHeaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const theme = useTheme();

  // Handle single heading string with gradient word
  let displayWord1 = word1;
  let displayWord2 = word2;

  if (!word1 && !word2 && heading) {
    const words = heading.split(' ');
    if (words.length === 1) {
      // Single word - apply gradient to it
      displayWord1 = '';
      displayWord2 = words[0];
    } else if (gradientWordPosition === 'first') {
      displayWord1 = words[0];
      displayWord2 = words.slice(1).join(' ');
    } else if (gradientWordPosition === 'last') {
      displayWord1 = words.slice(0, -1).join(' ');
      displayWord2 = words[words.length - 1];
    } else if (gradientWordPosition === 'last-2' && words.length >= 2) {
      displayWord1 = words.slice(0, -2).join(' ');
      displayWord2 = words.slice(-2).join('\u00A0'); // Non-breaking space keeps words together
    } else if (gradientWordPosition === 'last-3' && words.length >= 3) {
      displayWord1 = words.slice(0, -3).join(' ');
      displayWord2 = words.slice(-3).join('\u00A0'); // Non-breaking space keeps words together
    } else if (typeof gradientWordPosition === 'number') {
      const index = gradientWordPosition;
      displayWord1 = words.slice(0, index).join(' ');
      displayWord2 = words.slice(index).join(' ');
    } else {
      // Default: split in middle
      const mid = Math.floor(words.length / 2);
      displayWord1 = words.slice(0, mid).join(' ');
      displayWord2 = words.slice(mid).join(' ');
    }
  }

  const alignmentClass = centered ? 'text-center' : 'text-left';
  const descriptionAlignClass = centered ? 'mx-auto' : '';

  // If reduced motion, render without animations
  if (prefersReducedMotion) {
    return (
      <div className={`${alignmentClass} ${spacing.headingBottom} ${className}`}>
        {eyebrow && (
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            {eyebrow}
          </p>
        )}
        {(displayWord1 || displayWord2) && (
          <h2 className={`${typography.sectionHeading} mb-6`}>
            {displayWord1 && <span>{displayWord1}</span>}
            {displayWord1 && displayWord2 && ' '}
            {displayWord2 && (
              <span
                className="text-transparent bg-clip-text"
                style={getGradientTextStyle(theme.colors)}
              >
                {displayWord2}
              </span>
            )}
          </h2>
        )}
        {description && (
          <p className={`${typography.descriptionMuted} ${descriptionMaxWidth} ${descriptionAlignClass}`}>
            {portableTextToPlainText(description) || description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${alignmentClass} ${spacing.headingBottom} ${className}`}>
      {/* Eyebrow */}
      {eyebrow && (
        <SafeMotionP
          delay={HEADER_SEQUENCE.eyebrow.delay}
          duration={HEADER_SEQUENCE.eyebrow.duration}
          className={`${typography.eyebrow} ${colors.textMedium} mb-4`}
        >
          {eyebrow}
        </SafeMotionP>
      )}

      {/* Heading with Sequential Word Animation */}
      {(displayWord1 || displayWord2) && (
        <h2 className={`${typography.sectionHeading} mb-6`}>
          {displayWord1 && (
            <>
              <SafeMotionSpan
                delay={HEADER_SEQUENCE.word1.delay}
                duration={HEADER_SEQUENCE.word1.duration}
              >
                {displayWord1}
              </SafeMotionSpan>
              {displayWord2 && ' '}
            </>
          )}
          {displayWord2 && (
            <SafeMotionSpan
              delay={HEADER_SEQUENCE.word2.delay}
              duration={HEADER_SEQUENCE.word2.duration}
              className="text-transparent bg-clip-text"
              style={getGradientTextStyle(theme.colors)}
            >
              {displayWord2}
            </SafeMotionSpan>
          )}
        </h2>
      )}

      {/* Description */}
      {description && (
        <SafeMotionP
          delay={HEADER_SEQUENCE.description.delay}
          duration={HEADER_SEQUENCE.description.duration}
          className={`${typography.descriptionMuted} ${descriptionMaxWidth} ${descriptionAlignClass}`}
        >
          {portableTextToPlainText(description) || description}
        </SafeMotionP>
      )}
    </div>
  );
}
