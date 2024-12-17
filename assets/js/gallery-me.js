
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

// gallery-section.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lightbox
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    galleryCards.forEach((card, index) => {
        
        // Lightbox functionality
        card.addEventListener('click', () => {
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="close-lightbox">&times;</button>
                    <img src="${card.querySelector('img').src}" alt="${card.querySelector('img').alt}">
                    <div class="lightbox-info">
                        <h4>${card.querySelector('.gallery-info h6').textContent}</h4>
                        <p>${card.querySelector('.gallery-info span').textContent}</p>
                    </div>
                </div>
            `;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-lightbox')) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// HD
