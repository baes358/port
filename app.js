// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.1 
});

document.querySelectorAll('.about, .fun-section, .connect-section').forEach(el => {
    observer.observe(el);
});

// Gentle parallax on hero signature
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroEl = document.querySelector('.hero-name-wrap');
    if (heroEl && scrolled < window.innerHeight) {
        heroEl.style.transform = `translateY(${scrolled * 0.12}px)`;
    }
});
