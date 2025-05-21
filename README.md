# 📘 GIFT Viewer React

**GIFT Viewer React** adalah aplikasi berbasis React yang memungkinkan pengguna untuk mengunggah dan melihat soal-soal dari file berformat **GIFT (.txt)** secara bersih dan terstruktur.

## 🎯 Fitur Utama

- 📁 **Upload file GIFT (.txt)**  
  Mendukung file dengan format standar GIFT dari Moodle atau editor lain.

- ✅ **Dukungan Semua Tipe Soal:**
  - Pilihan Ganda (tunggal)
  - Pilihan Ganda Kompleks (PG L1)
  - Benar/Salah
  - Benar/Salah lebih dari satu (B-S L1)
  - Essay
  - Matching (Menjodohkan)

- 💾 **Penyimpanan Lokal (localStorage)**
  - Soal tetap tersimpan walaupun halaman direfresh.

- 🗑️ **Tombol Reset**
  - Menghapus semua soal dari tampilan dan localStorage.

- 🎨 **Tampilan Modern**
  - Menggunakan **Tailwind CSS** untuk UI bersih, ringan, dan responsif.

---

## 🛠️ Cara Menggunakan

1. Jalankan aplikasi React seperti biasa (`npm run dev` atau `npm start`)
2. Klik tombol `Pilih File` dan upload file soal berformat `.txt` (GIFT)
3. Soal akan langsung ditampilkan berdasarkan tipenya
4. Klik `Reset Soal` untuk menghapus dan memuat ulang file baru

---

## 📂 Cocok Digunakan Untuk:

- Guru dan Dosen yang ingin memeriksa atau menampilkan soal GIFT sebelum digunakan
- Siswa yang ingin mempelajari soal dalam format interaktif
- Pengembang LMS/e-learning yang membutuhkan visualisasi soal

---

## 📄 Format yang Didukung (GIFT)

Contoh format file yang dikenali:
```gift
::Judul Soal:: [html]Apa ibu kota Indonesia? {
  =Jakarta
  ~Bandung
  ~Surabaya
}
