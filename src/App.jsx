import React, { useState, useEffect, useMemo } from 'react';
import {
  Hotel, Calendar, Users, BedDouble, MapPin, Wifi, Car, Clock,
  Utensils, Wind, ConciergeBell, Star, ChevronRight, ChevronLeft,
  CheckCircle2, AlertCircle, Search, LogIn, LogOut, LayoutDashboard,
  FileBarChart, Database, Plus, Edit3, Trash2, Printer, Download,
  Upload, Copy, Check, Menu, X, Phone, Mail, Share2,
  Globe, ShieldCheck, Info, ArrowLeft, Eye, Filter, RefreshCw,
  CreditCard, Building2, Sparkles, TrendingUp, DollarSign, ListChecks
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

// ============================================================================
// 1. KONSTANTA & DATA SIMULASI (DEMO DATA) UNTUK PROYEK SIM DIN.AR HOTEL
// ============================================================================

const STORAGE_KEYS = {
  ROOMS: 'dinar_hotel_rooms_v1',
  CUSTOMERS: 'dinar_hotel_customers_v1',
  RESERVATIONS: 'dinar_hotel_reservations_v1',
  NEARBY: 'dinar_hotel_nearby_v1',
};

const RESERVATION_STATUSES = [
  'Menunggu Konfirmasi',
  'Dikonfirmasi',
  'Check-in',
  'Check-out',
  'Dibatalkan',
];

const ROOM_STATUSES = ['Tersedia', 'Terisi', 'Perawatan'];

const INITIAL_ROOMS = [
  {
    ID_Kamar: 'KMR-001',
    Tipe_Kamar: 'Superior Room',
    Harga_Per_Malam: 550000,
    Kapasitas: 2,
    Status_Kamar: 'Tersedia',
    Ukuran_Kamar: '28 m²',
    Deskripsi_Singkat: 'Kamar elegan bernuansa hangat dengan pencahayaan modern, ideal untuk perjalanan bisnis maupun liburan singkat di Madiun.',
    Deskripsi_Lengkap: 'Superior Room di Din.Ar Hotel dirancang dengan estetika minimalis modern dan sentuhan warna krem serta kayu hangat. Dilengkapi tempat tidur Queen berkualitas tinggi, meja kerja ergonomis, dan kamar mandi marmer dengan rain shower untuk menjamin istirahat maksimal Anda.',
    Fasilitas: ['WiFi Kecepatan Tinggi', 'AC', 'Smart TV 43"', 'Meja Kerja', 'Pembuat Kopi & Teh', 'Rain Shower'],
    Foto_Utama: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    Galeri: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    ID_Kamar: 'KMR-002',
    Tipe_Kamar: 'Deluxe Room',
    Harga_Per_Malam: 780000,
    Kapasitas: 2,
    Status_Kamar: 'Tersedia',
    Ukuran_Kamar: '36 m²',
    Deskripsi_Singkat: 'Ruang lebih luas dengan area bersantai pribadi dan jendela besar menghadap lanskap kota Madiun.',
    Deskripsi_Lengkap: 'Deluxe Room menawarkan keseimbangan sempurna antara kenyamanan mewah dan fungsionalitas. Hadir dengan tempat tidur King Size, sofa lounge yang nyaman, minibar pilihan, serta pencahayaan ambient yang menenangkan.',
    Fasilitas: ['WiFi Kecepatan Tinggi', 'AC', 'Smart TV 50"', 'Sofa Lounge', 'Minibar', 'Brankas Digital', 'Sarapan (Simulasi)'],
    Foto_Utama: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    Galeri: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    ID_Kamar: 'KMR-003',
    Tipe_Kamar: 'Executive Suite',
    Harga_Per_Malam: 1250000,
    Kapasitas: 3,
    Status_Kamar: 'Tersedia',
    Ukuran_Kamar: '52 m²',
    Deskripsi_Singkat: 'Suite premium dengan ruang tamu terpisah, bathtub elegan, dan fasilitas kerja eksekutif.',
    Deskripsi_Lengkap: 'Executive Suite menghadirkan pengalaman menginap kelas atas dengan ruang tamu terpisah untuk menerima kolega atau bersantai bersama keluarga. Dilengkapi bathtub freestanding, mesin kopi kapsul, dan akses prioritas layanan kamar.',
    Fasilitas: ['WiFi Kecepatan Tinggi', 'AC', 'Ruang Tamu Terpisah', 'Bathtub', 'Mesin Kopi', 'Smart TV 55"', 'Layanan Kamar'],
    Foto_Utama: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    Galeri: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    ],
  },
  {
    ID_Kamar: 'KMR-004',
    Tipe_Kamar: 'Din.Ar Signature Suite',
    Harga_Per_Malam: 1950000,
    Kapasitas: 4,
    Status_Kamar: 'Terisi',
    Ukuran_Kamar: '78 m²',
    Deskripsi_Singkat: 'Puncak kemewahan Din.Ar Hotel dengan interior kontemporer eksklusif, ruang makan privat, dan pemandangan panoramik.',
    Deskripsi_Lengkap: 'Din.Ar Signature Suite merupakan mahakarya desain interior kami. Menawarkan kamar tidur utama super-king, ruang tamu & ruang makan privat, kamar mandi mewah dengan bathtub marmer, serta layanan personalisasi untuk pengalaman menginap yang tak terlupakan.',
    Fasilitas: ['WiFi Kecepatan Tinggi', 'AC', 'Ruang Makan Privat', 'Bathtub Marmer', 'Smart TV 65"', 'Mesin Espresso', 'Balkon Privat'],
    Foto_Utama: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    Galeri: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    ],
  },
];

const INITIAL_CUSTOMERS = [
  { ID_Pelanggan: 'PLG-001', Nama_Pelanggan: 'Budi Santoso', Nomor_Telepon: '0812-3456-7890', Email: 'budi.santoso@contoh.id' },
  { ID_Pelanggan: 'PLG-002', Nama_Pelanggan: 'Siti Rahmawati', Nomor_Telepon: '0813-9876-5432', Email: 'siti.rahma@contoh.id' },
  { ID_Pelanggan: 'PLG-003', Nama_Pelanggan: 'Hendra Wijaya', Nomor_Telepon: '0856-1122-3344', Email: 'hendra.w@contoh.id' },
  { ID_Pelanggan: 'PLG-004', Nama_Pelanggan: 'Nadia Kusuma', Nomor_Telepon: '0819-4455-6677', Email: 'nadia.kusuma@contoh.id' },
  { ID_Pelanggan: 'PLG-005', Nama_Pelanggan: 'Rizky Pratama', Nomor_Telepon: '0821-7788-9900', Email: 'rizky.p@contoh.id' },
  { ID_Pelanggan: 'PLG-006', Nama_Pelanggan: 'Dewi Anggraini', Nomor_Telepon: '0857-2233-4455', Email: 'dewi.anggraini@contoh.id' },
];

const INITIAL_RESERVATIONS = [
  {
    ID_Reservasi: 'RSV-2026-001',
    ID_Pelanggan: 'PLG-001',
    ID_Kamar: 'KMR-001',
    Tanggal_Checkin: '2026-08-14',
    Tanggal_Checkout: '2026-08-16',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 2,
    Total_Biaya: 1100000,
    Status_Reservasi: 'Check-out',
    Catatan: 'Permintaan kamar lantai tinggi (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-002',
    ID_Pelanggan: 'PLG-002',
    ID_Kamar: 'KMR-002',
    Tanggal_Checkin: '2026-09-05',
    Tanggal_Checkout: '2026-09-08',
    Jumlah_Malam: 3,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 2,
    Total_Biaya: 2340000,
    Status_Reservasi: 'Check-out',
    Catatan: 'Perjalanan dinas (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-003',
    ID_Pelanggan: 'PLG-003',
    ID_Kamar: 'KMR-003',
    Tanggal_Checkin: '2026-09-19',
    Tanggal_Checkout: '2026-09-21',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 2,
    Jumlah_Tamu: 4,
    Total_Biaya: 5000000,
    Status_Reservasi: 'Check-out',
    Catatan: 'Kunjungan keluarga (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-004',
    ID_Pelanggan: 'PLG-004',
    ID_Kamar: 'KMR-004',
    Tanggal_Checkin: '2026-10-10',
    Tanggal_Checkout: '2026-10-12',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 3,
    Total_Biaya: 3900000,
    Status_Reservasi: 'Check-out',
    Catatan: 'Anniversary (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-005',
    ID_Pelanggan: 'PLG-005',
    ID_Kamar: 'KMR-002',
    Tanggal_Checkin: '2026-10-22',
    Tanggal_Checkout: '2026-10-24',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 2,
    Total_Biaya: 1560000,
    Status_Reservasi: 'Dibatalkan',
    Catatan: 'Perubahan jadwal (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-006',
    ID_Pelanggan: 'PLG-006',
    ID_Kamar: 'KMR-004',
    Tanggal_Checkin: '2026-11-18',
    Tanggal_Checkout: '2026-11-21',
    Jumlah_Malam: 3,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 3,
    Total_Biaya: 5850000,
    Status_Reservasi: 'Check-in',
    Catatan: 'Tamu VIP proyek SIM (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-007',
    ID_Pelanggan: 'PLG-001',
    ID_Kamar: 'KMR-003',
    Tanggal_Checkin: '2026-11-22',
    Tanggal_Checkout: '2026-11-24',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 2,
    Total_Biaya: 2500000,
    Status_Reservasi: 'Dikonfirmasi',
    Catatan: 'Check-in sore hari (Demo)',
  },
  {
    ID_Reservasi: 'RSV-2026-008',
    ID_Pelanggan: 'PLG-002',
    ID_Kamar: 'KMR-001',
    Tanggal_Checkin: '2026-11-26',
    Tanggal_Checkout: '2026-11-28',
    Jumlah_Malam: 2,
    Jumlah_Kamar: 2,
    Jumlah_Tamu: 4,
    Total_Biaya: 2200000,
    Status_Reservasi: 'Menunggu Konfirmasi',
    Catatan: 'Kamar bersebelahan jika tersedia (Demo)',
  },
];

const INITIAL_NEARBY = [
  {
    id: 'NB-1',
    nama: 'Stasiun Madiun',
    kategori: 'Transportasi',
    estimasi: '± 10 - 15 menit berkendara (Estimasi Simulasi)',
    deskripsi: 'Akses kereta api antar kota utama Jawa Timur dan lintas selatan Jawa.',
  },
  {
    id: 'NB-2',
    nama: 'Alun-Alun & Pahlawan Street Center Madiun',
    kategori: 'Pusat Kota & Wisata',
    estimasi: '± 10 menit berkendara (Estimasi Simulasi)',
    deskripsi: 'Pusat aktivitas kota, ruang publik ikonik, serta sentra kuliner khas Madiun.',
  },
  {
    id: 'NB-3',
    nama: 'Fasilitas Kesehatan & RS Daerah Madiun',
    kategori: 'Layanan Kesehatan',
    estimasi: '± 5 - 10 menit berkendara (Estimasi Simulasi)',
    deskripsi: 'Akses cepat menuju layanan medis darurat dan fasilitas kesehatan sekitar Jl. Urip Sumoharjo.',
  },
];

const FACILITIES_DEMO = [
  {
    icon: Wifi,
    title: 'WiFi Kecepatan Tinggi',
    desc: 'Koneksi internet nirkabel di seluruh area kamar dan lobi untuk menunjang kebutuhan bisnis dan hiburan.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Car,
    title: 'Area Parkir Luas',
    desc: 'Area parkir kendaraan roda dua dan roda empat yang aman dengan pengawasan keamanan terpadu.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Clock,
    title: 'Resepsionis 24 Jam',
    desc: 'Staf layanan tamu yang siap membantu proses check-in, check-out, dan informasi lokal kapan saja.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: ConciergeBell,
    title: 'Layanan Kamar',
    desc: 'Kemudahan memesan hidangan maupun kebutuhan kamar secara langsung demi kenyamanan privasi Anda.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Utensils,
    title: 'Restoran & Lounge',
    desc: 'Ruang bersantap modern dengan suasana hangat untuk sarapan, jamuan bisnis, maupun bersantai.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    icon: Wind,
    title: 'Pendingin Ruangan (AC)',
    desc: 'Sistem pengatur suhu ruangan modern di setiap kamar dan area publik demi kenyamanan tropis.',
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=600&q=80',
  },
];

// ============================================================================
// 2. FUNGSI BANTU (UTILITIES)
// ============================================================================

const formatRupiah = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const calculateNights = (checkin, checkout) => {
  if (!checkin || !checkout) return 0;
  const start = new Date(checkin);
  const end = new Date(checkout);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const getTodayString = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

const statusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Konfirmasi':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Dikonfirmasi':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Check-in':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Check-out':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Dibatalkan':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'Tersedia':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Terisi':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Perawatan':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const downloadCSV = (filename, headers, rows) => {
  const escapeCSV = (val) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(',')),
  ].join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const loadStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
};

// ============================================================================
// 3. KOMPONEN KALENDER KETERSEDIAAN KAMAR (HALAMAN DETAIL KAMAR)
// ============================================================================

function RoomAvailabilityCalendar({ roomId, reservations }) {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Hitung tanggal-tanggal yang sudah terpesan (selain Dibatalkan)
  const bookedDatesSet = useMemo(() => {
    const set = new Set();
    reservations
      .filter((r) => r.ID_Kamar === roomId && r.Status_Reservasi !== 'Dibatalkan')
      .forEach((r) => {
        const start = new Date(r.Tanggal_Checkin);
        const end = new Date(r.Tanggal_Checkout);
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          set.add(d.toISOString().split('T')[0]);
        }
      });
    return set;
  }, [roomId, reservations]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(<div key={`empty-${i}`} className="h-9" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isBooked = bookedDatesSet.has(dateStr);
    cells.push(
      <div
        key={dateStr}
        title={isBooked ? 'Sudah ada reservasi tercatat' : 'Tersedia'}
        className={`h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
          isBooked
            ? 'bg-rose-100 text-rose-800 border border-rose-200 line-through'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-[#172B3A] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A46D]" />
          Kalender Ketersediaan
        </h4>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-[#172B3A]"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-[#172B3A] min-w-[115px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-[#172B3A]"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold text-stone-400 mb-2">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">{cells}</div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 inline-block" />
          Tersedia
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-100 border border-rose-200 inline-block" />
          Terpesan (Simulasi)
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 4. KOMPONEN UTAMA APLIKASI (APP)
// ============================================================================

export default function App() {
  // --- State Data Utama (Tersinkronisasi dengan localStorage) ---
  const [rooms, setRooms] = useState(() => loadStorage(STORAGE_KEYS.ROOMS, INITIAL_ROOMS));
  const [customers, setCustomers] = useState(() => loadStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
  const [reservations, setReservations] = useState(() => loadStorage(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS));
  const [nearbyPlaces, setNearbyPlaces] = useState(() => loadStorage(STORAGE_KEYS.NEARBY, INITIAL_NEARBY));

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms)); } catch (e) {}
  }, [rooms]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers)); } catch (e) {}
  }, [customers]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations)); } catch (e) {}
  }, [reservations]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.NEARBY, JSON.stringify(nearbyPlaces)); } catch (e) {}
  }, [nearbyPlaces]);

  // --- State Navigasi & UI ---
  const [activeView, setActiveView] = useState('home'); // 'home' | 'room-detail' | 'reservation' | 'admin'
  const [selectedRoomId, setSelectedRoomId] = useState(INITIAL_ROOMS[0].ID_Kamar);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // --- State Toast & Konfirmasi ---
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev && prev.message === message ? null : prev));
    }, 3800);
  };

  // --- State Pencarian Hero & Draft Reservasi ---
  const [searchCriteria, setSearchCriteria] = useState({
    checkin: getTodayString(1),
    checkout: getTodayString(3),
    guests: 2,
    roomCount: 1,
    activeFilter: false,
  });

  // Pantau scroll untuk efek navbar transparan -> solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openRoomDetail = (roomId) => {
    setSelectedRoomId(roomId);
    setActiveView('room-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openReservationWithRoom = (roomId = null) => {
    if (roomId) setSelectedRoomId(roomId);
    setActiveView('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper membuat reservasi baru (digunakan baik di publik maupun admin)
  const createReservationRecord = ({
    namaPelanggan,
    nomorTelepon,
    email,
    existingCustomerId,
    roomId,
    checkin,
    checkout,
    jumlahKamar,
    jumlahTamu,
    catatan,
    status = 'Menunggu Konfirmasi',
  }) => {
    const room = rooms.find((r) => r.ID_Kamar === roomId);
    if (!room) return null;

    const nights = calculateNights(checkin, checkout);
    if (nights <= 0) return null;

    let customerId = existingCustomerId;
    if (!customerId) {
      // Cek apakah email sudah ada di pelanggan
      const existing = customers.find(
        (c) => c.Email.toLowerCase() === (email || '').trim().toLowerCase()
      );
      if (existing) {
        customerId = existing.ID_Pelanggan;
      } else {
        const nextNum = customers.length + 1;
        customerId = `PLG-${String(nextNum).padStart(3, '0')}`;
        const newCustomer = {
          ID_Pelanggan: customerId,
          Nama_Pelanggan: namaPelanggan.trim(),
          Nomor_Telepon: nomorTelepon.trim(),
          Email: email.trim(),
        };
        setCustomers((prev) => [...prev, newCustomer]);
      }
    }

    const totalBiaya = room.Harga_Per_Malam * nights * Number(jumlahKamar);
    const nextResNum = reservations.length + 1;
    const newResId = `RSV-2026-${String(nextResNum).padStart(3, '0')}`;

    const newReservation = {
      ID_Reservasi: newResId,
      ID_Pelanggan: customerId,
      ID_Kamar: roomId,
      Tanggal_Checkin: checkin,
      Tanggal_Checkout: checkout,
      Jumlah_Malam: nights,
      Jumlah_Kamar: Number(jumlahKamar),
      Jumlah_Tamu: Number(jumlahTamu) || 1,
      Total_Biaya: totalBiaya,
      Status_Reservasi: status,
      Catatan: catatan || '',
    };

    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const resetDemoData = () => {
    setRooms(INITIAL_ROOMS);
    setCustomers(INITIAL_CUSTOMERS);
    setReservations(INITIAL_RESERVATIONS);
    setNearbyPlaces(INITIAL_NEARBY);
    showToast('Seluruh data simulasi berhasil dikembalikan ke kondisi awal.');
  };

  // ============================================================================
  // RENDER VIEW BERDASARKAN STATE
  // ============================================================================

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#252525] antialiased selection:bg-[#C5A46D]/30 selection:text-[#172B3A]">
      {/* Inject Font Modern Plus Jakarta Sans & Print Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap');
        body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-serif-luxury { font-family: 'Playfair Display', Georgia, serif; }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Notifikasi Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] no-print animate-fade-in">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-rose-950 text-white border-rose-800'
                : 'bg-[#172B3A] text-white border-[#C5A46D]/40'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#C5A46D] shrink-0" />
            )}
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus Kustom (Pengganti confirm()) */}
      {confirmModal && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="p-2.5 bg-rose-50 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#172B3A]">{confirmModal.title}</h3>
            </div>
            <p className="text-sm text-stone-600 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Login Admin */}
      {showLoginModal && (
        <AdminLoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setIsAdminAuthenticated(true);
            setShowLoginModal(false);
            setActiveView('admin');
            showToast('Berhasil masuk ke Dashboard Admin Din.Ar Hotel.');
          }}
        />
      )}

      {/* TAMPILAN ADMIN DASHBOARD */}
      {activeView === 'admin' && isAdminAuthenticated ? (
        <AdminDashboard
          rooms={rooms}
          setRooms={setRooms}
          customers={customers}
          setCustomers={setCustomers}
          reservations={reservations}
          setReservations={setReservations}
          createReservationRecord={createReservationRecord}
          onBackToSite={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={() => {
            setIsAdminAuthenticated(false);
            setActiveView('home');
            showToast('Anda telah keluar dari Dashboard Admin.');
          }}
          onResetDemo={resetDemoData}
          showToast={showToast}
          setConfirmModal={setConfirmModal}
        />
      ) : (
        /* TAMPILAN WEBSITE PUBLIK */
        <>
          <PublicNavbar
            activeView={activeView}
            isScrolled={isScrolled || activeView !== 'home'}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            scrollToSection={scrollToSection}
            onOpenReservation={() => openReservationWithRoom(rooms[0]?.ID_Kamar)}
            onOpenAdmin={() => {
              if (isAdminAuthenticated) {
                setActiveView('admin');
              } else {
                setShowLoginModal(true);
              }
            }}
          />

          {activeView === 'home' && (
            <PublicHomePage
              rooms={rooms}
              nearbyPlaces={nearbyPlaces}
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
              scrollToSection={scrollToSection}
              onViewRoom={openRoomDetail}
              onBookRoom={openReservationWithRoom}
            />
          )}

          {activeView === 'room-detail' && (
            <RoomDetailPage
              room={rooms.find((r) => r.ID_Kamar === selectedRoomId) || rooms[0]}
              reservations={reservations}
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
              onBack={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onProceedBooking={(roomId, checkin, checkout, guests, roomCount) => {
                setSearchCriteria({ checkin, checkout, guests, roomCount, activeFilter: false });
                openReservationWithRoom(roomId);
              }}
            />
          )}

          {activeView === 'reservation' && (
            <ReservationFlowPage
              rooms={rooms}
              reservations={reservations}
              initialRoomId={selectedRoomId}
              searchCriteria={searchCriteria}
              onBack={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCreateReservation={createReservationRecord}
              showToast={showToast}
            />
          )}

          <PublicFooter
            scrollToSection={scrollToSection}
            onOpenReservation={() => openReservationWithRoom(rooms[0]?.ID_Kamar)}
            onOpenAdmin={() => (isAdminAuthenticated ? setActiveView('admin') : setShowLoginModal(true))}
          />
        </>
      )}
    </div>
  );
}

// ============================================================================
// 5. NAVBAR PUBLIK (TRANSPARAN DI HERO -> SOLID DARK NAVY SAAT SCROLL)
// ============================================================================

function PublicNavbar({
  activeView,
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  onOpenReservation,
  onOpenAdmin,
}) {
  const navItems = [
    { label: 'Home', action: () => scrollToSection('hero') },
    { label: 'Tentang Kami', action: () => scrollToSection('tentang') },
    { label: 'Kamar', action: () => scrollToSection('kamar') },
    { label: 'Fasilitas', action: () => scrollToSection('fasilitas') },
    { label: 'Lokasi', action: () => scrollToSection('lokasi') },
    { label: 'Reservasi', action: onOpenReservation },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-[#172B3A]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-[#C5A46D]/20'
          : 'bg-gradient-to-b from-[#172B3A]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-[#C5A46D]/15 border border-[#C5A46D]/50 flex items-center justify-center group-hover:bg-[#C5A46D]/25 transition-colors">
            <Hotel className="w-5 h-5 text-[#C5A46D]" />
          </div>
          <div className="text-left">
            <span className="font-serif-luxury text-2xl font-bold tracking-wide text-white">
              Din<span className="text-[#C5A46D]">.</span>Ar
            </span>
            <span className="block text-[9px] uppercase tracking-[0.28em] text-[#C5A46D] -mt-1">
              Hotel Madiun
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`text-sm font-medium transition-colors hover:text-[#C5A46D] ${
                item.label === 'Reservasi' && activeView === 'reservation'
                  ? 'text-[#C5A46D]'
                  : 'text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#172B3A] text-sm font-semibold transition-all duration-200"
          >
            <LogIn className="w-4 h-4" />
            Login Admin
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#172B3A] border-t border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="block w-full text-left px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-[#C5A46D] text-sm font-medium"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 px-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C5A46D] text-[#172B3A] font-semibold text-sm"
            >
              <LogIn className="w-4 h-4" />
              Login Admin (SIM)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ============================================================================
// 6. HALAMAN BERANDA (HOMEPAGE)
// ============================================================================

function PublicHomePage({
  rooms,
  nearbyPlaces,
  searchCriteria,
  setSearchCriteria,
  scrollToSection,
  onViewRoom,
  onBookRoom,
}) {
  const handleHeroSearch = (e) => {
    e.preventDefault();
    setSearchCriteria((prev) => ({ ...prev, activeFilter: true }));
    scrollToSection('kamar');
  };

  const filteredRooms = useMemo(() => {
    if (!searchCriteria.activeFilter) return rooms;
    return rooms.filter(
      (r) => r.Kapasitas >= Number(searchCriteria.guests) && r.Status_Kamar === 'Tersedia'
    );
  }, [rooms, searchCriteria]);

  return (
    <main>
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#172B3A]/80 via-[#172B3A]/65 to-[#172B3A]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A46D]/40 text-[#C5A46D] text-xs font-medium tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Madiun, Jawa Timur • Modern Luxury Hospitality
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5">
              Experience Comfort, <br />
              <span className="text-[#C5A46D]">Discover Elegance</span>
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed mb-8">
              Temukan kenyamanan dan pengalaman menginap terbaik bersama Din.Ar Hotel.
              Perpaduan desain modern yang tenang, pelayanan hangat, dan sistem reservasi terintegrasi di jantung Kota Madiun.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('kamar')}
                className="px-7 py-3.5 rounded-full bg-[#C5A46D] hover:bg-[#b5935c] text-[#172B3A] font-semibold text-sm transition-all shadow-lg shadow-[#C5A46D]/20 flex items-center gap-2"
              >
                Jelajahi Kamar
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onBookRoom(rooms[0]?.ID_Kamar)}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all"
              >
                Reservasi Sekarang
              </button>
            </div>
          </div>

          {/* FORM PENCARIAN KAMAR DI HERO */}
          <form
            onSubmit={handleHeroSearch}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#C5A46D]/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] uppercase tracking-wider mb-1.5">
                Check-in
              </label>
              <input
                type="date"
                value={searchCriteria.checkin}
                min={getTodayString(0)}
                onChange={(e) =>
                  setSearchCriteria((prev) => ({ ...prev, checkin: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm font-medium text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] uppercase tracking-wider mb-1.5">
                Check-out
              </label>
              <input
                type="date"
                value={searchCriteria.checkout}
                min={searchCriteria.checkin || getTodayString(1)}
                onChange={(e) =>
                  setSearchCriteria((prev) => ({ ...prev, checkout: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm font-medium text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] uppercase tracking-wider mb-1.5">
                Jumlah Tamu
              </label>
              <select
                value={searchCriteria.guests}
                onChange={(e) =>
                  setSearchCriteria((prev) => ({ ...prev, guests: Number(e.target.value) }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm font-medium text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Tamu
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] uppercase tracking-wider mb-1.5">
                Jumlah Kamar
              </label>
              <select
                value={searchCriteria.roomCount}
                onChange={(e) =>
                  setSearchCriteria((prev) => ({ ...prev, roomCount: Number(e.target.value) }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm font-medium text-[#172B3A] focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Kamar
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#172B3A] hover:bg-[#1f394d] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Search className="w-4 h-4 text-[#C5A46D]" />
              Cari Kamar
            </button>
          </form>
        </div>
      </section>

      {/* TENTANG HOTEL */}
      <section id="tentang" className="py-20 sm:py-24 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=85"
                  alt="Interior Din.Ar Hotel"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#172B3A] text-white p-6 rounded-2xl shadow-xl border border-[#C5A46D]/40 max-w-xs">
                <p className="text-[#C5A46D] text-xs font-semibold uppercase tracking-widest mb-1">
                  Lokasi Strategis
                </p>
                <p className="text-sm leading-relaxed text-white/90">
                  313 Jl. Urip Sumoharjo, Madiun, Jawa Timur, Indonesia
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A46D]">
                Tentang Din.Ar Hotel
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#172B3A] mt-2 mb-5 leading-tight">
                Kenyamanan Modern & Tata Kelola Perhotelan Terintegrasi
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                <strong>Din.Ar Hotel</strong> menghadirkan suasana menginap yang bersih, tenang, dan
                berkelas di koridor utama Jalan Urip Sumoharjo, Madiun. Dirancang untuk wisatawan
                bisnis maupun keluarga, setiap sudut hotel mengutamakan kehangatan pelayanan dan
                kenyamanan modern.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                Sebagai bagian dari pengembangan proyek <strong>Sistem Informasi Manajemen (SIM)</strong>,
                platform ini tidak hanya menjadi jendela informasi bagi tamu, tetapi juga antarmuka
                manajemen reservasi, data kamar, pelanggan, dan pelaporan operasional yang siap
                disinkronkan dengan basis data Microsoft Access.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#172B3A]/5 text-[#C5A46D]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#172B3A]">Alamat Utama</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      313 Jl. Urip Sumoharjo, Madiun, Jawa Timur
                    </p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#172B3A]/5 text-[#C5A46D]">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#172B3A]">Berbasis SIM</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Mendukung keputusan operasional & integrasi MS Access
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILIHAN KAMAR */}
      <section id="kamar" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A46D]">
                Akomodasi Pilihan
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#172B3A] mt-2">
                Pilihan Kamar & Suite
              </h2>
            </div>
            {searchCriteria.activeFilter && (
              <div className="flex items-center gap-3 bg-[#F8F6F1] px-4 py-2 rounded-xl border border-[#C5A46D]/40 text-xs">
                <span className="text-[#172B3A] font-medium">
                  Filter aktif: ≥ {searchCriteria.guests} Tamu • Status Tersedia
                </span>
                <button
                  onClick={() =>
                    setSearchCriteria((prev) => ({ ...prev, activeFilter: false }))
                  }
                  className="text-[#C5A46D] font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* Label Transparansi Data Demonstrasi */}
          <div className="mb-10 flex items-start gap-3 p-4 rounded-2xl bg-[#F8F6F1] border border-[#C5A46D]/30 text-sm text-[#172B3A]">
            <Info className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm leading-relaxed">
              <strong>Catatan Data Demonstrasi:</strong> Tipe kamar, tarif per malam, dan status
              ketersediaan yang ditampilkan di bawah merupakan <em>data simulasi proyek SIM</em> dan
              dapat diperbarui secara langsung oleh pengelola melalui <strong>Dashboard Admin</strong>.
            </p>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="text-center py-16 bg-[#F8F6F1] rounded-3xl border border-stone-200">
              <BedDouble className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#172B3A]">
                Tidak ada kamar yang sesuai kriteria pencarian
              </h3>
              <p className="text-sm text-stone-500 mt-1 mb-4">
                Coba kurangi jumlah tamu atau tampilkan seluruh tipe kamar.
              </p>
              <button
                onClick={() =>
                  setSearchCriteria((prev) => ({ ...prev, activeFilter: false }))
                }
                className="px-5 py-2.5 rounded-xl bg-[#172B3A] text-white text-sm font-semibold"
              >
                Tampilkan Semua Kamar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredRooms.map((room) => (
                <div
                  key={room.ID_Kamar}
                  className="group bg-[#F8F6F1] rounded-3xl overflow-hidden border border-stone-200/90 hover:border-[#C5A46D]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={room.Foto_Utama}
                      alt={room.Tipe_Kamar}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusBadgeClass(
                          room.Status_Kamar
                        )}`}
                      >
                        {room.Status_Kamar}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#172B3A]/85 text-[#C5A46D] backdrop-blur-sm">
                        Data Simulasi
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#172B3A]/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-[#C5A46D]/30">
                      <span className="text-xs text-white/70 block">Mulai dari</span>
                      <span className="text-base font-bold text-[#C5A46D]">
                        {formatRupiah(room.Harga_Per_Malam)}
                      </span>
                      <span className="text-xs text-white/70"> / malam</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-serif-luxury text-2xl font-bold text-[#172B3A]">
                        {room.Tipe_Kamar}
                      </h3>
                      <span className="text-xs font-semibold text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                        {room.ID_Kamar}
                      </span>
                    </div>

                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      {room.Deskripsi_Singkat}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-medium text-[#172B3A] mb-4 pb-4 border-b border-stone-200">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#C5A46D]" />
                        Maks. {room.Kapasitas} Tamu
                      </span>
                      {room.Ukuran_Kamar && (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-[#C5A46D]" />
                          {room.Ukuran_Kamar}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(room.Fasilitas || []).slice(0, 4).map((fas) => (
                        <span
                          key={fas}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white text-stone-600 border border-stone-200"
                        >
                          {fas}
                        </span>
                      ))}
                      {(room.Fasilitas || []).length > 4 && (
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white text-[#C5A46D] border border-stone-200">
                          +{room.Fasilitas.length - 4} lainnya
                        </span>
                      )}
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onViewRoom(room.ID_Kamar)}
                        className="py-3 px-4 rounded-xl border border-[#172B3A] text-[#172B3A] hover:bg-[#172B3A] hover:text-white font-semibold text-sm transition-colors"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => onBookRoom(room.ID_Kamar)}
                        disabled={room.Status_Kamar !== 'Tersedia'}
                        className={`py-3 px-4 rounded-xl font-semibold text-sm transition-colors ${
                          room.Status_Kamar === 'Tersedia'
                            ? 'bg-[#C5A46D] hover:bg-[#b5935c] text-[#172B3A]'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        {room.Status_Kamar === 'Tersedia' ? 'Pesan Sekarang' : room.Status_Kamar}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FASILITAS HOTEL */}
      <section id="fasilitas" className="py-20 sm:py-24 bg-[#172B3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A46D]">
              Fasilitas & Layanan
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Dirancang untuk Kenyamanan Menyeluruh
            </h2>
            <p className="text-sm text-white/75">
              Ilustrasi fasilitas penunjang standar hotel modern untuk menunjang pengalaman menginap Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES_DEMO.map((fac) => {
              const Icon = fac.icon;
              return (
                <div
                  key={fac.title}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C5A46D]/50 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172B3A] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 p-2.5 rounded-xl bg-[#172B3A]/90 border border-[#C5A46D]/40 text-[#C5A46D]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{fac.title}</h3>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/75">
              <Info className="w-4 h-4 text-[#C5A46D] shrink-0" />
              Daftar fasilitas di atas ditampilkan sebagai ilustrasi demonstrasi sistem dan menunggu konfirmasi resmi pengelola Din.Ar Hotel.
            </p>
          </div>
        </div>
      </section>

      {/* LOKASI HOTEL */}
      <section id="lokasi" className="py-20 sm:py-24 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A46D]">
                Lokasi & Aksesibilitas
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#172B3A] mt-2 mb-4">
                Kunjungi Din.Ar Hotel
              </h2>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#172B3A]">Alamat Lengkap</h4>
                    <p className="text-sm text-stone-600 mt-1">
                      313 Jl. Urip Sumoharjo, Madiun, Jawa Timur, Indonesia
                    </p>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      <strong>Petunjuk Akses:</strong> Terletak di ruas jalan arteri utama Jl. Urip
                      Sumoharjo yang mudah dijangkau dari pusat Kota Madiun, jalur penghubung
                      antar-kota, maupun akses menuju Stasiun Madiun.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-[#172B3A] uppercase tracking-wider">
                  Fasilitas Penunjang Sekitar
                </h4>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                  Data Dapat Diperbarui
                </span>
              </div>

              <div className="space-y-3">
                {nearbyPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="bg-white p-4 rounded-xl border border-stone-200/80 hover:border-[#C5A46D]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-semibold text-sm text-[#172B3A]">{place.nama}</h5>
                      <span className="text-[11px] font-medium text-[#C5A46D] bg-[#172B3A] px-2 py-0.5 rounded-md">
                        {place.kategori}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{place.deskripsi}</p>
                    <p className="text-[11px] text-stone-400 mt-1 font-medium">{place.estimasi}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-3 rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
                <iframe
                  title="Peta Lokasi Din.Ar Hotel Madiun"
                  src="https://maps.google.com/maps?q=313%20Jl.%20Urip%20Sumoharjo,%20Madiun,%20Jawa%20Timur,%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-[460px] rounded-2xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// 7. HALAMAN DETAIL KAMAR
// ============================================================================

function RoomDetailPage({
  room,
  reservations,
  searchCriteria,
  onBack,
  onProceedBooking,
}) {
  const [activePhoto, setActivePhoto] = useState(room.Foto_Utama);
  const [checkin, setCheckin] = useState(searchCriteria.checkin || getTodayString(1));
  const [checkout, setCheckout] = useState(searchCriteria.checkout || getTodayString(3));
  const [guests, setGuests] = useState(Math.min(searchCriteria.guests || 2, room.Kapasitas));
  const [roomCount, setRoomCount] = useState(searchCriteria.roomCount || 1);

  useEffect(() => {
    setActivePhoto(room.Foto_Utama);
  }, [room]);

  const nights = calculateNights(checkin, checkout);
  const totalHarga = nights > 0 ? room.Harga_Per_Malam * nights * roomCount : 0;

  const gallery = room.Galeri && room.Galeri.length > 0 ? room.Galeri : [room.Foto_Utama];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#172B3A] hover:text-[#C5A46D] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Kiri: Galeri & Informasi Lengkap */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-3 rounded-3xl border border-stone-200 shadow-sm">
            <div className="h-[340px] sm:h-[420px] rounded-2xl overflow-hidden mb-3">
              <img
                src={activePhoto}
                alt={room.Tipe_Kamar}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(imgUrl)}
                  className={`h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activePhoto === imgUrl
                      ? 'border-[#C5A46D] ring-2 ring-[#C5A46D]/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-[#C5A46D] uppercase tracking-widest">
                  {room.ID_Kamar} • Data Demonstrasi
                </span>
                <h1 className="font-serif-luxury text-3xl font-bold text-[#172B3A] mt-1">
                  {room.Tipe_Kamar}
                </h1>
              </div>
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${statusBadgeClass(
                  room.Status_Kamar
                )}`}
              >
                Status: {room.Status_Kamar}
              </span>
            </div>

            <div className="flex flex-wrap gap-5 py-4 border-y border-stone-100 mb-5 text-sm text-[#172B3A]">
              <span className="flex items-center gap-2 font-medium">
                <Users className="w-4 h-4 text-[#C5A46D]" />
                Kapasitas: Maks. {room.Kapasitas} Tamu
              </span>
              {room.Ukuran_Kamar && (
                <span className="flex items-center gap-2 font-medium">
                  <Building2 className="w-4 h-4 text-[#C5A46D]" />
                  Luas: {room.Ukuran_Kamar}
                </span>
              )}
              <span className="flex items-center gap-2 font-bold text-[#C5A46D]">
                <DollarSign className="w-4 h-4" />
                {formatRupiah(room.Harga_Per_Malam)} / malam
              </span>
            </div>

            <h3 className="font-bold text-[#172B3A] mb-2">Deskripsi Kamar</h3>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              {room.Deskripsi_Lengkap || room.Deskripsi_Singkat}
            </p>

            <h3 className="font-bold text-[#172B3A] mb-3">Fasilitas Kamar</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(room.Fasilitas || []).map((fas) => (
                <div
                  key={fas}
                  className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 bg-[#F8F6F1] px-3 py-2.5 rounded-xl border border-stone-200/70"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>{fas}</span>
                </div>
              ))}
            </div>
          </div>

          <RoomAvailabilityCalendar roomId={room.ID_Kamar} reservations={reservations} />
        </div>

        {/* Kanan: Kalkulator & Form Pemesanan Cepat */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white rounded-3xl border border-[#C5A46D]/40 p-6 sm:p-7 shadow-xl">
            <div className="flex items-baseline justify-between pb-4 mb-5 border-b border-stone-100">
              <div>
                <span className="text-xs text-stone-500 block">Tarif Simulasi per Malam</span>
                <span className="text-2xl font-bold text-[#172B3A]">
                  {formatRupiah(room.Harga_Per_Malam)}
                </span>
              </div>
              <span className="text-xs font-medium text-[#C5A46D] bg-[#172B3A] px-2.5 py-1 rounded-lg">
                Kalkulasi Otomatis
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172B3A] mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkin}
                    min={getTodayString(0)}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172B3A] mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkout}
                    min={checkin}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#172B3A] mb-1">
                    Jumlah Tamu
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  >
                    {Array.from({ length: room.Kapasitas * roomCount }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} Tamu
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#172B3A] mb-1">
                    Jumlah Kamar
                  </label>
                  <select
                    value={roomCount}
                    onChange={(e) => setRoomCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Kamar
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rincian Biaya Otomatis */}
              <div className="bg-[#F8F6F1] rounded-2xl p-4 border border-stone-200 space-y-2 text-sm">
                <h4 className="font-bold text-[#172B3A] text-xs uppercase tracking-wider mb-2">
                  Rincian Estimasi Biaya
                </h4>
                <div className="flex justify-between text-stone-600">
                  <span>Harga per Malam</span>
                  <span>{formatRupiah(room.Harga_Per_Malam)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Durasi Menginap</span>
                  <span>{nights > 0 ? `${nights} Malam` : 'Tanggal tidak valid'}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Jumlah Kamar</span>
                  <span>{roomCount} Kamar</span>
                </div>
                <div className="pt-2 mt-2 border-t border-stone-200 flex justify-between font-bold text-[#172B3A] text-base">
                  <span>Total Biaya</span>
                  <span className="text-[#C5A46D]">{formatRupiah(totalHarga)}</span>
                </div>
                <p className="text-[11px] text-stone-400 pt-1">
                  Rumus: Harga/Malam × Jumlah Malam × Jumlah Kamar
                </p>
              </div>

              <button
                type="button"
                disabled={nights <= 0 || room.Status_Kamar !== 'Tersedia'}
                onClick={() => onProceedBooking(room.ID_Kamar, checkin, checkout, guests, roomCount)}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  nights > 0 && room.Status_Kamar === 'Tersedia'
                    ? 'bg-[#172B3A] hover:bg-[#223d52] text-white shadow-lg'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {room.Status_Kamar !== 'Tersedia'
                  ? `Kamar Sedang ${room.Status_Kamar}`
                  : 'Lanjutkan ke Reservasi'}
                <ChevronRight className="w-4 h-4 text-[#C5A46D]" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Belum ada pembayaran online. Konfirmasi & pembayaran dilakukan secara langsung dengan pihak resepsionis hotel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. HALAMAN SISTEM RESERVASI (STEP-BY-STEP FLOW)
// ============================================================================

function ReservationFlowPage({
  rooms,
  reservations,
  initialRoomId,
  searchCriteria,
  onBack,
  onCreateReservation,
  showToast,
}) {
  const [step, setStep] = useState(1); // 1: Pilih Kamar & Tanggal, 2: Data Pelanggan, 3: Konfirmasi, 4: Selesai
  const [formData, setFormData] = useState({
    roomId: initialRoomId || rooms[0]?.ID_Kamar || '',
    checkin: searchCriteria.checkin || getTodayString(1),
    checkout: searchCriteria.checkout || getTodayString(3),
    guests: searchCriteria.guests || 2,
    roomCount: searchCriteria.roomCount || 1,
    namaPelanggan: '',
    nomorTelepon: '',
    email: '',
    catatan: '',
  });
  const [createdBooking, setCreatedBooking] = useState(null);

  const selectedRoom = rooms.find((r) => r.ID_Kamar === formData.roomId) || rooms[0];
  const nights = calculateNights(formData.checkin, formData.checkout);
  const totalBiaya = selectedRoom && nights > 0 ? selectedRoom.Harga_Per_Malam * nights * formData.roomCount : 0;

  // Pemeriksaan ketersediaan kamar otomatis
  const availabilityCheck = useMemo(() => {
    if (!selectedRoom) return { ok: false, message: 'Silakan pilih tipe kamar.' };
    if (selectedRoom.Status_Kamar !== 'Tersedia') {
      return {
        ok: false,
        message: `Maaf, kamar ${selectedRoom.Tipe_Kamar} saat ini berstatus "${selectedRoom.Status_Kamar}". Silakan pilih tipe kamar lain.`,
      };
    }
    if (nights <= 0) {
      return { ok: false, message: 'Tanggal Check-out harus lebih lambat dari tanggal Check-in.' };
    }
    // Cek bentrok tanggal pada kamar tersebut (untuk demonstrasi SIM)
    const conflict = reservations.find((r) => {
      if (r.ID_Kamar !== selectedRoom.ID_Kamar || r.Status_Reservasi === 'Dibatalkan') return false;
      return formData.checkin < r.Tanggal_Checkout && formData.checkout > r.Tanggal_Checkin;
    });
    if (conflict) {
      return {
        ok: false,
        message: `Terdapat jadwal reservasi lain (${conflict.ID_Reservasi}: ${conflict.Tanggal_Checkin} s/d ${conflict.Tanggal_Checkout}) pada tanggal tersebut. Silakan pilih tanggal lain.`,
      };
    }
    const maxCap = selectedRoom.Kapasitas * formData.roomCount;
    if (formData.guests > maxCap) {
      return {
        ok: false,
        message: `Kapasitas maksimal untuk ${formData.roomCount} kamar ${selectedRoom.Tipe_Kamar} adalah ${maxCap} tamu. Tambah jumlah kamar atau pilih suite lebih besar.`,
      };
    }
    return {
      ok: true,
      message: `Kamar ${selectedRoom.Tipe_Kamar} tersedia untuk ${nights} malam (${formData.checkin} s/d ${formData.checkout}).`,
    };
  }, [selectedRoom, nights, formData, reservations]);

  const handleConfirmBooking = () => {
    const result = onCreateReservation({
      namaPelanggan: formData.namaPelanggan,
      nomorTelepon: formData.nomorTelepon,
      email: formData.email,
      roomId: formData.roomId,
      checkin: formData.checkin,
      checkout: formData.checkout,
      jumlahKamar: formData.roomCount,
      jumlahTamu: formData.guests,
      catatan: formData.catatan,
      status: 'Menunggu Konfirmasi',
    });

    if (result) {
      setCreatedBooking(result);
      setStep(4);
      showToast(`Reservasi ${result.ID_Reservasi} berhasil dibuat!`);
    } else {
      showToast('Gagal membuat reservasi. Periksa kembali data Anda.', 'error');
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#172B3A] hover:text-[#C5A46D] mb-6 no-print"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </button>

      <div className="mb-8 no-print">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#C5A46D]">
          Sistem Reservasi Online
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#172B3A] mt-1">
          Formulir Pemesanan Kamar
        </h1>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-4 gap-2 mb-8 no-print">
        {[
          { num: 1, label: 'Kamar & Tanggal' },
          { num: 2, label: 'Data Pelanggan' },
          { num: 3, label: 'Konfirmasi' },
          { num: 4, label: 'Kode Reservasi' },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-xl border text-center transition-all ${
              step === s.num
                ? 'bg-[#172B3A] text-white border-[#172B3A]'
                : step > s.num
                ? 'bg-[#C5A46D]/20 text-[#172B3A] border-[#C5A46D]/40'
                : 'bg-white text-stone-400 border-stone-200'
            }`}
          >
            <span className="text-xs font-bold block">Langkah {s.num}</span>
            <span className="text-[11px] sm:text-xs font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: PILIH KAMAR & TANGGAL */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#172B3A]">1. Pilih Tipe Kamar & Jadwal Menginap</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((r) => (
              <button
                key={r.ID_Kamar}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, roomId: r.ID_Kamar }))}
                className={`text-left p-4 rounded-2xl border-2 transition-all flex gap-4 items-center ${
                  formData.roomId === r.ID_Kamar
                    ? 'border-[#C5A46D] bg-[#F8F6F1]'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <img
                  src={r.Foto_Utama}
                  alt={r.Tipe_Kamar}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-[#172B3A] truncate">{r.Tipe_Kamar}</h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${statusBadgeClass(
                        r.Status_Kamar
                      )}`}
                    >
                      {r.Status_Kamar}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">Maks. {r.Kapasitas} Tamu</p>
                  <p className="text-sm font-bold text-[#C5A46D] mt-1">
                    {formatRupiah(r.Harga_Per_Malam)} / malam
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Tanggal Check-in</label>
              <input
                type="date"
                value={formData.checkin}
                min={getTodayString(0)}
                onChange={(e) => setFormData((p) => ({ ...p, checkin: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Tanggal Check-out</label>
              <input
                type="date"
                value={formData.checkout}
                min={formData.checkin}
                onChange={(e) => setFormData((p) => ({ ...p, checkout: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Jumlah Tamu</label>
              <input
                type="number"
                min={1}
                max={20}
                value={formData.guests}
                onChange={(e) => setFormData((p) => ({ ...p, guests: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Jumlah Kamar</label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.roomCount}
                onChange={(e) => setFormData((p) => ({ ...p, roomCount: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
              />
            </div>
          </div>

          {/* Hasil Pemeriksaan Ketersediaan */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 text-sm ${
              availabilityCheck.ok
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            {availabilityCheck.ok ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {availabilityCheck.ok ? 'Kamar Tersedia' : 'Periksa Kembali Jadwal / Kamar'}
              </p>
              <p className="text-xs mt-0.5">{availabilityCheck.message}</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-stone-100">
            <div>
              <span className="text-xs text-stone-500 block">Estimasi Total ({nights} malam)</span>
              <span className="text-xl font-bold text-[#172B3A]">{formatRupiah(totalBiaya)}</span>
            </div>
            <button
              type="button"
              disabled={!availabilityCheck.ok}
              onClick={() => setStep(2)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 ${
                availabilityCheck.ok
                  ? 'bg-[#172B3A] hover:bg-[#223d52] text-white'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              Lanjut: Data Pelanggan
              <ChevronRight className="w-4 h-4 text-[#C5A46D]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATA PELANGGAN */}
      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(3);
          }}
          className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5"
        >
          <h2 className="text-lg font-bold text-[#172B3A]">2. Isi Data Pelanggan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Ahmad Fauzi"
                value={formData.namaPelanggan}
                onChange={(e) => setFormData((p) => ({ ...p, namaPelanggan: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">
                Nomor Telepon / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="08xx-xxxx-xxxx"
                value={formData.nomorTelepon}
                onChange={(e) => setFormData((p) => ({ ...p, nomorTelepon: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">
                Alamat Email *
              </label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">
                Catatan Khusus (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Permintaan khusus, perkiraan jam kedatangan, dll."
                value={formData.catatan}
                onChange={(e) => setFormData((p) => ({ ...p, catatan: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white text-sm font-semibold flex items-center gap-2"
            >
              Lanjut: Ringkasan & Konfirmasi
              <ChevronRight className="w-4 h-4 text-[#C5A46D]" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: RINGKASAN & KONFIRMASI */}
      {step === 3 && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#172B3A]">3. Ringkasan Biaya & Konfirmasi Pemesanan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8F6F1] p-5 rounded-2xl border border-stone-200 space-y-2 text-sm">
              <h4 className="font-bold text-[#172B3A] mb-2">Detail Pemesan & Kamar</h4>
              <p><span className="text-stone-500">Nama:</span> <strong>{formData.namaPelanggan}</strong></p>
              <p><span className="text-stone-500">Telepon:</span> {formData.nomorTelepon}</p>
              <p><span className="text-stone-500">Email:</span> {formData.email}</p>
              <hr className="border-stone-200 my-2" />
              <p><span className="text-stone-500">Tipe Kamar:</span> <strong>{selectedRoom?.Tipe_Kamar}</strong></p>
              <p><span className="text-stone-500">Check-in / Check-out:</span> {formData.checkin} s/d {formData.checkout}</p>
              <p><span className="text-stone-500">Tamu / Kamar:</span> {formData.guests} Tamu, {formData.roomCount} Kamar</p>
            </div>

            <div className="bg-[#172B3A] text-white p-5 rounded-2xl space-y-2.5 text-sm">
              <h4 className="font-bold text-[#C5A46D] uppercase tracking-wider text-xs mb-3">
                Rincian Perhitungan Biaya
              </h4>
              <div className="flex justify-between text-white/80">
                <span>Harga Kamar / Malam</span>
                <span>{formatRupiah(selectedRoom?.Harga_Per_Malam)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Jumlah Malam</span>
                <span>× {nights} Malam</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Jumlah Kamar</span>
                <span>× {formData.roomCount} Kamar</span>
              </div>
              <div className="pt-3 mt-3 border-t border-white/15 flex justify-between items-baseline">
                <span className="font-semibold">Total Biaya</span>
                <span className="text-2xl font-bold text-[#C5A46D]">{formatRupiah(totalBiaya)}</span>
              </div>
            </div>
          </div>

          {/* Pemberitahuan Transparan Non-Payment Gateway */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-900">
            <CreditCard className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Informasi Pembayaran (Belum Menggunakan Payment Gateway)</p>
              <p className="mt-0.5 leading-relaxed">
                Sistem reservasi ini belum terintegrasi dengan pembayaran online otomatis. Setelah Anda
                mengonfirmasi pemesanan, reservasi akan berstatus <strong>Menunggu Konfirmasi</strong>{' '}
                dan pembayaran dilakukan secara langsung saat verifikasi / check-in di resepsionis Din.Ar Hotel.
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50"
            >
              Ubah Data
            </button>
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-7 py-3 rounded-xl bg-[#C5A46D] hover:bg-[#b5935c] text-[#172B3A] font-bold text-sm shadow-lg"
            >
              Konfirmasi Reservasi Sekarang
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: BUKTI KODE RESERVASI */}
      {step === 4 && createdBooking && (
        <div className="bg-white rounded-3xl border border-[#C5A46D]/50 p-6 sm:p-10 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
            Reservasi Tercatat di Sistem
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#172B3A] mt-1 mb-2">
            Terima Kasih, {formData.namaPelanggan}!
          </h2>
          <p className="text-sm text-stone-600 max-w-lg mx-auto mb-6">
            Permintaan reservasi Anda telah tersimpan dan kini dapat dilihat oleh pengelola Din.Ar Hotel
            melalui Dashboard Admin.
          </p>

          <div className="inline-block bg-[#172B3A] text-white px-8 py-4 rounded-2xl border border-[#C5A46D]/40 mb-8">
            <span className="text-[11px] uppercase tracking-widest text-white/70 block">
              Kode Reservasi Anda
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-[#C5A46D] tracking-wider">
              {createdBooking.ID_Reservasi}
            </span>
          </div>

          <div className="max-w-xl mx-auto text-left bg-[#F8F6F1] rounded-2xl p-5 border border-stone-200 text-sm space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-stone-500">Status Reservasi</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                {createdBooking.Status_Reservasi}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tipe Kamar</span>
              <span className="font-semibold text-[#172B3A]">{selectedRoom?.Tipe_Kamar}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Check-in — Check-out</span>
              <span className="font-medium">
                {createdBooking.Tanggal_Checkin} s/d {createdBooking.Tanggal_Checkout} ({createdBooking.Jumlah_Malam} malam)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Jumlah Kamar / Tamu</span>
              <span className="font-medium">
                {createdBooking.Jumlah_Kamar} Kamar • {createdBooking.Jumlah_Tamu} Tamu
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-base">
              <span className="text-[#172B3A]">Total Biaya</span>
              <span className="text-[#C5A46D]">{formatRupiah(createdBooking.Total_Biaya)}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl border border-[#172B3A] text-[#172B3A] text-sm font-semibold flex items-center gap-2 hover:bg-stone-50"
            >
              <Printer className="w-4 h-4" />
              Cetak Bukti Reservasi
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-[#172B3A] text-white text-sm font-semibold hover:bg-[#223d52]"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 9. FOOTER PUBLIK
// ============================================================================

function PublicFooter({ scrollToSection, onOpenReservation, onOpenAdmin }) {
  return (
    <footer className="bg-[#172B3A] text-white pt-16 pb-8 border-t border-[#C5A46D]/20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C5A46D]/15 border border-[#C5A46D]/50 flex items-center justify-center">
                <Hotel className="w-5 h-5 text-[#C5A46D]" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold">
                Din<span className="text-[#C5A46D]">.</span>Ar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
              Hotel modern yang mengedepankan kenyamanan, ketenangan, dan layanan reservasi
              terintegrasi untuk proyek Sistem Informasi Manajemen (SIM).
            </p>
            <p className="text-xs text-[#C5A46D]">
              313 Jl. Urip Sumoharjo, Madiun, Jawa Timur, Indonesia
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#C5A46D] mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><button onClick={() => scrollToSection('hero')} className="hover:text-[#C5A46D]">Beranda</button></li>
              <li><button onClick={() => scrollToSection('tentang')} className="hover:text-[#C5A46D]">Tentang Kami</button></li>
              <li><button onClick={() => scrollToSection('kamar')} className="hover:text-[#C5A46D]">Pilihan Kamar</button></li>
              <li><button onClick={() => scrollToSection('fasilitas')} className="hover:text-[#C5A46D]">Fasilitas Hotel</button></li>
              <li><button onClick={onOpenReservation} className="hover:text-[#C5A46D]">Reservasi Online</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-[#C5A46D]">Dashboard Admin (SIM)</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#C5A46D] mb-4">
              Kontak (Demonstrasi)
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A46D]" />
                <span>(0351) 000-0000 (Kontak Simulasi)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A46D]" />
                <span>reservasi@dinarhotel-demo.id</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-0.5" />
                <span>313 Jl. Urip Sumoharjo, Madiun, Jawa Timur</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#C5A46D] mb-4">
              Media Sosial
            </h4>
            <p className="text-xs text-white/65 mb-4">
              Ikuti pembaruan informasi dan promo resmi (tautan simulasi proyek SIM).
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Mail, Globe].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors"
                  aria-label="Media sosial"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© 2026 Din.Ar Hotel. Seluruh hak cipta dilindungi.</p>
          <p>Dikembangkan untuk Proyek Akhir Mata Kuliah Sistem Informasi Manajemen (SIM)</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// 10. MODAL LOGIN ADMIN
// ============================================================================

function AdminLoginModal({ onClose, onSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('dinar2026');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'dinar2026') {
      onSuccess();
    } else {
      setError('Username atau password salah. Gunakan akun demo: admin / dinar2026.');
    }
  };

  return (
    <div className="fixed inset-0 z-[80] bg-[#172B3A]/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border border-[#C5A46D]/30 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-[#172B3A] text-[#C5A46D]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#172B3A]">Login Admin</h3>
            <p className="text-xs text-stone-500">Sistem Informasi Manajemen Din.Ar Hotel</p>
          </div>
        </div>

        <div className="mb-5 p-3.5 rounded-xl bg-[#F8F6F1] border border-[#C5A46D]/30 text-xs text-[#172B3A]">
          <strong>Kredensial Demo SIM:</strong> Username <code className="font-bold">admin</code> • Password{' '}
          <code className="font-bold">dinar2026</code>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#172B3A] mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white font-semibold text-sm transition-colors"
          >
            Masuk ke Dashboard Admin
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className="w-full py-2.5 rounded-xl bg-[#C5A46D]/20 hover:bg-[#C5A46D]/30 text-[#172B3A] font-semibold text-xs transition-colors"
          >
            Masuk Cepat (Mode Presentasi SIM)
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 11. DASHBOARD ADMIN (SIDEBAR + 6 MODUL SIM)
// ============================================================================

function AdminDashboard({
  rooms,
  setRooms,
  customers,
  setCustomers,
  reservations,
  setReservations,
  createReservationRecord,
  onBackToSite,
  onLogout,
  onResetDemo,
  showToast,
  setConfirmModal,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Manajemen Kamar', icon: BedDouble },
    { id: 'customers', label: 'Manajemen Pelanggan', icon: Users },
    { id: 'reservations', label: 'Manajemen Reservasi', icon: ListChecks },
    { id: 'reports', label: 'Laporan', icon: FileBarChart },
    { id: 'ms-access', label: 'Integrasi MS Access', icon: Database },
  ];

  // Helper Lookup
  const getCustomerName = (id) =>
    customers.find((c) => c.ID_Pelanggan === id)?.Nama_Pelanggan || id;
  const getRoomType = (id) =>
    rooms.find((r) => r.ID_Kamar === id)?.Tipe_Kamar || id;

  return (
    <div className="min-h-screen flex bg-[#F8F6F1]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden no-print"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Dark Navy */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#172B3A] text-white flex flex-col transition-transform duration-300 no-print ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#C5A46D]/20 border border-[#C5A46D]/50 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-[#C5A46D]" />
            </div>
            <div>
              <span className="font-serif-luxury text-xl font-bold block leading-none">
                Din<span className="text-[#C5A46D]">.</span>Ar
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A46D]">
                Admin SIM
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#C5A46D] text-[#172B3A] font-bold shadow-md'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-[#C5A46D]" />
            Lihat Website Publik
          </button>
          <button
            onClick={onResetDemo}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-white/75 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-[#C5A46D]" />
            Reset Data Demo
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-rose-300 hover:bg-rose-500/15 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Admin */}
        <header className="bg-white border-b border-stone-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 no-print">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 text-[#172B3A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#172B3A]">
                {menuItems.find((m) => m.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-stone-500">
                Din.Ar Hotel • 313 Jl. Urip Sumoharjo, Madiun
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
              <Info className="w-3.5 h-3.5" />
              Mode Simulasi SIM
            </span>
            <div className="w-9 h-9 rounded-full bg-[#172B3A] text-[#C5A46D] flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 flex-1 overflow-x-hidden">
          {activeTab === 'overview' && (
            <AdminOverviewTab
              rooms={rooms}
              reservations={reservations}
              getCustomerName={getCustomerName}
              getRoomType={getRoomType}
            />
          )}

          {activeTab === 'rooms' && (
            <AdminRoomsTab
              rooms={rooms}
              setRooms={setRooms}
              showToast={showToast}
              setConfirmModal={setConfirmModal}
            />
          )}

          {activeTab === 'customers' && (
            <AdminCustomersTab
              customers={customers}
              setCustomers={setCustomers}
              reservations={reservations}
              getRoomType={getRoomType}
              showToast={showToast}
              setConfirmModal={setConfirmModal}
            />
          )}

          {activeTab === 'reservations' && (
            <AdminReservationsTab
              rooms={rooms}
              customers={customers}
              reservations={reservations}
              setReservations={setReservations}
              createReservationRecord={createReservationRecord}
              getCustomerName={getCustomerName}
              getRoomType={getRoomType}
              showToast={showToast}
              setConfirmModal={setConfirmModal}
            />
          )}

          {activeTab === 'reports' && (
            <AdminReportsTab
              rooms={rooms}
              reservations={reservations}
              getCustomerName={getCustomerName}
              getRoomType={getRoomType}
              showToast={showToast}
            />
          )}

          {activeTab === 'ms-access' && (
            <AdminMsAccessTab
              rooms={rooms}
              setRooms={setRooms}
              customers={customers}
              setCustomers={setCustomers}
              reservations={reservations}
              setReservations={setReservations}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 11A. ADMIN TAB: DASHBOARD OVERVIEW (KPI + GRAFIK RECHARTS + RESERVASI TERBARU)
// ============================================================================

function AdminOverviewTab({ rooms, reservations, getCustomerName, getRoomType }) {
  const validReservations = reservations.filter((r) => r.Status_Reservasi !== 'Dibatalkan');
  const totalPendapatan = validReservations.reduce((sum, r) => sum + (Number(r.Total_Biaya) || 0), 0);
  const kamarTersedia = rooms.filter((r) => r.Status_Kamar === 'Tersedia').length;
  const kamarTerisi = rooms.filter((r) => r.Status_Kamar === 'Terisi').length;

  // Agregasi data bulanan untuk Recharts
  const monthlyData = useMemo(() => {
    const map = {};
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    reservations.forEach((r) => {
      if (!r.Tanggal_Checkin) return;
      const d = new Date(r.Tanggal_Checkin);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!map[key]) {
        map[key] = {
          key,
          bulan: `${monthLabels[d.getMonth()]} ${d.getFullYear()}`,
          reservasi: 0,
          pendapatan: 0,
        };
      }
      map[key].reservasi += 1;
      if (r.Status_Reservasi !== 'Dibatalkan') {
        map[key].pendapatan += Number(r.Total_Biaya) || 0;
      }
    });
    return Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
  }, [reservations]);

  const kpis = [
    { label: 'Total Reservasi', value: reservations.length, icon: ListChecks, color: 'text-[#172B3A]', bg: 'bg-blue-50' },
    { label: 'Total Tipe Kamar', value: rooms.length, icon: BedDouble, color: 'text-[#172B3A]', bg: 'bg-stone-100' },
    { label: 'Kamar Tersedia', value: kamarTersedia, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Kamar Terisi', value: kamarTerisi, icon: Users, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Total Pendapatan', value: formatRupiah(totalPendapatan), icon: TrendingUp, color: 'text-[#C5A46D]', bg: 'bg-[#172B3A]' },
  ];

  return (
    <div className="space-y-6">
      {/* 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isDark = kpi.bg === 'bg-[#172B3A]';
          return (
            <div
              key={kpi.label}
              className={`p-5 rounded-2xl border shadow-sm ${
                isDark
                  ? 'bg-[#172B3A] text-white border-[#C5A46D]/40'
                  : 'bg-white text-[#172B3A] border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium ${isDark ? 'text-white/75' : 'text-stone-500'}`}>
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl ${isDark ? 'bg-white/10' : kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className={`text-xl font-bold ${isDark ? 'text-[#C5A46D]' : 'text-[#172B3A]'}`}>
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grafik Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="font-bold text-[#172B3A] mb-1">Grafik Reservasi Bulanan</h3>
          <p className="text-xs text-stone-500 mb-5">Jumlah transaksi reservasi tercatat per bulan</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="reservasi" name="Jumlah Reservasi" fill="#172B3A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="font-bold text-[#172B3A] mb-1">Grafik Pendapatan Bulanan</h3>
          <p className="text-xs text-stone-500 mb-5">Total pendapatan dari transaksi non-batal (IDR)</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A46D" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#C5A46D" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`}
                />
                <Tooltip formatter={(val) => formatRupiah(val)} />
                <Area
                  type="monotone"
                  dataKey="pendapatan"
                  name="Pendapatan"
                  stroke="#C5A46D"
                  strokeWidth={2.5}
                  fill="url(#goldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Daftar Reservasi Terbaru */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#172B3A]">Daftar Reservasi Terbaru</h3>
            <p className="text-xs text-stone-500">5 transaksi reservasi terakhir yang masuk ke sistem</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
              <tr>
                <th className="px-5 py-3">ID Reservasi</th>
                <th className="px-5 py-3">Pelanggan</th>
                <th className="px-5 py-3">Tipe Kamar</th>
                <th className="px-5 py-3">Check-in / Out</th>
                <th className="px-5 py-3">Total Biaya</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {reservations.slice(0, 5).map((r) => (
                <tr key={r.ID_Reservasi} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-5 py-3.5 font-mono font-semibold text-[#172B3A]">{r.ID_Reservasi}</td>
                  <td className="px-5 py-3.5 font-medium">{getCustomerName(r.ID_Pelanggan)}</td>
                  <td className="px-5 py-3.5">{getRoomType(r.ID_Kamar)}</td>
                  <td className="px-5 py-3.5 text-xs text-stone-600">
                    {r.Tanggal_Checkin} → {r.Tanggal_Checkout} ({r.Jumlah_Malam}m)
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-[#172B3A]">{formatRupiah(r.Total_Biaya)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadgeClass(r.Status_Reservasi)}`}>
                      {r.Status_Reservasi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 11B. ADMIN TAB: MANAJEMEN KAMAR (FORM DATA MASTER KAMAR)
// ============================================================================

function AdminRoomsTab({ rooms, setRooms, showToast, setConfirmModal }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form, setForm] = useState({
    ID_Kamar: '',
    Tipe_Kamar: '',
    Harga_Per_Malam: 500000,
    Kapasitas: 2,
    Status_Kamar: 'Tersedia',
    Ukuran_Kamar: '30 m²',
    Deskripsi_Singkat: '',
    FasilitasText: 'WiFi Kecepatan Tinggi, AC, Smart TV',
    Foto_Utama: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
  });

  const openAdd = () => {
    setEditingRoom(null);
    const nextId = `KMR-${String(rooms.length + 1).padStart(3, '0')}`;
    setForm({
      ID_Kamar: nextId,
      Tipe_Kamar: '',
      Harga_Per_Malam: 650000,
      Kapasitas: 2,
      Status_Kamar: 'Tersedia',
      Ukuran_Kamar: '32 m²',
      Deskripsi_Singkat: '',
      FasilitasText: 'WiFi Kecepatan Tinggi, AC, Smart TV',
      Foto_Utama: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    });
    setModalOpen(true);
  };

  const openEdit = (room) => {
    setEditingRoom(room.ID_Kamar);
    setForm({
      ID_Kamar: room.ID_Kamar,
      Tipe_Kamar: room.Tipe_Kamar,
      Harga_Per_Malam: room.Harga_Per_Malam,
      Kapasitas: room.Kapasitas,
      Status_Kamar: room.Status_Kamar,
      Ukuran_Kamar: room.Ukuran_Kamar || '',
      Deskripsi_Singkat: room.Deskripsi_Singkat || '',
      FasilitasText: (room.Fasilitas || []).join(', '),
      Foto_Utama: room.Foto_Utama,
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fasilitasArr = form.FasilitasText.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      ID_Kamar: form.ID_Kamar.trim(),
      Tipe_Kamar: form.Tipe_Kamar.trim(),
      Harga_Per_Malam: Number(form.Harga_Per_Malam),
      Kapasitas: Number(form.Kapasitas),
      Status_Kamar: form.Status_Kamar,
      Ukuran_Kamar: form.Ukuran_Kamar,
      Deskripsi_Singkat: form.Deskripsi_Singkat,
      Deskripsi_Lengkap: form.Deskripsi_Singkat,
      Fasilitas: fasilitasArr,
      Foto_Utama: form.Foto_Utama,
      Galeri: [form.Foto_Utama],
    };

    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.ID_Kamar === editingRoom ? { ...r, ...payload, Galeri: r.Galeri?.length ? r.Galeri : [payload.Foto_Utama] } : r))
      );
      showToast(`Data kamar ${payload.Tipe_Kamar} berhasil diperbarui.`);
    } else {
      setRooms((prev) => [...prev, payload]);
      showToast(`Kamar baru ${payload.Tipe_Kamar} berhasil ditambahkan.`);
    }
    setModalOpen(false);
  };

  const handleDelete = (room) => {
    setConfirmModal({
      title: 'Hapus Data Kamar?',
      message: `Anda yakin ingin menghapus ${room.Tipe_Kamar} (${room.ID_Kamar}) dari daftar kamar?`,
      onConfirm: () => {
        setRooms((prev) => prev.filter((r) => r.ID_Kamar !== room.ID_Kamar));
        showToast(`Kamar ${room.ID_Kamar} dihapus.`);
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-[#172B3A]">Data Master Kamar (Tabel_Kamar)</h2>
          <p className="text-xs text-stone-500">
            Perubahan di sini langsung memperbarui halaman website publik Din.Ar Hotel.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white text-sm font-semibold"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          Tambah Kamar
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
              <tr>
                <th className="px-5 py-3">ID_Kamar (PK)</th>
                <th className="px-5 py-3">Tipe_Kamar</th>
                <th className="px-5 py-3">Harga_Per_Malam</th>
                <th className="px-5 py-3">Kapasitas</th>
                <th className="px-5 py-3">Status_Kamar</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rooms.map((room) => (
                <tr key={room.ID_Kamar} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#172B3A]">{room.ID_Kamar}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={room.Foto_Utama} alt={room.Tipe_Kamar} className="w-11 h-11 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-[#172B3A]">{room.Tipe_Kamar}</p>
                        <p className="text-xs text-stone-400 truncate max-w-[200px]">
                          {(room.Fasilitas || []).join(', ')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold">{formatRupiah(room.Harga_Per_Malam)}</td>
                  <td className="px-5 py-3.5">{room.Kapasitas} Tamu</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusBadgeClass(room.Status_Kamar)}`}>
                      {room.Status_Kamar}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEdit(room)}
                      className="p-2 rounded-lg text-blue-700 hover:bg-blue-50"
                      title="Edit Kamar"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(room)}
                      className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Hapus Kamar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Master Kamar */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#172B3A]">
                {editingRoom ? 'Edit Data Master Kamar' : 'Form Data Master Kamar Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-stone-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">ID_Kamar (PK)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingRoom}
                    value={form.ID_Kamar}
                    onChange={(e) => setForm((p) => ({ ...p, ID_Kamar: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Status_Kamar</label>
                  <select
                    value={form.Status_Kamar}
                    onChange={(e) => setForm((p) => ({ ...p, Status_Kamar: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  >
                    {ROOM_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Tipe_Kamar</label>
                <input
                  type="text"
                  required
                  value={form.Tipe_Kamar}
                  onChange={(e) => setForm((p) => ({ ...p, Tipe_Kamar: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Harga / Malam (Rp)</label>
                  <input
                    type="number"
                    required
                    min={100000}
                    step={10000}
                    value={form.Harga_Per_Malam}
                    onChange={(e) => setForm((p) => ({ ...p, Harga_Per_Malam: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kapasitas (Tamu)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10}
                    value={form.Kapasitas}
                    onChange={(e) => setForm((p) => ({ ...p, Kapasitas: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ukuran</label>
                  <input
                    type="text"
                    value={form.Ukuran_Kamar}
                    onChange={(e) => setForm((p) => ({ ...p, Ukuran_Kamar: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Fasilitas (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={form.FasilitasText}
                  onChange={(e) => setForm((p) => ({ ...p, FasilitasText: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Deskripsi Kamar</label>
                <textarea
                  rows={2}
                  value={form.Deskripsi_Singkat}
                  onChange={(e) => setForm((p) => ({ ...p, Deskripsi_Singkat: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">URL Foto Kamar</label>
                <input
                  type="url"
                  value={form.Foto_Utama}
                  onChange={(e) => setForm((p) => ({ ...p, Foto_Utama: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#172B3A] text-white text-sm font-semibold"
                >
                  Simpan Data Kamar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 11C. ADMIN TAB: MANAJEMEN PELANGGAN (FORM DATA MASTER PELANGGAN + RIWAYAT)
// ============================================================================

function AdminCustomersTab({
  customers,
  setCustomers,
  reservations,
  getRoomType,
  showToast,
  setConfirmModal,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [historyCustomer, setHistoryCustomer] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    ID_Pelanggan: '',
    Nama_Pelanggan: '',
    Nomor_Telepon: '',
    Email: '',
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      ID_Pelanggan: `PLG-${String(customers.length + 1).padStart(3, '0')}`,
      Nama_Pelanggan: '',
      Nomor_Telepon: '',
      Email: '',
    });
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditingId(c.ID_Pelanggan);
    setForm({ ...c });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers((prev) => prev.map((c) => (c.ID_Pelanggan === editingId ? form : c)));
      showToast(`Data pelanggan ${form.Nama_Pelanggan} diperbarui.`);
    } else {
      setCustomers((prev) => [...prev, form]);
      showToast(`Pelanggan baru ${form.Nama_Pelanggan} ditambahkan.`);
    }
    setModalOpen(false);
  };

  const handleDelete = (c) => {
    setConfirmModal({
      title: 'Hapus Data Pelanggan?',
      message: `Hapus ${c.Nama_Pelanggan} (${c.ID_Pelanggan}) dari data master pelanggan?`,
      onConfirm: () => {
        setCustomers((prev) => prev.filter((item) => item.ID_Pelanggan !== c.ID_Pelanggan));
        showToast(`Pelanggan ${c.ID_Pelanggan} dihapus.`);
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-[#172B3A]">Data Master Pelanggan (Tabel_Pelanggan)</h2>
          <p className="text-xs text-stone-500">Kelola profil pelanggan dan lihat riwayat reservasi masing-masing tamu.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white text-sm font-semibold"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          Tambah Pelanggan
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
              <tr>
                <th className="px-5 py-3">ID_Pelanggan (PK)</th>
                <th className="px-5 py-3">Nama_Pelanggan</th>
                <th className="px-5 py-3">Nomor_Telepon</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Riwayat</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {customers.map((c) => {
                const count = reservations.filter((r) => r.ID_Pelanggan === c.ID_Pelanggan).length;
                return (
                  <tr key={c.ID_Pelanggan} className="hover:bg-[#F8F6F1]/50">
                    <td className="px-5 py-3.5 font-mono font-bold text-[#172B3A]">{c.ID_Pelanggan}</td>
                    <td className="px-5 py-3.5 font-semibold">{c.Nama_Pelanggan}</td>
                    <td className="px-5 py-3.5">{c.Nomor_Telepon}</td>
                    <td className="px-5 py-3.5 text-stone-600">{c.Email}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setHistoryCustomer(c)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F8F6F1] hover:bg-[#C5A46D]/20 text-xs font-semibold text-[#172B3A] border border-stone-200"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A46D]" />
                        {count} Reservasi
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-blue-700 hover:bg-blue-50">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c)} className="p-2 rounded-lg text-rose-600 hover:bg-rose-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Pelanggan */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#172B3A]">
                {editingId ? 'Edit Pelanggan' : 'Form Data Master Pelanggan'}
              </h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">ID_Pelanggan (PK)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingId}
                  value={form.ID_Pelanggan}
                  onChange={(e) => setForm((p) => ({ ...p, ID_Pelanggan: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Nama_Pelanggan</label>
                <input
                  type="text"
                  required
                  value={form.Nama_Pelanggan}
                  onChange={(e) => setForm((p) => ({ ...p, Nama_Pelanggan: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Nomor_Telepon</label>
                <input
                  type="text"
                  required
                  value={form.Nomor_Telepon}
                  onChange={(e) => setForm((p) => ({ ...p, Nomor_Telepon: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.Email}
                  onChange={(e) => setForm((p) => ({ ...p, Email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border text-sm">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#172B3A] text-white text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Riwayat Reservasi Pelanggan */}
      {historyCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-lg text-[#172B3A]">
                  Riwayat Reservasi: {historyCustomer.Nama_Pelanggan}
                </h3>
                <p className="text-xs text-stone-500">
                  {historyCustomer.ID_Pelanggan} • {historyCustomer.Email}
                </p>
              </div>
              <button onClick={() => setHistoryCustomer(null)}><X className="w-5 h-5" /></button>
            </div>
            {reservations.filter((r) => r.ID_Pelanggan === historyCustomer.ID_Pelanggan).length === 0 ? (
              <p className="text-sm text-stone-500 py-8 text-center">Belum ada riwayat reservasi.</p>
            ) : (
              <div className="space-y-3">
                {reservations
                  .filter((r) => r.ID_Pelanggan === historyCustomer.ID_Pelanggan)
                  .map((r) => (
                    <div key={r.ID_Reservasi} className="p-4 rounded-2xl bg-[#F8F6F1] border border-stone-200 flex flex-wrap justify-between gap-2 text-sm">
                      <div>
                        <span className="font-mono font-bold text-[#172B3A]">{r.ID_Reservasi}</span>
                        <p className="text-xs text-stone-600 mt-0.5">
                          {getRoomType(r.ID_Kamar)} • {r.Tanggal_Checkin} s/d {r.Tanggal_Checkout} ({r.Jumlah_Malam} malam)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#172B3A]">{formatRupiah(r.Total_Biaya)}</p>
                        <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadgeClass(r.Status_Reservasi)}`}>
                          {r.Status_Reservasi}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 11D. ADMIN TAB: MANAJEMEN RESERVASI (FORM TRANSAKSI RESERVASI + FILTER)
// ============================================================================

function AdminReservationsTab({
  rooms,
  customers,
  reservations,
  setReservations,
  createReservationRecord,
  getCustomerName,
  getRoomType,
  showToast,
  setConfirmModal,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    ID_Pelanggan: customers[0]?.ID_Pelanggan || '',
    ID_Kamar: rooms[0]?.ID_Kamar || '',
    Tanggal_Checkin: getTodayString(1),
    Tanggal_Checkout: getTodayString(3),
    Jumlah_Kamar: 1,
    Jumlah_Tamu: 2,
    Status_Reservasi: 'Dikonfirmasi',
    Catatan: '',
  });

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchStatus = statusFilter === 'ALL' || r.Status_Reservasi === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.ID_Reservasi.toLowerCase().includes(q) ||
        getCustomerName(r.ID_Pelanggan).toLowerCase().includes(q) ||
        getRoomType(r.ID_Kamar).toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [reservations, search, statusFilter, getCustomerName, getRoomType]);

  const handleStatusChange = (resId, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.ID_Reservasi === resId ? { ...r, Status_Reservasi: newStatus } : r))
    );
    showToast(`Status reservasi ${resId} diubah menjadi "${newStatus}".`);
  };

  const handleDelete = (r) => {
    setConfirmModal({
      title: 'Hapus Transaksi Reservasi?',
      message: `Anda yakin ingin menghapus data reservasi ${r.ID_Reservasi}?`,
      onConfirm: () => {
        setReservations((prev) => prev.filter((item) => item.ID_Reservasi !== r.ID_Reservasi));
        showToast(`Reservasi ${r.ID_Reservasi} dihapus.`);
      },
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const res = createReservationRecord({
      existingCustomerId: form.ID_Pelanggan,
      roomId: form.ID_Kamar,
      checkin: form.Tanggal_Checkin,
      checkout: form.Tanggal_Checkout,
      jumlahKamar: form.Jumlah_Kamar,
      jumlahTamu: form.Jumlah_Tamu,
      catatan: form.Catatan,
      status: form.Status_Reservasi,
    });
    if (res) {
      showToast(`Transaksi reservasi ${res.ID_Reservasi} berhasil ditambahkan.`);
      setModalOpen(false);
    } else {
      showToast('Periksa tanggal check-in dan check-out.', 'error');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari ID, nama pelanggan, atau kamar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium"
          >
            <option value="ALL">Semua Status</option>
            {RESERVATION_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white text-sm font-semibold"
        >
          <Plus className="w-4 h-4 text-[#C5A46D]" />
          Tambah Reservasi
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
              <tr>
                <th className="px-4 py-3">ID_Reservasi</th>
                <th className="px-4 py-3">Pelanggan</th>
                <th className="px-4 py-3">Tipe Kamar</th>
                <th className="px-4 py-3">Check-in</th>
                <th className="px-4 py-3">Check-out</th>
                <th className="px-4 py-3 text-center">Malam / Kmr</th>
                <th className="px-4 py-3">Total_Biaya</th>
                <th className="px-4 py-3">Status_Reservasi</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((r) => (
                <tr key={r.ID_Reservasi} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-4 py-3 font-mono font-bold text-[#172B3A]">{r.ID_Reservasi}</td>
                  <td className="px-4 py-3 font-medium">{getCustomerName(r.ID_Pelanggan)}</td>
                  <td className="px-4 py-3">{getRoomType(r.ID_Kamar)}</td>
                  <td className="px-4 py-3 text-xs">{r.Tanggal_Checkin}</td>
                  <td className="px-4 py-3 text-xs">{r.Tanggal_Checkout}</td>
                  <td className="px-4 py-3 text-center text-xs">
                    {r.Jumlah_Malam}m / {r.Jumlah_Kamar}k
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#172B3A]">{formatRupiah(r.Total_Biaya)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.Status_Reservasi}
                      onChange={(e) => handleStatusChange(r.ID_Reservasi, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${statusBadgeClass(
                        r.Status_Reservasi
                      )}`}
                    >
                      {RESERVATION_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-white text-stone-800">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(r)}
                      className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Hapus Reservasi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-stone-400">
                    Tidak ada data reservasi ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Transaksi Reservasi */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#172B3A]">Form Transaksi Reservasi Baru</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Pelanggan (FK)</label>
                <select
                  value={form.ID_Pelanggan}
                  onChange={(e) => setForm((p) => ({ ...p, ID_Pelanggan: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                >
                  {customers.map((c) => (
                    <option key={c.ID_Pelanggan} value={c.ID_Pelanggan}>
                      {c.ID_Pelanggan} - {c.Nama_Pelanggan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Kamar (FK)</label>
                <select
                  value={form.ID_Kamar}
                  onChange={(e) => setForm((p) => ({ ...p, ID_Kamar: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                >
                  {rooms.map((r) => (
                    <option key={r.ID_Kamar} value={r.ID_Kamar}>
                      {r.ID_Kamar} - {r.Tipe_Kamar} ({formatRupiah(r.Harga_Per_Malam)})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Tanggal Check-in</label>
                  <input
                    type="date"
                    required
                    value={form.Tanggal_Checkin}
                    onChange={(e) => setForm((p) => ({ ...p, Tanggal_Checkin: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Tanggal Check-out</label>
                  <input
                    type="date"
                    required
                    value={form.Tanggal_Checkout}
                    onChange={(e) => setForm((p) => ({ ...p, Tanggal_Checkout: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Jml Kamar</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.Jumlah_Kamar}
                    onChange={(e) => setForm((p) => ({ ...p, Jumlah_Kamar: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Jml Tamu</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.Jumlah_Tamu}
                    onChange={(e) => setForm((p) => ({ ...p, Jumlah_Tamu: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Status</label>
                  <select
                    value={form.Status_Reservasi}
                    onChange={(e) => setForm((p) => ({ ...p, Status_Reservasi: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#F8F6F1] text-sm"
                  >
                    {RESERVATION_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border text-sm">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#172B3A] text-white text-sm font-semibold">Simpan Transaksi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 11E. ADMIN TAB: LAPORAN (LAPORAN RESERVASI & LAPORAN PENDAPATAN + CETAK/CSV)
// ============================================================================

function AdminReportsTab({ rooms, reservations, getCustomerName, getRoomType, showToast }) {
  const [reportType, setReportType] = useState('reservasi'); // 'reservasi' | 'pendapatan'
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const inRange =
        (!startDate || r.Tanggal_Checkin >= startDate) &&
        (!endDate || r.Tanggal_Checkin <= endDate);
      const matchStatus = statusFilter === 'ALL' || r.Status_Reservasi === statusFilter;
      return inRange && matchStatus;
    });
  }, [reservations, startDate, endDate, statusFilter]);

  const nonCancelled = filtered.filter((r) => r.Status_Reservasi !== 'Dibatalkan');
  const totalRevenue = nonCancelled.reduce((s, r) => s + (Number(r.Total_Biaya) || 0), 0);

  // Rekap per Tipe Kamar
  const revenueByRoom = useMemo(() => {
    return rooms.map((room) => {
      const items = nonCancelled.filter((r) => r.ID_Kamar === room.ID_Kamar);
      return {
        tipe: room.Tipe_Kamar,
        jumlahReservasi: items.length,
        pendapatan: items.reduce((s, r) => s + (Number(r.Total_Biaya) || 0), 0),
      };
    });
  }, [rooms, nonCancelled]);

  const handleExportReportCSV = () => {
    if (reportType === 'reservasi') {
      downloadCSV(
        `Laporan_Reservasi_DinAr_${startDate}_${endDate}.csv`,
        ['ID_Reservasi', 'Pelanggan', 'Tipe_Kamar', 'Checkin', 'Checkout', 'Malam', 'Kamar', 'Total_Biaya', 'Status'],
        filtered.map((r) => [
          r.ID_Reservasi,
          getCustomerName(r.ID_Pelanggan),
          getRoomType(r.ID_Kamar),
          r.Tanggal_Checkin,
          r.Tanggal_Checkout,
          r.Jumlah_Malam,
          r.Jumlah_Kamar,
          r.Total_Biaya,
          r.Status_Reservasi,
        ])
      );
    } else {
      downloadCSV(
        `Laporan_Pendapatan_DinAr_${startDate}_${endDate}.csv`,
        ['Tipe_Kamar', 'Jumlah_Transaksi_Valid', 'Total_Pendapatan'],
        revenueByRoom.map((row) => [row.tipe, row.jumlahReservasi, row.pendapatan])
      );
    }
    showToast('Laporan berhasil diekspor ke format CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Filter & Tombol Aksi */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-wrap items-end justify-between gap-4 no-print">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Jenis Laporan</label>
            <div className="inline-flex rounded-xl bg-[#F8F6F1] p-1 border border-stone-200">
              <button
                onClick={() => setReportType('reservasi')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  reportType === 'reservasi' ? 'bg-[#172B3A] text-white' : 'text-stone-600'
                }`}
              >
                Laporan Reservasi
              </button>
              <button
                onClick={() => setReportType('pendapatan')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  reportType === 'pendapatan' ? 'bg-[#172B3A] text-white' : 'text-stone-600'
                }`}
              >
                Laporan Pendapatan
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Dari Tanggal</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-[#F8F6F1]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Sampai Tanggal</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-[#F8F6F1]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-xs bg-[#F8F6F1]"
            >
              <option value="ALL">Semua Status</option>
              {RESERVATION_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#172B3A] text-[#172B3A] text-xs font-semibold hover:bg-stone-50"
          >
            <Printer className="w-4 h-4" />
            Cetak Laporan
          </button>
          <button
            onClick={handleExportReportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#172B3A] text-white text-xs font-semibold hover:bg-[#223d52]"
          >
            <Download className="w-4 h-4 text-[#C5A46D]" />
            Ekspor CSV
          </button>
        </div>
      </div>

      {/* Header Cetak */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="border-b border-stone-200 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#172B3A]">
              {reportType === 'reservasi' ? 'Laporan Reservasi Din.Ar Hotel' : 'Laporan Pendapatan Din.Ar Hotel'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              313 Jl. Urip Sumoharjo, Madiun, Jawa Timur • Periode: {startDate} s/d {endDate}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#F8F6F1] text-[#172B3A] border border-stone-200">
            Data Simulasi SIM
          </span>
        </div>

        {reportType === 'reservasi' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#F8F6F1] border border-stone-200">
                <span className="text-xs text-stone-500">Total Reservasi</span>
                <p className="text-2xl font-bold text-[#172B3A]">{filtered.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-700">Check-in / Check-out</span>
                <p className="text-2xl font-bold text-emerald-800">
                  {filtered.filter((r) => ['Check-in', 'Check-out'].includes(r.Status_Reservasi)).length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xs text-amber-700">Menunggu / Dikonfirmasi</span>
                <p className="text-2xl font-bold text-amber-800">
                  {filtered.filter((r) => ['Menunggu Konfirmasi', 'Dikonfirmasi'].includes(r.Status_Reservasi)).length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <span className="text-xs text-rose-700">Dibatalkan</span>
                <p className="text-2xl font-bold text-rose-800">
                  {filtered.filter((r) => r.Status_Reservasi === 'Dibatalkan').length}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Pelanggan</th>
                    <th className="px-4 py-3">Tipe Kamar</th>
                    <th className="px-4 py-3">Periode</th>
                    <th className="px-4 py-3">Total Biaya</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((r) => (
                    <tr key={r.ID_Reservasi}>
                      <td className="px-4 py-3 font-mono font-semibold">{r.ID_Reservasi}</td>
                      <td className="px-4 py-3">{getCustomerName(r.ID_Pelanggan)}</td>
                      <td className="px-4 py-3">{getRoomType(r.ID_Kamar)}</td>
                      <td className="px-4 py-3 text-xs">{r.Tanggal_Checkin} s/d {r.Tanggal_Checkout}</td>
                      <td className="px-4 py-3 font-semibold">{formatRupiah(r.Total_Biaya)}</td>
                      <td className="px-4 py-3 text-xs font-semibold">{r.Status_Reservasi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#172B3A] text-white">
                <span className="text-xs text-white/70">Total Pendapatan Periode</span>
                <p className="text-2xl font-bold text-[#C5A46D] mt-1">{formatRupiah(totalRevenue)}</p>
              </div>
              <div className="p-5 rounded-xl bg-[#F8F6F1] border border-stone-200">
                <span className="text-xs text-stone-500">Jumlah Transaksi Valid</span>
                <p className="text-2xl font-bold text-[#172B3A] mt-1">{nonCancelled.length} Transaksi</p>
              </div>
              <div className="p-5 rounded-xl bg-[#F8F6F1] border border-stone-200">
                <span className="text-xs text-stone-500">Rata-rata per Transaksi</span>
                <p className="text-2xl font-bold text-[#172B3A] mt-1">
                  {formatRupiah(nonCancelled.length ? totalRevenue / nonCancelled.length : 0)}
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByRoom}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                  <XAxis dataKey="tipe" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(val) => formatRupiah(val)} />
                  <Bar dataKey="pendapatan" name="Pendapatan (IDR)" fill="#C5A46D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8F6F1] text-xs uppercase text-stone-500">
                <tr>
                  <th className="px-4 py-3">Tipe Kamar</th>
                  <th className="px-4 py-3 text-center">Jumlah Transaksi Valid</th>
                  <th className="px-4 py-3 text-right">Total Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {revenueByRoom.map((row) => (
                  <tr key={row.tipe}>
                    <td className="px-4 py-3 font-semibold text-[#172B3A]">{row.tipe}</td>
                    <td className="px-4 py-3 text-center">{row.jumlahReservasi}</td>
                    <td className="px-4 py-3 text-right font-bold text-[#172B3A]">
                      {formatRupiah(row.pendapatan)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 11F. ADMIN TAB: INTEGRASI MICROSOFT ACCESS (SKEMA, SQL QUERY & CSV BRIDGE)
// ============================================================================

function AdminMsAccessTab({
  rooms,
  setRooms,
  customers,
  setCustomers,
  reservations,
  setReservations,
  showToast,
}) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const sqlQueries = [
    {
      title: 'Query 1: Penyaringan Reservasi Berdasarkan Periode & Status',
      desc: 'Menyaring transaksi reservasi sesuai rentang tanggal check-in dan status reservasi.',
      sql: `SELECT ID_Reservasi, ID_Pelanggan, ID_Kamar, Tanggal_Checkin, Tanggal_Checkout, Total_Biaya, Status_Reservasi
FROM Tabel_Reservasi
WHERE Tanggal_Checkin BETWEEN #2026-08-01# AND #2026-12-31#
  AND Status_Reservasi = 'Dikonfirmasi'
ORDER BY Tanggal_Checkin DESC;`,
    },
    {
      title: 'Query 2: Penggabungan Data Reservasi, Pelanggan, dan Kamar (INNER JOIN)',
      desc: 'Menggabungkan ketiga tabel berelasi menggunakan Foreign Key untuk laporan lengkap.',
      sql: `SELECT r.ID_Reservasi, p.Nama_Pelanggan, p.Nomor_Telepon, k.Tipe_Kamar,
       r.Tanggal_Checkin, r.Tanggal_Checkout, r.Jumlah_Malam, r.Jumlah_Kamar,
       r.Total_Biaya, r.Status_Reservasi
FROM (Tabel_Reservasi AS r
INNER JOIN Tabel_Pelanggan AS p ON r.ID_Pelanggan = p.ID_Pelanggan)
INNER JOIN Tabel_Kamar AS k ON r.ID_Kamar = k.ID_Kamar;`,
    },
    {
      title: 'Query 3: Rekapitulasi Jumlah Reservasi & Pendapatan per Tipe Kamar',
      desc: 'Menyajikan ringkasan strategis bagi pengelola hotel untuk keputusan operasional.',
      sql: `SELECT k.Tipe_Kamar,
       COUNT(r.ID_Reservasi) AS Jumlah_Reservasi,
       SUM(r.Total_Biaya) AS Total_Pendapatan
FROM Tabel_Reservasi AS r
INNER JOIN Tabel_Kamar AS k ON r.ID_Kamar = k.ID_Kamar
WHERE r.Status_Reservasi <> 'Dibatalkan'
GROUP BY k.Tipe_Kamar
ORDER BY SUM(r.Total_Biaya) DESC;`,
    },
  ];

  const handleCopySQL = (sql, idx) => {
    try {
      navigator.clipboard.writeText(sql);
      setCopiedIdx(idx);
      showToast('Query SQL disalin ke clipboard.');
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch (e) {
      showToast('Salin teks secara manual dari kotak kode.', 'error');
    }
  };

  const exportTableCSV = (tableName) => {
    if (tableName === 'Tabel_Kamar') {
      downloadCSV(
        'Tabel_Kamar.csv',
        ['ID_Kamar', 'Tipe_Kamar', 'Harga_Per_Malam', 'Kapasitas', 'Status_Kamar'],
        rooms.map((r) => [r.ID_Kamar, r.Tipe_Kamar, r.Harga_Per_Malam, r.Kapasitas, r.Status_Kamar])
      );
    } else if (tableName === 'Tabel_Pelanggan') {
      downloadCSV(
        'Tabel_Pelanggan.csv',
        ['ID_Pelanggan', 'Nama_Pelanggan', 'Nomor_Telepon', 'Email'],
        customers.map((c) => [c.ID_Pelanggan, c.Nama_Pelanggan, c.Nomor_Telepon, c.Email])
      );
    } else if (tableName === 'Tabel_Reservasi') {
      downloadCSV(
        'Tabel_Reservasi.csv',
        [
          'ID_Reservasi', 'ID_Pelanggan', 'ID_Kamar', 'Tanggal_Checkin',
          'Tanggal_Checkout', 'Jumlah_Malam', 'Jumlah_Kamar', 'Total_Biaya', 'Status_Reservasi',
        ],
        reservations.map((r) => [
          r.ID_Reservasi, r.ID_Pelanggan, r.ID_Kamar, r.Tanggal_Checkin,
          r.Tanggal_Checkout, r.Jumlah_Malam, r.Jumlah_Kamar, r.Total_Biaya, r.Status_Reservasi,
        ])
      );
    }
    showToast(`${tableName}.csv siap diimpor ke Microsoft Access (External Data -> Text File).`);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = String(evt.target?.result || '').trim();
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) {
          showToast('File CSV kosong atau tidak memiliki baris data.', 'error');
          return;
        }
        const headers = lines[0].replace(/^\uFEFF/, '').split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
        const records = lines.slice(1).map((line) => {
          const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
          const obj = {};
          headers.forEach((h, i) => { obj[h] = cols[i] || ''; });
          return obj;
        });

        if (headers.includes('ID_Kamar') && headers.includes('Tipe_Kamar')) {
          setRooms((prev) => {
            const merged = [...prev];
            records.forEach((rec) => {
              const idx = merged.findIndex((r) => r.ID_Kamar === rec.ID_Kamar);
              const mapped = {
                ID_Kamar: rec.ID_Kamar,
                Tipe_Kamar: rec.Tipe_Kamar,
                Harga_Per_Malam: Number(rec.Harga_Per_Malam) || 500000,
                Kapasitas: Number(rec.Kapasitas) || 2,
                Status_Kamar: rec.Status_Kamar || 'Tersedia',
                Deskripsi_Singkat: 'Diimpor dari CSV MS Access.',
                Fasilitas: ['WiFi', 'AC'],
                Foto_Utama: INITIAL_ROOMS[0].Foto_Utama,
                Galeri: [INITIAL_ROOMS[0].Foto_Utama],
              };
              if (idx >= 0) merged[idx] = { ...merged[idx], ...mapped };
              else merged.push(mapped);
            });
            return merged;
          });
          showToast(`Berhasil mengimpor ${records.length} baris ke Tabel_Kamar.`);
        } else if (headers.includes('ID_Pelanggan') && headers.includes('Nama_Pelanggan')) {
          setCustomers((prev) => {
            const merged = [...prev];
            records.forEach((rec) => {
              const idx = merged.findIndex((c) => c.ID_Pelanggan === rec.ID_Pelanggan);
              if (idx >= 0) merged[idx] = rec;
              else merged.push(rec);
            });
            return merged;
          });
          showToast(`Berhasil mengimpor ${records.length} baris ke Tabel_Pelanggan.`);
        } else if (headers.includes('ID_Reservasi') && headers.includes('Total_Biaya')) {
          setReservations((prev) => {
            const merged = [...prev];
            records.forEach((rec) => {
              const mapped = {
                ...rec,
                Jumlah_Malam: Number(rec.Jumlah_Malam) || 1,
                Jumlah_Kamar: Number(rec.Jumlah_Kamar) || 1,
                Total_Biaya: Number(rec.Total_Biaya) || 0,
              };
              const idx = merged.findIndex((r) => r.ID_Reservasi === mapped.ID_Reservasi);
              if (idx >= 0) merged[idx] = mapped;
              else merged.unshift(mapped);
            });
            return merged;
          });
          showToast(`Berhasil mengimpor ${records.length} baris ke Tabel_Reservasi.`);
        } else {
          showToast('Format kolom CSV tidak cocok dengan skema Tabel_Kamar, Tabel_Pelanggan, atau Tabel_Reservasi.', 'error');
        }
      } catch (err) {
        showToast('Gagal memproses file CSV.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Penjelasan Jujur Arsitektur Integrasi */}
      <div className="bg-[#172B3A] text-white p-6 rounded-2xl border border-[#C5A46D]/40">
        <div className="flex items-start gap-3">
          <Database className="w-6 h-6 text-[#C5A46D] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-white">
              Rancangan Basis Data & Mekanisme Integrasi Microsoft Access (SIM)
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
              Karena aplikasi web berjalan di peramban (browser), koneksi langsung ke file lokal{' '}
              <code>.accdb</code> tidak dapat dilakukan tanpa layanan backend/ODBC lokal. Oleh karena
              itu, sistem ini menyediakan mekanisme pertukaran data yang teruji melalui{' '}
              <strong>Ekspor/Impor CSV terstandarisasi</strong> sesuai skema 3 tabel berelasi di bawah,
              serta siap dikembangkan ke REST API (Node.js/Python + pyodbc) untuk sinkronisasi otomatis.
            </p>
          </div>
        </div>
      </div>

      {/* Pertukaran Data CSV Bridge */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="font-bold text-[#172B3A] mb-1">Pertukaran Data (CSV Bridge untuk MS Access)</h3>
        <p className="text-xs text-stone-500 mb-4">
          Ekspor tabel di bawah ini lalu impor di Microsoft Access via menu <em>External Data → New Data Source → From File → Text File</em>.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => exportTableCSV('Tabel_Kamar')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F6F1] hover:bg-[#C5A46D]/20 border border-stone-200 text-xs font-semibold text-[#172B3A]"
          >
            <Download className="w-4 h-4 text-[#C5A46D]" />
            Ekspor Tabel_Kamar.csv
          </button>
          <button
            onClick={() => exportTableCSV('Tabel_Pelanggan')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F6F1] hover:bg-[#C5A46D]/20 border border-stone-200 text-xs font-semibold text-[#172B3A]"
          >
            <Download className="w-4 h-4 text-[#C5A46D]" />
            Ekspor Tabel_Pelanggan.csv
          </button>
          <button
            onClick={() => exportTableCSV('Tabel_Reservasi')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F6F1] hover:bg-[#C5A46D]/20 border border-stone-200 text-xs font-semibold text-[#172B3A]"
          >
            <Download className="w-4 h-4 text-[#C5A46D]" />
            Ekspor Tabel_Reservasi.csv
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#172B3A] hover:bg-[#223d52] text-white text-xs font-semibold cursor-pointer ml-auto">
            <Upload className="w-4 h-4 text-[#C5A46D]" />
            Impor CSV dari MS Access
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>
        </div>
      </div>

      {/* Visualisasi 3 Tabel Berelasi (ERD) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <h3 className="font-bold text-[#172B3A] mb-4">Skema Relasi 3 Tabel Utama (PK & FK)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: '1. Tabel_Kamar',
              rel: '1-to-Many → Tabel_Reservasi',
              fields: [
                { col: 'ID_Kamar', tag: 'PK', type: 'Short Text' },
                { col: 'Tipe_Kamar', type: 'Short Text' },
                { col: 'Harga_Per_Malam', type: 'Currency' },
                { col: 'Kapasitas', type: 'Number' },
                { col: 'Status_Kamar', type: 'Short Text' },
              ],
            },
            {
              name: '2. Tabel_Pelanggan',
              rel: '1-to-Many → Tabel_Reservasi',
              fields: [
                { col: 'ID_Pelanggan', tag: 'PK', type: 'Short Text' },
                { col: 'Nama_Pelanggan', type: 'Short Text' },
                { col: 'Nomor_Telepon', type: 'Short Text' },
                { col: 'Email', type: 'Short Text' },
              ],
            },
            {
              name: '3. Tabel_Reservasi',
              rel: 'Tabel Transaksi (Berelasi via FK)',
              fields: [
                { col: 'ID_Reservasi', tag: 'PK', type: 'Short Text' },
                { col: 'ID_Pelanggan', tag: 'FK', type: 'Short Text' },
                { col: 'ID_Kamar', tag: 'FK', type: 'Short Text' },
                { col: 'Tanggal_Checkin', type: 'Date/Time' },
                { col: 'Tanggal_Checkout', type: 'Date/Time' },
                { col: 'Jumlah_Malam', type: 'Number' },
                { col: 'Jumlah_Kamar', type: 'Number' },
                { col: 'Total_Biaya', type: 'Currency' },
                { col: 'Status_Reservasi', type: 'Short Text' },
              ],
            },
          ].map((tbl) => (
            <div key={tbl.name} className="rounded-2xl border border-stone-200 overflow-hidden bg-[#F8F6F1]">
              <div className="bg-[#172B3A] text-white px-4 py-3">
                <h4 className="font-bold text-sm text-[#C5A46D]">{tbl.name}</h4>
                <p className="text-[11px] text-white/70">{tbl.rel}</p>
              </div>
              <ul className="divide-y divide-stone-200/70 text-xs">
                {tbl.fields.map((f) => (
                  <li key={f.col} className="px-4 py-2 flex items-center justify-between">
                    <span className="font-mono font-medium text-[#172B3A] flex items-center gap-1.5">
                      {f.tag && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            f.tag === 'PK'
                              ? 'bg-[#C5A46D] text-[#172B3A]'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {f.tag}
                        </span>
                      )}
                      {f.col}
                    </span>
                    <span className="text-stone-400">{f.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Query SQL Siap Pakai untuk Microsoft Access */}
      <div className="space-y-4">
        <h3 className="font-bold text-[#172B3A]">Rancangan 3 Query SQL untuk Microsoft Access</h3>
        {sqlQueries.map((q, idx) => (
          <div key={q.title} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h4 className="font-bold text-sm text-[#172B3A]">{q.title}</h4>
                <p className="text-xs text-stone-500">{q.desc}</p>
              </div>
              <button
                onClick={() => handleCopySQL(q.sql, idx)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F6F1] hover:bg-[#C5A46D]/20 text-xs font-semibold text-[#172B3A] border border-stone-200 shrink-0"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === idx ? 'Tersalin' : 'Salin SQL'}
              </button>
            </div>
            <pre className="bg-[#172B3A] text-[#F8F6F1] p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">
              {q.sql}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}