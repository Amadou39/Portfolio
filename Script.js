document.addEventListener('DOMContentLoaded', () => {
    console.log('Le portfolio est prêt à être exploré !');

    // Sélection des éléments du DOM
    // Assurez-vous d'avoir <input id="searchInput"> et <button id="searchButton"> dans votre HTML
    const searchButton = document.querySelector('#searchButton');
    const searchInput = document.querySelector('#searchInput');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    // Fonction pour normaliser le texte (supprime les accents et met en minuscule)
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD") // Décompose les accents
            .replace(/[\u0300-\u036f]/g, ""); // Supprime les accents
    }

    // Fonction de recherche améliorée
    function performSearch() {
        // Vérification de sécurité : si la barre de recherche n'existe pas, on arrête tout
        if (!searchInput || !searchButton) return;

        const searchTerm = normalizeText(searchInput.value.trim());

        if (!searchTerm) {
            alert('Veuillez entrer un mot-clé à rechercher.');
            return;
        }

        let found = false;

        // 1. Recherche dans les sections (Optimisée avec break)
        for (const section of sections) {
            if (normalizeText(section.textContent).includes(searchTerm)) {
                section.scrollIntoView({ behavior: 'smooth' });
                found = true;
                break; // On arrête dès qu'on trouve une section correspondante
            }
        }

        // 2. Si rien trouvé dans les sections, on cherche dans les liens du menu
        if (!found) {
            navLinks.forEach(link => {
                if (found) return; // Si on a déjà trouvé via un lien précédent, on passe

                if (normalizeText(link.textContent).includes(searchTerm)) {
                    const href = link.getAttribute('href');
                    // On vérifie que le lien mène bien vers une ancre (#quelquechose)
                    if (href && href.startsWith('#')) {
                        const targetSection = document.querySelector(href);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                            found = true;
                        }
                    }
                }
            });
        }

        // 3. Message si aucun résultat n'est trouvé nulle part
        if (!found) {
            alert(`Aucun résultat trouvé pour : "${searchInput.value}"`);
        }
    }

    // Déclencheurs (Click et Entrée)
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); 
                performSearch();
            }
        });
    }
});