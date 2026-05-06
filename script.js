/**
 * PREMIUM PORTFOLIO ENGINE
 * Features: Scroll Progress, Reveal Animations, Stats Counters
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    });

    // 2. Navigation Styling on Scroll
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Reveal Animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains stats, trigger counter
                const counters = entry.target.querySelectorAll('.stat-number');
                if (counters.length > 0) {
                    counters.forEach(counter => animateCounter(counter));
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Animated Stats Counters
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (OutExpo)
            const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            el.innerText = Math.floor(easeValue * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }
        };

        requestAnimationFrame(update);
    }

    // 5. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Mock submission state
            btn.innerHTML = 'Sending... <i data-lucide="loader" class="loader-icon"></i>';
            lucide.createIcons();
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                btn.style.background = '#10B981'; // Green
                lucide.createIcons();
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
    }

    // 6. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Bio Typewriter Engine
    const bioTypewriter = document.getElementById('hero-typewriter');
    if (bioTypewriter) {
        const bioText = "I am a student who recently completed my 10th grade (2025–26). I have a strong interest in Web Development and Creative Coding. By leveraging AI technologies, I build smarter, faster, and more responsive digital solutions.";
        
        let charIdx = 0;
        let speed = 40; // Faster for longer text

        function typeBio() {
            if (charIdx < bioText.length) {
                bioTypewriter.textContent += bioText.charAt(charIdx);
                charIdx++;
                setTimeout(typeBio, speed);
            }
        }

        // Start typing after a short delay
        setTimeout(typeBio, 800);
    }
});
