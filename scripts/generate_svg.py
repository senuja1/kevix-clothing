import os

def get_glyph_paths():
    # Grid: Height = 100, Base stroke thickness = 20
    glyphs = {}

    # K: Width = 76. Vertical stem + chevron arms with stencil cut
    # Stem: 0,0 to 20,0 to 20,100 to 0,100
    # Arms: upper arm from (32, 50) to (76, 0), lower leg from (32, 50) to (76, 100)
    glyphs['K'] = (76, 'M 0,0 L 20,0 L 20,100 L 0,100 Z M 28,50 L 56,0 L 78,0 L 39,58 Z M 36,44 L 78,100 L 54,100 L 26,55 Z')

    # E: Width = 72. Signature 3 floating horizontal bars with diagonal aerodynamic cuts on the left
    # Top bar: (0,0) to (72,0) to (72,21) to (14,21) -> angled cut
    # Middle bar: (0,39.5) to (68,39.5) to (68,60.5) to (0,60.5) -> straight
    # Bottom bar: (14,79) to (72,79) to (72,100) to (0,100) -> angled cut
    glyphs['E'] = (72, 'M 0,0 L 72,0 L 72,21 L 14,21 Z M 0,39.5 L 68,39.5 L 68,60.5 L 0,60.5 Z M 14,79 L 72,79 L 72,100 L 0,100 Z')

    # V: Width = 84. Two bold angled strokes meeting at center bottom
    glyphs['V'] = (84, 'M 0,0 L 22,0 L 42,76 L 62,0 L 84,0 L 53,100 L 31,100 Z')

    # I: Width = 20. Clean vertical pillar
    glyphs['I'] = (20, 'M 0,0 L 20,0 L 20,100 L 0,100 Z')

    # X: Width = 80. Symmetrical crossing diagonals with tactical stencil break
    glyphs['X'] = (80, 'M 0,0 L 21,0 L 80,100 L 59,100 Z M 59,0 L 80,0 L 48,49 L 41,39 Z M 31,59 L 0,100 L 21,100 L 39,70 Z')

    # C: Width = 78. Smooth outer squircle with horizontal flat terminal cuts
    glyphs['C'] = (78, 'M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 78,79 C 45,79 21,66 21,50 C 21,34 45,21 78,21 Z')

    # L: Width = 68. Vertical stem and bold base
    glyphs['L'] = (68, 'M 0,0 L 20,0 L 20,79 L 68,79 L 68,100 L 0,100 Z')

    # O: Width = 82. Symmetrical rounded squircle
    glyphs['O'] = (82, 'M 41,0 C 18,0 0,22 0,50 C 0,78 18,100 41,100 C 64,100 82,78 82,50 C 82,22 64,0 41,0 Z M 41,21 C 53,21 61,34 61,50 C 61,66 53,79 41,79 C 29,79 21,66 21,50 C 21,34 29,21 41,21 Z')

    # T: Width = 76. Top bar with centered vertical column
    glyphs['T'] = (76, 'M 0,0 L 76,0 L 76,21 L 48,21 L 48,100 L 28,100 L 28,21 L 0,21 Z')

    # H: Width = 76. Two vertical pillars with centered horizontal bridge
    glyphs['H'] = (76, 'M 0,0 L 20,0 L 20,39.5 L 56,39.5 L 56,0 L 76,0 L 76,100 L 56,100 L 56,60.5 L 20,60.5 L 20,100 L 0,100 Z')

    # N: Width = 80. Left vertical, bold wide diagonal, right vertical (Carnage geometry)
    glyphs['N'] = (80, 'M 0,0 L 21,0 L 21,26 L 59,90 L 59,0 L 80,0 L 80,100 L 59,100 L 21,37 L 21,100 L 0,100 Z')

    # G: Width = 80. Rounded outer shape like C, inward horizontal bar at y=50, vertical drop
    glyphs['G'] = (80, 'M 78,0 C 35,0 0,22 0,50 C 0,78 35,100 78,100 L 80,100 L 80,48 L 42,48 L 42,69 L 59,69 L 59,79 C 46,79 21,66 21,50 C 21,34 45,21 78,21 Z')

    # Space between words
    glyphs[' '] = (36, '')

    return glyphs

def make_wordmark(word, letter_spacing=13):
    glyphs = get_glyph_paths()
    current_x = 0
    svg_paths = []
    
    for ch in word:
        if ch in glyphs:
            w, path_data = glyphs[ch]
            if path_data:
                svg_paths.append(f'<path d="{path_data}" transform="translate({current_x}, 0)" />')
            current_x += w + letter_spacing

    total_width = current_x - letter_spacing
    svg = f'<svg viewBox="0 0 {total_width} 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n  <g>\n    ' + '\n    '.join(svg_paths) + '\n  </g>\n</svg>'
    return total_width, svg

if __name__ == '__main__':
    w1, s1 = make_wordmark('KEVIX')
    w2, s2 = make_wordmark('KEVIX CLOTHING')
    w3, s3 = make_wordmark('KEVIXCLOTHING', letter_spacing=11)
    
    with open('public/brand/kevix_logo.svg', 'w') as f:
        f.write(s1)
    with open('public/brand/kevix_clothing_wordmark.svg', 'w') as f:
        f.write(s2)
    with open('public/brand/kevixclothing_massive.svg', 'w') as f:
        f.write(s3)
        
    print(f"SVGs updated! KEVIX: {w1}, KEVIX CLOTHING: {w2}, KEVIXCLOTHING: {w3}")
