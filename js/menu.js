document.addEventListener('DOMContentLoaded', function () {
    const burgerToggle = document.getElementById('burgerToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burgerToggle && mobileMenu) {
        burgerToggle.addEventListener('click', () => {
            burgerToggle.classList.toggle('menu-open');
            mobileMenu.classList.toggle('menu-open');
        });

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerToggle.classList.remove('menu-open');
                mobileMenu.classList.remove('menu-open');
            });
        });
    }
});
