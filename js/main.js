(function () {
  const slider = document.getElementById('slider');
  const slidesContainer = slider.querySelector('.slides');
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const indicatorsContainer = document.getElementById('indicators');
  const toggleAutoBtn = document.getElementById('toggleAuto');
  let current = 0;
  let auto = true;
  let interval = null;
  let startX = 0;
  let isDragging = false;

  const goToSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    updateIndicators();
  };

  const nextSlide = () => goToSlide(current + 1);
  const prevSlide = () => goToSlide(current - 1);

  const createIndicators = () => {
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'indicator';
      if (i === current) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(dot);
    });
  };

  const updateIndicators = () => {
    indicatorsContainer.querySelectorAll('.indicator').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  };

  const startAuto = () => {
    stopAuto();
    interval = setInterval(nextSlide, 3000);
  };

  const stopAuto = () => clearInterval(interval);

  const toggleAuto = () => {
    auto = !auto;
    toggleAutoBtn.textContent = auto ? 'Pause' : 'Play';
    auto ? startAuto() : stopAuto();
  };

  const handleKey = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prevSlide();
    else if (dx < -50) nextSlide();
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (dx > 50) prevSlide();
    else if (dx < -50) nextSlide();
    isDragging = false;
  };

  document.getElementById('next').addEventListener('click', nextSlide);
  document.getElementById('prev').addEventListener('click', prevSlide);
  toggleAutoBtn.addEventListener('click', toggleAuto);
  document.addEventListener('keydown', handleKey);

  slider.addEventListener('touchstart', handleTouchStart);
  slider.addEventListener('touchend', handleTouchEnd);
  slider.addEventListener('mousedown', handleMouseDown);
  slider.addEventListener('mouseup', handleMouseUp);

  createIndicators();
  if (auto) startAuto();
})();
