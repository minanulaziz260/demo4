# 🌿 Sage Green - Digital Wedding Invitation (Undangan Pernikahan Digital)

Template website undangan pernikahan digital modern & elegan bertema **Sage Green Floral** yang siap dipublikasikan (ready-to-publish). Paket ini 100% mandiri (*standalone static site*) tanpa ketergantungan server backend/database, sehingga dapat di-host langsung secara gratis di berbagai platform hosting.

---

## ✨ Fitur Unggulan

1. **Split-Screen & Responsive Adaptive Layout**:
   - Tampilan **Desktop**: Layout modern split-screen 50:50 dengan panel kiri *sticky cover* dan panel kanan yang dapat di-scroll.
   - Tampilan **Mobile / Tablet**: Otomatis beradaptasi menjadi *single-page continuous vertical scroll* yang nyaman dibuka dari smartphone tamu.
2. **Audio Background Player (Best Voyage)**:
   - Pemutar musik otomatis/manual dengan tombol piringan hitam (*vinyl disc*) berputar di pojok kiri bawah.
3. **Personalisasi Nama Tamu via URL Parameter**:
   - Mendukung parameter URL `?to=Nama+Tamu` atau `?u=Nama+Tamu`.
   - Contoh: `https://domain-anda.com/?to=Bapak+Budi+Sekeluarga` akan otomatis menampilkan nama tersebut di kartu ucapan dan formulir RSVP.
4. **Hitung Mundur Acara (Live Countdown Timer)**:
   - Menghitung sisa hari, jam, menit, dan detik secara real-time menuju hari pernikahan.
5. **Animasi Halus & Organik**:
   - Daun dan tanaman hias bergoyang perlahan dengan animasi CSS `@keyframes wave`.
   - Efek kemunculan teks dan elemen elegan via GSAP (`fadeInUp`, `zoomIn`, dan `typing`).
6. **Formulir Konfirmasi Kehadiran (RSVP Interaktif)**:
   - Tamu dapat memilih status kehadiran, jumlah tamu, dan menuliskan ucapan.
   - Tersedia opsi untuk langsung mengirimkan konfirmasi via **WhatsApp** ke nomor mempelai.
7. **Papan Doa & Ucapan (Wishes Board)**:
   - Fitur buku tamu interaktif menggunakan penyimpanan lokal browser (`localStorage`). Tamu dapat meninggalkan ucapan yang langsung muncul di daftar doa.
8. **Amplop Digital & Hadiah Cashless**:
   - Menampilkan nomor rekening bank dengan tombol **Salin Nomor Rekening** sekali klik (disertai notifikasi toast).
   - Tombol konfirmasi transfer langsung terhubung ke WhatsApp.
9. **Galeri Foto Prewedding & Slideshow**:
   - Susunan grid foto estetik dan carousel slideshow layar penuh.
10. **100% Offline / Standalone Ready**:
    - Seluruh aset gambar (29 file webp/png) dan audio (1 file mp3) telah diunduh secara lokal di folder `assets/`.
    - Script Tailwind CSS dan GSAP telah tersedia di folder `js/vendor/`.

---

## 📁 Struktur Direktori

```
sage-green-invitation/
├── index.html              # Halaman utama undangan
├── README.md               # Panduan penggunaan & kustomisasi
├── css/
│   └── style.css           # Styling kustom, variabel tema, keyframes
├── js/
│   ├── main.js             # Logika interaktif, audio, RSVP, wishes, timer
│   └── vendor/             # Pustaka lokal (Tailwind, GSAP, ScrollTrigger, TextPlugin)
└── assets/                 # 31 file aset lokal (gambar dekorasi, foto, audio mp3)
```

---

## 🛠️ Cara Kustomisasi

### 1. Mengubah Nama Pengantin & Tanggal Acara
Buka file `index.html` menggunakan editor teks (VS Code, Notepad, dll):
- Cari teks `ADAM & HAWA` dan ganti dengan nama pasangan Anda.
- Cari atribut `data-datetime="2027-06-21T09:00"` pada section *Save The Date* dan sesuaikan dengan tanggal/jam acara Anda.

### 2. Mengubah Nomor Rekening & WhatsApp
- Pada section **Gift** di `index.html`, ubah nomor rekening bank (misal `5234534654`) dan nama pemilik rekening.
- Ubah nomor WhatsApp pada `href="https://wa.me/62812xxxxxx"`.
- Buka `js/main.js`, cari `const waNumber = "628123456789";` dan ganti dengan nomor WhatsApp aktif mempelai (format internasional tanpa tanda `+`, contoh: `6281234567890`).

### 3. Mengganti Musik Latar
Ganti file audio di `assets/fvwJB19jFKBkrvbDauofeXXG3dVnoB2dknN8qRMi.mp3` dengan lagu pilihan Anda (tetap gunakan nama file yang sama atau ubah path di `<audio id="wedding-audio">` pada `index.html`).

---

## 🚀 Cara Publikasi (Deployment)

Karena web ini berformat **Static HTML/CSS/JS**, Anda dapat mengunggahnya ke berbagai platform gratis:

### Opsi A: Netlify (Paling Mudah)
1. Buka [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop seluruh folder (atau ekstrak zip-nya) ke kotak upload.
3. Website undangan Anda langsung online dan mendapatkan link publik gratis (misal: `wedding-adam-hawa.netlify.app`).

### Opsi B: Vercel
1. Buka dashboard [Vercel](https://vercel.com).
2. Import repository GitHub atau deploy folder menggunakan Vercel CLI (`vercel deploy`).

### Opsi C: GitHub Pages
1. Buat repository baru di GitHub.
2. Unggah semua file dalam folder ini.
3. Masuk ke **Settings > Pages > Branch: main / root > Save**.

### Opsi D: Web Hosting Tradisional (cPanel / Apache / Nginx)
1. Buka File Manager di cPanel.
2. Unggah file zip ke dalam folder `public_html` (atau subdomain).
3. Ekstrak file zip. Selesai!
