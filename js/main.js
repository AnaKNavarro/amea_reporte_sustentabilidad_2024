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
    pageFlip.loadFromHTML(pages);

    // --- Lógica del Índice Interactivo ---
    const indexList = document.getElementById('index-list');

    // Definimos los títulos y páginas para el índice
    const indexData = [
        { title: 'Resumen ejecutivo', page: 3 },
        { title: 'Iniciativas principales', page: 4 },
        { title: 'Introducción', page: 5 },
        { title: 'Energía', page: 8 },
        { title: 'Huella de carbono', page: 9 },
        { title: 'Biodiversidad', page: 14 },
        { title: 'Diversidad, equidad e inclusión', page: 16 },
        { title: 'Impacto a la comunidad', page: 17 },
        { title: 'Política de sustentabilidad', page: 20 },
        { title: 'Canales de denuncia', page: 21 }
    ];

    indexData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title;
        // La API usa paginación 0-indexada, así que restamos 1
        const pageNumber = item.page - 1;
        listItem.setAttribute('data-page-number', pageNumber);
        
        listItem.addEventListener('click', (e) => {
            const pageToFlip = parseInt(e.target.getAttribute('data-page-number'), 10);
            pageFlip.flip(pageToFlip);
        });

        indexList.appendChild(listItem);
    });
});
