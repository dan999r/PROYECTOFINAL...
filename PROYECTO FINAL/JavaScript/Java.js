document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('img');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
    
        slides.forEach(slide => slide.classList.add('invisible'));
        
        slides[index].classList.remove('invisible');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

   
    showSlide(currentIndex);

   
    setInterval(nextSlide, 3000); 
});