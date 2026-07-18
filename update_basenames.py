import os
import re

public_dir = r'C:\Users\khalifa\Desktop\Collection\Collection\public'
count = 0
for root, dirs, files in os.walk(public_dir):
    for f in files:
        if f.endswith('.js'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Find basename: t = "/Collection/.../"
            pattern = r'basename:\s*([a-zA-Z0-9_$]+)\s*=\s*\"/Collection/([^\"]+)/\"'
            if re.search(pattern, content):
                def replace_func(match):
                    var_name = match.group(1)
                    folder_name = match.group(2)
                    offset = len(folder_name) + 1 # e.g. /new_prem3 is 10 chars, len('new_prem3')=9. wait, index is of /, so +1 for /, +len for folder name = +10. offset = len + 1. Yes, '/new_prem3'.length is 10.
                    return f'basename: {var_name} = window.location.pathname.substring(0, window.location.pathname.indexOf(\'/{folder_name}\') + {len(folder_name) + 1})'
                
                new_content = re.sub(pattern, replace_func, content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f'Updated {filepath}')
                    count += 1

print(f'Total files updated: {count}')
