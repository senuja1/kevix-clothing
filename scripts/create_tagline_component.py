import sys
sys.path.append('.')
from scripts.render_tagline import get_all_glyphs

glyphs = get_all_glyphs()
spacing = 11
phrase = 'BE BETTER EVERYDAY'

cur_x = 0
paths = []

for ch in phrase:
    if ch in glyphs:
        w, d = glyphs[ch]
        if d:
            paths.append(f'        <path d="{d}" transform="translate({cur_x}, 0)" />')
        cur_x += w + spacing

total_w = cur_x - spacing

jsx = f'''import React from 'react';

/**
 * BeBetterEverydayWordmark
 * Custom high-fashion geometric logotype for the KevixClothing brand motto:
 * "BE BETTER EVERYDAY"
 * Matches the iconic cyber-techwear style with 3-bar floating 'E',
 * precision squircle curves, and aerodynamic speed cuts.
 */
export function BeBetterEverydayWordmark({{ 
  className = "h-4 sm:h-5 md:h-5.5 w-auto", 
  fill = "currentColor" 
}}) {{
  return (
    <svg 
      viewBox="0 0 {total_w} 100" 
      className={{className}} 
      fill={{fill}} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BE BETTER EVERYDAY"
    >
      <g>
{'\n'.join(paths)}
      </g>
    </svg>
  );
}}
'''

with open('src/components/BeBetterEverydayWordmark.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

print("Generated src/components/BeBetterEverydayWordmark.jsx successfully!")

