// Arama fonksiyonu
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
// Tarif ekleme işlevi
document.getElementById('recipeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  // Tarifin backend'e gönderilmesi için API çağrısı
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', image);

  fetch('/add-recipe', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Tarif başarıyla eklendi!');
        window.location.href = 'recipes.html'; // Başarılıysa anasayfaya dön
      } else {
        alert('Bir hata oluştu.');
      }
    })
    .catch(error => alert('Bir hata oluştu.'));
});
