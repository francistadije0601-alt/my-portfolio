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

    
    // ================================
    // AI Chatbot with Enhanced Q&A
    // ================================
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

        const appendMessage = (from, text, isAI = false) => {
            if (!messages) return;
            const el = document.createElement('div');
            el.className = `msg ${from}`;
            if (isAI) el.classList.add('ai-response');
            el.textContent = text;
            messages.appendChild(el);
            scrollToBottom();
        };

        const normalize = (s) => s.toLowerCase();
        const includesAny = (s, arr) => arr.some(k => s.includes(k));

        // AI Configuration
        const USE_AI = true;
        const AI_CONTEXT = `You are Chi, a friendly AI assistant for Francis G. Tadije's portfolio website. 
        Francis G. Tadije is a 23-year-old IT student at University of Eastern Pangasinan (UEP), Philippines.
        He's studying Bachelor of Science in Information Technology (BSIT).
        His skills include: HTML, CSS, JavaScript, Python, Communication, Problem Solving, Leadership.
        Projects: His portfolio website built with HTML, CSS, JavaScript.
        Contact: francistadije0601@gmail.com | Phone: +63 9101132283
        Location: Banaur, Laoac, Pangasinan, Philippines
        Social: GitHub: francistadije0601-alt, Facebook: francis.tadije, Instagram: _franzz.rar
        He's an intern student with 5 years experience, 50 projects completed, 30 happy clients.
        Be helpful, concise, and friendly. Keep responses short (2-3 sentences max).`;

        // Enhanced Q&A Knowledge Base
        const knowledgeBase = {
            // Greetings
            greetings: {
                keywords: ['hello', 'hi', 'hey', 'kumusta', 'good morning', 'good afternoon', 'good evening', 'sup', 'what\'s up', 'hi there', 'greetings'],
                response: "Hello! I'm Chi, Francis's AI assistant. Ask me anything about his portfolio, skills, projects, or how to contact him!"
            },
            // About Francis
            about: {
                keywords: ['who are you', 'about you', 'about me', 'who is francis', 'introduce', 'tell me about', 'who is this'],
                response: "Francis G. Tadije is a 23-year-old IT student at University of Eastern Pangasinan. He's passionate about technology, web development, and building useful software solutions."
            },
            // Age
            age: {
                keywords: ['age', 'how old', 'old are you', 'birthday', 'year born', 'years old'],
                response: "Francis is 23 years old. He's a young and enthusiastic IT student eager to learn and grow in the tech industry."
            },
            // Education
            education: {
                keywords: ['education', 'school', 'university', 'college', 'studying', 'degree', 'course', 'uep', 'pangasinan state university', 'bsit', 'intern'],
                response: "Francis is studying Bachelor of Science in Information Technology (BSIT) at University of Eastern Pangasinan. He's currently an intern student gaining practical experience."
            },
            // Projects
            projects: {
                keywords: ['project', 'projects', 'portfolio', 'work', 'recent', 'built', 'create', 'made', 'demo'],
                response: "Check out the Projects section! His main project is this portfolio website built with HTML, CSS, and JavaScript. Visit the live demo to see more!"
            },
            // Skills
            skills: {
                keywords: ['skill', 'skills', 'tech', 'technology', 'stack', 'language', 'programming', 'know', 'expertise', 'technologies'],
                response: "Technical Skills: HTML, CSS, JavaScript, Python | Soft Skills: Communication, Problem Solving, Leadership. He's always learning new technologies!"
            },
            // Specific programming languages
            html: {
                keywords: ['html', 'hypertext markup', 'markup'],
                response: "Francis is proficient in HTML5! He uses it to create semantic, accessible web pages. Check out his portfolio to see his HTML skills in action."
            },
            css: {
                keywords: ['css', 'styling', 'style', 'stylesheets'],
                response: "Francis knows CSS3 including Flexbox, Grid, and animations! He created this beautiful portfolio with custom CSS styling."
            },
            javascript: {
                keywords: ['javascript', 'js', 'scripting', 'ecmascript'],
                response: "JavaScript is one of Francis's strengths! He uses it to create interactive features like this chatbot, smooth scrolling, and dynamic content."
            },
            python: {
                keywords: ['python', 'py', 'python programming'],
                response: "Francis has Python skills! He's learning Python for backend development, automation, and data-related projects."
            },
            // Contact
            contact: {
                keywords: ['contact', 'email', 'phone', 'call', 'reach', 'message', 'hire', 'reach out', 'connect'],
                response: "Contact Francis: Email: francistadije0601@gmail.com | Phone: +63 9101132283 | You can also use the Contact form on this page!"
            },
            // Social Media
            social: {
                keywords: ['facebook', 'github', 'instagram', 'tiktok', 'social', 'social media', 'linkedin', 'follow'],
                response: "Follow Francis: GitHub: @francistadije0601-alt | Facebook: francis.tadije | Instagram: @_franzz.rar | TikTok linked in Contact section!"
            },
            github: {
                keywords: ['github', 'repo', 'repository', 'code', 'repositories', 'gitlab', 'bitbucket'],
                response: "Check out Francis's GitHub: github.com/francistadije0601-alt! He has several projects and is actively coding."
            },
            // Location
            location: {
                keywords: ['where', 'location', 'based', 'live', 'address', 'from', 'residence'],
                response: "Francis is based in Banaur, Laoac, Pangasinan, Philippines. He's proud to be from the beautiful Ilocos Region!"
            },
            pangasinan: {
                keywords: ['pangasinan', 'ilocos', 'laoac', 'banaur', 'philippines', 'ph'],
                response: "Francis is from Pangasinan, specifically Banaur, Laoac. It's a beautiful province in the Ilocos Region of the Philippines known for its beaches and history!"
            },
            // Experience
            experience: {
                keywords: ['experience', 'years', 'clients', 'worked', 'professional'],
                response: "Francis has completed 50+ projects with 30+ happy clients. He's an intern student gaining real-world experience!"
            },
            // Availability
            availability: {
                keywords: ['available', 'hiring', 'job', 'work', 'internship', 'freelance', 'open to work', 'looking for', 'employment', 'vacant'],
                response: "Francis is currently an intern student but open to opportunities! Contact him to discuss potential collaborations or projects."
            },
            // Goals
            goals: {
                keywords: ['goal', 'goals', 'future', 'career', 'aspiration', 'dream', 'ambition', 'plan'],
                response: "Francis aims to become a full-stack developer and contribute to innovative tech solutions. He's focused on learning and growing in the IT field!"
            },
            // Hobbies
            hobbies: {
                keywords: ['hobby', 'hobbies', 'interest', 'interests', 'free time', 'like to do', 'enjoy', 'passion'],
                response: "Francis loves coding, learning new technologies, and building projects. He also enjoys gaming and exploring tech trends!"
            },
            // Languages spoken
            languages: {
                keywords: ['language', 'speak', 'english', 'tagalog', 'filipino', 'ilocano', 'native'],
                response: "Francis can communicate in English, Filipino (Tagalog), and Ilocano! He's comfortable working in multilingual environments."
            },
            // Thank you
            thanks: {
                keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'grateful', 'ty', 'much appreciated'],
                response: "You're welcome! Feel free to ask if you have more questions about Francis or his work!"
            },
            // Help
            help: {
                keywords: ['help', 'can you', 'what can you', 'commands', 'menu', 'options', 'assistant'],
                response: "I can help you learn about: Francis (about, age, education), Skills (HTML, CSS, JS, Python), Projects, Contact info, Social media, Location, Availability, and more! Just ask!"
            },
            // Website
            website: {
                keywords: ['website', 'site', 'web', 'this page', 'this site', 'portfolio site'],
                response: "This is Francis's personal portfolio website! It showcases his skills, projects, and contact information. Feel free to explore all sections!"
            },
            // Name
            name: {
                keywords: ['name', 'full name', 'your name', 'francis', 'tadije'],
                response: "His name is Francis G. Tadije! He's an IT student and the creator of this awesome portfolio website."
            }
        };

        // Find matching response from knowledge base
        const findKnowledgeResponse = (userText) => {
            const t = normalize(userText);
            
            for (const [key, data] of Object.entries(knowledgeBase)) {
                if (includesAny(t, data.keywords)) {
                    return { response: data.response, isAI: false };
                }
            }
            return null;
        };

        // AI Chat function using Hugging Face Inference API
        const getAIResponse = async (userText) => {
            try {
                const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: `${AI_CONTEXT}\n\nUser: ${userText}\nChi:`,
                        parameters: {
                            max_length: 150,
                            temperature: 0.7,
                            top_p: 0.9,
                        }
                    }),
                });

                if (!response.ok) {
                    throw new Error('AI API request failed');
                }

                const data = await response.json();
                let aiResponse = data[0]?.generated_text || '';
                
                // Clean up the response - remove the context and keep only Chi's response
                const chiIndex = aiResponse.lastIndexOf('Chi:');
                if (chiIndex !== -1) {
                    aiResponse = aiResponse.substring(chiIndex + 4).trim();
                }
                
                // If response is too long or empty, use fallback
                if (aiResponse.length > 200 || aiResponse.length < 2) {
                    return null;
                }
                
                return aiResponse;
            } catch (error) {
                console.log('AI API error:', error);
                return null;
            }
        };

        const botReply = async (userText) => {
            // First, try to find a matching response from knowledge base
            const knowledgeMatch = findKnowledgeResponse(userText);
            if (knowledgeMatch) {
                return knowledgeMatch;
            }

            // If no match and AI is enabled, try AI
            if (USE_AI) {
                const aiResponse = await getAIResponse(userText);
                if (aiResponse) {
                    return { response: aiResponse, isAI: true };
                }
            }

            // Fallback response
            return { 
                response: "I'm not sure about that. Try asking about: projects, skills, contact, education, location, or availability! I can help you learn more about Francis.", 
                isAI: false 
            };
        };

        // Welcome message
        if (messages && !messages.hasChildNodes()) {
            appendMessage('bot', "Hi! I'm Chi, Francis's AI assistant. Ask me anything about his skills, projects, education, or how to contact him!");
        }

        form && form.addEventListener('submit', async (e) => {
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

            // Get bot response (may be async for AI)
            const botResponse = await botReply(text);
            
            typing.remove();
            appendMessage('bot', botResponse.response, botResponse.isAI);
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
