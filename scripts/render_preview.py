import re
import matplotlib.pyplot as plt
from matplotlib.path import Path
import matplotlib.patches as patches

def parse_svg_path(d):
    # Very simple SVG path parser for M, L, C, Z
    tokens = re.findall(r'([A-Za-z]|[-+]?[0-9]*\.?[0-9]+)', d)
    vertices = []
    codes = []
    i = 0
    start_point = (0, 0)
    current_point = (0, 0)
    
    while i < len(tokens):
        cmd = tokens[i]
        if cmd == 'M':
            x, y = float(tokens[i+1]), float(tokens[i+2])
            start_point = (x, y)
            current_point = (x, y)
            vertices.append((x, y))
            codes.append(Path.MOVETO)
            i += 3
        elif cmd == 'L':
            x, y = float(tokens[i+1]), float(tokens[i+2])
            current_point = (x, y)
            vertices.append((x, y))
            codes.append(Path.LINETO)
            i += 3
        elif cmd == 'C':
            x1, y1 = float(tokens[i+1]), float(tokens[i+2])
            x2, y2 = float(tokens[i+3]), float(tokens[i+4])
            x, y = float(tokens[i+5]), float(tokens[i+6])
            vertices.extend([(x1, y1), (x2, y2), (x, y)])
            codes.extend([Path.CURVE4, Path.CURVE4, Path.CURVE4])
            current_point = (x, y)
            i += 7
        elif cmd == 'Z':
            vertices.append(start_point)
            codes.append(Path.CLOSEPOLY)
            i += 1
        else:
            i += 1
            
    return Path(vertices, codes)

def render_wordmark(word, out_png):
    import sys
    sys.path.append('.')
    from scripts.generate_svg import make_wordmark
    import xml.etree.ElementTree as ET
    
    total_w, svg_str = make_wordmark(word)
    root = ET.fromstring(svg_str)
    
    fig, ax = plt.subplots(figsize=(total_w / 60, 2), dpi=150)
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
        # Apply translation
        import matplotlib.transforms as mtransforms
        t = mtransforms.Affine2D().translate(tx, 0) + ax.transData
        patch.set_transform(t)
        ax.add_patch(patch)
        
    ax.set_xlim(-10, total_w + 10)
    ax.set_ylim(110, -10) # invert y for SVG coordinate system
    ax.axis('off')
    plt.tight_layout(pad=0)
    plt.savefig(out_png, facecolor='#0E0E11', edgecolor='none')
    plt.close()
    print(f"Saved {out_png}")

render_wordmark('KEVIX', 'kevix_preview.png')
render_wordmark('KEVIX CLOTHING', 'kevix_clothing_preview.png')
