# Dark Mode Implementation Guide

## Overview

The chatbot dark mode has been redesigned with an elegant aesthetic featuring clean styling. This guide explains the implementation and how to maintain/extend it.

## Quick Start

### Current State
- Dark mode is **only available on `/chatbot` route**
- Toggled via settings button in sidebar
- Preference saved to localStorage
- All styling in `app/globals.css`

### To Enable Dark Mode
1. Navigate to `/chatbot`
2. Click the settings button (gear icon)
3. Toggle "Dark mode" switch
4. Changes apply immediately

## CSS Structure

All dark mode styles use the `.dark` prefix in `app/globals.css`:

```css
.dark .chat-background { /* ... */ }
.dark .chat-bubble-user { /* ... */ }
.dark .chat-bubble-assistant { /* ... */ }
.dark .chat-input { /* ... */ }
.dark .scrollbar-main { /* ... */ }
.dark .scrollbar-sidebar { /* ... */ }
```

### Key CSS Classes

#### Backgrounds
```css
.dark .chat-background
  └─ Main chat area background
  └─ Color: #0d0d0d → #111111 gradient

.dark .chat-bubble-user
  └─ User message containers
  └─ Color: #1a73e8 (Google Blue)

.dark .chat-bubble-assistant
  └─ Assistant message containers
  └─ Color: #1f1f1f (Dark Gray)

.dark .chat-input
  └─ Chat input area
  └─ Color: #1f1f1f (Dark Gray)
```

#### Text Colors
```css
.dark h1, .dark h2, .dark h3 { color: #ffffff; }
.dark p, .dark span { color: #e5e5e5; }
.dark .text-gray-600 { color: #b0b0b0 !important; }
.dark .text-gray-500 { color: #999999 !important; }
```

#### Scrollbars
```css
.dark .scrollbar-main { /* main chat area scrollbar */ }
.dark .scrollbar-sidebar { /* sidebar scrollbar */ }
```

## Color Reference

### Core Palette
```
Background Primary:     #0d0d0d
Background Secondary:   #111111
Background Tertiary:    #1f1f1f

User Message:           #1a73e8 (Google Blue)
Assistant Message:      #1f1f1f (Dark Gray)

Text Primary:           #ffffff
Text Secondary:         #e5e5e5
Text Tertiary:          #b0b0b0
Text Muted:             #808080

Borders:                #333333
Scrollbar Thumb:        #444444
Scrollbar Track:        #1f1f1f
```

## Adding New Dark Mode Styles

When adding new elements to dark mode:

### Method 1: Using `.dark` Prefix
```css
.dark .new-element {
  background-color: #1f1f1f;
  color: #e5e5e5;
  border: 1px solid #333333;
}

.dark .new-element:hover {
  background-color: #262626;
}
```

### Method 2: Using Tailwind Dark Mode
In JSX/TSX:
```jsx
<div className="bg-white dark:bg-gray-900">
  Light mode: white, Dark mode: gray-900
</div>
```

Note: Make sure to use the standardized dark colors, not arbitrary ones.

## Styling Guidelines

### Color Selection
1. Use only approved palette colors
2. Don't create arbitrary dark mode colors
3. Ensure WCAG AA contrast minimum
4. Test with color blind simulator

### Shadows
Keep shadows subtle:
```css
/* Good */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

/* Avoid - Too heavy */
box-shadow: 0 20px 62px rgba(0, 0, 0, 0.8);
```

### Borders
Use approved border colors:
```css
/* Primary border */
border-color: #333333;

/* Subtle border */
border-color: #2a2a2a;

/* Avoid arbitrary colors */
border-color: #404040; /* Too specific */
```

### Text
Match text to approved palette:
```css
/* Primary text */
color: #ffffff;

/* Secondary text */
color: #e5e5e5;

/* Muted text */
color: #b0b0b0;

/* Don't use */
color: #f0f0f0; /* Too bright */
```

## Maintaining Dark Mode

### When to Update
1. Adding new chat features
2. Adding new sidebar elements
3. Adding new buttons/controls
4. Adding new message types

### Steps to Update
1. Find the element in JSX
2. Add dark mode class:
   ```jsx
   className="bg-white dark:bg-gray-900 /* → */ dark:[new-color]"
   ```
3. Or add CSS rule in `app/globals.css`:
   ```css
   .dark .new-element { /* styles */ }
   ```
4. Test in dark mode
5. Check contrast with color contrast checker

## Testing Dark Mode

### Manual Testing Checklist
- [ ] Dark mode toggle works
- [ ] All text is readable
- [ ] All buttons are visible
- [ ] Hover states work
- [ ] Input field is clearly visible
- [ ] Messages display correctly
- [ ] Scrollbars are subtle
- [ ] No color bleeding from light mode
- [ ] Mobile dark mode works
- [ ] Sidebar looks good in dark mode

### Color Contrast Testing
Use: https://webaim.org/resources/contrastchecker/

Required ratios:
- Text: 4.5:1 (AA) or 7:1 (AAA)
- Large text: 3:1 (AA) or 4.5:1 (AAA)

### Performance Testing
1. Open DevTools
2. Go to Performance tab
3. Record scroll in dark mode
4. Check for GPU-accelerated rendering
5. Should see minimal paint operations

## Troubleshooting

### Dark Mode Not Applying
**Problem:** Styles not showing in dark mode
**Solution:**
1. Check if on `/chatbot` route
2. Verify `.dark` prefix is used
3. Check localStorage: `localStorage.getItem("chatbot-dark-mode")`
4. Clear browser cache and reload

### Text Not Readable
**Problem:** Text color conflicts with background
**Solution:**
1. Use approved palette colors
2. Check contrast ratio (min 4.5:1)
3. Verify `!important` isn't needed (shouldn't be)
4. Test in actual dark mode, not just browser preview

### Styles Not Overriding Tailwind
**Problem:** Tailwind dark: styles taking precedence
**Solution:**
1. Use CSS specificity:
   ```css
   .dark .element { /* More specific */ }
   ```
2. Or use `!important` (last resort):
   ```css
   .dark .element { color: #e5e5e5 !important; }
   ```

### Scrollbar Styling Not Working
**Problem:** Scrollbar doesn't show custom colors
**Solution:**
1. Only works on desktop (mobile uses OS scrollbars)
2. Requires `-webkit-` prefix for Chrome/Safari
3. Use `scrollbar-color` for Firefox
4. Check that container has `overflow: auto` or `overflow-y: auto`

## Performance Optimization

### Best Practices
1. **Avoid complex gradients**
   ```css
   /* Good */
   background: linear-gradient(180deg, #0d0d0d 0%, #111111 100%);
   
   /* Avoid */
   background: radial-gradient(...), linear-gradient(...), ...;
   ```

2. **Minimize shadows**
   ```css
   /* Good */
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
   
   /* Avoid */
   box-shadow: 0 20px 62px rgba(0, 0, 0, 0.8);
   ```

3. **No backdrop filters**
   ```css
   /* Avoid on dark mode */
   backdrop-filter: blur(10px);
   ```

4. **Use solid colors**
   ```css
   /* Good */
   background-color: #1f1f1f;
   
   /* Avoid gradients when not needed */
   background: linear-gradient(45deg, #1f1f1f, #262626);
   ```

## File Locations

### CSS
- `app/globals.css` - All dark mode styles (lines 720-890+)

### Context/Logic
- `contexts/ThemeContext.tsx` - Dark mode toggle logic
- `lib/documentTheme.ts` - Dark mode initialization

### Documentation
- `DARK_MODE_REDESIGN.md` - Design rationale
- `DARK_MODE_COLOR_PALETTE.md` - Color reference
- `DARK_MODE_VISUAL_SUMMARY.md` - Visual comparison
- `DARK_MODE_IMPLEMENTATION_GUIDE.md` - This file

## Common Tasks

### Add a New Element to Dark Mode
```css
/* In app/globals.css */
.dark .new-feature {
  background-color: #1f1f1f;
  color: #e5e5e5;
  border: 1px solid #333333;
}

.dark .new-feature:hover {
  background-color: #262626;
}

.dark .new-feature:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Create a New Button Style
```css
.dark .btn-custom {
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.2s ease;
}

.dark .btn-custom:hover {
  background-color: #1557b0;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
}

.dark .btn-custom:active {
  transform: scale(0.98);
}
```

### Update Message Styling
```css
.dark .message-important {
  background-color: #1f1f1f;
  border-left: 3px solid #1a73e8;
  padding: 12px;
  color: #e5e5e5;
}
```

## Related Files

- `app/chatbot/page.tsx` - Main chatbot component
- `tailwind.config.ts` - Tailwind configuration
- `package.json` - Dependencies

## Support

For questions about dark mode implementation:
1. Check `DARK_MODE_COLOR_PALETTE.md` for colors
2. Check `DARK_MODE_REDESIGN.md` for design rationale
3. Review existing examples in `app/globals.css`
4. Test changes in actual dark mode browser

---

**Last Updated:** April 6, 2026
**Status:** ✅ Complete and stable
**Maintainer:** Development Team
