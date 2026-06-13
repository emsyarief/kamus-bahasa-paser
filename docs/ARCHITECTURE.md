# Arsitektur Kamus Bahasa Paser

## Tujuan

Proyek ini menyiapkan kamus web Bahasa Paser berbasis data terstruktur. Sumber awal berasal dari PDF scan kamus yang disimpan di `sources/`, lalu diproses menjadi data entri kamus yang dapat dicari lewat web.

## Strategi Implementasi

### Opsi utama: dictpress

Kandidat utama adalah [`dictpress`](https://github.com/knadh/dictpress), aplikasi web dictionary berbasis Go + SQLite yang cocok untuk kamus digital dengan pencarian cepat.

Rencana integrasi:

1. Ekspor data bersih ke format terstruktur dari `data/entries.json`.
2. Transformasi data ke format impor yang dibutuhkan `dictpress`.
3. Jalankan aplikasi dictpress sebagai web kamus.
4. Simpan skrip transformasi di `scripts/`.

Catatan: cloning/build `dictpress` belum dilakukan pada scaffold awal ini agar proyek tetap ringan.

### Fallback: static JSON/HTML

Jika build `dictpress` terlalu berat atau tidak cocok, gunakan web statis:

- `data/entries.json` sebagai sumber data utama.
- HTML/CSS/JavaScript statis untuk pencarian lokal.
- Bisa di-host di GitHub Pages, Netlify, Cloudflare Pages, atau server statis biasa.

## Struktur Awal

```text
.
├── data/
│   └── entries.sample.json
├── docs/
│   └── ARCHITECTURE.md
├── scripts/
│   └── README.md
├── sources/
│   └── KamusPaser-Indonesia.pdf
└── OCR_PIPELINE.md
```

## Model Data

Data utama nantinya berada di `data/entries.json`. Contoh format tersedia di `data/entries.sample.json`.

Field inti:

- `id`: ID stabil untuk entri.
- `headword`: lema/kata utama Bahasa Paser.
- `language`: kode bahasa sumber, default `paser`.
- `translations`: daftar padanan dalam bahasa target.
- `definitions`: definisi atau keterangan makna.
- `examples`: contoh pemakaian bila tersedia.
- `source`: metadata asal halaman/baris dari PDF.
- `review`: status validasi manusia.

## Alur Data

```text
PDF scan
  -> ekstraksi halaman gambar
  -> OCR
  -> teks mentah
  -> parsing kandidat entri
  -> review manual
  -> data/entries.json
  -> dictpress atau web statis
```

## Prinsip Data

- PDF asli tidak dihapus atau ditimpa.
- Hasil OCR mentah disimpan terpisah dari data bersih.
- Setiap entri final harus bisa dilacak ke halaman PDF.
- Koreksi manual dicatat melalui status review.
- Data sample bukan data final.
