const recipeCollection = [
  {
    title: "Spagetti Bolognese",
    image: "https://source.unsplash.com/400x300/?spaghetti",
    description: "Bolonez soslu nefis makarna.",
    rating: 4,
    comment: "Harika bir tarif, çok beğendim!"
  },
  {
    title: "Tavuklu Salata",
    image: "https://source.unsplash.com/400x300/?chicken-salad",
    description: "Sağlıklı ve hafif tavuklu salata.",
    rating: 5,
    comment: "Diyet yapanlar için birebir."
  },
  {
    title: "Çikolatalı Kek",
    image: "https://source.unsplash.com/400x300/?chocolate-cake",
    description: "Nemli ve yoğun çikolatalı kek.",
    rating: 5,
    comment: "Bayıldım! Tam kıvamında."
  }
];

const container = document.getElementById('recipeContainer');

recipeCollection.forEach(recipe => {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}" />
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    <div class="rating">${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}</div>
    <div class="comment">"${recipe.comment}"</div>
    <a href="#">Tarifi Görüntüle</a>
  `;
  container.appendChild(card);
});

function searchRecipes() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const recipeCards = document.querySelectorAll('.recipe-card');

  recipeCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();

    if (title.includes(query) || description.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
fetch('/tarifler.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('tarif-container');
    data.forEach(tarif => {
      const card = document.createElement('div');
      card.className = 'tarif-card';
      card.innerHTML = `
        <h3>${tarif.ad}</h3>
        <img src="${tarif.gorsel}" alt="${tarif.ad}">
      `;
      card.addEventListener('click', () => {
        window.location.href = `/tarif/${tarif.id}`;
      });
      container.appendChild(card);
    });
  });
