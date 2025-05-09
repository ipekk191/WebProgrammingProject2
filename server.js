const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Statik dosyaları public klasöründen sun
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JSON dosyalarının yolları
const usersPath = path.join(__dirname, 'data', 'users.json');
const recipesPath = path.join(__dirname, 'data', 'recipes.json');

// Kullanıcı kaydı alma
app.post('/register', (req, res) => {
    const user = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath));
    users.push(user);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ message: 'Kayıt başarılı!' });
});

// Tarif ekleme
app.post('/recipes', (req, res) => {
    const recipe = req.body;
    const recipes = JSON.parse(fs.readFileSync(recipesPath));
    recipes.push(recipe);
    fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));
    res.json({ message: 'Tarif kaydedildi!' });
});

// Tarifleri listeleme
app.get('/recipes', (req, res) => {
    const recipes = JSON.parse(fs.readFileSync(recipesPath));
    res.json(recipes);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
});
