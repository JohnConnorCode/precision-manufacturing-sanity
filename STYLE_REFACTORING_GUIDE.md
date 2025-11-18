# Style Refactoring Guide

## Safe Migration from Inline Styles to Centralized Theme

This document maps common inline style patterns to their centralized `theme` and `styles` equivalents.

### Import Statement
```typescript
import { theme, styles, cn } from '@/lib/theme';
```

---

## Typography Replacements

### Section Headings
```typescript
// ❌ BEFORE (inline)
<h2 className="text-4xl md:text-5xl font-bold mb-6">

// ✅ AFTER (centralized)
<h2 className={styles.heading.section}>
// OR
<h2 className={theme.typography.sectionHeading}>
```

### Subsection Headings
```typescript
// ❌ BEFORE
<h2 className="text-4xl font-bold mb-4">

// ✅ AFTER
<h2 className={styles.heading.subsection}>
// OR
<h2 className={theme.typography.subsectionTitle}>
```

### Card Titles
```typescript
// ❌ BEFORE
<h3 className="text-2xl font-bold">

// ✅ AFTER
<h3 className={styles.heading.card}>
// OR
<h3 className={theme.typography.cardTitle}>
```

### Card Titles (White Text)
```typescript
// ❌ BEFORE
<h3 className="text-2xl font-bold text-white">

// ✅ AFTER
<h3 className={styles.heading.cardWhite}>
// OR
<h3 className={theme.typography.cardTitleWhite}>
```

---

## Card Replacements

### Simple Card (Just Rounded)
```typescript
// ❌ BEFORE
<div className="rounded-lg">

// ✅ AFTER
<div className={styles.cardPatterns.minimal}>
// OR
<div className={theme.components.card.simple}>
```

### Card with Standard Padding
```typescript
// ❌ BEFORE
<div className="rounded-lg p-6">

// ✅ AFTER
<div className={styles.cardPatterns.standard}>
// OR
<div className={theme.components.card.withPadding}>
```

### Compact Card
```typescript
// ❌ BEFORE
<div className="rounded-lg p-4">

// ✅ AFTER
<div className={styles.cardPatterns.compact}>
// OR
<div className={theme.components.card.compact}>
```

### Feature Card (with hover)
```typescript
// ❌ BEFORE
<Card className="p-6 md:p-8 group">

// ✅ AFTER
<Card className={styles.featureCard}>
// OR
<Card className={styles.cardPatterns.feature}>
```

### Clickable/Hoverable Card
```typescript
// ❌ BEFORE
<Card className="rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">

// ✅ AFTER
<Card className={styles.cardPatterns.clickable}>
```

---

## Padding Replacements

### Standard Card Padding
```typescript
// ❌ BEFORE
<div className="p-6">

// ✅ AFTER
<div className={theme.components.padding.card}>
```

### Large Card Padding
```typescript
// ❌ BEFORE
<div className="p-8">

// ✅ AFTER
<div className={theme.components.padding.cardLarge}>
```

### Compact Padding
```typescript
// ❌ BEFORE
<div className="p-4">

// ✅ AFTER
<div className={theme.components.padding.cardCompact}>
```

### Badge Padding
```typescript
// ❌ BEFORE
<span className="px-3 py-1">

// ✅ AFTER
<span className={theme.components.padding.badge}>
```

### Button Padding
```typescript
// ❌ BEFORE
<button className="px-4 py-2">

// ✅ AFTER
<button className={theme.components.padding.button}>
```

---

## Color Replacements

### Text Colors
```typescript
// ❌ BEFORE
<p className="text-blue-600">

// ✅ AFTER
<p className={styles.textColor.primary}>
// OR
<p className={theme.colors.text.blue}>
```

```typescript
// ❌ BEFORE
<p className="text-blue-600 hover:text-blue-700">

// ✅ AFTER
<p className={styles.textColor.primaryHover}>
// OR
<p className={theme.colors.text.blueHover}>
```

```typescript
// ❌ BEFORE
<p className="text-slate-400">

// ✅ AFTER
<p className={styles.textColor.muted}>
// OR
<p className={theme.colors.text.muted}>
```

### Background Colors
```typescript
// ❌ BEFORE
<div className="bg-slate-900">

// ✅ AFTER
<div className={styles.bgColor.dark}>
// OR
<div className={theme.colors.background.dark}>
```

```typescript
// ❌ BEFORE
<div className="bg-blue-600">

// ✅ AFTER
<div className={styles.bgColor.primary}>
// OR
<div className={theme.colors.background.primary}>
```

```typescript
// ❌ BEFORE
<div className="bg-blue-600 hover:bg-blue-700">

// ✅ AFTER
<div className={styles.bgColor.primaryHover}>
// OR
<div className={theme.colors.background.primaryHover}>
```

---

## Icon Container Replacements

### Small Icon Background
```typescript
// ❌ BEFORE
<div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">

// ✅ AFTER
<div className={styles.iconContainer.small}>
```

### Medium Icon Background (Light)
```typescript
// ❌ BEFORE
<div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">

// ✅ AFTER
<div className={styles.iconContainer.medium}>
```

### Large Icon Background (Gradient)
```typescript
// ❌ BEFORE
<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">

// ✅ AFTER
<div className={styles.iconContainer.large}>
```

---

## Button Replacements

### Primary Button
```typescript
// ❌ BEFORE
<Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-2xl shadow-cyan-600/20 hover:shadow-cyan-600/30 transition-all duration-300">

// ✅ AFTER
<Button className={styles.ctaPrimary}>
// OR
<Button className={theme.components.button.primary}>
```

### Secondary/Outline Button
```typescript
// ❌ BEFORE
<Button className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600">

// ✅ AFTER
<Button className={styles.ctaSecondary}>
// OR
<Button className={theme.components.button.outline}>
```

---

## Section Replacements

### Light Section
```typescript
// ❌ BEFORE
<section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 lg:py-32">

// ✅ AFTER
<section className={styles.sectionLight}>
```

### Dark Section
```typescript
// ❌ BEFORE
<section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24 lg:py-32">

// ✅ AFTER
<section className={styles.sectionDark}>
```

---

## Combining with Additional Classes

Use the `cn()` utility to combine theme styles with custom classes:

```typescript
// ✅ Correct way to extend theme styles
<h2 className={cn(styles.heading.section, "mb-8 text-center")}>

<div className={cn(styles.cardPatterns.feature, "max-w-md mx-auto")}>

<button className={cn(styles.ctaPrimary, "w-full")}>
```

---

## Migration Strategy

1. **Start with high-impact areas**: Headings, cards, buttons
2. **One component at a time**: Test after each change
3. **Use find/replace carefully**: Search for exact patterns
4. **Check visual output**: Always verify in browser
5. **Keep git commits small**: Easy to revert if needed

---

## Quick Reference

| Pattern | Theme Path | Styles Shortcut |
|---------|-----------|-----------------|
| Section heading | `theme.typography.sectionHeading` | `styles.heading.section` |
| Card title | `theme.typography.cardTitle` | `styles.heading.card` |
| Standard card | `theme.components.card.withPadding` | `styles.cardPatterns.standard` |
| Feature card | N/A | `styles.featureCard` |
| Primary button | `theme.components.button.primary` | `styles.ctaPrimary` |
| Text blue | `theme.colors.text.blue` | `styles.textColor.primary` |
| BG dark | `theme.colors.background.dark` | `styles.bgColor.dark` |
| Light section | N/A | `styles.sectionLight` |

---

## Testing Checklist

After refactoring a component:
- [ ] Component renders without errors
- [ ] Visual appearance is identical
- [ ] Responsive breakpoints work correctly
- [ ] Hover states function properly
- [ ] Animations still trigger
- [ ] Text is readable
- [ ] Colors match design system
