# Kamus Bahasa Paser

Kamus Bahasa Paser adalah proyek open source untuk mendokumentasikan, menyusun, dan melestarikan kosakata Bahasa Paser dalam bentuk kamus digital ringan.

Live site: https://kamuspaser.emsyarief.my.id/

## Tujuan

- Membantu masyarakat, pelajar, peneliti, dan siapa pun yang ingin mempelajari Bahasa Paser.
- Menyediakan data kamus yang mudah dicari, dikoreksi, dan dikembangkan bersama.
- Menjaga keberlangsungan bahasa daerah sebagai bagian dari kekayaan budaya Indonesia.

## Status data

Data berasal dari kamus cetak Komunitas Adat Paser yang dipindai, di-OCR, lalu disusun ulang menjadi data terstruktur.

Catatan penting:

- Entri masih dalam proses review bertahap.
- Koreksi ejaan, arti, contoh, sublema, dan varian sangat diterima.
- PDF sumber asli tidak disertakan di repo ini.

## Kontribusi

Kontribusi bisa berupa:

- koreksi satu kata/lema,
- perbaikan arti Bahasa Indonesia,
- koreksi contoh kalimat,
- perbaikan UI/aksesibilitas,
- perbaikan parser/data.

Cara umum:

1. Fork repo ini.
2. Buat branch baru.
3. Edit data/kode.
4. Jalankan validasi:

```bash
npm install
npm test
npm run build
```

5. Kirim pull request.

## Development

```bash
npm install
npm run dev
```

Data utama ada di:

- `data/entries.json`
- `public/data/entries.json`

## Lisensi

- Kode: MIT License.
- Data kamus hasil penyusunan ulang: CC BY-SA 4.0.
- PDF/kamus cetak sumber tetap milik pemegang hak aslinya.
