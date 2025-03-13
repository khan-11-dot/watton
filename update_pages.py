import os
import re

def get_relative_path(from_path, to_root):
    """Calculate relative path from a file to the root directory"""
    rel_path = os.path.relpath(to_root, os.path.dirname(from_path))
    if not rel_path.startswith('.'):
        rel_path = './' + rel_path
    return rel_path.replace('\\', '/') + '/'

def update_file_with_navigation(file_path, root_dir):
    """Update a single file with the navigation template"""
    # Read the navigation template
    with open(os.path.join(root_dir, 'templates', 'navigation.html'), 'r', encoding='utf-8') as f:
        nav_template = f.read()
    
    # Calculate relative path to root
    rel_path = get_relative_path(file_path, root_dir)
    
    # Replace [ROOT] placeholder with relative path
    nav_content = nav_template.replace('[ROOT]', rel_path)
    
    # Read the current file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove any duplicate navigation sections
    content = re.sub(r'<!-- Navigation -->.*?</nav>\s*<!-- Warehouses List -->.*?</div>\s*<!-- Purchase Centers List -->.*?</div>', '', content, flags=re.DOTALL)
    
    # Add required CSS if not present
    css_styles = """
        .location-list {
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: var(--dark-bg);
            border-bottom: 1px solid var(--neon-green);
            padding: 20px 0;
            z-index: 1000;
        }

        .location-list h2 {
            color: var(--neon-green);
            margin-bottom: 20px;
            text-shadow: 0 0 10px var(--neon-green);
        }

        .list-group-item {
            background: transparent;
            border: 1px solid var(--neon-green);
            color: var(--neon-green);
            margin-bottom: 10px;
            transition: all 0.3s ease;
        }

        .list-group-item:hover {
            background: var(--neon-green);
            color: var(--dark-bg);
            transform: translateX(10px);
            text-decoration: none;
        }
    """
    
    # Add CSS if not present
    if '</style>' in content and '.location-list' not in content:
        content = content.replace('</style>', css_styles + '\n    </style>')
    
    # Replace navigation section if it exists, or add it after <body>
    if '<!-- Navigation -->' in content:
        content = re.sub(
            r'<!-- Navigation -->.*?</nav>',
            nav_content,
            content,
            flags=re.DOTALL
        )
    else:
        content = content.replace('<body>', '<body>\n    ' + nav_content)
    
    # Add JavaScript for toggle functionality if not present
    toggle_script = """
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Close lists when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.location-list') && !event.target.closest('.nav-link')) {
                    document.querySelectorAll('.location-list').forEach(list => {
                        list.style.display = 'none';
                    });
                }
            });
        });
    </script>
    """
    
    if 'document.addEventListener(\'click\'' not in content:
        content = content.replace('</body>', toggle_script + '\n</body>')
    
    # Write the updated content back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Get all HTML files
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html') and file != 'navigation.html':
                file_path = os.path.join(root, file)
                print(f"Updating {file_path}")
                update_file_with_navigation(file_path, root_dir)

if __name__ == '__main__':
    main()
