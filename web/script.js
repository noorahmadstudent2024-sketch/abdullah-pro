/* ============================================
   ABDULLAH SIDDIQUI - PORTFOLIO WEBSITE
   JavaScript Functionality
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initPreloader();
    initNavigation();
    initTypingEffect();
    initScrollReveal();
    initStatsCounter();
    initSkillBars();
    initLanguageCircles();
    initTestimonialsSlider();
    initContactForm();
    initBackToTop();
    initParticles();
    initSmoothScroll();
});

/* ============================================
   Dark Mode / Theme Toggle
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update particles color for dark mode
        updateParticlesColor(newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
}

function updateParticlesColor(theme) {
    // This function can be used to update particle colors if needed
    // The particles already use CSS variables so they should update automatically
}

/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 500);
    });
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   Typing Effect
   ============================================ */
function initTypingEffect() {
    const typedText = document.getElementById('typed-text');
    const texts = [
        'Building Digital Solutions',
        'Technical Excellence',
        'Customer-Focused Service',
        'Continuous Learning',
        'Professional Growth'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ============================================
   Scroll Reveal Animation
   ============================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .cert-card, ' +
        '.exp-item, .skill-category, .service-card, .info-card, ' +
        '.contact-form-wrapper, .languages-section'
    );

    revealElements.forEach(function(el) {
        el.classList.add('reveal');
    });

    function reveal() {
        revealElements.forEach(function(el) {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

/* ============================================
   Stats Counter Animation
   ============================================ */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            hasAnimated = true;

            statNumbers.forEach(function(stat) {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                function updateCount() {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                }

                updateCount();
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check
}

/* ============================================
   Skill Bars Animation
   ============================================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    let hasAnimated = false;

    function animateSkillBars() {
        if (hasAnimated) return;

        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            hasAnimated = true;

            skillBars.forEach(function(bar, index) {
                setTimeout(function() {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                }, index * 100);
            });
        }
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Initial check
}

/* ============================================
   Language Circles Animation
   ============================================ */
function initLanguageCircles() {
    const languageCircles = document.querySelectorAll('.language-circle');
    let hasAnimated = false;

    function animateCircles() {
        if (hasAnimated) return;

        const languagesSection = document.querySelector('.languages-section');
        if (!languagesSection) return;

        const sectionTop = languagesSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            hasAnimated = true;

            languageCircles.forEach(function(circle) {
                const percent = parseInt(circle.getAttribute('data-percent'));
                const ringFill = circle.querySelector('.ring-fill');
                const circumference = 2 * Math.PI * 45; // radius = 45
                const offset = circumference - (percent / 100) * circumference;

                setTimeout(function() {
                    ringFill.style.strokeDashoffset = offset;
                }, 300);
            });
        }
    }

    window.addEventListener('scroll', animateCircles);
    animateCircles(); // Initial check
}

/* ============================================
   Testimonials Slider
   ============================================ */
function initTestimonialsSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        cards.forEach(function(card, i) {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });

        cards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Dot click navigation
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            currentIndex = index;
            showSlide(currentIndex);
            startAutoSlide();
        });
    });

    // Start auto-slide
    startAutoSlide();
}

/* ============================================
   Contact Form
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        setTimeout(function() {
            // Create mailto link as fallback
            const mailtoLink = 'mailto:abdullahsiddiqui4365@gmail.com' +
                '?subject=' + encodeURIComponent(data.subject + ': ' + data.name) +
                '&body=' + encodeURIComponent(
                    'Name: ' + data.name + '\n' +
                    'Email: ' + data.email + '\n' +
                    'Phone: ' + (data.phone || 'Not provided') + '\n\n' +
                    'Message:\n' + data.message
                );

            window.location.href = mailtoLink;

            showNotification('Opening email client...', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(function() {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ============================================
   Back to Top Button
   ============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   Particles Animation
   ============================================ */
function initParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles');

    if (!particlesContainer) return;

    particlesContainer.appendChild(canvas);

    let particles = [];
    const particleCount = 50;

    // Get accent color based on theme
    function getAccentColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '240, 193, 75' : '212, 175, 55';
    }

    function resize() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const accentColor = getAccentColor();

        particles.forEach(function(particle) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + accentColor + ', ' + particle.opacity + ')';
            ctx.fill();
        });

        // Draw connections
        particles.forEach(function(particle, i) {
            particles.slice(i + 1).forEach(function(otherParticle) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = 'rgba(' + accentColor + ', ' + (0.1 * (1 - distance / 150)) + ')';
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function() {
        resize();
    });

    init();
    animate();
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   CV Download Handler
   ============================================ */
document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();

    // Show notification that CV would be downloaded
    // In production, this would link to an actual PDF file
    showNotification('CV download will be available soon!', 'success');

    // Uncomment and modify the line below when you have a CV file
    // window.open('path/to/cv.pdf', '_blank');
});

/* ============================================
   Additional Interactive Effects
   ============================================ */

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Hover effect for certification cards on touch devices
if ('ontouchstart' in window) {
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(function(card) {
        card.addEventListener('touchstart', function() {
            this.querySelector('.cert-card-inner').style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('touchend', function() {
            const inner = this.querySelector('.cert-card-inner');
            setTimeout(function() {
                inner.style.transform = 'rotateY(0deg)';
            }, 3000);
        });
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Console welcome message
console.log('%c Welcome to Abdullah Siddiqui\'s Portfolio! ',
    'background: #1a2332; color: #d4af37; font-size: 16px; padding: 10px;');
console.log('%c Frontend Developer | HVAC Specialist | Healthcare Professional ',
    'background: #d4af37; color: #1a2332; font-size: 12px; padding: 5px;');
