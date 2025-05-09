// Kullanıcı kayıt formunu dinle
// Login butonuna tıklanınca yemek sayfasına yönlendir
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Burada istersen kullanıcı adı/şifre kontrolü de ekleyebilirsin

  // Login başarılıysa yönlendir
  window.location.href = "recipes.html"; // yemek sayfası
});

// Register bağlantısı modalı açar
document.getElementById("showRegister").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("registerModal").style.display = "flex";
});

// Modal kapat
document.getElementById("closeRegister").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("registerModal").style.display = "none";
});

// Register işlemi (örnek veri alma)
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Registration successful!");
  document.getElementById("registerModal").style.display = "none";
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const user = {
      name: formData.get('name'),
      email: formData.get('email'),
    };
  
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  
    const result = await res.json();
    document.getElementById('registerMessage').textContent = result.message;
  
    e.target.reset();
  });
  
  // Tarif formunu dinle
  document.getElementById('recipeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const recipe = {
      title: formData.get('title'),
      description: formData.get('description'),
    };
  
    const res = await fetch('/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
  
    const result = await res.json();
    document.getElementById('recipeMessage').textContent = result.message;
  
    e.target.reset();
    loadRecipes(); // Listeyi güncelle
  });
  
  // Tarifleri sunucudan al ve listele
  async function loadRecipes() {
    const res = await fetch('/recipes');
    const recipes = await res.json();
  
    const list = document.getElementById('recipeList');
    list.innerHTML = '';
  
    recipes.forEach((r) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${r.title}</strong><br>${r.description}`;
      list.appendChild(li);
    });
  }
  
  // Sayfa yüklendiğinde tarifleri getir
  window.addEventListener('DOMContentLoaded', loadRecipes);