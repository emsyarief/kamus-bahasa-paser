#!/usr/bin/env bash
set -euo pipefail

START=42
END=337
BATCH=10

for ((s=START; s<=END; s+=BATCH)); do
  e=$((s+BATCH-1))
  if (( e > END )); then e=$END; fi
  echo "=== PARSE BATCH page-${s}..page-${e} ==="
  prompt="Parse OCR batch data/raw_ocr/page-$(printf '%03d' "$s").txt sampai data/raw_ocr/page-$(printf '%03d' "$e").txt lalu append/update data/entries.json. Ikuti aturan project: struktur kamus asli; dotted form hanya syllable_form bukan varian; sublema hanya baris turunan/menjorok; translations = arti Indonesia; examples split text Paser dan translation_id Indonesia; jangan buat definitions; jangan tampilkan needs_review/source di UI. Pertahankan entri lama, tambah entri baru dari batch ini saja. Jika batch mulai/berakhir di tengah huruf, tetap parse yang jelas. Run npm test. Report jumlah total entries setelah batch."
  codex exec --sandbox workspace-write "$prompt"
  npm test
  git add data/entries.json
  git commit -m "Parse OCR pages $(printf '%03d' "$s")-$(printf '%03d' "$e")" || true
  echo "=== DONE BATCH page-${s}..page-${e} ==="
done

echo "ALL_BATCHES_DONE"
