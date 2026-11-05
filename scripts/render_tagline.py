import sys
sys.path.append('.')
from scripts.generate_svg import get_glyph_paths

def get_all_glyphs():
    glyphs = get_glyph_paths()
    
    # B: Width = 76
    glyphs['B'] = (76, 'M 0,0 L 48,0 C 66,0 76,10 76,26 C 76,38 68,46 54,48 C 70,50 78,60 78,74 C 78,90 66,100 48,100 L 0,100 Z M 20,20 L 46,20 C 53,20 57,23 57,30 C 57,37 53,40 46,40 L 20,40 Z M 20,59 L 48,59 C 55,59 59,63 59,71 C 59,79 55,81 48,81 L 20,81 Z')
    
    # A: Width = 84 (Carnage geometry)
    glyphs['A'] = (84, 'M 42,0 L 64,0 L 84,100 L 62,100 L 56,72 L 28,72 L 22,100 L 0,100 L 25,0 L 42,0 Z M 32,53 L 52,53 L 42,21 Z')
    
    # R: Width = 78 (Carnage geometry)
    glyphs['R'] = (78, 'M 0,0 L 48,0 C 66,0 76,10 76,28 C 76,43 68,52 52,54 L 78,100 L 54,100 L 32,58 L 20,58 L 20,100 L 0,100 Z M 20,20 L 46,20 C 53,20 57,23 57,31 C 57,39 53,41 46,41 L 20,41 Z')
    
    # D: Width = 78
    glyphs['D'] = (78, 'M 0,0 L 46,0 C 68,0 78,20 78,50 C 78,80 68,100 46,100 L 0,100 Z M 20,21 L 44,21 C 58,21 60,33 60,50 C 60,67 58,79 44,79 L 20,79 Z')
    
    # Y: Width = 82
    glyphs['Y'] = (82, 'M 0,0 L 22,0 L 41,52 L 41,100 L 61,100 L 61,52 L 82,0 L 60,0 L 51,32 L 31,0 Z')
    
    return glyphs

def make_phrase_svg(phrase, spacing=11):
    glyphs = get_all_glyphs()
    cur_x = 0
    paths = []
    
    for ch in phrase:
        if ch in glyphs:
            w, d = glyphs[ch]
            if d:
                paths.append(f'<path d="{d}" transform="translate({cur_x}, 0)" />')
            cur_x += w + spacing
            
    total_w = cur_x - spacing
    svg = f'<svg viewBox="0 0 {total_w} 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n  <g>\n    ' + '\n    '.join(paths) + '\n  </g>\n</svg>'
    return total_w, svg

total_w, svg_str = make_phrase_svg('BE BETTER EVERYDAY')
with open('public/brand/be_better_everyday.svg', 'w') as f:
    f.write(svg_str)

print(f"Generated BE BETTER EVERYDAY SVG, width: {total_w}")

# Render PNG preview
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.transforms as mtransforms
import xml.etree.ElementTree as ET
from scripts.render_preview import parse_svg_path

root = ET.fromstring(svg_str)
fig, ax = plt.subplots(figsize=(total_w / 70, 1.8), dpi=150)
ax.set_facecolor('#0E0E11')
fig.patch.set_facecolor('#0E0E11')

for p in root.findall('.//{http://www.w3.org/2000/svg}path'):
    d = p.get('d')
    trans = p.get('transform')
    tx = 0
    if trans and 'translate(' in trans:
        tx = float(trans.split('translate(')[1].split(',')[0])
        
    mpl_path = parse_svg_path(d)
    patch = patches.PathPatch(mpl_path, facecolor='white', edgecolor='none')
    t = mtransforms.Affine2D().translate(tx, 0) + ax.transData
    patch.set_transform(t)
    ax.add_patch(patch)
    
ax.set_xlim(-15, total_w + 15)
ax.set_ylim(110, -10)
ax.axis('off')
plt.tight_layout(pad=0)
plt.savefig('be_better_everyday_preview.png', facecolor='#0E0E11', edgecolor='none')
plt.close()
print("Saved be_better_everyday_preview.png")

