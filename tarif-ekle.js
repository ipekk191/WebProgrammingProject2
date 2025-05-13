document.getElementById('recipe-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun sayfayı yenilemesini engeller
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const duration = document.getElementById('duration').value;
    const difficulty = document.getElementById('difficulty').value;
    const image = document.getElementById('image').files[0];
  
    // Form verilerini API'ye göndermek için FormData kullanıyoruz
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', ingredients);
    formData.append('steps', steps);
    formData.append('duration', duration);
    formData.append('difficulty', difficulty);
    if (image) {
      formData.append('image', image);
    }
  
    fetch('/add-recipe', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Tarif başarıyla eklendi!');
        window.location.href = 'index.html'; // Başarılıysa anasayfaya yönlendir
      } else {
        alert('Bir hata oluştu.');
      }
    })
    .catch(error => alert('Bir hata oluştu.'));
  });
  
  // express.js backend örneği
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

// Multer ile dosya yükleme işlemi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/add-recipe', upload.single('image'), (req, res) => {
  const { title, description, ingredients, steps, duration, difficulty } = req.body;
  const image = req.file ? req.file.filename : null;

  // Veritabanına kaydetme işlemi yapılır
  // Örnek veri kaydı
  const newRecipe = {
    title,
    description,
    ingredients,
    steps,
    duration,
    difficulty,
    image,
  };

  // Burada veritabanına kaydedebilirsiniz
  // Örnek olarak, veritabanı işlemi yerine yanıt döneceğiz:
  res.json({ success: true, recipe: newRecipe });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
