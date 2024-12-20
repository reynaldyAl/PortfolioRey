// portfolio.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 150,
        once: true
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const grid = document.querySelector('.portfolio-grid');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get filter value
            const filter = btn.dataset.filter;

            // Add animation class to grid
            grid.classList.add('filtering');

            // Filter items
            portfolioItems.forEach(item => {
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;

                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });

            // Remove animation class after transition
            setTimeout(() => {
                grid.classList.remove('filtering');
            }, 500);
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalBtns = document.querySelectorAll('.btn-demo');
    const closeBtns = document.querySelectorAll('.close-modal');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Add background patterns to cards
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        const pattern = document.createElement('div');
        pattern.className = 'card-pattern';
        card.appendChild(pattern);
    });

    // Lazy loading images
    const images = document.querySelectorAll('.portfolio-img img');
    const imageOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});

//description for the portfolio section
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const description = btn.closest('.project-description');
        const fullDescription = description.querySelector('.description-full');
        const isExpanded = fullDescription.classList.contains('show');
        
        fullDescription.classList.toggle('show');
        btn.textContent = isExpanded ? 'Read More' : 'Show Less';
        
        if (!isExpanded) {
            fullDescription.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const roadmapWrapper = document.querySelector('.roadmap-wrapper');
    const currentItem = document.querySelector('.roadmap-item.current');

    if (currentItem) {
        setTimeout(() => {
            currentItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 500);
    }

    // Fade in animation for items
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    roadmapItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add to your JS file
function updateSemesterProgress() {
    const now = new Date();
    const items = document.querySelectorAll('.roadmap-item');
    
    items.forEach(item => {
        const startDate = new Date(item.dataset.start);
        const endDate = new Date(item.dataset.end);
        
        // Remove any existing classes
        item.classList.remove('current', 'completed', 'future');
        
        if (now < startDate) {
            item.classList.add('future');
        } else if (now > endDate) {
            item.classList.add('completed');
        } else {
            item.classList.add('current');
            
            // Calculate progress
            const total = endDate - startDate;
            const progress = now - startDate;
            const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
            
            const progressFill = item.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
            }
        }
    });
}

// Update on load and periodically
document.addEventListener('DOMContentLoaded', () => {
    updateSemesterProgress();
    setInterval(updateSemesterProgress, 1000 * 60 * 60); // Update every hour
});

// about.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS for scroll animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Update semester progress automatically
    function updateSemesterProgress() {
        const now = new Date();
        const items = document.querySelectorAll('.roadmap-item');
        
        items.forEach(item => {
            const startDate = new Date(item.dataset.start);
            const endDate = new Date(item.dataset.end);
            
            if (now < startDate) {
                item.classList.add('future');
            } else if (now > endDate) {
                item.classList.add('completed');
            } else {
                item.classList.add('current');
                
                // Calculate progress
                const total = endDate - startDate;
                const progress = now - startDate;
                const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
                
                const progressFill = item.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${percentage}%`;
                }
            }
        });
    }

    // Skill box animations on scroll
    const skillBoxes = document.querySelectorAll('.skill-box');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBoxes.forEach(box => skillObserver.observe(box));

    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-card h4');
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start) + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const finalValue = parseInt(entry.target.innerText);
                animateValue(entry.target, 0, finalValue, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Tools and interests hover effect
    const tools = document.querySelectorAll('.tool-item, .interest-item');
    tools.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            tool.querySelector('i').style.transform = 'scale(1.2) rotate(5deg)';
        });
        tool.addEventListener('mouseleave', () => {
            tool.querySelector('i').style.transform = 'scale(1) rotate(0)';
        });
    });

    // CV button effect
    const cvButton = document.querySelector('.cv-button');
    if (cvButton) {
        cvButton.addEventListener('mouseenter', () => {
            cvButton.querySelector('i').style.transform = 'translateX(5px)';
        });
        cvButton.addEventListener('mouseleave', () => {
            cvButton.querySelector('i').style.transform = 'translateX(0)';
        });
    }

    // Initialize scroll progress
    updateSemesterProgress();
    // Update progress periodically
    setInterval(updateSemesterProgress, 1000 * 60 * 60); // Update every hour
});

// Improve animation performance
function debounceAnimation(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced page transitions
document.addEventListener('DOMContentLoaded', () => {
    const pageTransitions = {
        init() {
            document.querySelectorAll('a[href^="/"]').forEach(link => {
                link.addEventListener('click', e => this.handleTransition(e));
            });
        },

        handleTransition(e) {
            e.preventDefault();
            const target = e.currentTarget.href;
            
            document.body.classList.add('page-transition');
            setTimeout(() => window.location = target, 500);
        }
    };

    pageTransitions.init();
});

// contact-section.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-section form');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isSubmitting = false;

    // Form validation
    inputs.forEach(input => {
        const wrapper = createInputWrapper(input);
        
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('focus', () => {
            wrapper.classList.remove('is-invalid');
        });
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isSubmitting || !validateForm()) return;
        
        isSubmitting = true;
        updateButtonState(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            handleSuccess();
        } catch (error) {
            handleError();
        } finally {
            isSubmitting = false;
            updateButtonState(false);
        }
    });

    function createInputWrapper(input) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        return wrapper;
    }

    function validateInput(input) {
        const wrapper = input.closest('.input-wrapper');
        const errorElement = getOrCreateErrorElement(wrapper);
        
        if (!input.value && input.required) {
            return showError(wrapper, errorElement, 'This field is required');
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            return showError(wrapper, errorElement, 'Please enter a valid email address');
        }

        hideError(wrapper, errorElement);
        return true;
    }

    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) isValid = false;
        });
        return isValid;
    }

    function updateButtonState(loading) {
        submitBtn.disabled = loading;
        submitBtn.innerHTML = loading ? 
            '<span class="spinner-border spinner-border-sm me-2"></span>Sending...' : 
            'Send Message';
        submitBtn.setAttribute('aria-busy', loading);
    }

    function handleSuccess() {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        inputs.forEach(input => {
            const wrapper = input.closest('.input-wrapper');
            wrapper.classList.remove('is-invalid', 'is-valid');
        });
    }

    function handleError() {
        showNotification('Failed to send message. Please try again.', 'error');
    }

    function showNotification(message, type) {
        const notification = createNotification(message, type);
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
            setTimeout(() => removeNotification(notification), 3000);
        });
    }

    function createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <div class="notification-content">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        return notification;
    }

    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function getOrCreateErrorElement(wrapper) {
        return wrapper.querySelector('.error-message') || createErrorElement(wrapper);
    }

    function createErrorElement(wrapper) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.setAttribute('aria-live', 'polite');
        wrapper.appendChild(errorElement);
        return errorElement;
    }

    function showError(wrapper, errorElement, message) {
        wrapper.classList.add('is-invalid');
        errorElement.textContent = message;
        return false;
    }

    function hideError(wrapper, errorElement) {
        wrapper.classList.remove('is-invalid');
        errorElement.textContent = '';
    }
});

// Gallery
// gallery-filter.js
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const gallery = document.querySelector('.gallery-grid');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get filter category
            const filter = btn.dataset.filter;

            // Add animation class to gallery
            gallery.classList.add('filtering');

            // Filter items
            galleryItems.forEach(item => {
                // Reset animation
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;

                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('show');
                }
            });

            // Remove animation class after transition
            setTimeout(() => {
                gallery.classList.remove('filtering');
            }, 500);
        });
    });
});

// portofolio 
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-modal');
    const modalContent = modal.querySelector('.modal-content');

    function openModal(imgSrc, title, description) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
        modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <h3>${title}</h3>
            <img src="${imgSrc}" alt="${title}" class="modal-img">
            <div class="modal-description">
                <p>${description}</p>
            </div>
        `;
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    document.querySelectorAll('.btn-demo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.portfolio-card');
            const imgSrc = card.querySelector('img').dataset.src;
            const title = card.querySelector('h4').textContent;
            const description = card.querySelector('.description-preview').textContent;
            openModal(imgSrc, title, description);
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.matches('.close-modal')) {
            closeModal();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

//scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-progress';
    navbar.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.setProperty('--scroll-width', `${scrolled}%`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const filterPortfolio = (filterValue) => {
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            filterPortfolio(e.currentTarget.getAttribute('data-filter'));
        });
    });
});

/* filepath: /assets/js/portfolio-section.js */
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});