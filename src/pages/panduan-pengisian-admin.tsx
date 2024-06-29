function PanduanPengisianAdmin() {
  return (
    <div className="flex justify-center w-full pt-8 pb-5">
      <div className=" max-w-[750px] px-2 text-justify">
        <h1 className="pb-2 text-lg font-medium text-center">
          Panduan Pengisian sebagai Admin
        </h1>
        <div className="pt-2">
          <span className="font-medium">• Landing Page</span>
          <p>
            Pada Pada awalnya, admin akan berada di halaman utama (landing
            page). Admin dapat langsung menuju halaman login karena sudah
            memiliki email dan kata sandi yang diberikan sebelumnya.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Login</span>
          <p>
            Di halaman login, admin harus memasukkan email dan kata sandi yang
            telah diberikan untuk dapat masuk ke dashboard. Admin dapat mengisi
            email pada kolom "Email" dan kata sandi pada kolom "Password".
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Dashboard</span>
          <p>
            Di halaman dashboard, admin dapat melihat beberapa menu yang
            tersedia, yaitu "Penilaian", "Laporan" dan "Panduan". Selain itu,
            terdapat juga tombol "Logout" jika admin ingin keluar dari akun
            tersebut.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Penilaian</span>
          <p>
            Di halaman "Penilaian", admin dapat melihat penilaian yang telah
            dimasukkan oleh pengguna. Admin memiliki pilihan untuk menyetujui
            penilaian tersebut atau memberikan rekomendasi. Jika admin
            menyetujui penilaian, maka penilaian tersebut akan dimasukkan ke
            dalam laporan. Namun, jika admin memberikan rekomendasi, pengguna
            harus merevisi penilaian tersebut sesuai dengan rekomendasi yang
            diberikan.
          </p>
        </div>
        <div className="pt-2">
          <span className="font-medium">• Laporan</span>
          <p>
            Di halaman "Laporan", admin dapat melihat laporan dari penilaian
            yang telah disetujui. Sebelum melihat tabel laporan, admin diminta
            untuk memilih departemennya dan bulan yang laporannya ingin dilihat.
            Setelah itu, akan muncul tabel laporan sesuai dengan departemen dan
            bulan yang dipilih, dan nilai total akan terlihat pada bagian bawah
            tabel. Pengguna juga dapat mencetak laporan tersebut dengan menekan
            tombol "Cetak".
          </p>
        </div>
      </div>
    </div>
  );
}

export default PanduanPengisianAdmin;
