const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const videoCards = document.querySelectorAll('.video-card');
const imageCards = document.querySelectorAll('.gallery-card');
const videoModalOverlay = document.getElementById('videoModal');
const imageModalOverlay = document.getElementById('imageModal');
const modalVideo = document.getElementById('modalVideo');
const modalImage = document.getElementById('modalImage');
const modalCloses = document.querySelectorAll('.modal-close');

// Carousel functionality
const designGallery = document.getElementById('designGallery');
const carouselContainer = document.querySelector('.carousel-container');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
let currentSlide = 0;
const totalSlides = 2; // 2 slides (items 0-1, items 2-3)

function scrollToSlide(slideIndex) {
  if (!designGallery || !carouselContainer) return;
  const cardWidth = designGallery.children[0]?.offsetWidth || 0;
  const gapWidth = 1.5 * 16; // 1.5rem in pixels
  const itemsPerSlide = 2;
  const slideWidth = (cardWidth + gapWidth) * itemsPerSlide - gapWidth;
  const scrollPos = slideIndex * slideWidth;
  
  carouselContainer.scrollLeft = scrollPos;
  currentSlide = slideIndex;
  updateCarouselButtons();
}

function updateCarouselButtons() {
  if (carouselPrev) carouselPrev.disabled = currentSlide <= 0;
  if (carouselNext) carouselNext.disabled = currentSlide >= totalSlides - 1;
}

if (carouselPrev) {
  carouselPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  });
}

if (carouselNext) {
  carouselNext.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      scrollToSlide(currentSlide + 1);
    }
  });
}

// Initialize
window.addEventListener('load', () => {
  scrollToSlide(0);
});
window.addEventListener('resize', () => {
  scrollToSlide(currentSlide);
});

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

videoCards.forEach((card) => {
  card.addEventListener('click', () => {
    const src = card.dataset.video;
    if (!src) return;
    modalVideo.querySelector('source').src = src;
    modalVideo.load();
    imageModalOverlay.classList.add('hidden');
    videoModalOverlay.classList.remove('hidden');
    modalVideo.play().catch(() => {});
  });
});

imageCards.forEach((card) => {
  card.addEventListener('click', () => {
    const src = card.dataset.image;
    if (!src) return;
    modalImage.src = src;
    imageModalOverlay.classList.remove('hidden');
    videoModalOverlay.classList.add('hidden');
  });
});

modalCloses.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    videoModalOverlay.classList.add('hidden');
    imageModalOverlay.classList.add('hidden');
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalImage.src = '';
  });
});

[videoModalOverlay, imageModalOverlay].forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.querySelector('.modal-close')?.click();
    }
  });
});

