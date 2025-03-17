document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');

    button.addEventListener('mouseover', function() {
        button.style.transform = 'scale(1.2)';
        button.style.transition = 'transform 0.3s';
    });

    button.addEventListener('mouseout', function() {
        button.style.transform = 'scale(1)';
    });
});