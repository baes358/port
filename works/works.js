new p5(function(p) {
    var xScale = 0.012, yScale = 0.016, GAP = 18;
    var offset = 0, mx = 0, my = 0, smx = 0, smy = 0;
    var mount, W, H;

    p.setup = function() {
        mount = document.getElementById('p5-mount');
        W = mount.offsetWidth;
        H = mount.offsetHeight;
        var cnv = p.createCanvas(W, H);
        cnv.parent('p5-mount');
        p.noStroke();
        p.frameRate(60);

        mount.addEventListener('mousemove', function(e) {
            var r = mount.getBoundingClientRect();
            mx = (e.clientX - r.left) / r.width - 0.5;
            my = (e.clientY - r.top) / r.height - 0.5;
        });
        mount.addEventListener('mouseleave', function() { 
            mx = 0; 
            my = 0; 
        });
    };

    p.draw = function() {
        p.background(247, 246, 242);
        offset += 0.5;
        smx += (mx - smx) * 0.04;
        smy += (my - smy) * 0.04;
        for (var x = GAP / 2; x < W; x += GAP) {
            for (var y = GAP / 2; y < H; y += GAP) {
                var n = p.noise(
                    (x + offset + smx * 80) * xScale,
                    (y + offset * 0.55 + smy * 55) * yScale
                );
                var diameter = n * GAP * 0.92;
                var alpha = p.map(n, 0, 1, 6, 165);
                p.fill(26, 31, 58, alpha);
                p.circle(x, y, diameter);
            }
        }
    };



    p.windowResized = function() {
        W = mount.offsetWidth; H = mount.offsetHeight; p.resizeCanvas(W, H);
    };
});




var projects = document.querySelectorAll('.project');

// Scroll reveal (keep existing)
var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
projects.forEach(function(el) { obs.observe(el); });

// Sync all dot panels to the currently visible project number
function setActiveDot(index) {
    document.querySelectorAll('.image-dots').forEach(function(wrap) {
        wrap.querySelectorAll('.image-dot').forEach(function(dot, i) {
            dot.classList.toggle('active', i === index);
        });
    });
}

var dotObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var idx = Array.from(projects).indexOf(entry.target);
            setActiveDot(idx);
        }
    });
}, { 
    threshold: 0,
    rootMargin: '0px 0px -40% 0px'  // triggers when top of project crosses 60% down the screen
});
projects.forEach(function(el) { dotObserver.observe(el); });



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