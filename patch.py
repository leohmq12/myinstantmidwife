import glob
import re
files = glob.glob('pages/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = re.sub(r'href="css/', 'href="../css/', content)
    content = re.sub(r'src="images/', 'src="../images/', content)
    content = re.sub(r'src="js/', 'src="../js/', content)
    content = re.sub(r'href="index\.html"', 'href="../index.html"', content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print("done")
