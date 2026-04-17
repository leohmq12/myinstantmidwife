import os
import re

directory = r'd:\codes\myinstantmidwife'
for root, dirs, files in os.walk(directory):
    for filename in files:
        if filename.endswith('.html'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            correct_href = 'subscription.html' if 'pages' in root else 'pages/subscription.html'
            lines = content.split('\n')
            updated = False
            for i, line in enumerate(lines):
                if ('class="btn-outline"' in line or 'class="faq-subscription-btn"' in line) and 'subscription' in line.lower() and '<a ' in line:
                    new_line = re.sub(r'href="[^"]*"', f'href="{correct_href}"', line)
                    if new_line != line:
                        lines[i] = new_line
                        updated = True
            
            if updated:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write('\n'.join(lines))
                print(f'Updated {filepath}')
