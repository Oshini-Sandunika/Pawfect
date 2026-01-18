// 1. MOCK DATA
const pets = [
    {
        id: 1,
        name: "Bella",
        species: "Dog",
        breed: "Golden Retriever",
        age: "2 years",
        description: "Bella is a friendly and energetic Golden who loves playing fetch and swimming. Great with kids!",
        image: "images/dogs/dog1.jpeg" 
    },
    {
        id: 2,
        name: "Mittens",
        species: "Cat",
        breed: "Siamese",
        age: "4 years",
        description: "Mittens is a calm, independent cat who enjoys sunbathing and quiet environments.",
        image: "images/cats/tuxedo.jpg"
    },
    {
        id: 3,
        name: "Charlie",
        species: "Dog",
        breed: "Beagle",
        age: "1 year",
        description: "Charlie is a curious puppy who loves to sniff around and explore. Needs a fenced yard.",
        image: "images/dogs/dog2.jpeg"
    },
    {
        id: 4,
        name: "Tweety",
        species: "Bird",
        breed: "Parakeet",
        age: "2 years",
        description: "A cheerful singer who loves to chirp in the mornings. Comes with a cage.",
        image: "images/birds/bird1.jpeg"
    },
    {
        id: 5,
        name: "Luna",
        species: "Cat",
        breed: "Tabby",
        age: "3 months",
        description: "A playful kitten full of energy. She loves chasing laser pointers.",
        image: "images/cats/dlh.webp"
    },
    {
        id: 6,
        name: "Max",
        species: "Dog",
        breed: "German Shepherd",
        age: "5 years",
        description: "Max is a loyal protector and very well trained. Loves long walks.",
        image: "images/dogs/dog3.jpeg"
    }
];

// 2. DOM ELEMENTS
const petGrid = document.getElementById('petGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('petModal');
const closeBtn = document.querySelector('.close-btn');

// Modal Fields
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalSpecies = document.getElementById('modalSpecies');
const modalBreed = document.getElementById('modalBreed');
const modalAge = document.getElementById('modalAge');
const modalDesc = document.getElementById('modalDesc');

// 3. RENDER FUNCTION
function renderPets(filter = 'all') {
    petGrid.innerHTML = ''; // Clear existing

    const filteredPets = filter === 'all'
        ? pets
        : pets.filter(pet => pet.species.toLowerCase() === filter.toLowerCase());

    filteredPets.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('pet-card');

        card.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>${pet.species}</p>
            <button class="details-btn" onclick="openModal(${pet.id})">View Details</button>
        `;

        petGrid.appendChild(card);
    });
}

// 4. FILTER EVENT LISTENERS
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        renderPets(filterValue);
    });
});

// 5. MODAL FUNCTIONS
window.openModal = function (id) {
    const pet = pets.find(p => p.id === id);
    if (!pet) return;

    modalImg.src = pet.image;
    modalName.textContent = pet.name;
    modalSpecies.textContent = pet.species;
    modalBreed.textContent = pet.breed;
    modalAge.textContent = pet.age;
    modalDesc.textContent = pet.description;

    modal.classList.add('show');
};

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Initial Render
renderPets();