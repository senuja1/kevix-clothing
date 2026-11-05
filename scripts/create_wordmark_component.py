import sys
sys.path.append('.')
from scripts.generate_svg import make_wordmark, get_glyph_paths

def export_jsx(word, spacing=13):
    glyphs = get_glyph_paths()
    cur_x = 0
    paths = []
    for ch in word:
        if ch in glyphs:
            w, d = glyphs[ch]
            if d:
                paths.append(f'        <path d="{d}" transform="translate({cur_x}, 0)" />')
            cur_x += w + spacing
    return cur_x - spacing, '\n'.join(paths)

w_short, p_short = export_jsx('KEVIX')
w_full, p_full = export_jsx('KEVIX CLOTHING')
w_cond, p_cond = export_jsx('KEVIXCLOTHING', spacing=11)

jsx_code = f'''import React from 'react';

/**
 * KevixWordmark
 * Custom precision geometric cyber-techwear logotype
 * Matches the reference CARNAGE luxury aesthetic with 3-bar floating 'E',
 * aerodynamic angled stencil cuts, and bold architectural balance.
 */
export function KevixWordmark({{ 
  mode = "full", // "full" (KEVIX CLOTHING), "condensed" (KEVIXCLOTHING), "short" (KEVIX)
  className = "w-auto h-5 sm:h-6",
  fill = "currentColor"
}}) {{
  if (mode === "short") {{
    return (
      <svg 
        viewBox="0 0 {w_short} 100" 
        className={{className}} 
        fill={{fill}} 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KEVIX"
      >
        <g>
{p_short}
        </g>
      </svg>
    );
  }}

  if (mode === "condensed") {{
    return (
      <svg 
        viewBox="0 0 {w_cond} 100" 
        className={{className}} 
        fill={{fill}} 
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KEVIXCLOTHING"
      >
        <g>
{p_cond}
        </g>
      </svg>
    );
  }}

  // Default: full ("KEVIX CLOTHING")
  return (
    <svg 
      viewBox="0 0 {w_full} 100" 
      className={{className}} 
      fill={{fill}} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KEVIX CLOTHING"
    >
      <g>
{p_full}
      </g>
    </svg>
  );
}}
'''

with open('src/components/KevixWordmark.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx_code)

print("Generated src/components/KevixWordmark.jsx successfully!")

