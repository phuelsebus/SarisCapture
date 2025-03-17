document.addEventListener('DOMContentLoaded', function() {
    // Slideshow Navigation
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    const slideshowPhotos = document.querySelector('.slideshow-photo');
    const photos = document.querySelectorAll('.slideshow-photo img');
    const navButtons = document.querySelectorAll('.slideshow-nav-buttons a');
    
    if (prevButton && nextButton && photos.length > 0) {
        let currentIndex = 0;
        
        // Funktion zum Aktualisieren der Navigation
        function updateNavigation() {
            navButtons.forEach((button, index) => {
                button.style.opacity = index === currentIndex ? '1' : '0.75';
            });
        }
        
        // Initial Navigation aktualisieren
        updateNavigation();
        
        // Event Listener für die Navigationspfeile
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            const targetPhoto = photos[currentIndex];
            targetPhoto.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            updateNavigation();
        });
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % photos.length;
            const targetPhoto = photos[currentIndex];
            targetPhoto.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            updateNavigation();
        });
        
        // Event Listener für die Navigationspunkte
        navButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                currentIndex = index;
                const targetPhoto = photos[currentIndex];
                targetPhoto.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                updateNavigation();
            });
        });
        
        // Event Listener für Scroll-Events
        slideshowPhotos.addEventListener('scroll', () => {
            const scrollPosition = slideshowPhotos.scrollLeft;
            const photoWidth = photos[0].offsetWidth;
            currentIndex = Math.round(scrollPosition / photoWidth);
            updateNavigation();
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