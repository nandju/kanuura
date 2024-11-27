// Animations communes pour toutes les pages
document.addEventListener('DOMContentLoaded', () => {
    // Animation d'apparition des éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Ajouter un délai basé sur l'index de l'élément
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('appear');
            }, delay);
            
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach((element, index) => {
        element.dataset.delay = index * 100; // Délai progressif
        appearOnScroll.observe(element);
    });
}); 