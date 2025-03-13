import os
from bs4 import BeautifulSoup

def add_cursor_effects(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Remove old cursor elements if they exist
    for old_cursor in soup.find_all('div', class_=['cursor', 'cursor-dot', 'cursor-glow']):
        old_cursor.decompose()

    # Add CSS link if not already present
    css_link = soup.find('link', href='css/cursor-effects.css')
    if not css_link and soup.head:
        css_link = soup.new_tag('link')
        css_link['href'] = 'css/cursor-effects.css'
        css_link['rel'] = 'stylesheet'
        soup.head.append(css_link)

    # Add JS script if not already present
    js_script = soup.find('script', src='js/cursor-effects.js')
    if not js_script:
        js_script = soup.new_tag('script')
        js_script['src'] = 'js/cursor-effects.js'
        soup.body.append(js_script)

    # Save the modified file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main():
    # Get all HTML files in current directory and subdirectories
    html_files = []
    for root, dirs, files in os.walk('.'):
        if '.git' in dirs:
            dirs.remove('.git')  # Skip git directory
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    # Add cursor effects to each HTML file
    for html_file in html_files:
        try:
            print(f'Processing {html_file}...')
            add_cursor_effects(html_file)
            print(f'Added cursor effects to {html_file}')
        except Exception as e:
            print(f'Error processing {html_file}: {str(e)}')

if __name__ == '__main__':
    main() 