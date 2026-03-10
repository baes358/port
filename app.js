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


// for hero hover
const heroImg = document.querySelector('.hero-name-wrap img');
const defaultSrc = './assets/Asset 1.png';
const hoverSrc   = './assets/Asset 8.png';

new Image().src = hoverSrc;

heroImg.addEventListener('mouseenter', () => {
    heroImg.style.opacity = '0';
    heroImg.style.filter  = 'blur(8px)';

    setTimeout(() => {
        heroImg.src = hoverSrc;
        heroImg.style.opacity = '1';
        heroImg.style.filter  = 'blur(0px)';
    }, 300); // match your transition duration
});

heroImg.addEventListener('mouseleave', () => {
    heroImg.style.opacity = '0';
    heroImg.style.filter  = 'blur(8px)';

    setTimeout(() => {
        heroImg.src = defaultSrc;
        heroImg.style.opacity = '1';
        heroImg.style.filter  = 'blur(0px)';
    }, 300);
});