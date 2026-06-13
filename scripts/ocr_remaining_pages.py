from pathlib import Path
import fitz
from PIL import Image
import pytesseract

PDF = Path('sources/KamusPaser-Indonesia.pdf')
OUT = Path('data/raw_ocr')
OUT.mkdir(parents=True, exist_ok=True)
START = 28
END = 337
DPI_SCALE = 2

doc = fitz.open(PDF)
for page_num in range(START, END + 1):
    out = OUT / f'page-{page_num:03d}.txt'
    if out.exists() and out.stat().st_size > 50:
        print(f'skip page {page_num}: {out.stat().st_size} bytes', flush=True)
        continue
    page = doc[page_num - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(DPI_SCALE, DPI_SCALE), alpha=False)
    img = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    text = pytesseract.image_to_string(img, lang='eng')
    out.write_text(text, encoding='utf-8')
    head = ' '.join(text.split())[:80]
    print(f'ocr page {page_num}: {len(text)} chars | {head}', flush=True)
print('done', flush=True)
