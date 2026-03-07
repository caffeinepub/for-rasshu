# For Rasshu

## Current State
A 4-section scroll-based website with:
- Section 1: Hero (dark crimson, floating hearts, Women's Day)
- Section 2: Love Letter (peach background, sparkle particles)
- Section 3: Memories (peach, 2x2 polaroid grid)
- Section 4: Countdown (near-black, orb particles, live countdown to March 11)

Navigation is done via scroll with a bouncing arrow button.
Scroll reveal uses IntersectionObserver.
The countdown section content was slightly off-center (shifted right).
The layout is not specifically optimized for mobile phones.

## Requested Changes (Diff)

### Add
- Single-page slide controller: one full-screen slide visible at a time (no scroll between sections)
- "Next" button (bottom-center, touch-friendly, large tap target) to advance to the next slide; on the last slide it wraps back to the first
- Slide transition animation: slides animate in/out (e.g. slide-left/right or fade+scale)
- Animated moving backgrounds on every slide: large gradient blobs drift and shift continuously (CSS keyframe-based, no JS libs), the background itself should feel alive and in motion
- Per-element entrance animations: every piece of text, card, and particle element should animate in with staggered delays when a slide becomes active (not on scroll, but on slide activation)
- Moving particles upgraded: hearts, sparkles, orbs should be more lively with combined translateX sway + translateY float

### Modify
- Remove IntersectionObserver-based scroll reveal (replaced by slide-activation-based reveal)
- Remove ScrollArrow component (replaced by Next button)
- Remove scroll-based navigation (body overflow: hidden, single viewport height)
- CountdownSection: ensure all content is perfectly centered (fix the right-shift bug)
- All section layouts: use 100dvh (dynamic viewport height) for mobile, avoid content overflow, use safe-area-inset padding for notched phones
- Font sizes and spacing tuned for phone screens (max-width ~430px)
- Next button: positioned at the bottom of each slide, centered, styled consistently per-slide theme (dark on light slides, light on dark slides), with a subtle animation pulse

### Remove
- ScrollArrow component
- useScrollReveal hook
- scroll-behavior on html/body (replaced by overflow: hidden)

## Implementation Plan

1. Add new CSS keyframes: `slideInFromRight`, `slideOutToLeft`, `slideInFromLeft`, `slideOutToRight`, `blobDrift1-4` (for moving background blobs), `heartSway` (combined X+Y), and a `nextBtnPulse` animation.
2. Rewrite App.tsx:
   - Add `currentSlide` state (0-3) and `direction` state for enter/exit transitions
   - Add `goNext` handler that increments slide index (with wrap)
   - Render only the active slide, wrapped in a transition container that applies enter/exit animation classes based on direction
   - Each slide component receives an `isActive: boolean` prop that triggers staggered element reveal via CSS class toggling
3. Rewrite each section component to:
   - Accept `isActive` prop
   - Apply `slide-el-hidden` / `slide-el-visible` classes on elements for staggered entrance
   - Use `100dvh` height and `overflow: hidden`
   - Include animated background blobs (absolutely positioned divs with blobDrift animations)
4. CountdownSection: center all content with `items-center justify-center` and remove any margin/padding offsets causing right shift
5. NextButton component: large pill button, centered at bottom, 60px+ tap target, themed per slide
6. Mobile-first: use `px-5`, `max-w-[430px]`, `safe-area` padding, font-size tuned for 390px screens
