# OCR Pipeline Kamus Bahasa Paser

Dokumen ini menjelaskan workflow dari PDF scan menuju web kamus. OCR belum dijalankan pada tahap scaffold ini.

## Input

- PDF sumber: `sources/KamusPaser-Indonesia.pdf`
- Output target data: `data/entries.json`
- Output target web: dictpress atau static JSON/HTML

## Workflow

### 1. Simpan sumber asli

PDF scan disimpan di `sources/` sebagai arsip sumber. File ini tidak boleh dihapus, dipindah, atau ditimpa oleh pipeline.

### 2. Ekstrak halaman PDF

Saat OCR dimulai nanti, setiap halaman PDF diekstrak menjadi gambar resolusi tinggi. Output sementara dapat ditempatkan di:

```text
build/ocr/pages/
```

Contoh target nama file:

```text
page-0001.png
page-0002.png
```

### 3. Jalankan OCR

OCR dijalankan per halaman agar hasil mudah dilacak. Output mentah disimpan terpisah:

```text
build/ocr/text/page-0001.txt
build/ocr/text/page-0002.txt
```

Metadata yang perlu disimpan:

- nomor halaman PDF;
- engine OCR;
- bahasa/model OCR;
- confidence bila tersedia;
- timestamp proses.

### 4. Bersihkan teks mentah

Teks OCR perlu dinormalisasi sebelum parsing:

- hapus header/footer halaman;
- gabungkan baris yang terpotong;
- perbaiki karakter yang sering salah terbaca;
- tandai bagian yang ragu untuk review manual.

Output tahap ini dapat berupa:

```text
build/ocr/normalized/page-0001.txt
```

### 5. Parse kandidat entri

Parser mengubah teks normalisasi menjadi kandidat entri:

```text
build/ocr/candidates/entries.candidate.json
```

Setiap kandidat minimal memuat:

- lema/headword;
- terjemahan Bahasa Indonesia;
- nomor halaman sumber;
- confidence/parsing note;
- status `needs_review`.

### 6. Review manual

Reviewer manusia memeriksa kandidat entri:

- koreksi salah OCR;
- pisahkan entri yang tergabung;
- gabungkan entri yang terpecah;
- tambahkan kelas kata bila tersedia;
- pastikan nomor halaman sumber benar.

Hanya entri lolos review yang masuk ke data final.

### 7. Buat `entries.json`

Data final disimpan sebagai:

```text
data/entries.json
```

Format mengikuti contoh di `data/entries.sample.json`.

### 8. Validasi data

Validasi minimal:

- semua `id` unik;
- semua `headword` tidak kosong;
- semua entri punya `source.file` dan `source.page`;
- status review bukan `sample`;
- JSON valid.

### 9. Publish ke web kamus

Ada dua jalur publish.

#### Jalur utama: dictpress

1. Transformasi `data/entries.json` ke format impor dictpress.
2. Import ke database dictpress.
3. Jalankan web app dictpress.
4. Uji pencarian lema dan terjemahan.

#### Jalur fallback: static JSON/HTML

1. Salin `data/entries.json` ke asset web.
2. Buat halaman HTML pencarian.
3. Load JSON di browser.
4. Filter berdasarkan lema, terjemahan, dan definisi.
5. Deploy sebagai web statis.

## Status Saat Ini

- Scaffold proyek: siap.
- PDF sumber: tetap utuh di `sources/`.
- OCR: belum dijalankan.
- Data final: belum dibuat.
- Data sample: tersedia di `data/entries.sample.json`.
