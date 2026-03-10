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

// Gentle parallax on hero signature (only if hero-name-wrap exists)
const heroWrap = document.querySelector('.hero-name-wrap');
if (heroWrap) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroWrap.style.transform = `translateY(${scrolled * 0.12}px)`;
        }
    });
}

// Hero image hover (only if hero image exists)
const heroImg = document.querySelector('.hero-name-wrap img');
if (heroImg) {
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
        }, 300);
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
}