# Scripts

Folder ini disiapkan untuk utilitas pipeline kamus.

## Rencana Script

- `extract_pages`: ekstrak halaman PDF scan menjadi gambar.
- `run_ocr`: jalankan OCR per halaman.
- `parse_entries`: ubah teks OCR menjadi kandidat entri JSON.
- `validate_entries`: cek field wajib, duplikasi lema, dan metadata sumber.
- `export_dictpress`: transformasi `data/entries.json` ke format impor dictpress.
- `build_static`: buat web statis fallback dari JSON.

## Aturan

- Jangan menimpa PDF asli di `sources/`.
- Simpan output sementara di folder kerja yang eksplisit, misalnya `build/ocr/`.
- Simpan data final bersih sebagai `data/entries.json`.
- Simpan contoh kecil di `data/entries.sample.json`.
- Jalankan OCR hanya saat task eksplisit meminta OCR.
