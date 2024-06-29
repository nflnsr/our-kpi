function PanduanPengisianKaryawan() {
  return (
    <div className="flex justify-center w-full pt-8 pb-5">
      <div className=" max-w-[750px] px-2 text-justify">
        <h1 className="pb-2 text-lg font-medium text-center">
          Panduan Pengisian sebagai Karyawan
        </h1>
        <div className="pt-2">
          <span className="font-medium">• Landing Page</span>
          <p>
            Pada awalnya, pengguna akan berada di halaman utama (landing page).
            Jika pengguna sudah memiliki akun, pengguna dapat langsung memilih
            untuk masuk (login) dengan menekan tombol “Login”. Namun, jika
            pengguna belum memiliki akun, pengguna dapat mendaftar terlebih
            dahulu dengan menekan tombol “Register”.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Register</span>
          <p>
            Di halaman pendaftaran (register), pengguna dapat membuat akun
            dengan mengisi kolom-kolom yang tersedia. Pertama, masukkan nama
            lengkap pada kolom "Nama". Kedua, masukkan alamat email pada kolom
            "Email". Ketiga, pilih departemen yang sesuai dengan departemen
            Anda. Keempat, masukkan kata sandi yang akan digunakan. Kelima,
            ulangi kata sandi tersebut. Terakhir, tekan tombol "Register" untuk
            menyelesaikan proses pendaftaran.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Login</span>
          <p>
            Di halaman login, pengguna harus memasukkan email dan kata sandi
            yang telah didaftarkan untuk dapat masuk ke dashboard. Pengguna
            dapat mengisi email pada kolom "Email" dan kata sandi pada kolom
            "Password". • Dashboard Di halaman dashboard, pengguna dapat melihat
            beberapa menu yang tersedia, yaitu "Penilaian", "Laporan",
            "Rekomendasi", dan "Panduan". Selain itu, terdapat juga tombol
            "Logout" jika pengguna ingin keluar dari akun tersebut.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Dashboard</span>
          <p>
            Di halaman dashboard, pengguna dapat melihat beberapa menu yang
            tersedia, yaitu "Penilaian", "Laporan", "Rekomendasi", dan
            "Panduan". Selain itu, terdapat juga tombol "Logout" jika pengguna
            ingin keluar dari akun tersebut.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Penilaian</span>
          <p>
            Di halaman "Penilaian", pengguna dapat memasukkan beberapa nilai ke
            dalam tabel yang tersedia. Sebelum mengisi tabel tersebut, pengguna
            diminta untuk memilih bulan penilaian yang akan dibuat. Setelah itu,
            akan muncul tabel untuk pengisian data. Pengguna dapat mengisi nilai
            aktual pada klausul-klausul yang telah disediakan berdasarkan fakta
            di lapangan. Pengguna juga dapat menambahkan keterangan jika ada hal
            yang perlu dicatat dan juga dapat melampirkan gambar kondisi di
            lapangan. Setelah seluruh klausul diisi, pengguna dapat menekan
            tombol "Kembali" untuk kembali ke dashboard.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Laporan</span>
          <p>
            Di halaman "Laporan", pengguna dapat melihat laporan dari penilaian
            yang telah disetujui oleh admin. Sebelum melihat tabel laporan,
            pengguna diminta untuk memilih bulan yang laporannya ingin dilihat.
            Setelah itu, akan muncul tabel laporan sesuai dengan bulan yang
            dipilih, dan nilai total akan terlihat pada bagian bawah tabel.
            Pengguna juga dapat mencetak laporan tersebut dengan menekan tombol
            "Cetak".
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Rekomendasi</span>
          <p>
            Tes Di halaman "Rekomendasi", pengguna dapat melihat rekomendasi
            penilaian yang telah ditinjau oleh admin berdasarkan penilaian yang
            sebelumnya diisi oleh pengguna. Sebelum menuju ke tabel rekomendasi,
            pengguna diminta untuk memilih bulan dari penilaian yang ingin
            dilihat rekomendasinya.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PanduanPengisianKaryawan;
