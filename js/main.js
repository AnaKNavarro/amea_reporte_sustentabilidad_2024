document.addEventListener('DOMContentLoaded', function() {
    const flipbookElement = document.getElementById('flipbook');

    // Configuración inicial de PageFlip
    // Los valores de width y height son una base, 'size: stretch' los ajustará al contenedor.
    const pageFlip = new St.PageFlip(flipbookElement, {
        width: 600,           // Ancho base de la página
        height: 800,          // Alto base de la página
        size: 'stretch',      // Estirar para llenar el contenedor
        minWidth: 315,
        maxWidth: 1200,
        minHeight: 420,
        maxHeight: 800,
        showCover: true,      // Muestra la primera página como portada
        usePortrait: true     // Orientación vertical
    });

    const numImages = 22;
    const pages = [];

    // Generar dinámicamente las páginas con las imágenes
    for (let i = 1; i <= numImages; i++) {
        const page = document.createElement('div');
        page.className = 'page';
        
        if (i === 1 || i === numImages) {
            page.setAttribute('data-density', 'hard');
        }

        const img = document.createElement('img');
        img.src = `img/${i}.png`;
        img.alt = `Página ${i}`;
        
        page.appendChild(img);
        pages.push(page);
    }

    // Cargar las páginas generadas en el flipbook
    pages.forEach(page => flipbookElement.appendChild(page));
    pageFlip.loadFromHTML(pages);
});
