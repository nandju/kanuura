document.addEventListener('DOMContentLoaded', () => {
    // Carrousel d'images automatique pour la section hero
    const heroCarousel = () => {
        const carousel = document.getElementById('hero-carousel');
        const images = carousel.getElementsByTagName('img');
        let currentIndex = 0;

        const showNextImage = () => {
            images[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.opacity = '1';
        };

        // Initialisation
        Array.from(images).forEach((img, i) => {
            img.style.opacity = i === 0 ? '1' : '0';
        });

        // Changement automatique
        setInterval(showNextImage, 3000);
    };

    // Défilement automatique pour les produits avec jauge de progression
    const autoScrollProducts = () => {
        const container = document.querySelector('.smooth-scroll');
        const content = container.querySelector('.flex');
        const progressBar = document.querySelector('.scroll-progress-bar');
        
        // Cloner les produits pour un défilement infini
        const originalProducts = content.innerHTML;
        content.innerHTML = originalProducts + originalProducts;

        let scrollPosition = 0;
        const scrollSpeed = 1; // Vitesse de défilement
        let animationFrameId;
        let isPaused = false;

        const updateProgress = () => {
            const maxScroll = content.scrollWidth / 2; // La moitié car le contenu est dupliqué
            const progress = (scrollPosition % maxScroll) / maxScroll * 100;
            progressBar.style.width = `${progress}%`;
        };

        const scroll = () => {
            if (!isPaused) {
                scrollPosition += scrollSpeed;
                
                // Réinitialiser la position quand on atteint la moitié
                if (scrollPosition >= content.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                
                container.scrollLeft = scrollPosition;
                updateProgress();
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        // Démarrer le défilement automatique
        scroll();

        // Pause au survol
        container.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        container.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Gestion du défilement manuel
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            scrollPosition = scrollLeft;
            cancelAnimationFrame(animationFrameId);
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
            scroll(); // Reprendre le défilement automatique
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
            scrollPosition = container.scrollLeft;
            updateProgress();
        });

        // Nettoyer l'animation lors du démontage
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    };

    // Initialiser les animations
    heroCarousel();
    autoScrollProducts();
}); 