document.addEventListener('DOMContentLoaded', function() {
    // Slideshow Navigation
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    const slideshowPhotos = document.querySelector('.slideshow-photo');
    const photos = document.querySelectorAll('.slideshow-photo img');
    
    if (prevButton && nextButton && photos.length > 0) {
        let currentIndex = 0;
        
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            const targetPhoto = photos[currentIndex];
            targetPhoto.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % photos.length;
            const targetPhoto = photos[currentIndex];
            targetPhoto.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
    }
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('menu-open');
            siteNav.classList.toggle('menu-open');
            document.body.classList.toggle('menu-active');
            
            // Zugänglichkeit: Aria-expanded Attribut aktualisieren
            const isExpanded = menuToggle.classList.contains('menu-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Schließe das Menü wenn ein Link angeklickt wird
        const navLinks = siteNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('menu-open');
                siteNav.classList.remove('menu-open');
                document.body.classList.remove('menu-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}); 