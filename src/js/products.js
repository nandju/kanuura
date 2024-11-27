document.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes produits à l'apparition
    const productCards = document.querySelectorAll('.product-card');
    
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scale-100', 'opacity-100');
                entry.target.classList.remove('scale-95', 'opacity-0');
            }
        });
    }, { threshold: 0.1 });

    productCards.forEach(card => {
        card.classList.add('scale-95', 'opacity-0', 'transition-all', 'duration-500');
        productObserver.observe(card);
    });
}); 