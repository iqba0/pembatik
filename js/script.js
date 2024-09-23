// Ambil elemen video dan tombol mute/unmute
const video = document.getElementById('bumperVideo');
const muteUnmuteButton = document.getElementById('muteUnmuteButton');

// Pastikan elemen video dan tombol mute/unmute ada sebelum menambahkan event listener
if (video && muteUnmuteButton) {
  muteUnmuteButton.addEventListener('click', function() {
    if (video.muted) {
      video.muted = false;  // Mengaktifkan suara video
      muteUnmuteButton.innerHTML = '<i data-feather="volume-2"></i>';  // Ubah ikon menjadi volume aktif
    } else {
      video.muted = true;  // Membisukan suara video
      muteUnmuteButton.innerHTML = '<i data-feather="volume-x"></i>';  // Ubah ikon menjadi mute
    }
    feather.replace();  // Ganti ikon Feather setelah update
  });

  // Fungsi untuk mengecek apakah video berada di viewport
  function isVideoInView() {
    const rect = video.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0; // Cek apakah video masih terlihat
  }

  // Event listener untuk pause/play video saat scroll
  window.addEventListener('scroll', function () {
    if (isVideoInView()) {
      video.play();  // Play video jika masih terlihat
    } else {
      video.pause();  // Pause video jika keluar dari viewport
    }
  });

  // Inisialisasi ikon saat halaman pertama kali dimuat
  feather.replace();
}

// Toggle class active untuk search form
const toggleSearchFormButton = document.querySelector('#toggle-search-form');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchIcon = document.querySelector('#search-icon');
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbarNav = document.querySelector('.navbar-nav');

if (toggleSearchFormButton && searchForm) {
  toggleSearchFormButton.addEventListener('click', (e) => {
    searchForm.classList.toggle('active');  
    if (searchForm.classList.contains('active')) {
      searchBox.focus();  // Fokus ke input saat form aktif
    }
    e.preventDefault();  
  });
}

// Klik di luar search form dan hamburger menu untuk menutup dan reset tampilan semua elemen
document.addEventListener('click', function (e) {
  // Tutup search form jika klik di luar
  if (searchForm && !searchForm.contains(e.target) && !toggleSearchFormButton.contains(e.target)) {
    searchForm.classList.remove('active');
    resetSearchResults();  // Tampilkan kembali semua elemen yang disembunyikan oleh pencarian
  }
  
  // Tutup hamburger menu jika klik di luar
  if (navbarNav && !navbarNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

// Fungsi reset search: menampilkan kembali semua elemen yang disembunyikan oleh pencarian
function resetSearchResults() {
  const highlightedTitles = document.querySelectorAll('h3.highlight');
  highlightedTitles.forEach(title => {
    title.classList.remove('highlight');
  });

  const contentCards = document.querySelectorAll('.menu-card');
  contentCards.forEach(card => {
    card.style.display = 'block';  // Pastikan semua elemen ditampilkan kembali
  });

  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.style.display = 'none';  // Sembunyikan pesan 'tidak ada hasil'
  }
}

// Fungsi pencarian: hanya menampilkan elemen yang cocok dengan pencarian
function performSearch() {
  const searchQuery = searchBox.value.toLowerCase().trim();
  let hasResults = false;

  const contentCards = document.querySelectorAll('.menu-card');
  contentCards.forEach(card => {
    const title = card.querySelector('h3');
    if (title) {
      if (title.textContent.toLowerCase().includes(searchQuery)) {
        card.style.display = 'block';
        title.classList.add('highlight');
        if (!hasResults) {
          title.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        hasResults = true;
      } else {
        card.style.display = 'none';
        title.classList.remove('highlight');
      }
    }
  });

  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }
}

// Event listener untuk tombol search
if (searchIcon) {
  searchIcon.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch();
  });
}

// Event listener untuk menekan tombol Enter di input pencarian
if (searchBox) {
  searchBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });
}

// Toggle untuk hamburger menu
if (hamburgerMenu && navbarNav) {
  hamburgerMenu.addEventListener('click', function () {
    navbarNav.classList.toggle('active');
  });
}
