// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const hm = document.querySelector('#hamburger-menu');

if (hm) {
  hm.addEventListener('click', function() {
    navbarNav.classList.toggle('active');
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
      searchForm.style.transform = 'scaleY(1)'; 
      searchBox.focus();  
    } else {
      searchForm.style.transform = 'scaleY(0)';  
    }
    e.preventDefault();  
  });
}

// Fungsi untuk melakukan pencarian berdasarkan judul di bawah konten
function performSearch() {
  const searchQuery = searchBox.value.toLowerCase().trim();  
  const contentCards = document.querySelectorAll('.menu-card');  
  let hasResults = false;
}
  contentCards.forEach(card => {
    const title = card.querySelector('h3');  
    if (title) {
      // Jika judul konten cocok dengan query, tampilkan konten, jika tidak, sembunyikan
      if (title.textContent.toLowerCase().includes(searchQuery)) {
        card.style.display = '';  
        title.classList.add('highlight');  
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

// Event listener untuk ikon pencarian
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

// Klik di luar elemen untuk menutup dropdown atau search form
document.addEventListener('click', function (e) {
  if (hm && !hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!searchForm.contains(e.target) && !toggleSearchFormButton.contains(e.target)) {
    searchForm.classList.remove('active');
    searchForm.style.transform = 'scaleY(0)';  
  }
});

document.addEventListener('DOMContentLoaded', function() {
  feather.replace(); 
});

// Mute/Unmute Video
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('bumperVideo');
  const muteUnmuteButton = document.getElementById('muteUnmuteButton');

  // Periksa apakah elemen video dan tombol ditemukan
  if (video && muteUnmuteButton) {
    console.log("Video dan tombol ditemukan");

    // Set teks tombol berdasarkan status awal video (muted atau tidak)
    muteUnmuteButton.textContent = video.muted ? 'Unmute' : 'Mute';

    muteUnmuteButton.addEventListener('click', function() {
      if (video.muted) {
        console.log("Mengaktifkan suara video");
        video.muted = false; // Aktifkan suara video
        muteUnmuteButton.textContent = 'Mute'; // Ubah teks tombol menjadi "Mute"
      } else {
        console.log("Mematikan suara video");
        video.muted = true; // Matikan suara video
        muteUnmuteButton.textContent = 'Unmute'; // Ubah teks tombol menjadi "Unmute"
      }
    });
  } else {
    console.error("Video atau tombol tidak ditemukan!");
  }
});


