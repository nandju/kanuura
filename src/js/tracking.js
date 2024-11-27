document.addEventListener('DOMContentLoaded', () => {
    // Animation des étapes de suivi
    const trackingSteps = document.querySelectorAll('.tracking-step');
    
    trackingSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            step.style.transition = 'all 0.5s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, 200 * index);
    });
}); 