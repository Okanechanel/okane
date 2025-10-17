// Данные аниме
let animeList = [
    {
        title: "Атака Титанов",
        studio: "Wit Studio, MAPPA",
        description: "Эрен Йегер и его друзья сражаются с титанами, чтобы выжить в жестоком мире. История начинается, когда гигантские титаны прорываются через стены, защищающие человечество. Главный герой, Эрен Йегер, клянется уничтожить всех титанов и узнать правду о своем мире.",
        voiceType: "dub",
        voiceYear: 2023,
        poster: "https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Атака+Титанов",
        voiceActors: [
            "Иван Иванов - Эрен Йегер",
            "Мария Петрова - Микаса Аккерман",
            "Петр Сидоров - Армин Арлерт",
            "Анна Козлова - Леви Аккерман"
        ],
        rating: 4.8,
        userRatings: [
            { userId: "user1", rating: 5 },
            { userId: "user2", rating: 4 },
            { userId: "user3", rating: 5 }
        ],
        isBest: true,
        seasons: [
            {
                name: "Сезон 1",
                episodes: 25,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/season1"
            },
            {
                name: "Сезон 2",
                episodes: 12,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/season2"
            }
        ],
        specials: [
            {
                name: "OVA: Ilse's Notebook",
                episodes: 1,
                link: "https://shikimori.one/animes/10408"
            },
            {
                name: "OVA: A Choice with No Regrets",
                episodes: 2,
                link: "https://shikimori.one/animes/20954"
            }
        ],
        comments: [
            {
                author: "Алексей",
                avatar: "https://via.placeholder.com/40/ffeef2/d63384?text=A",
                text: "Отличная озвучка! Очень понравилась работа актеров.",
                date: "2024-01-15 14:30"
            }
        ]
    }
];

// Настройки администратора
const ADMIN_PASSWORD = "admin123";
let isAdmin = false;
let currentFilter = 'all';
let currentBestFilter = false;
let currentYearFilter = 'none';
let currentEditIndex = -1;

// Система пользователей
let users = [];
let currentUser = null;
let isLoggedIn = false;

// Фоны
const backgrounds = [
    { name: "Розовый градиент", value: "linear-gradient(135deg, #fff5f7, #ffeef2)" },
    { name: "Фиолетовый", value: "linear-gradient(135deg, #667eea, #764ba2)" },
    { name: "Оранжевый", value: "linear-gradient(135deg, #f093fb, #f5576c)" },
    { name: "Синий", value: "linear-gradient(135deg, #4facfe, #00f2fe)" },
    { name: "Зеленый", value: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    { name: "Темный", value: "linear-gradient(135deg, #2c3e50, #3498db)" }
];

// Инициализация
function init() {
    loadFromLocalStorage();
    loadUsersFromLocalStorage();
    setupEventListeners();
    setupRatingStars();
    updateUI();
    displayAnimeList(animeList);
    updateFilterButtons();
    setupBackgrounds();
}

// Система пользователей
function registerUser(username, password) {
    if (users.find(user => user.username === username)) {
        return { success: false, message: "Пользователь уже существует" };
    }
    
    const newUser = {
        id: generateId(),
        username: username,
        password: password,
        avatar: `https://via.placeholder.com/80/ffeef2/d63384?text=${username.charAt(0).toUpperCase()}`,
        joinDate: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsersToLocalStorage();
    return { success: true, message: "Регистрация успешна!" };
}

function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        isLoggedIn = true;
        saveCurrentUserToLocalStorage();
        return { success: true, message: "Вход выполнен!" };
    }
    return { success: false, message: "Неверный логин или пароль" };
}

function logoutUser() {
    currentUser = null;
    isLoggedIn = false;
    saveCurrentUserToLocalStorage();
    updateUI();
}

// Система оценок
function rateAnime(animeIndex, rating) {
    if (!isLoggedIn) {
        showNotification("Войдите в систему, чтобы оценивать аниме");
        return;
    }
    
    const anime = animeList[animeIndex];
    const existingRatingIndex = anime.userRatings.findIndex(r => r.userId === currentUser.id);
    
    if (existingRatingIndex !== -1) {
        anime.userRatings[existingRatingIndex].rating = rating;
    } else {
        anime.userRatings.push({
            userId: currentUser.id,
            rating: rating
        });
    }
    
    // Пересчитываем средний рейтинг
    const totalRating = anime.userRatings.reduce((sum, r) => sum + r.rating, 0);
    anime.rating = totalRating / anime.userRatings.length;
    
    saveToLocalStorage();
    displayAnimeList(animeList);
    showNotification(`Вы оценили "${anime.title}" на ${rating}⭐`);
}

function getUserRating(animeIndex) {
    if (!isLoggedIn || !animeList[animeIndex].userRatings) return 0;
    const userRating = animeList[animeIndex].userRatings.find(r => r.userId === currentUser.id);
    return userRating ? userRating.rating : 0;
}

// OVA/ONA/Спешлы
function generateSpecialsHTML(anime, index) {
    if (!anime.specials || anime.specials.length === 0) return '';
    
    const specialsList = anime.specials.map(special => `
        <div class="special-item" onclick="window.open('${special.link}', '_blank')">
            <span class="special-name">${special.name}</span>
            <span class="special-episodes">(${special.episodes} эп.)</span>
        </div>
    `).join('');
    
    return `
        <div class="toggle-specials" onclick="toggleSpecials(this)">
            📺 Спешлы/OVA (${anime.specials.length})
        </div>
        <div class="specials-section">
            <div class="specials-title">🎬 Дополнительные эпизоды</div>
            ${specialsList}
        </div>
    `;
}

function toggleSpecials(element) {
    const animeItem = element.closest('.anime-item');
    const specialsSection = animeItem.querySelector('.specials-section');
    const isVisible = specialsSection.style.display !== 'none';
    
    if (isVisible) {
        specialsSection.style.display = 'none';
        element.textContent = `📺 Спешлы/OVA (${animeItem.querySelectorAll('.special-item').length})`;
    } else {
        specialsSection.style.display = 'block';
        element.textContent = '📺 Скрыть спешлы';
    }
}

// Обновленная функция отображения списка аниме
function displayAnimeList(list) {
    const animeListElement = document.getElementById('animeList');
    animeListElement.innerHTML = '';
    
    const filteredList = filterAnimeList(list);
    
    if (filteredList.length === 0) {
        animeListElement.innerHTML = `
            <div class="empty-state">
                <h3>😔 Ничего не найдено</h3>
                <p>Попробуйте изменить фильтры или добавить новое аниме</p>
            </div>
        `;
        return;
    }
    
    filteredList.forEach((anime, index) => {
        const stars = '⭐'.repeat(Math.round(anime.rating)) + '☆'.repeat(5 - Math.round(anime.rating));
        const userRating = getUserRating(index);
        
        const animeItem = document.createElement('div');
        animeItem.className = 'anime-item';
        animeItem.innerHTML = generateAnimeItemHTML(anime, index, stars, userRating);
        animeListElement.appendChild(animeItem);
    });
}

function generateAnimeItemHTML(anime, index, stars, userRating) {
    return `
        <div class="anime-poster-container">
            <img src="${anime.poster}" alt="${anime.title}" class="anime-poster" 
                 onerror="this.src='https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Постер'">
            <div class="anime-actions">
                ${generateSeasonsHTML(anime, index)}
                <button class="edit-btn" onclick="editAnime(${index})" ${!isAdmin ? 'disabled' : ''}>
                    ✏️ Редактировать
                </button>
                <button class="delete-btn" onclick="deleteAnime(${index})" ${!isAdmin ? 'disabled' : ''}>
                    🗑️ Удалить
                </button>
            </div>
        </div>
        <div class="anime-content">
            <div class="anime-title">${anime.title}</div>
            <div class="anime-info">
                <span class="studio">${anime.studio}</span>
                <span class="voice-type ${anime.voiceType}">
                    ${getVoiceTypeText(anime.voiceType)}
                </span>
                <span class="voice-year">${anime.voiceYear} год</span>
                ${anime.rating > 0 ? `
                    <span class="rating">${stars} (${anime.rating.toFixed(1)})</span>
                ` : ''}
            </div>
            
            <!-- Система оценок -->
            <div class="rating-system">
                <div class="rating-title">Ваша оценка</div>
                <div class="user-rating">
                    <div class="user-rating-stars">
                        ${[1,2,3,4,5].map(star => `
                            <span class="user-rating-star ${star <= userRating ? 'active' : ''}" 
                                  onclick="rateAnime(${index}, ${star})">
                                ${star <= userRating ? '⭐' : '☆'}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div class="rating-stats">
                    <span class="rating-average">Средняя: ${anime.rating.toFixed(1)}</span>
                    <span class="rating-count">Оценок: ${anime.userRatings ? anime.userRatings.length : 0}</span>
                </div>
            </div>
            
            <div class="description">${anime.description}</div>
            
            ${generateSpecialsHTML(anime, index)}
            
            <div class="toggle-details" onclick="toggleDetails(this)">
                📋 Показать детали
            </div>
            
            <div class="details-section">
                ${generateVoiceActorsHTML(anime)}
                ${generateCommentsHTML(anime, index, 2)}
            </div>
        </div>
    `;
}

// Фоны
function setupBackgrounds() {
    const container = document.getElementById('backgroundOptions');
    backgrounds.forEach((bg, index) => {
        const option = document.createElement('div');
        option.className = 'background-option';
        option.style.background = bg.value;
        option.onclick = () => changeBackground(bg.value);
        container.appendChild(option);
    });
}

function changeBackground(background) {
    document.body.style.background = background;
    localStorage.setItem('userBackground', background);
}

// Вспомогательные функции
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function filterAnimeList(list) {
    let filtered = [...list];
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(anime => anime.voiceType === currentFilter);
    }
    
    if (currentBestFilter) {
        filtered = filtered.filter(anime => anime.isBest === true);
    }
    
    if (currentYearFilter === 'newest') {
        filtered.sort((a, b) => b.voiceYear - a.voiceYear);
    } else if (currentYearFilter === 'oldest') {
        filtered.sort((a, b) => a.voiceYear - b.voiceYear);
    }
    
    return filtered;
}

function updateUI() {
    updateAdminUI();
    updateUserUI();
    updateAuthUI();
}

function updateUserUI() {
    document.body.classList.toggle('user-mode', !isAdmin);
}

function updateAuthUI() {
    const authSection = document.querySelector('.user-auth-section');
    if (isLoggedIn && currentUser) {
        authSection.innerHTML = `
            <h2 class="profile-title">👤 ${currentUser.username}</h2>
            <div class="profile-form">
                <img src="${currentUser.avatar}" alt="Аватар" class="profile-avatar" id="userAvatar">
                <button class="save-profile" onclick="logoutUser()">🚪 Выйти</button>
            </div>
        `;
    }
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('animeList', JSON.stringify(animeList));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('animeList');
    if (saved) {
        animeList = JSON.parse(saved);
    }
    
    const savedBackground = localStorage.getItem('userBackground');
    if (savedBackground) {
        document.body.style.background = savedBackground;
    }
}

function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromLocalStorage() {
    const saved = localStorage.getItem('users');
    if (saved) {
        users = JSON.parse(saved);
    }
}

function saveCurrentUserToLocalStorage() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('isLoggedIn', isLoggedIn);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', init);
