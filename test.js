document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('city-select');
    const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonées pour Paris

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    citySelect.addEventListener('change', (event) => {
        const selectedCity = event.target.value;
        if (selectedCity === 'paris') {
            map.setView([48.8566, 2.3522], 13); // Paris
        }
        // Ajoutez d'autres villes avec leurs coordonnées
        console.log(`City selected: ${selectedCity}`);
    });

    // Exemple de code pour ajouter des événements de filtre
    const filterButtons = document.querySelectorAll('.events-filters button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sport = button.textContent.trim();
            console.log(`Filter by: ${sport}`);
            // Filtrer les événements en fonction du sport sélectionné
        });
    });
});
