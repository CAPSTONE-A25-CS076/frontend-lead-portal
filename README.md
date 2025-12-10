# Dokumentasi Proyek Lead Scoring Portal

## Gambaran Proyek

Lead Scoring Portal adalah aplikasi web berbasis React yang dirancang untuk mengelola dan menilai (scoring) lead pelanggan. Aplikasi ini memungkinkan pengguna untuk melihat daftar lead, menerapkan filter berdasarkan berbagai kriteria, dan melihat detail lead secara mendalam. Sistem scoring membantu dalam mengidentifikasi lead potensial berdasarkan data demografis dan riwayat interaksi.

Aplikasi ini terintegrasi dengan backend API untuk autentikasi dan pengambilan data lead, serta menggunakan data dummy untuk pengembangan lokal.

## Teknologi yang Digunakan

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router DOM 7.9.5
- **Icons**: Lucide React 0.553.0
- **Development Tools**: ESLint, PostCSS, Autoprefixer
- **Backend Integration**: REST API (hosted di Railway)

## Instalasi dan Setup

### Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. Clone repositori ini:

   ```bash
   git clone <repository-url>
   cd lead-portal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan aplikasi dalam mode development:

   ```bash
   npm run dev
   ```

4. Buka browser dan akses `http://localhost:5173` (port default Vite)

### Build untuk Production

```bash
npm run build
npm run preview
```

## Struktur Proyek

```
lead-portal/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Komponen UI reusable
│   │   ├── DashboardHeader.jsx
│   │   ├── DetailField.jsx
│   │   ├── Drawer.jsx
│   │   ├── LeadCard.jsx
│   │   ├── LeadDetailContent.jsx
│   │   ├── LeadFilters.jsx
│   │   ├── LeadTable.jsx
│   │   ├── LeadTableHeader.jsx
│   │   ├── LeadTableRow.jsx
│   │   ├── LoginForm.jsx
│   │   ├── LoginHeader.jsx
│   │   └── ScoreBadge.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useLeadFilters.jsx
│   │   └── useLeads.jsx
│   ├── pages/               # Halaman utama
│   │   ├── Dashboard.jsx
│   │   ├── LeadDetail.jsx
│   │   └── Login.jsx
│   ├── utils/               # Utilitas dan API
│   │   ├── api.js
│   │   └── dummyData.js
│   ├── App.jsx              # Komponen utama aplikasi
│   ├── index.css            # Styling global
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Fitur

### 1. Autentikasi Pengguna

- Login dengan kredensial (username/password)
- Penyimpanan token di localStorage
- Proteksi route berdasarkan status autentikasi

### 2. Dashboard Lead

- Tampilan tabel lead dengan sorting berdasarkan skor
- Filter lead berdasarkan kriteria seperti skor minimum, pekerjaan, status pernikahan, dll.
- Mode "Top 10" untuk menampilkan lead dengan skor tertinggi
- Counter jumlah lead yang ditampilkan

### 3. Detail Lead

- Tampilan detail lengkap lead dalam drawer (di dashboard)
- Halaman detail terpisah untuk lead individual
- Navigasi kembali ke dashboard

### 4. Sistem Scoring

- Skor lead dihitung berdasarkan berbagai faktor (usia, pekerjaan, riwayat kampanye, dll.)
- Sorting otomatis berdasarkan skor tertinggi

## Gambaran Komponen

### Komponen Halaman

- **App.jsx**: Komponen utama dengan routing dan header navigasi
- **Login.jsx**: Halaman login
- **Dashboard.jsx**: Halaman dashboard utama
- **LeadDetail.jsx**: Halaman detail lead individual

### Komponen UI

- **DashboardHeader.jsx**: Header dashboard dengan toggle mode tampilan
- **LeadFilters.jsx**: Form filter untuk lead
- **LeadTable.jsx**: Tabel untuk menampilkan daftar lead
- **LeadTableHeader.jsx**: Header tabel lead
- **LeadTableRow.jsx**: Baris individual dalam tabel lead
- **Drawer.jsx**: Komponen drawer untuk detail lead
- **LeadDetailContent.jsx**: Konten detail lead
- **DetailField.jsx**: Komponen untuk menampilkan field detail
- **ScoreBadge.jsx**: Badge untuk menampilkan skor
- **LoginForm.jsx**: Form login
- **LoginHeader.jsx**: Header halaman login
- **LeadCard.jsx**: Kartu untuk menampilkan lead (jika digunakan)

## Custom Hooks

### useLeads

Hook untuk mengambil data lead dari API.

```javascript
const { leads, loading, error } = useLeads();
```

- **leads**: Array objek lead
- **loading**: Boolean status loading
- **error**: Objek error jika terjadi kesalahan

### useLeadFilters

Hook untuk memfilter lead berdasarkan kriteria.

```javascript
const filteredLeads = useLeadFilters(leads, filters, limit);
```

- **leads**: Array lead yang akan difilter
- **filters**: Objek filter (minScore, job, marital, dll.)
- **limit**: Jumlah maksimal lead yang dikembalikan (opsional)

## Integrasi API

Aplikasi terintegrasi dengan backend API di `https://capstone-asah-production.up.railway.app`.

### Fungsi API (src/utils/api.js)

- **login(credentials)**: Login pengguna

  - Input: `{username, password}`
  - Output: `{token, user}`

- **getMe()**: Mendapatkan data pengguna saat ini

  - Headers: Authorization Bearer token
  - Output: Data pengguna

- **getLeads()**: Mengambil semua lead

  - Headers: Authorization Bearer token
  - Output: Array lead yang sudah di-sort berdasarkan skor

- **getLeadById(id)**: Mengambil detail lead berdasarkan ID
  - Headers: Authorization Bearer token
  - Output: Objek lead detail

Semua fungsi API menangani error dan transformasi data agar sesuai dengan format yang diharapkan aplikasi.

## Model Data

### Struktur Lead

Setiap objek lead memiliki properti berikut:

```javascript
{
  id: number,           // ID unik lead
  age: number,          // Usia
  job: string,          // Pekerjaan
  marital: string,      // Status pernikahan
  education: string,    // Tingkat pendidikan
  default: string,      // Status default ('yes'/'no')
  balance: number,      // Saldo rekening
  housing: string,      // Status kepemilikan rumah
  loan: string,         // Status pinjaman
  contact: string,      // Metode kontak
  day: number,          // Tanggal kontak terakhir
  month: string,        // Bulan kontak terakhir
  duration: number,     // Durasi kontak terakhir (detik)
  campaign: number,     // Jumlah kontak dalam kampanye ini
  pdays: number,        // Jumlah hari sejak kontak terakhir (-1 jika belum pernah)
  previous: number,     // Jumlah kontak sebelum kampanye ini
  poutcome: string,     // Hasil kampanye sebelumnya
  y: string,            // Target ('yes'/'no')
  score: number         // Skor (0-1)
}
```

### Enumerasi Filter

- **JOBS**: Array pekerjaan yang tersedia
- **MARITALS**: Status pernikahan
- **EDUCATIONS**: Tingkat pendidikan
- **CONTACTS**: Metode kontak
- **POUTCOMES**: Hasil kampanye sebelumnya

## Panduan Penggunaan

### Login

1. Akses halaman login
2. Masukkan kredensial yang valid
3. Klik "Login" untuk masuk ke dashboard

### Navigasi Dashboard

1. Setelah login, Anda akan diarahkan ke dashboard
2. Gunakan filter untuk menyaring lead berdasarkan kriteria
3. Klik pada baris lead untuk melihat detail di drawer
4. Gunakan toggle "Top 10" untuk melihat lead terbaik

### Melihat Detail Lead

1. Dari dashboard, klik lead untuk membuka drawer detail
2. Atau klik link di header untuk melihat halaman detail terpisah
3. Gunakan tombol "Back" untuk kembali ke dashboard

### Logout

1. Klik "Logout" di header untuk keluar dari aplikasi
2. Token akan dihapus dari penyimpanan lokal

## Catatan Pengembangan

- Aplikasi menggunakan data dummy untuk pengembangan lokal (lihat `src/utils/dummyData.js`)
- Sistem scoring saat ini menggunakan algoritma sederhana; dapat diganti dengan model ML di production
- Error handling telah diimplementasikan untuk API calls
- Responsive design menggunakan Tailwind CSS

Untuk pertanyaan lebih lanjut atau kontribusi, silakan hubungi tim pengembang.
