# BONO CATERING — Website Pemesanan

Website promosi & pemesanan katering untuk **BONO CATERING**.
*"Hidangan Berkualitas untuk Setiap Momen Istimewa."*

Dibangun dengan HTML5, CSS3, dan JavaScript murni (tanpa framework, tanpa proses build) —
tinggal buka `index.html`, atau jalankan lewat server lokal sederhana.

## Struktur folder

```
bono-catering/
├── index.html
├── assets/
│   ├── images/     ← taruh foto produk asli di sini (lihat "Mengganti visual" di bawah)
│   ├── icons/
│   └── logo/
├── css/
│   ├── style.css        (variabel warna, layout, seluruh komponen)
│   ├── responsive.css    (breakpoint tablet & desktop)
│   └── dark-mode.css     (override tema gelap)
├── js/
│   ├── app.js       (data menu, state global, header, animasi, render menu)
│   ├── cart.js      (keranjang + localStorage)
│   ├── search.js    (pencarian menu)
│   ├── filter.js    (filter kategori + urutkan)
│   ├── faq.js       (accordion FAQ)
│   ├── darkmode.js  (toggle tema terang/gelap)
│   └── whatsapp.js  (menyusun & mengirim pesan pemesanan ke WhatsApp)
└── README.md
```

## Menjalankan secara lokal

Karena tidak ada proses build, cara paling sederhana adalah membuka `index.html`
langsung di browser. Untuk pengalaman paling akurat (beberapa browser membatasi
fitur tertentu saat dibuka via `file://`), jalankan server statis sederhana:

```bash
cd bono-catering
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

## Hal yang WAJIB diganti sebelum go-live

1. **Nomor WhatsApp** — di `js/whatsapp.js`, ganti nilai `WHATSAPP_NUMBER`
   (format internasional tanpa simbol, contoh `6281234567890`) dengan nomor asli.
2. **Nomor telepon & email di halaman** — ada di bagian Kontak dan Footer pada `index.html`.
3. **Alamat & peta** — ganti teks alamat dan `src` iframe peta di bagian `#kontak`
   pada `index.html` dengan lokasi dapur/toko yang sebenarnya.

## Mengganti data menu

Semua menu dirender secara dinamis dari satu sumber data di `js/app.js`
(cari komentar `Menu data`). Setiap item punya bentuk:

```js
{
  id: 'ayam-2',
  category: 'ayam-bakar',       // ayam-bakar | prasmanan | snack-box | menu-harian | kue-tradisional
  name: 'Paket Ayam Bakar 2',
  desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan.',
  price: 22000,
  popular: true,                 // menampilkan badge "Favorit"
}
```

**Catatan penting:** kategori **Paket Ayam Bakar** sudah memakai 6 paket dan harga
persis seperti yang diberikan. Kategori **Prasmanan**, **Snack Box**, **Menu Harian**,
dan **Kue Tradisional** masih berisi **contoh/placeholder** — daftar lengkap menu untuk
kategori tersebut belum disertakan dalam permintaan awal, jadi silakan ganti item-item
tersebut di `js/app.js` dengan daftar dan harga asli BONO CATERING.

Menambah kategori baru cukup dengan:
1. Menambahkan item baru dengan `category` baru di `menuData`.
2. Menambahkan entri ikon + label baru di `categoryMeta` (di `app.js`).
3. Menambahkan tombol tab baru di `#categoryTabs` pada `index.html`.

## Mengganti visual (foto produk)

Ikon dan ilustrasi di situs ini seluruhnya SVG inline (sesuai ketentuan proyek: tanpa
PNG/JPG untuk ikon). Untuk kartu menu dan hero saat ini memakai ilustrasi SVG bergaya
"piring daun pisang" sebagai penanda visual BONO CATERING, bukan foto asli — karena
lingkungan pembuatan proyek ini tidak memiliki akses ke foto produk sungguhan.

Jika Anda punya foto makanan asli:
1. Simpan file di `assets/images/`.
2. Di `js/app.js`, tambahkan properti `image: 'assets/images/nama-file.jpg'` pada item
   menu terkait, lalu di `renderMenu()` (`app.js`) ganti markup ikon SVG pada
   `.menu-card-media` dengan `<img src="${item.image}" alt="${item.name}" loading="lazy">`
   saat `item.image` tersedia.
3. Lakukan hal yang sama untuk gambar hero jika ingin memakai foto asli
   menggantikan ilustrasi SVG.

## Alur pemesanan

```
Pilih menu → Tambah ke keranjang → Atur jumlah → Buka keranjang
→ Isi alamat & catatan → Klik "Pesan via WhatsApp"
→ Pesan otomatis tersusun → Diarahkan ke WhatsApp
```

Format pesan WhatsApp disusun di `js/whatsapp.js` (fungsi `buildOrderMessage`),
mengikuti format:

```
Halo BONO CATERING.

Saya ingin melakukan pemesanan.

Daftar pesanan:

- Paket Ayam Bakar 2
  Jumlah: 3
  Harga: Rp66.000

Alamat:
...

Catatan:
...

Total: Rp66.000

Terima kasih.
```

## Tema terang / gelap

Tema disimpan di `localStorage` (`bono-theme`) dan diterapkan **sebelum** halaman
digambar (lewat skrip kecil di `<head>` pada `index.html`) sehingga tidak ada efek
"flash" warna salah saat halaman dimuat. Tombol toggle ada di header (ikon matahari/bulan).

## Aksesibilitas & performa

- Navigasi bisa sepenuhnya memakai keyboard; ada skip-link ke konten utama.
- Kontras warna mengikuti palet yang ditentukan; fokus keyboard terlihat jelas (`:focus-visible`).
- Elemen dinamis penting (`aria-live`, `aria-expanded`, `aria-hidden`) sudah diberi atribut ARIA yang sesuai.
- Menghormati `prefers-reduced-motion` untuk pengguna yang mematikan animasi di sistemnya.
- Tidak ada dependensi eksternal selain Google Fonts (Poppins & Inter) — halaman tetap ringan dan cepat.
