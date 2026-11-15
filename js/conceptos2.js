document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    // Control del menú desplegable en dispositivos móviles
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            const isExpanded = navMenu.classList.contains("show");
            menuToggle.textContent = isExpanded ? "✕" : "☰";
        });
    }

    // Cerrar menú móvil automáticamente al seleccionar una sección
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768 && navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                menuToggle.textContent = "☰";
            }
        });
    });
});