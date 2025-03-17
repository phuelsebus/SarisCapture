document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.gallery-modal');
    const modalImg = modal.querySelector('.modal-image');
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.prev-arrow');
    const nextBtn = modal.querySelector('.next-arrow');
    const galleryImages = document.querySelectorAll('.gallery-image');
    let currentImageIndex = 0;

    // Galerie Filter Funktionalität
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktiven Button markieren
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Bilder filtern
            const category = btn.dataset.category;
            galleryItems.forEach(item => {
                if (category === 'alle' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal Funktionalität
    function openModal(index) {
        currentImageIndex = index;
        const imgSrc = galleryImages[index].src;
        const imgAlt = galleryImages[index].alt;
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        let nextIndex = currentImageIndex + 1;
        if (nextIndex >= galleryImages.length) {
            nextIndex = 0;
        }
        while (galleryImages[nextIndex].closest('.gallery-item').style.display === 'none' && nextIndex !== currentImageIndex) {
            nextIndex = (nextIndex + 1) % galleryImages.length;
        }
        if (nextIndex !== currentImageIndex) {
            currentImageIndex = nextIndex;
            modalImg.src = galleryImages[currentImageIndex].src;
            modalImg.alt = galleryImages[currentImageIndex].alt;
        }
    }

    function showPrevImage() {
        let prevIndex = currentImageIndex - 1;
        if (prevIndex < 0) {
            prevIndex = galleryImages.length - 1;
        }
        while (galleryImages[prevIndex].closest('.gallery-item').style.display === 'none' && prevIndex !== currentImageIndex) {
            prevIndex = (prevIndex - 1 + galleryImages.length) % galleryImages.length;
        }
        if (prevIndex !== currentImageIndex) {
            currentImageIndex = prevIndex;
            modalImg.src = galleryImages[currentImageIndex].src;
            modalImg.alt = galleryImages[currentImageIndex].alt;
        }
    }

    // Event Listeners
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

    // Schließen mit Escape-Taste und Navigation mit Pfeiltasten
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });

    // Schließen beim Klick außerhalb des Bildes
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});