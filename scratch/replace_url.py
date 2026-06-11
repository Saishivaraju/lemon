import os

old_url = "lemon-mocha.vercel.app"
new_url = "lemon-mocha.vercel.app"
directory = "."

for root, dirs, files in os.walk(directory):
    if "node_modules" in dirs:
        dirs.remove("node_modules")
    if ".git" in dirs:
        dirs.remove(".git")
    
    for file in files:
        if file.endswith(".bak") or file.endswith(".png") or file.endswith(".jpg"):
            continue
            
        filepath = os.path.join(root, file)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_url in content:
                content = content.replace(old_url, new_url)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
        except Exception as e:
            pass
