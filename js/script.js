document.querySelectorAll('.navbar-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const hm = document.querySelector('#hamburger-menu');

if (hm) {
  hm.addEventListener('click', function() {
    navbarNav.classList.toggle('active');
  });
}

// Klik di luar elemen search form dan hamburger menu untuk menutupnya
document.addEventListener('click', function(e) {
  // Cek jika klik di luar search form dan tombol toggle search
  if (searchForm && !searchForm.contains(e.target) && !toggleSearchFormButton.contains(e.target)) {
    searchForm.classList.remove('active');
    searchForm.style.transform = 'scaleY(0)';
  }
  
  // Cek jika klik di luar navbar dan tombol hamburger
  if (navbarNav && !navbarNav.contains(e.target) && !hm.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});


// Mute/Unmute Video
const video = document.getElementById('bumperVideo');
const muteUnmuteButton = document.getElementById('muteUnmuteButton');

// Pastikan elemen video dan tombol mute/unmute ada sebelum menambahkan event listener
if (video && muteUnmuteButton) {
  muteUnmuteButton.addEventListener('click', function() {
    if (video.muted) {
      video.muted = false;  // Mengaktifkan suara video
      muteUnmuteButton.textContent = 'Mute';  // Ubah teks tombol menjadi "Mute"
    } else {
      video.muted = true;  // Membisukan suara video
      muteUnmuteButton.textContent = 'Unmute';  // Ubah teks tombol menjadi "Unmute"
    }
  });
}

// Toggle class active untuk search form
const toggleSearchFormButton = document.querySelector('#toggle-search-form');  
const searchForm = document.querySelector('.search-form');  
const searchBox = document.querySelector('#search-box');  
const searchIcon = document.querySelector('#search-icon'); 

if (toggleSearchFormButton) {
  toggleSearchFormButton.addEventListener('click', (e) => {
    searchForm.classList.toggle('active');  
    if (searchForm.classList.contains('active')) {
      searchBox.focus();  // Fokus ke input saat form aktif
    }
    e.preventDefault();  
  });
}

// Fungsi untuk menghapus highlight dari semua elemen <h3> dan menampilkan semua konten
function resetSearchResults() {
  const highlightedTitles = document.querySelectorAll('h3.highlight');
  highlightedTitles.forEach(title => {
    title.classList.remove('highlight'); // Hapus highlight
  });

  // Tampilkan kembali semua konten yang disembunyikan
  const contentCards = document.querySelectorAll('.menu-card');
  contentCards.forEach(card => {
    card.style.display = 'block'; // Pastikan semua konten kembali tampil
  });
}

// Fungsi untuk melakukan pencarian berdasarkan judul di bawah konten
function performSearch() {
  const searchQuery = searchBox.value.toLowerCase().trim(); // Ambil input pencarian dan jadikan huruf kecil
  let hasResults = false;

  // Lakukan pencarian di elemen 'h3' (judul konten)
  const contentCards = document.querySelectorAll('.menu-card');
  contentCards.forEach(card => {
    const title = card.querySelector('h3');
    if (title) {
      // Jika judul konten cocok dengan query, tampilkan konten
      if (title.textContent.toLowerCase().includes(searchQuery)) {
        card.style.display = 'block'; // Tampilkan konten
        title.classList.add('highlight'); // Sorot judul konten
        if (!hasResults) {
          // Pindah ke hasil pertama yang ditemukan
          title.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        hasResults = true;
      } else {
        card.style.display = 'none'; // Sembunyikan konten jika tidak cocok
        title.classList.remove('highlight'); // Hapus highlight
      }
    }
  });

  // Tampilkan pesan jika tidak ada hasil
  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.style.display = hasResults ? 'none' : 'block';
  }
}

// Event listener untuk klik tombol search
if (searchIcon) {
  searchIcon.addEventListener('click', function(e) {
    e.preventDefault(); // Mencegah perilaku default tombol
    performSearch(); // Panggil fungsi pencarian
  });
}

// Event listener untuk menekan tombol Enter di input pencarian
if (searchBox) {
  searchBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { // Jika tombol Enter ditekan
      e.preventDefault(); // Mencegah form submit
      performSearch(); // Panggil fungsi pencarian
    }
  });
}

// Event listener untuk klik di luar form pencarian atau hasil pencarian
document.addEventListener('click', function(e) {
  // Jika klik terjadi di luar form pencarian dan ikon pencarian, hapus highlight dan tampilkan semua konten
  if (!searchForm.contains(e.target) && !searchIcon.contains(e.target)) {
    resetSearchResults();
  }
});
