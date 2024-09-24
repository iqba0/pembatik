const video = document.getElementById('bumperVideo');

// Fungsi untuk mengecek apakah video berada di viewport
function isVideoInView() {
  const rect = video.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0; // Cek apakah video masih terlihat
}

// Event listener untuk pause/play video saat scroll, hanya jika video ditemukan
if (video) {
  window.addEventListener('scroll', function () {
    if (isVideoInView()) {
      video.play();  // Play video jika masih terlihat
    } else {
      video.pause();  // Pause video jika keluar dari viewport
    }
  });
}
// Toggle class active untuk search form
const toggleSearchFormButton = document.querySelector('#toggle-search-form');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchIcon = document.querySelector('#search-icon');
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbarNav = document.querySelector('.navbar-nav');

// Periksa apakah elemen search form tersedia sebelum menambahkan event listener
if (toggleSearchFormButton && searchForm) {
  toggleSearchFormButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubbling
    searchForm.classList.toggle('active');
    searchForm.style.visibility = searchForm.classList.contains('active') ? 'visible' : 'hidden';
    searchForm.style.opacity = searchForm.classList.contains('active') ? '1' : '0';
    searchForm.style.pointerEvents = searchForm.classList.contains('active') ? 'auto' : 'none';

    if (searchForm.classList.contains('active')) {
      searchBox.focus();  // Fokus ke input saat form aktif
    }
    e.preventDefault();
  });
}

// Fungsi untuk menutup search form
function closeSearchForm() {
  if (searchForm.classList.contains('active')) {
    searchForm.classList.remove('active');
    searchForm.style.opacity = '0';  // Opacity untuk transisi yang halus
    searchForm.style.pointerEvents = 'none';  // Mencegah interaksi saat form disembunyikan
    setTimeout(() => {
      searchForm.style.visibility = 'hidden';  // Sembunyikan form setelah transisi selesai
      removeHighlights();  // Hapus highlight saat search form ditutup
    }, 300);  // Sesuaikan durasi transisi
  }
}

// Fungsi pencarian: hanya menyoroti elemen dan menggulir ke bagian yang dicari
function performSearch() {
  const searchQuery = searchBox.value.toLowerCase().trim();
  
  // Jika kotak pencarian kosong, hilangkan semua highlight
  if (searchQuery === "") {
    removeHighlights();  // Hapus highlight jika pencarian kosong
    return;
  }

  let hasResults = false;
  const contentCards = document.querySelectorAll('.menu-card');
  contentCards.forEach(card => {
    const title = card.querySelector('h3');
    if (title) {
      if (title.textContent.toLowerCase().includes(searchQuery)) {
        title.classList.add('highlight');  // Soroti elemen yang cocok
        if (!hasResults) {
          title.scrollIntoView({ behavior: 'smooth', block: 'center' });  // Gulir ke elemen pertama yang cocok
        }
        hasResults = true;
      } else {
        title.classList.remove('highlight');  // Hapus highlight jika tidak cocok
      }
    }
  });

  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';  // Tampilkan pesan "Tidak ada hasil" jika tidak ada hasil pencarian
  }
}

// Fungsi untuk menghapus highlight dari semua elemen yang disorot
function removeHighlights() {
  const highlightedTitles = document.querySelectorAll('h3.highlight');
  highlightedTitles.forEach(title => {
    title.classList.remove('highlight');  // Hapus kelas highlight dari elemen
  });
}

// Event listener untuk ikon search agar pencarian dilakukan saat diklik
searchIcon.addEventListener('click', function(e) {
  e.stopPropagation();  // Mencegah event bubbling agar form tidak tertutup
  performSearch();      // Panggil fungsi pencarian saat ikon diklik
});

// Event listener untuk menangani tombol Enter di search box
searchBox.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();  // Cegah tindakan default
    performSearch();     // Lakukan pencarian saat Enter ditekan
  }
});

// Event listener untuk menghapus highlight saat kotak pencarian dikosongkan
searchBox.addEventListener('input', function(e) {
  if (searchBox.value.trim() === "") {
    removeHighlights();  // Hapus highlight saat kotak pencarian dikosongkan
  }
});

// Event listener untuk menutup search form saat klik di luar elemen terkait
document.addEventListener('click', function (e) {
  const clickedInsideSearchForm = searchForm && searchForm.contains(e.target);
  const clickedInsideSearchIcon = searchIcon && searchIcon.contains(e.target);
  const clickedInsideSearchButton = toggleSearchFormButton && toggleSearchFormButton.contains(e.target);

  // Jika klik terjadi di luar search form dan elemen pencarian, tutup form
  if (!clickedInsideSearchForm && !clickedInsideSearchIcon && !clickedInsideSearchButton) {
    closeSearchForm();
  }
});
