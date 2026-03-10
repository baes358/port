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

// Hero image trail replication on scroll
const heroImg = document.querySelector('.hero-name-wrap img');
const heroTrail = document.querySelector('.hero-trail');
const TRAIL_COPIES = 6;
const PARALLAX_LEAD = 0.22;   // main image moves fastest
const PARALLAX_DELTA = 0.032; // each trail clone lags more
const OPACITY_STEP = 0.14;    // each clone fades more

if (heroImg && heroTrail) {
    const src = heroImg.getAttribute('src');
    for (let i = 0; i < TRAIL_COPIES; i++) {
        const clone = document.createElement('img');
        clone.src = src;
        clone.alt = '';
        clone.className = 'hero-trail-clone';
        clone.setAttribute('aria-hidden', 'true');
        heroTrail.appendChild(clone);
    }

    const trailClones = heroTrail.querySelectorAll('.hero-trail-clone');
    const maxScroll = window.innerHeight * 1.2;

    function updateTrail() {
        const scrollY = window.scrollY;
        const t = Math.min(scrollY / maxScroll, 1);

        // Main hero image: leads the trail
        const mainY = scrollY * PARALLAX_LEAD;
        heroImg.style.transform = `translateY(${mainY}px)`;

        // Trail clones: each lags further behind, with decreasing opacity (keep center offset)
        trailClones.forEach((clone, i) => {
            const factor = PARALLAX_LEAD - (i + 1) * PARALLAX_DELTA;
            const y = scrollY * Math.max(factor, 0.05);
            const opacity = Math.max(0, 1 - (i + 1) * OPACITY_STEP);
            const scale = 1 - (i + 1) * 0.04;
            clone.style.transform = `translate(-50%, -50%) translateY(${y}px) scale(${scale})`;
            clone.style.opacity = opacity;
        });
    }

    window.addEventListener('scroll', updateTrail, { passive: true });
    updateTrail();
}

// Hero image hover (only if hero image exists)
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