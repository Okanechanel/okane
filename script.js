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
    },
    {
        title: "Ван Пис",
        studio: "Toei Animation",
        description: "Приключения Луффи и его команды пиратов в поисках величайшего сокровища - Ван Пис. Монки Д. Луффи, молодой пират с телом резины после съеденного Дьявольского фрукта, отправляется в захватывающее путешествие через Гранд Лайн, чтобы стать Королем Пиратов.",
        voiceType: "recap",
        voiceYear: 2021,
        poster: "https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Ван+Пис",
        voiceActors: [
            "Сергей Белов - Монки Д. Луффи",
            "Ольга Семенова - Нами",
            "Дмитрий Новиков - Ророноа Зоро",
            "Елена Воронова - Винсмок Санджи"
        ],
        rating: 4.5,
        userRatings: [
            { userId: "user1", rating: 5 },
            { userId: "user2", rating: 4 }
        ],
        isBest: true,
        seasons: [
            {
                name: "Восточное Синее море",
                episodes: 61,
                link: "https://shikimori.one/animes/21-one-piece/season1"
            }
        ],
        specials: [
            {
                name: "OVA: Defeat Him! The Pirate Ganzack!",
                episodes: 1,
                link: "https://shikimori.one/animes/1931"
            }
        ],
        comments: []
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
    loadCurrentUserFromLocalStorage();
    setupEventListeners();
    setupRatingStars();
    updateUI();
    displayAnimeList(animeList);
    updateFilterButtons();
    setupBackgrounds();
}

// Система пользователей
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector(`.auth-tab[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}Content`).classList.add('active');
}

function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    
    if (!username || !password) {
        showNotification("Заполните все поля");
        return;
    }
    
    const result = registerUser(username, password);
    showNotification(result.message);
    
    if (result.success) {
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        switchAuthTab('login');
    }
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (!username || !password) {
        showNotification("Заполните все поля");
        return;
    }
    
    const result = loginUser(username, password);
    showNotification(result.message);
    
    if (result.success) {
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        updateUI();
    }
}

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
    showNotification("Вы вышли из системы");
}

// Система оценок
function rateAnime(animeIndex, rating) {
    if (!isLoggedIn) {
        showNotification("Войдите в систему, чтобы оценивать аниме");
        return;
    }
    
    const anime = animeList[animeIndex];
    if (!anime.userRatings) {
        anime.userRatings = [];
    }
    
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
    const voiceActorsHTML = anime.voiceActors && anime.voiceActors.length > 0 ? `
        <div class="voice-actors">
            <div class="voice-actors-title">🎭 Актеры озвучки:</div>
            ${anime.voiceActors.map(actor => `
                <div class="voice-actor">• ${actor}</div>
            `).join('')}
        </div>
    ` : '';

    const commentsHTML = generateCommentsHTML(anime, index, 2);
    const showMoreButton = anime.comments && anime.comments.length > 2 ? 
        `<button class="show-more-comments" onclick="showAllComments(${index})">
            📖 Показать все комментарии (${anime.comments.length})
        </button>` : '';

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
                ${voiceActorsHTML}
                
                <!-- Секция комментариев -->
                <div class="comments-section">
                    <div class="comments-title" onclick="toggleComments(this)">
                        💬 Комментарии 
                        <span style="font-size: 12px; color: #868e96;">(${anime.comments ? anime.comments.length : 0})</span>
                    </div>
                    
                    <!-- Форма добавления комментария -->
                    <div class="comment-form">
                        <textarea class="comment-input" placeholder="Оставьте ваш комментарий..." id="commentInput-${index}"></textarea>
                        <button class="submit-comment" onclick="addComment(${index})">
                            Отправить комментарий
                        </button>
                    </div>
                    
                    <!-- Список комментариев -->
                    <div class="comments-list">
                        ${commentsHTML}
                    </div>
                    ${showMoreButton}
                </div>
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
    showNotification("Фон изменен!");
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
    const authSection = document.getElementById('userAuthSection');
    const profileSection = document.getElementById('userProfile');
    
    if (isLoggedIn && currentUser) {
        authSection.style.display = 'none';
        profileSection.style.display = 'block';
        document.getElementById('profileUsername').textContent = `👤 ${currentUser.username}`;
        document.getElementById('userAvatar').src = currentUser.avatar;
    } else {
        authSection.style.display = 'block';
        profileSection.style.display = 'none';
    }
}

// Функция для генерации HTML сезонов
function generateSeasonsHTML(anime, index) {
    if (!anime.seasons || anime.seasons.length === 0) {
        return `<a href="#" class="watch-btn" style="background: #ffe3e3; color: #fa5252;">⚠️ Нет сезонов</a>`;
    }
    
    if (anime.seasons.length === 1) {
        // Если только один сезон, показываем прямую ссылку
        return `<a href="${anime.seasons[0].link}" target="_blank" class="watch-btn">🎬 Смотреть</a>`;
    } else {
        // Если несколько сезонов, показываем выпадающее меню
        const seasonsList = anime.seasons.map((season, seasonIndex) => `
            <div class="season-item" onclick="window.open('${season.link}', '_blank')">
                <div class="season-name">${season.name}</div>
                <div class="season-episodes">${season.episodes} эпизодов</div>
            </div>
        `).join('');
        
        return `
            <div class="seasons-dropdown">
                <div class="watch-btn" onclick="toggleSeasonsMenu(this)">
                    🎬 Смотреть (${anime.seasons.length} ${getSeasonWord(anime.seasons.length)})
                </div>
                <div class="seasons-menu">
                    ${seasonsList}
                </div>
            </div>
        `;
    }
}

function getSeasonWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) return 'сезон';
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'сезона';
    return 'сезонов';
}

// Функция для переключения меню сезонов
function toggleSeasonsMenu(element) {
    const menu = element.nextElementSibling;
    const isVisible = menu.classList.contains('show');
    
    // Закрываем все открытые меню
    document.querySelectorAll('.seasons-menu.show').forEach(openMenu => {
        if (openMenu !== menu) {
            openMenu.classList.remove('show');
        }
    });
    
    // Переключаем текущее меню
    if (isVisible) {
        menu.classList.remove('show');
    } else {
        menu.classList.add('show');
    }
}

// Функция для переключения отображения деталей
function toggleDetails(element) {
    const animeItem = element.closest('.anime-item');
    const detailsSection = animeItem.querySelector('.details-section');
    const isExpanded = animeItem.classList.contains('expanded');
    
    if (isExpanded) {
        animeItem.classList.remove('expanded');
        element.textContent = '📋 Показать детали';
        detailsSection.querySelectorAll('.voice-actors, .comments-section').forEach(el => {
            el.style.display = 'none';
        });
    } else {
        animeItem.classList.add('expanded');
        element.textContent = '📋 Скрыть детали';
    }
}

// Функция для переключения отображения комментариев
function toggleComments(element) {
    const commentsSection = element.closest('.comments-section');
    const commentForm = commentsSection.querySelector('.comment-form');
    const commentsList = commentsSection.querySelector('.comments-list');
    const showMoreButton = commentsSection.querySelector('.show-more-comments');
    
    const isVisible = commentForm.style.display !== 'none';
    
    if (isVisible) {
        commentForm.style.display = 'none';
        commentsList.style.display = 'none';
        if (showMoreButton) showMoreButton.style.display = 'none';
    } else {
        commentForm.style.display = 'block';
        commentsList.style.display = 'block';
        if (showMoreButton) showMoreButton.style.display = 'block';
    }
}

// Функция для генерации HTML комментариев
function generateCommentsHTML(anime, index, limit = null) {
    if (!anime.comments || anime.comments.length === 0) {
        return '<div class="no-comments">Пока нет комментариев. Будьте первым!</div>';
    }
    
    const commentsToShow = limit ? anime.comments.slice(0, limit) : anime.comments;
    
    return commentsToShow.map((comment, commentIndex) => {
        const isCurrentUserComment = comment.author === (currentUser ? currentUser.username : '');
        const editDeleteButtons = isCurrentUserComment ? `
            <button class="edit-comment-btn" onclick="editComment(${index}, ${commentIndex})">✏️</button>
            <button class="delete-comment-btn" onclick="deleteComment(${index}, ${commentIndex})">×</button>
        ` : (isAdmin ? `<button class="delete-comment-btn" onclick="deleteComment(${index}, ${commentIndex})">×</button>` : '');
        
        return `
            <div class="comment-item" id="comment-${index}-${commentIndex}">
                ${editDeleteButtons}
                <div class="comment-author">
                    <img src="${comment.avatar}" alt="Аватар" class="author-avatar">
                    ${comment.author}
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${formatDate(comment.date)}</div>
            </div>
        `;
    }).join('');
}

// Функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Функция добавления комментария
function addComment(animeIndex) {
    if (!isLoggedIn) {
        showNotification("Войдите в систему, чтобы оставлять комментарии");
        return;
    }
    
    const commentInput = document.getElementById(`commentInput-${animeIndex}`);
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Пожалуйста, введите текст комментария');
        return;
    }
    
    if (!animeList[animeIndex].comments) {
        animeList[animeIndex].comments = [];
    }
    
    const newComment = {
        author: currentUser.username,
        avatar: currentUser.avatar,
        text: commentText,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    
    animeList[animeIndex].comments.unshift(newComment);
    saveToLocalStorage();
    displayAnimeList(animeList);
    
    // Очищаем поле ввода
    commentInput.value = '';
}

// Функция редактирования комментария
function editComment(animeIndex, commentIndex) {
    const comment = animeList[animeIndex].comments[commentIndex];
    const commentElement = document.getElementById(`comment-${animeIndex}-${commentIndex}`);
    
    commentElement.innerHTML = `
        <div class="comment-author">
            <img src="${comment.avatar}" alt="Аватар" class="author-avatar">
            ${comment.author}
        </div>
        <div class="comment-edit-form">
            <textarea class="comment-edit-input">${comment.text}</textarea>
            <div class="comment-edit-buttons">
                <button class="save-edit-btn" onclick="saveCommentEdit(${animeIndex}, ${commentIndex})">Сохранить</button>
                <button class="cancel-edit-btn" onclick="displayAnimeList(animeList)">Отмена</button>
            </div>
        </div>
        <div class="comment-date">${formatDate(comment.date)}</div>
    `;
}

// Функция сохранения редактирования комментария
function saveCommentEdit(animeIndex, commentIndex) {
    const commentElement = document.getElementById(`comment-${animeIndex}-${commentIndex}`);
    const editInput = commentElement.querySelector('.comment-edit-input');
    const newText = editInput.value.trim();
    
    if (!newText) {
        alert('Комментарий не может быть пустым');
        return;
    }
    
    animeList[animeIndex].comments[commentIndex].text = newText;
    animeList[animeIndex].comments[commentIndex].date = new Date().toISOString().replace('T', ' ').substring(0, 16);
    
    saveToLocalStorage();
    displayAnimeList(animeList);
}

// Функция удаления комментария
function deleteComment(animeIndex, commentIndex) {
    if (!confirm('Вы уверены, что хотите удалить этот комментарий?')) {
        return;
    }
    
    animeList[animeIndex].comments.splice(commentIndex, 1);
    saveToLocalStorage();
    displayAnimeList(animeList);
}

// Функция показа всех комментариев
function showAllComments(animeIndex) {
    const anime = animeList[animeIndex];
    const commentsHTML = generateCommentsHTML(anime, animeIndex);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <h2 style="margin-bottom: 15px; color: #d63384;">💬 Все комментарии к "${anime.title}"</h2>
            <div class="comments-list" style="max-height: 350px;">
                ${commentsHTML}
            </div>
            <div class="btn-group" style="margin-top: 15px;">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Закрыть</button>
                ${isAdmin && anime.comments && anime.comments.length > 0 ? 
                    `<button class="btn btn-primary" onclick="clearAllComments(${animeIndex})">🗑️ Очистить все комментарии</button>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Функция очистки всех комментариев (для админа)
function clearAllComments(animeIndex) {
    if (!isAdmin) return;
    
    if (confirm('Вы уверены, что хотите удалить ВСЕ комментарии к этому аниме?')) {
        animeList[animeIndex].comments = [];
        saveToLocalStorage();
        displayAnimeList(animeList);
        document.querySelector('.modal').remove();
    }
}

// Функция загрузки аватара
document.getElementById('avatarInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentUser.avatar = e.target.result;
            document.getElementById('userAvatar').src = e.target.result;
            saveCurrentUserToLocalStorage();
            showNotification("Аватар обновлен!");
        };
        reader.readAsDataURL(file);
    }
});

// Функция копирования реквизитов
function copyToClipboard(text) {
    navigator.clipboard.writeText(text.replace(/\s/g, '')).then(() => {
        showCopyNotification();
    });
}

// Функция показа уведомления о копировании
function showCopyNotification() {
    const notification = document.getElementById('copyNotification');
    notification.textContent = 'Реквизиты скопированы! 📋';
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Функция показа обычного уведомления
function showNotification(message) {
    const notification = document.getElementById('copyNotification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Функция редактирования аниме
function editAnime(index) {
    if (!isAdmin) return;
    
    const anime = animeList[index];
    currentEditIndex = index;
    
    document.getElementById('modalTitle').textContent = 'Редактировать аниме';
    document.getElementById('modalSubmit').textContent = 'Сохранить';
    document.getElementById('editIndex').value = index;
    
    document.getElementById('animeTitle').value = anime.title;
    document.getElementById('animeStudio').value = anime.studio;
    document.getElementById('animeVoiceType').value = anime.voiceType;
    document.getElementById('animeVoiceYear').value = anime.voiceYear;
    document.getElementById('animeDescription').value = anime.description;
    document.getElementById('animePosterUrl').value = '';
    document.getElementById('animeVoiceActors').value = anime.voiceActors ? anime.voiceActors.join('\n') : '';
    
    // Устанавливаем рейтинг
    document.getElementById('animeRating').value = anime.rating;
    
    // Устанавливаем звезды рейтинга
    setRatingStars(anime.rating || 0);
    
    // Показываем текущее изображение в превью
    document.getElementById('imagePreview').innerHTML = `<img src="${anime.poster}" alt="Превью">`;
    
    // Загружаем сезоны
    loadSeasonsData(anime.seasons);
    
    // Загружаем спешлы
    loadSpecialsData(anime.specials);
    
    openModal();
}

// Функция удаления аниме
function deleteAnime(index) {
    if (!isAdmin) return;
    
    if (confirm('Вы уверены, что хотите удалить это аниме?')) {
        animeList.splice(index, 1);
        saveToLocalStorage();
        displayAnimeList(animeList);
    }
}

// Функция для получения текста типа озвучки
function getVoiceTypeText(type) {
    const types = {
        'dub': 'Дубляж',
        'recap': 'Рекаст',
        'offscreen': 'Закадровая'
    };
    return types[type] || type;
}

// Функции для фильтров
function setFilter(filter) {
    currentFilter = filter;
    updateFilterButtons();
    displayAnimeList(animeList);
}

function toggleBestFilter() {
    currentBestFilter = !currentBestFilter;
    updateFilterButtons();
    displayAnimeList(animeList);
}

function setYearFilter(filter) {
    currentYearFilter = filter;
    updateFilterButtons();
    displayAnimeList(animeList);
}

function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Активируем кнопку фильтра по типу
    if (currentFilter !== 'all') {
        document.querySelector(`.filter-btn[onclick="setFilter('${currentFilter}')"]`).classList.add('active');
    } else {
        document.querySelector('.filter-btn[onclick="setFilter(\'all\')"]').classList.add('active');
    }
    
    // Активируем кнопку "Лучшее" если она активна
    if (currentBestFilter) {
        document.getElementById('bestFilter').classList.add('active');
    }
    
    // Активируем кнопку фильтра по году если она активна
    if (currentYearFilter !== 'none') {
        document.getElementById(`${currentYearFilter}Filter`).classList.add('active');
    }
}

// Функции для рейтинга
function setupRatingStars() {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRatingStars(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    document.getElementById('ratingStars').addEventListener('mouseleave', function() {
        const currentRating = parseInt(document.getElementById('animeRating').value);
        highlightStars(currentRating);
    });
}

function setRatingStars(rating) {
    document.getElementById('animeRating').value = rating;
    document.getElementById('ratingValue').textContent = `${rating}/5`;
    highlightStars(rating);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '⭐';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
    });
}

// Функции админ-панели
function toggleAdminMode() {
    if (!isAdmin) {
        document.getElementById('loginModal').classList.add('active');
    }
}

function logoutAdmin() {
    isAdmin = false;
    updateAdminUI();
    displayAnimeList(animeList);
    showNotification("Режим администратора выключен");
}

function updateAdminUI() {
    const adminPanel = document.getElementById('adminPanel');
    const adminStatus = document.getElementById('adminStatus');
    const adminToggle = document.getElementById('adminToggle');
    const logoutBtn = document.getElementById('logoutBtn');
    const addBtn = document.getElementById('addBtn');
    
    if (isAdmin) {
        adminPanel.style.display = 'block';
        adminStatus.textContent = '👑 Режим администратора';
        adminStatus.className = 'admin-status on';
        adminToggle.style.display = 'none';
        logoutBtn.style.display = 'block';
        addBtn.style.display = 'block';
        addBtn.disabled = false;
    } else {
        adminPanel.style.display = 'none';
        adminStatus.textContent = '🔐 Режим пользователя';
        adminStatus.className = 'admin-status off';
        adminToggle.style.display = 'block';
        logoutBtn.style.display = 'none';
        addBtn.style.display = 'none';
        addBtn.disabled = true;
    }
}

// Функции для модальных окон
function openModal() {
    document.getElementById('animeModal').style.display = 'block';
}

function openAddModal() {
    if (!isAdmin) return;
    
    document.getElementById('modalTitle').textContent = 'Добавить аниме';
    document.getElementById('modalSubmit').textContent = 'Добавить';
    document.getElementById('editIndex').value = '-1';
    document.getElementById('animeForm').reset();
    document.getElementById('imagePreview').innerHTML = '<span style="color: #f8bbd9;">Превью постера</span>';
    setRatingStars(0);
    
    // Сбрасываем сезоны (добавляем один по умолчанию)
    loadSeasonsData([]);
    loadSpecialsData([]);
    
    openModal();
}

function closeModal() {
    document.getElementById('animeModal').style.display = 'none';
    currentEditIndex = -1;
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('loginForm').reset();
}

// Обработка формы входа
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        updateAdminUI();
        displayAnimeList(animeList);
        closeLoginModal();
        showNotification("Режим администратора включен! 👑");
    } else {
        alert('Неверный пароль!');
    }
});

// Обработка формы аниме
document.getElementById('animeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!isAdmin) return;
    
    const title = document.getElementById('animeTitle').value;
    const studio = document.getElementById('animeStudio').value;
    const voiceType = document.getElementById('animeVoiceType').value;
    const voiceYear = parseInt(document.getElementById('animeVoiceYear').value);
    const description = document.getElementById('animeDescription').value;
    const voiceActorsText = document.getElementById('animeVoiceActors').value;
    const rating = parseInt(document.getElementById('animeRating').value);
    const editIndex = document.getElementById('editIndex').value;
    
    // Определяем, является ли аниме "лучшим" (рейтинг 4+)
    const isBest = rating >= 4;
    
    // Обрабатываем актеры озвучки
    const voiceActors = voiceActorsText
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.trim());
    
    // Получаем постер из URL или файла
    const posterUrl = document.getElementById('animePosterUrl').value;
    const posterFile = document.getElementById('animePosterFile').files[0];
    
    let poster = posterUrl;
    
    if (posterFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            poster = e.target.result;
            saveAnime(title, studio, voiceType, voiceYear, description, voiceActors, poster, rating, isBest, editIndex);
        };
        reader.readAsDataURL(posterFile);
    } else {
        // Если URL не указан и это редактирование, сохраняем старый постер
        if (!poster && editIndex !== '-1') {
            poster = animeList[editIndex].poster;
        }
        saveAnime(title, studio, voiceType, voiceYear, description, voiceActors, poster, rating, isBest, editIndex);
    }
});

function saveAnime(title, studio, voiceType, voiceYear, description, voiceActors, poster, rating, isBest, editIndex) {
    // Получаем данные сезонов
    const seasons = getSeasonsData();
    const specials = getSpecialsData();
    
    // Если нет постера, используем заглушку
    if (!poster) {
        poster = `https://via.placeholder.com/1000x1500/ffeef2/d63384?text=${encodeURIComponent(title)}`;
    }
    
    const animeData = {
        title,
        studio,
        voiceType,
        voiceYear,
        description,
        poster,
        voiceActors,
        rating,
        userRatings: editIndex !== '-1' ? animeList[editIndex].userRatings || [] : [],
        isBest,
        seasons,
        specials,
        comments: editIndex !== '-1' ? animeList[editIndex].comments || [] : []
    };
    
    if (editIndex === '-1') {
        // Добавление нового аниме
        animeList.push(animeData);
        showNotification(`Аниме "${title}" добавлено!`);
    } else {
        // Редактирование существующего аниме
        animeList[editIndex] = animeData;
        showNotification(`Аниме "${title}" обновлено!`);
    }
    
    saveToLocalStorage();
    displayAnimeList(animeList);
    closeModal();
}

// Функции для редактора сезонов
function addSeason(seasonData = null) {
    const seasonsList = document.getElementById('seasonsList');
    const seasonIndex = seasonsList.children.length;
    
    const seasonEditor = document.createElement('div');
    seasonEditor.className = 'season-editor-item';
    seasonEditor.innerHTML = `
        <div class="season-editor-header">
            <div class="season-number">Сезон ${seasonIndex + 1}</div>
            <button type="button" class="remove-season-btn" onclick="removeSeason(this)">×</button>
        </div>
        <div class="season-fields">
            <div class="season-field">
                <label>Название сезона</label>
                <input type="text" class="season-name" value="${seasonData ? seasonData.name : `Сезон ${seasonIndex + 1}`}" placeholder="Например: Сезон 1">
            </div>
            <div class="season-field">
                <label>Количество эпизодов</label>
                <input type="number" class="season-episodes" value="${seasonData ? seasonData.episodes : 12}" min="1" max="1000">
            </div>
            <div class="season-field full-width">
                <label>Ссылка для просмотра</label>
                <input type="url" class="season-link" value="${seasonData ? seasonData.link : ''}" placeholder="https://example.com/season1">
            </div>
        </div>
    `;
    
    seasonsList.appendChild(seasonEditor);
}

function removeSeason(button) {
    const seasonEditor = button.closest('.season-editor-item');
    seasonEditor.remove();
    
    // Обновляем номера сезонов
    const seasonsList = document.getElementById('seasonsList');
    Array.from(seasonsList.children).forEach((editor, index) => {
        editor.querySelector('.season-number').textContent = `Сезон ${index + 1}`;
    });
}

function getSeasonsData() {
    const seasonsList = document.getElementById('seasonsList');
    const seasons = [];
    
    Array.from(seasonsList.children).forEach(editor => {
        const name = editor.querySelector('.season-name').value;
        const episodes = parseInt(editor.querySelector('.season-episodes').value);
        const link = editor.querySelector('.season-link').value;
        
        if (name && link) {
            seasons.push({
                name,
                episodes,
                link
            });
        }
    });
    
    return seasons;
}

function loadSeasonsData(seasons) {
    const seasonsList = document.getElementById('seasonsList');
    seasonsList.innerHTML = '';
    
    if (seasons && seasons.length > 0) {
        seasons.forEach(season => {
            addSeason(season);
        });
    } else {
        addSeason(); // Добавляем один сезон по умолчанию
    }
}

// Функции для редактора спешлов
function addSpecial(specialData = null) {
    const specialsList = document.getElementById('specialsList');
    const specialIndex = specialsList.children.length;
    
    const specialEditor = document.createElement('div');
    specialEditor.className = 'season-editor-item';
    specialEditor.innerHTML = `
        <div class="season-editor-header">
            <div class="season-number">Спешл ${specialIndex + 1}</div>
            <button type="button" class="remove-season-btn" onclick="removeSpecial(this)">×</button>
        </div>
        <div class="season-fields">
            <div class="season-field">
                <label>Название спешла</label>
                <input type="text" class="special-name" value="${specialData ? specialData.name : `OVA ${specialIndex + 1}`}" placeholder="Например: OVA 1">
            </div>
            <div class="season-field">
                <label>Количество эпизодов</label>
                <input type="number" class="special-episodes" value="${specialData ? specialData.episodes : 1}" min="1" max="100">
            </div>
            <div class="season-field full-width">
                <label>Ссылка для просмотра</label>
                <input type="url" class="special-link" value="${specialData ? specialData.link : ''}" placeholder="https://example.com/ova1">
            </div>
        </div>
    `;
    
    specialsList.appendChild(specialEditor);
}

function removeSpecial(button) {
    const specialEditor = button.closest('.season-editor-item');
    specialEditor.remove();
    
    // Обновляем номера спешлов
    const specialsList = document.getElementById('specialsList');
    Array.from(specialsList.children).forEach((editor, index) => {
        editor.querySelector('.season-number').textContent = `Спешл ${index + 1}`;
    });
}

function getSpecialsData() {
    const specialsList = document.getElementById('specialsList');
    const specials = [];
    
    Array.from(specialsList.children).forEach(editor => {
        const name = editor.querySelector('.special-name').value;
        const episodes = parseInt(editor.querySelector('.special-episodes').value);
        const link = editor.querySelector('.special-link').value;
        
        if (name && link) {
            specials.push({
                name,
                episodes,
                link
            });
        }
    });
    
    return specials;
}

function loadSpecialsData(specials) {
    const specialsList = document.getElementById('specialsList');
    specialsList.innerHTML = '';
    
    if (specials && specials.length > 0) {
        specials.forEach(special => {
            addSpecial(special);
        });
    }
}

// Превью изображения
document.getElementById('animePosterFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').innerHTML = `<img src="${e.target.result}" alt="Превью">`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('animePosterUrl').addEventListener('input', function(e) {
    const url = e.target.value;
    if (url) {
        document.getElementById('imagePreview').innerHTML = `<img src="${url}" alt="Превью" onerror="this.parentElement.innerHTML='<span style=\\'color: #f8bbd9;\\'>Ошибка загрузки</span>'">`;
    }
});

// Поиск
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredList = animeList.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm) ||
        anime.studio.toLowerCase().includes(searchTerm) ||
        anime.description.toLowerCase().includes(searchTerm) ||
        (anime.voiceActors && anime.voiceActors.some(actor => 
            actor.toLowerCase().includes(searchTerm)
        )) ||
        (anime.comments && anime.comments.some(comment =>
            comment.text.toLowerCase().includes(searchTerm) ||
            comment.author.toLowerCase().includes(searchTerm)
        ))
    );
    displayAnimeList(filteredList);
});

// Local Storage функции
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
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
}

function loadCurrentUserFromLocalStorage() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLogin = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLogin === 'true') {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
    }
}

// Настройка event listeners
function setupEventListeners() {
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('animeModal')) {
            closeModal();
        }
        if (e.target === document.getElementById('loginModal')) {
            closeLoginModal();
        }
    });
    
    // Закрытие меню сезонов при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.seasons-dropdown')) {
            document.querySelectorAll('.seasons-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', init);
