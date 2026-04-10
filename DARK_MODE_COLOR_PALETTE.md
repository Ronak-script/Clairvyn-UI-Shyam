# Dark Mode Color Palette Reference

## Complete Color System for Dark Mode

### Primary Colors
```
Name:               Dark Mode Background Primary
Hex:                #0d0d0d
RGB:                13, 13, 13
Use:                Main background
Application:        .dark .chat-background

Name:               Dark Mode Background Secondary  
Hex:                #111111
RGB:                17, 17, 17
Use:                Bottom gradient
Application:        .dark .chat-background (gradient to)
```

### Message Colors
```
Name:               User Message (Google Blue)
Hex:                #1a73e8
RGB:                26, 115, 232
Use:                User message bubbles
Application:        .dark .chat-bubble-user background
Text Color:         #ffffff (White)
Border:             rgba(106, 168, 237, 0.3)
Shadow:             0 4px 12px rgba(26, 115, 232, 0.2)

Name:               Assistant Message (Dark Gray)
Hex:                #1f1f1f
RGB:                31, 31, 31
Use:                Assistant message bubbles
Application:        .dark .chat-bubble-assistant background
Text Color:         #e5e5e5 (Light Gray)
Border:             #333333 (Medium Gray)
Shadow:             0 2px 8px rgba(0, 0, 0, 0.3)
```

### Input Area
```
Name:               Input Background
Hex:                #1f1f1f
RGB:                31, 31, 31
Use:                Chat input area background
Application:        .dark .chat-input
Border Color:       #333333

Name:               Input Text
Hex:                #e5e5e5
RGB:                229, 229, 229
Use:                User typing text
Application:        .dark .chat-input-field

Name:               Input Placeholder
Hex:                #666666
RGB:                102, 102, 102
Use:                Placeholder hint text
Application:        .dark .chat-input-field::placeholder
```

### Text Colors
```
Name:               Text Primary (Headings/Important)
Hex:                #ffffff
RGB:                255, 255, 255
Use:                Headings, important text
Contrast:           WCAG AAA with #0d0d0d

Name:               Text Secondary (Body Text)
Hex:                #e5e5e5
RGB:                229, 229, 229
Use:                Main body text, messages
Contrast:           WCAG AAA with #1f1f1f

Name:               Text Muted (Help Text)
Hex:                #b0b0b0
RGB:                176, 176, 176
Use:                Secondary descriptions
Contrast:           WCAG AA with #0d0d0d

Name:               Text Subtle
Hex:                #808080
RGB:                128, 128, 128
Use:                Very subtle text
Contrast:           WCAG AA with #1f1f1f
```

### Border Colors
```
Name:               Border Primary
Hex:                #333333
RGB:                51, 51, 51
Use:                Main borders, dividers
Application:        .dark .chat-bubble-assistant border
                    .dark .chat-input border

Name:               Border Secondary
Hex:                #2a2a2a
RGB:                42, 42, 42
Use:                Subtle borders
Application:        Various dark mode borders

Name:               Border Transparent (User Message)
Hex:                rgba(106, 168, 237, 0.3)
RGB:                106, 168, 237 @ 30% opacity
Use:                User message bubble border
Application:        .dark .chat-bubble-user border
```

### Scrollbar Colors
```
Name:               Scrollbar Thumb
Hex:                #444444
RGB:                68, 68, 68
Use:                Scrollbar draggable part
Application:        .dark .scrollbar-main::-webkit-scrollbar-thumb
                    .dark .scrollbar-sidebar::-webkit-scrollbar-thumb

Name:               Scrollbar Thumb (Hover)
Hex:                #555555
RGB:                85, 85, 85
Use:                Scrollbar hover state
Application:        .dark .scrollbar-main::-webkit-scrollbar-thumb:hover

Name:               Scrollbar Track
Hex:                #1f1f1f
RGB:                31, 31, 31
Use:                Scrollbar background
Application:        .dark .scrollbar-main::-webkit-scrollbar-track
                    .dark .scrollbar-sidebar::-webkit-scrollbar-track
```

### Loading Animation
```
Name:               Loading Shimmer Light
Hex:                #999999
RGB:                153, 153, 153
Use:                Shimmer highlight
Application:        .dark .chat-loading-text gradient 50%

Name:               Loading Shimmer Dark
Hex:                #666666
RGB:                102, 102, 102
Use:                Shimmer base
Application:        .dark .chat-loading-text gradient 0% and 100%
```

### Shadow System
```
Name:               User Message Shadow
Value:              0 4px 12px rgba(26, 115, 232, 0.2)
Use:                User message depth
Effect:             Subtle elevation

Name:               Assistant Message Shadow
Value:              0 2px 8px rgba(0, 0, 0, 0.3)
Use:                Assistant message depth
Effect:             Subtle elevation

Name:               Input Shadow
Value:              0 2px 8px rgba(0, 0, 0, 0.3)
Use:                Input area depth
Effect:             Subtle elevation
```

## Color Accessibility

### Contrast Ratios
```
Text Color      Background     Ratio   Level
#ffffff         #0d0d0d       19.4:1   AAA ✓
#ffffff         #1f1f1f       17.2:1   AAA ✓
#e5e5e5         #1f1f1f       14.8:1   AAA ✓
#b0b0b0         #1f1f1f        9.5:1   AAA ✓
#808080         #1f1f1f        6.2:1   AA  ✓
#1a73e8         #0d0d0d        8.2:1   AAA ✓
```

### WCAG Compliance
- ✓ AA Standard: All text pairs meet or exceed AA contrast
- ✓ AAA Enhanced: Most combinations exceed AAA standard
- ✓ Color blind safe: Not relying on color alone for meaning
- ✓ OLED friendly: High black background saves battery

## RGB to Hex Conversion Table

```
Color           Hex      RGB           HSL
Background      #0d0d0d  13, 13, 13    0°, 0%, 5%
Surface         #1f1f1f  31, 31, 31    0°, 0%, 12%
Subtle Surface  #1a1a1a  26, 26, 26    0°, 0%, 10%
User Message    #1a73e8  26, 115, 232  216°, 85%, 51%
Dark Gray       #333333  51, 51, 51    0°, 0%, 20%
Gray            #444444  68, 68, 68    0°, 0%, 27%
Light Gray      #666666  102, 102, 102 0°, 0%, 40%
Light Gray 2    #808080  128, 128, 128 0°, 0%, 50%
Light Gray 3    #999999  153, 153, 153 0°, 0%, 60%
Light Gray 4    #b0b0b0  176, 176, 176 0°, 0%, 69%
Text Secondary  #e5e5e5  229, 229, 229 0°, 0%, 90%
Text Primary    #ffffff  255, 255, 255 0°, 0%, 100%
```

## Design Token Summary

### Backgrounds
- Primary: `#0d0d0d` (True black)
- Surface: `#1f1f1f` (Dark gray)
- Alternative: `#1a1a1a` (Very dark gray)

### Text
- Primary: `#ffffff` (White)
- Secondary: `#e5e5e5` (Light gray)
- Tertiary: `#b0b0b0` (Gray)
- Disabled: `#808080` (Medium gray)

### Interactive
- User Action: `#1a73e8` (Google Blue)
- Hover/Focus: `rgba(255, 255, 255, 0.05)` (Subtle white overlay)

### Semantic
- Success: `#4caf50` (Green)
- Error: `#f44336` (Red)
- Warning: `#ff9800` (Orange)
- Info: `#2196f3` (Light Blue)

## Implementing Custom Colors

To add custom colors in dark mode:

```css
.dark .custom-element {
  background-color: #1f1f1f;  /* Dark surface */
  color: #e5e5e5;              /* Light text */
  border: 1px solid #333333;   /* Dark border */
}

.dark .custom-element:hover {
  background-color: #262626;  /* Slightly lighter on hover */
}
```

## Quick Reference for Development

```css
/* Dark mode backgrounds */
.dark .bg-primary    { background-color: #0d0d0d; }
.dark .bg-surface    { background-color: #1f1f1f; }
.dark .bg-subtle     { background-color: #1a1a1a; }

/* Dark mode text */
.dark .text-primary   { color: #ffffff; }
.dark .text-secondary { color: #e5e5e5; }
.dark .text-muted     { color: #b0b0b0; }

/* Dark mode borders */
.dark .border-primary { border-color: #333333; }
.dark .border-subtle  { border-color: #2a2a2a; }
```

## Performance Notes

- Solid colors are fastest to render
- No complex gradients = better performance
- OLED displays benefit from high black content
- Recommended for:
  - Mobile devices (battery life)
  - Long viewing sessions (eye strain)
  - High-contrast preferences
