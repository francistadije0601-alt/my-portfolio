
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

  
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
      
        updateActiveNavLink();
    });

   
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

  
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
               
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }


    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });


    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });

    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        alert(`Thank you, ${data.name}! Your message has been sent. I'll get back to you soon.`);
        
        contactForm.reset();
    });


    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });


    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
        border: none;
        border-radius: 50%;
        color: #0a0a0a;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeTitle() {
            if (charIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeTitle, 100);
            }
        }

        setTimeout(typeTitle, 1500);
    }


    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    
    (function initChatbot() {
        const root = document.querySelector('.chatbot');
        if (!root) return;

        const toggleBtn = root.querySelector('.chatbot-toggle');
        const closeBtn = root.querySelector('.chatbot-close');
        const messages = root.querySelector('.chatbot-messages');
        const form = root.querySelector('.chatbot-input');
        const input = form ? form.querySelector('input') : null;

        const open = () => { root.classList.add('open'); input && input.focus(); };
        const close = () => { root.classList.remove('open'); };
        toggleBtn && toggleBtn.addEventListener('click', () => {
            root.classList.contains('open') ? close() : open();
        });
        closeBtn && closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && root.classList.contains('open')) close();
        });

        const scrollToBottom = () => {
            if (!messages) return;
            messages.scrollTop = messages.scrollHeight;
        };

        const appendMessage = (from, text) => {
            if (!messages) return;
            const el = document.createElement('div');
            el.className = `msg ${from}`;
            el.textContent = text;
            messages.appendChild(el);
            scrollToBottom();
        };

        const normalize = (s) => s.toLowerCase();
        const includesAny = (s, arr) => arr.some(k => s.includes(k));

        const botReply = (userText) => {
            const t = normalize(userText);

            if (includesAny(t, ['hello', 'hi', 'hey', 'kumusta', 'good morning', 'good afternoon'])) {
                return "Hello! I'm a simple assistant for Francis's portfolio. Ask me about projects, skills, or how to contact.";
            }

            if (includesAny(t, ['who are you', 'about you', 'about me', 'who is francis', 'introduce'])) {
                return "Francis G. Tadije is a 23-year-old IT student at the University of Eastern Pangasinan, passionate about tech and building useful software.";
            }

            if (includesAny(t, ['project', 'portfolio', 'work', 'recent'])) {
                return "You can view projects in the Projects section. Try the 'My Portfolio' project link for a live demo.";
            }

            if (includesAny(t, ['skill', 'tech', 'technology', 'stack', 'language'])) {
                return "Core skills include HTML, CSS, JavaScript, and Python, plus soft skills like communication, problem solving, and leadership.";
            }

            if (includesAny(t, ['contact', 'email', 'phone', 'call', 'reach', 'message'])) {
                return "Contact details: Email: francistadije0601@gmail.com | Phone: +63 9101132283. You can also use the Contact form on this page.";
            }

            if (includesAny(t, ['facebook', 'github', 'instagram', 'tiktok', 'social'])) {
                return "Socials: GitHub @ francistadije0601-alt, Facebook: francis.tadije, Instagram: _franzz.rar, plus TikTok linked in Contact.";
            }

            if (includesAny(t, ['where', 'location', 'based'])) {
                return "Based in Banaur, Laoac, Pangasinan.";
            }

            if (includesAny(t, ['experience', 'years', 'clients'])) {
                return "No Experience.";
            }

            return "I didn't quite get that. You can ask about: projects, skills, contact info, socials, or location.";
        };

        // Welcome message
        if (messages && !messages.hasChildNodes()) {
            appendMessage('bot', "Hi my name is Chi how can i help you? Try asking: 'What are your skills?' or 'How can I contact you?'");
        }

        form && form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = (input && input.value.trim()) || '';
            if (!text) return;
            appendMessage('user', text);
            if (input) input.value = '';

            // Typing indicator
            const typing = document.createElement('div');
            typing.className = 'msg bot';
            typing.textContent = 'Typing…';
            messages.appendChild(typing);
            scrollToBottom();

            setTimeout(() => {
                typing.remove();
                appendMessage('bot', botReply(text));
            }, Math.min(1200, Math.max(300, text.length * 30)));
        });
    })();

    console.log('Portfolio website loaded successfully!');
});

// ================================
// GitHub API Integration
// ================================
const GITHUB_USERNAME = 'francistadije0601-alt';
const GITHUB_API_BASE = 'https://api.github.com';

async function fetchGitHubData() {
    try {
        // Fetch user profile data
        const userResponse = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch GitHub user data');
        const userData = await userResponse.json();

        // Update GitHub stats
        document.getElementById('publicRepos').textContent = userData.public_repos || 0;
        document.getElementById('publicGists').textContent = userData.public_gists || 0;
        document.getElementById('followers').textContent = userData.followers || 0;
        document.getElementById('following').textContent = userData.following || 0;

        // Fetch repositories (sorted by updated date, max 6)
        const reposResponse = await fetch(
            `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        if (!reposResponse.ok) throw new Error('Failed to fetch GitHub repositories');
        const repos = await reposResponse.json();

        // Display repositories
        displayGitHubProjects(repos);

    } catch (error) {
        console.error('GitHub API Error:', error);
        displayGitHubError(error.message);
    }
}

function displayGitHubProjects(repos) {
    const container = document.getElementById('githubProjects');
    
    if (!repos || repos.length === 0) {
        container.innerHTML = `
            <div class="github-loading">
                <i class="fas fa-folder-open"></i>
                <p>No public repositories found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = repos.map(repo => {
        const language = repo.language || 'Code';
        const languageClass = getLanguageClass(language);
        
        return `
            <div class="github-project-card">
                <div class="github-project-header">
                    <h3 class="github-project-name">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h3>
                    <span class="github-project-visibility">${repo.visibility}</span>
                </div>
                <p class="github-project-description">${repo.description || 'No description available'}</p>
                <div class="github-project-stats">
                    <div class="github-project-stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    <div class="github-project-stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                    <div class="github-project-language">
                        <span class="language-dot ${languageClass}"></span>
                        <span>${language}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function displayGitHubError(message) {
    const container = document.getElementById('githubProjects');
    container.innerHTML = `
        <div class="github-error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Failed to load GitHub repositories</p>
            <small>${message}</small>
        </div>
    `;
}

function getLanguageClass(language) {
    const languageMap = {
        'JavaScript': 'javascript',
        'Python': 'python',
        'HTML': 'html',
        'CSS': 'css',
        'Java': 'java',
        'TypeScript': 'typescript',
        'C#': 'csharp',
        'C++': 'cpp',
        'PHP': 'php',
        'Ruby': 'ruby',
        'Go': 'go',
        'Rust': 'rust',
        'Swift': 'swift',
        'Kotlin': 'kotlin'
    };
    return languageMap[language] || 'default';
}

// Initialize GitHub section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only run if GitHub section exists
    if (document.getElementById('githubProjects')) {
        fetchGitHubData();
    }
});
