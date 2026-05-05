document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('portfolioTheme', 'light');
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            localStorage.setItem('portfolioTheme', 'dark');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling & Active Nav Link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });

        // Add blur effect to navbar on scroll
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = 'var(--shadow-sm)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Apply delay if specified
                const delay = entry.target.getAttribute('style');
                if (delay) {
                    entry.target.style.transitionDelay = entry.target.style.getPropertyValue('--delay');
                }
                observer.unobserve(entry.target);
                
                // Trigger counter animation if it's a stat item
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement) {
                    animateCounter(numberElement);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Counter Animation
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target;
            }
        };

        updateCounter();
    }

    // AI Chatbot Logic
    const chatToggle = document.getElementById('chat-toggle');
    const closeChat = document.getElementById('close-chat');
    const chatWindow = document.querySelector('.chat-window');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    function addMessage(text, isUser = false) {
        // Remove suggestions when chatting starts
        const suggestionBox = document.querySelector('.chat-suggestions');
        if (suggestionBox && suggestionBox.style.display !== 'none') {
            suggestionBox.style.display = 'none';
        }

        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if (text === '') return;

        addMessage(text, true);
        chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = "I'm still learning! But you can explore Yash's projects or contact him through the form below.";
            
            if (lowerText.includes('skill') || lowerText.includes('tech')) {
                response = "Yash is skilled in Prompt Engineering, Canva, Logic Building, and exploring new AI tools. Check the Skills section for more details!";
            } else if (lowerText.includes('project') || lowerText.includes('work')) {
                response = "Yash has built games like 2D Zombie Hunter and websites like Infinity Rides. Scroll to the Projects section to view them.";
            } else if (lowerText.includes('contact') || lowerText.includes('hire') || lowerText.includes('email')) {
                response = "You can reach Yash using the contact form at the bottom of the page.";
            } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                response = "Hello! How can I help you explore the portfolio today?";
            }

            addMessage(response, false);
        }, 1000);
    }

    sendChat.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.innerText;
            handleChat();
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sent Successfully <i data-lucide="check"></i>';
            btn.style.backgroundColor = '#10B981'; // Green color
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                contactForm.reset();
                lucide.createIcons();
            }, 3000);
        });
    }
});
