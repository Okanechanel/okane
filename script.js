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
        rating: 4.5,
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
            },
            {
                name: "Сезон 3",
                episodes: 22,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/season3"
            },
            {
                name: "Финальный сезон",
                episodes: 28,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/final"
            }
        ],
        specials: [
            {
                name: "OVA: Ilse's Notebook",
                type: "OVA",
                episodes: 1,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/specials"
            },
            {
                name: "OVA: A Choice with No Regrets",
                type: "OVA", 
                episodes: 2,
                link: "https://shikimori.one/animes/16498-shingeki-no-kyojin/specials"
            }
        ],
        comments: [
            {
                author: "Алексей",
                avatar: "https://via.placeholder.com/40/ffeef2/d63384?text=A",
                text: "Отличная озвучка! Очень понравилась работа актеров.",
                date: "2024-01-15 14:30",
                rating: 5
            },
            {
                author: "Мария",
                avatar: "https://via.placeholder.com/40/ffeef2/d63384?text=M",
                text: "Смотрела на одном дыхании, спасибо за качественный дубляж!",
                date: "2024-01-16 09:15",
                rating: 4
            }
        ],
        commentRatings: {
            total: 2,
            average: 4.5,
            distribution: {5: 1, 4: 1, 3: 0, 2: 0, 1: 0}
        }
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
        rating: 4.2,
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
                name: "Фильм: Strong World",
                type: "Фильм",
                episodes: 1,
                link: "https://shikimori.one/animes/3677-one-piece-movie-10-strong-world"
            }
        ],
        comments: [],
        commentRatings: {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        }
    },
    {
        title: "Наруто",
        studio: "Studio Pierrot",
        description: "История о юном ниндзя Наруто Узумаки, который мечтает стать Хокаге - лидером своей деревни. Несмотря на то, что в нем запечатан Девятихвостый демон-лис, Наруто не сдается и продолжает упорно тренироваться, чтобы достичь своей цели.",
        voiceType: "dub",
        voiceYear: 2018,
        poster: "https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Наруто",
        voiceActors: [
            "Александр Новиков - Наруто Узумаки",
            "Екатерина Семенова - Сакура Харуно",
            "Михаил Петров - Саске Учиха",
            "Ольга Иванова - Какаши Хатаке"
        ],
        rating: 4.0,
        isBest: false,
        seasons: [
            {
                name: "Классический Наруто",
                episodes: 220,
                link: "https://shikimori.one/animes/20-naruto/classic"
            },
            {
                name: "Наруто: Ураганные хроники",
                episodes: 500,
                link: "https://shikimori.one/animes/20-naruto/shippuden"
            }
        ],
        comments: [
            {
                author: "Дмитрий",
                avatar: "https://via.placeholder.com/40/ffeef2/d63384?text=D",
                text: "Классика жанра! Отличная озвучка, рекомендую всем фанатам аниме.",
                date: "2024-01-10 18:45",
                rating: 4
            }
        ],
        commentRatings: {
            total: 1,
            average: 4.0,
            distribution: {5: 0, 4: 1, 3: 0, 2: 0, 1: 0}
        }
    },
    {
        title: "Ходячий замок",
        studio: "Studio Ghibli",
        description: "История о юной шляпнице Софи, которая попадает под действие проклятия и превращается в старуху. В поисках спасения она знакомится с загадочным волшебником Хаулом и его передвигающимся замком.",
        voiceType: "offscreen",
        voiceYear: 2020,
        poster: "https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Ходячий+замок",
        voiceActors: [
            "Анна Соколова - Софи",
            "Игорь Петров - Хаул",
            "Мария Козлова - Кальцифер",
            "Сергей Новиков - Маркл"
        ],
        rating: 4.8,
        isBest: true,
        seasons: [
            {
                name: "Полная версия",
                episodes: 1,
                link: "https://shikimori.one/animes/430-howl-no-ugoku-shiro"
            }
        ],
        comments: [],
        commentRatings: {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        }
    }
];

// Настройки администратора
const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "admin123";
let isAdmin = false;
let currentFilter = 'all';
let currentBestFilter = false;
let currentYearFilter = 'none';
let currentEditIndex = -1;
let currentCommentAnimeIndex = -1;
let currentUser = {
    username: "Анонимный пользователь",
    avatar: "https://via.placeholder.com/80/ffeef2/d63384?text=AV",
    background: ""
};

// Дебаунс для поиска
let searchTimeout;

// Функция удаления профиля пользователя
function deleteUserProfile() {
    if (confirm('Вы уверены, что хотите удалить свой профиль? Все ваши данные (комментарии) будут удалены.')) {
        // Удаляем все комментарии пользователя из всех аниме
        animeList.forEach(anime => {
            if (anime.comments) {
                anime.comments = anime.comments.filter(comment => 
                    comment.author !== currentUser.username
                );
                // Пересчитываем рейтинги после удаления комментариев
                updateAnimeRating(anime);
            }
        });
        
        // Сбрасываем профиль пользователя
        currentUser = {
            username: "Анонимный пользователь",
            avatar: "https://via.placeholder.com/80/ffeef2/d63384?text=AV",
            background: ""
        };
        
        // Обновляем UI
        document.getElementById('usernameInput').value = '';
        document.getElementById('userAvatar').src = currentUser.avatar;
        
        // Убираем кастомный фон
        document.body.classList.remove('custom-bg');
        document.body.style.backgroundImage = '';
        
        // Сохраняем изменения
        saveToLocalStorage();
        saveUserToLocalStorage();
        displayAnimeList(animeList);
        
        showNotification('Профиль удален! Все ваши данные очищены.');
    }
}

// Функция сохранения профиля пользователя
function saveUserProfile() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    
    if (username) {
        // Если пользователь меняет имя, обновляем все его комментарии
        const oldUsername = currentUser.username;
        if (oldUsername !== username && oldUsername !== "Анонимный пользователь") {
            animeList.forEach(anime => {
                if (anime.comments) {
                    anime.comments.forEach(comment => {
                        if (comment.author === oldUsername) {
                            comment.author = username;
                        }
                    });
                }
            });
        }
        
        currentUser.username = username;
    }
    
    saveUserToLocalStorage();
    saveToLocalStorage();
    displayAnimeList(animeList);
    showNotification('Профиль сохранен! ✅');
}

// Функция для обновления рейтинга аниме на основе комментариев
function updateAnimeRating(anime) {
    if (!anime.comments || anime.comments.length === 0) {
        anime.commentRatings = {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        };
        return;
    }
    
    const ratedComments = anime.comments.filter(comment => comment.rating);
    
    if (ratedComments.length === 0) {
        anime.commentRatings = {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        };
        return;
    }
    
    const total = ratedComments.length;
    const sum = ratedComments.reduce((acc, comment) => acc + comment.rating, 0);
    const average = total > 0 ? sum / total : 0;
    
    // Считаем распределение оценок
    const distribution = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    ratedComments.forEach(comment => {
        if (comment.rating >= 1 && comment.rating <= 5) {
            distribution[comment.rating]++;
        }
    });
    
    anime.commentRatings = {
        total,
        average: Math.round(average * 10) / 10,
        distribution
    };
    
    // Обновляем общий рейтинг аниме
    anime.rating = Math.round(average * 10) / 10;
}

// Функция для отображения списка
function displayAnimeList(list) {
    const animeListElement = document.getElementById('animeList');
    animeListElement.innerHTML = '';
    
    // Применяем сортировку по году
    let sortedList = [...list];
    if (currentYearFilter === 'newest') {
        sortedList.sort((a, b) => b.voiceYear - a.voiceYear);
    } else if (currentYearFilter === 'oldest') {
        sortedList.sort((a, b) => a.voiceYear - b.voiceYear);
    }
    
    const filteredList = sortedList.filter(anime => {
        // Применяем фильтр по типу озвучки
        let typeMatch = true;
        if (currentFilter !== 'all') {
            typeMatch = anime.voiceType === currentFilter;
        }
        
        // Применяем фильтр "Лучшее"
        let bestMatch = true;
        if (currentBestFilter) {
            bestMatch = anime.isBest === true;
        }
        
        return typeMatch && bestMatch;
    });
    
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
        
        // Формируем HTML для актеров озвучки
        let voiceActorsHTML = '';
        if (anime.voiceActors && anime.voiceActors.length > 0) {
            voiceActorsHTML = `
                <div class="voice-actors">
                    <div class="voice-actors-title">🎭 Актеры озвучки:</div>
                    ${anime.voiceActors.map(actor => `
                        <div class="voice-actor">• ${actor}</div>
                    `).join('')}
                </div>
            `;
        }

        // Формируем HTML для комментариев (первые 2)
        const commentsHTML = generateCommentsHTML(anime, index, 2);
        const showMoreButton = anime.comments && anime.comments.length > 2 ? 
            `<button class="show-more-comments" onclick="showAllComments(${index})">
                📖 Показать все комментарии (${anime.comments.length})
            </button>` : '';
        
        // Формируем HTML для сезонов
        const seasonsHTML = generateSeasonsHTML(anime, index);
        
        // Формируем HTML для спешлов
        const specialsHTML = generateSpecialsHTML(anime, index);
        
        // Формируем HTML для статистики оценок
        const ratingStatsHTML = generateRatingStatsHTML(anime);
        
        const animeItem = document.createElement('div');
        animeItem.className = 'anime-item';
        animeItem.innerHTML = `
            <div class="anime-poster-container">
                <img src="${anime.poster}" alt="${anime.title}" class="anime-poster" 
                     onerror="this.src='https://via.placeholder.com/1000x1500/ffeef2/d63384?text=Постер+не+найден'">
                <div class="anime-actions">
                    ${seasonsHTML}
                    ${specialsHTML}
                    ${isAdmin ? `
                        <button class="edit-btn" onclick="editAnime(${index})">
                            ✏️ Редактировать
                        </button>
                        <button class="delete-btn" onclick="deleteAnime(${index})">
                            🗑️ Удалить
                        </button>
                    ` : ''}
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
                
                <div class="description">${anime.description}</div>
                
                <!-- Кнопка для отображения дополнительной информации -->
                <div class="toggle-details" onclick="toggleDetails(this)">
                    📋 Показать детали
                </div>
                
                <!-- Секция с актерами и комментариями (скрыта по умолчанию) -->
                <div class="details-section">
                    ${voiceActorsHTML}
                    
                    <!-- Статистика оценок -->
                    ${ratingStatsHTML}
                    
                    <!-- Секция комментариев -->
                    <div class="comments-section">
                        <div class="comments-title" onclick="toggleComments(this)">
                            💬 Комментарии 
                            <span style="font-size: 12px; color: #868e96;">(${anime.comments ? anime.comments.length : 0})</span>
                        </div>
                        
                        <!-- Форма добавления комментария -->
                        <div class="comment-form">
                            <textarea class="comment-input" placeholder="Оставьте ваш комментарий..." id="commentInput-${index}"></textarea>
                            <button class="submit-comment" onclick="openCommentRatingModal(${index})">
                                ⭐ Оценить и отправить
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
        animeListElement.appendChild(animeItem);
    });
}

// Функция для генерации HTML статистики оценок
function generateRatingStatsHTML(anime) {
    if (!anime.commentRatings || anime.commentRatings.total === 0) {
        return '';
    }
    
    const { total, average, distribution } = anime.commentRatings;
    const percentage = (rating) => {
        return total > 0 ? (distribution[rating] / total) * 100 : 0;
    };
    
    return `
        <div class="comment-rating-section">
            <div class="comment-rating-title">⭐ Оценки зрителей (${total} оценок)</div>
            <div class="comment-rating-stats">
                <div style="font-weight: bold; color: #d63384; font-size: 14px;">
                    ${average.toFixed(1)}/5
                </div>
                <div class="rating-progress">
                    <div class="rating-progress-fill" style="width: ${(average / 5) * 100}%"></div>
                </div>
                <div style="color: #868e96; font-size: 11px;">
                    ${total} оценок
                </div>
            </div>
            <div class="rating-distribution">
                ${[5, 4, 3, 2, 1].map(rating => `
                    <div class="rating-bar">
                        <div class="rating-bar-label">${rating}</div>
                        <div class="rating-bar-progress">
                            <div class="rating-bar-fill" style="width: ${percentage(rating)}%"></div>
                        </div>
                        <div class="rating-bar-count">${distribution[rating]}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
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
                    🎬 Смотреть (${anime.seasons.length} сезонов)
                </div>
                <div class="seasons-menu">
                    ${seasonsList}
                </div>
            </div>
        `;
    }
}

// Функция для генерации HTML спешлов
function generateSpecialsHTML(anime, index) {
    if (!anime.specials || anime.specials.length === 0) {
        return '';
    }
    
    if (anime.specials.length === 1) {
        // Если только один спешл, показываем прямую ссылку
        return `<a href="${anime.specials[0].link}" target="_blank" class="specials-btn">🎬 ${anime.specials[0].type}</a>`;
    } else {
        // Если несколько спешлов, показываем выпадающее меню
        const specialsList = anime.specials.map((special, specialIndex) => `
            <div class="special-item" onclick="window.open('${special.link}', '_blank')">
                <div class="special-name">${special.name}</div>
                <div class="special-type">${special.type} • ${special.episodes} эп.</div>
            </div>
        `).join('');
        
        return `
            <div class="specials-dropdown">
                <div class="specials-btn" onclick="toggleSpecialsMenu(this)">
                    🎬 OVA/Спешлы (${anime.specials.length})
                </div>
                <div class="specials-menu">
                    ${specialsList}
                </div>
            </div>
        `;
    }
}

// Функция для генерации HTML комментариев
function generateCommentsHTML(anime, index, limit = null) {
    if (!anime.comments || anime.comments.length === 0) {
        return '<div class="no-comments">Пока нет комментариев. Будьте первым!</div>';
    }
    
    const commentsToShow = limit ? anime.comments.slice(0, limit) : anime.comments;
    
    return commentsToShow.map((comment, commentIndex) => {
        const isCurrentUserComment = comment.author === currentUser.username;
        const editDeleteButtons = isCurrentUserComment ? `
            <button class="edit-comment-btn" onclick="editComment(${index}, ${commentIndex})">✏️</button>
            <button class="delete-comment-btn" onclick="deleteComment(${index}, ${commentIndex})">×</button>
        ` : (isAdmin ? `<button class="delete-comment-btn" onclick="deleteComment(${index}, ${commentIndex})">×</button>` : '');
        
        const ratingBadge = comment.rating ? `
            <span class="comment-rating-badge">
                ⭐ ${comment.rating}/5
            </span>
        ` : '';
        
        return `
            <div class="comment-item" id="comment-${index}-${commentIndex}">
                ${editDeleteButtons}
                <div class="comment-author">
                    <img src="${comment.avatar}" alt="Аватар" class="author-avatar">
                    ${comment.author}
                    ${ratingBadge}
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${formatDate(comment.date)}</div>
            </div>
        `;
    }).join('');
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

// Функция для переключения меню спешлов
function toggleSpecialsMenu(element) {
    const menu = element.nextElementSibling;
    const isVisible = menu.classList.contains('show');
    
    // Закрываем все открытые меню
    document.querySelectorAll('.specials-menu.show').forEach(openMenu => {
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

// Закрытие меню при клике вне их
document.addEventListener('click', function(e) {
    if (!e.target.closest('.seasons-dropdown')) {
        document.querySelectorAll('.seasons-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    }
    if (!e.target.closest('.specials-dropdown')) {
        document.querySelectorAll('.specials-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

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
                <label>Название</label>
                <input type="text" class="special-name" value="${specialData ? specialData.name : `Спешл ${specialIndex + 1}`}" placeholder="Например: OVA 1">
            </div>
            <div class="season-field">
                <label>Тип</label>
                <select class="special-type">
                    <option value="OVA" ${specialData && specialData.type === 'OVA' ? 'selected' : ''}>OVA</option>
                    <option value="ONA" ${specialData && specialData.type === 'ONA' ? 'selected' : ''}>ONA</option>
                    <option value="Фильм" ${specialData && specialData.type === 'Фильм' ? 'selected' : ''}>Фильм</option>
                    <option value="Спешл" ${specialData && specialData.type === 'Спешл' ? 'selected' : ''}>Спешл</option>
                </select>
            </div>
            <div class="season-field">
                <label>Количество эпизодов</label>
                <input type="number" class="special-episodes" value="${specialData ? specialData.episodes : 1}" min="1" max="100">
            </div>
            <div class="season-field full-width">
                <label>Ссылка для просмотра</label>
                <input type="url" class="special-link" value="${specialData ? specialData.link : ''}" placeholder="https://example.com/special1">
            </div>
        </div>
    `;
    
    specialsList.appendChild(specialEditor);
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

function removeSpecial(button) {
    const specialEditor = button.closest('.season-editor-item');
    specialEditor.remove();
    
    // Обновляем номера спешлов
    const specialsList = document.getElementById('specialsList');
    Array.from(specialsList.children).forEach((editor, index) => {
        editor.querySelector('.season-number').textContent = `Спешл ${index + 1}`;
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

function getSpecialsData() {
    const specialsList = document.getElementById('specialsList');
    const specials = [];
    
    Array.from(specialsList.children).forEach(editor => {
        const name = editor.querySelector('.special-name').value;
        const type = editor.querySelector('.special-type').value;
        const episodes = parseInt(editor.querySelector('.special-episodes').value);
        const link = editor.querySelector('.special-link').value;
        
        if (name && link) {
            specials.push({
                name,
                type,
                episodes,
                link
            });
        }
    });
    
    return specials;
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

function loadSpecialsData(specials) {
    const specialsList = document.getElementById('specialsList');
    specialsList.innerHTML = '';
    
    if (specials && specials.length > 0) {
        specials.forEach(special => {
            addSpecial(special);
        });
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

// Функция для открытия модального окна оценки комментария
function openCommentRatingModal(animeIndex) {
    const commentInput = document.getElementById(`commentInput-${animeIndex}`);
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Пожалуйста, введите текст комментария');
        return;
    }
    
    currentCommentAnimeIndex = animeIndex;
    document.getElementById('commentRatingText').value = commentText;
    document.getElementById('commentRatingModal').style.display = 'block';
    setupCommentRatingStars();
}

// Функция для закрытия модального окна оценки комментария
function closeCommentRatingModal() {
    document.getElementById('commentRatingModal').style.display = 'none';
    currentCommentAnimeIndex = -1;
}

// Функция для настройки звезд рейтинга комментария
function setupCommentRatingStars() {
    const stars = document.querySelectorAll('#commentRatingStars .rating-star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setCommentRatingStars(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightCommentStars(rating);
        });
    });
    
    document.getElementById('commentRatingStars').addEventListener('mouseleave', function() {
        const currentRating = parseInt(document.getElementById('commentRating').value);
        highlightCommentStars(currentRating);
    });
}

function setCommentRatingStars(rating) {
    document.getElementById('commentRating').value = rating;
    document.getElementById('commentRatingValue').textContent = `${rating}/5`;
    highlightCommentStars(rating);
}

function highlightCommentStars(rating) {
    const stars = document.querySelectorAll('#commentRatingStars .rating-star');
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

// Функция для отправки комментария с оценкой
function submitCommentWithRating() {
    const rating = parseInt(document.getElementById('commentRating').value);
    const commentText = document.getElementById('commentRatingText').value.trim();
    
    if (rating === 0) {
        alert('Пожалуйста, поставьте оценку');
        return;
    }
    
    if (!commentText) {
        alert('Пожалуйста, введите текст комментария');
        return;
    }
    
    if (currentCommentAnimeIndex === -1) return;
    
    const anime = animeList[currentCommentAnimeIndex];
    if (!anime.comments) {
        anime.comments = [];
    }
    
    const newComment = {
        author: currentUser.username,
        avatar: currentUser.avatar,
        text: commentText,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        rating: rating
    };
    
    anime.comments.unshift(newComment);
    
    // Обновляем рейтинг аниме
    updateAnimeRating(anime);
    
    saveToLocalStorage();
    displayAnimeList(animeList);
    closeCommentRatingModal();
    
    // Очищаем поле ввода
    document.getElementById(`commentInput-${currentCommentAnimeIndex}`).value = '';
}

// Функция редактирования комментария
function editComment(animeIndex, commentIndex) {
    const comment = animeList[animeIndex].comments[commentIndex];
    const commentElement = document.getElementById(`comment-${animeIndex}-${commentIndex}`);
    
    commentElement.innerHTML = `
        <div class="comment-author">
            <img src="${comment.avatar}" alt="Аватар" class="author-avatar">
            ${comment.author}
            ${comment.rating ? `<span class="comment-rating-badge">⭐ ${comment.rating}/5</span>` : ''}
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
    
    const deletedComment = animeList[animeIndex].comments[commentIndex];
    animeList[animeIndex].comments.splice(commentIndex, 1);
    
    // Обновляем рейтинг аниме после удаления комментария
    updateAnimeRating(animeList[animeIndex]);
    
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
        updateAnimeRating(animeList[animeIndex]);
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
            saveUserToLocalStorage();
        };
        reader.readAsDataURL(file);
    }
});

// Функция загрузки фона
document.getElementById('backgroundInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentUser.background = e.target.result;
            document.body.classList.add('custom-bg');
            document.body.style.setProperty('--custom-bg', `url(${e.target.result})`);
            saveUserToLocalStorage();
            showNotification('Фон успешно установлен! 🎨');
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
    }, 2000);
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
    document.getElementById('loginModal').classList.add('active');
}

function loginAdmin(login, password) {
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
        isAdmin = true;
        updateAdminUI();
        displayAnimeList(animeList);
        closeLoginModal();
        showNotification('Успешный вход в админ-панель! 👑');
        return true;
    }
    return false;
}

function logoutAdmin() {
    isAdmin = false;
    updateAdminUI();
    displayAnimeList(animeList);
    showNotification('Вы вышли из админ-панели');
}

function updateAdminUI() {
    const adminPanel = document.getElementById('adminPanel');
    const adminAccessBtn = document.getElementById('adminAccessBtn');
    
    if (isAdmin) {
        adminPanel.style.display = 'block';
        adminAccessBtn.style.display = 'none';
    } else {
        adminPanel.style.display = 'none';
        adminAccessBtn.style.display = 'block';
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
    
    // Сбрасываем сезоны и спешлы
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
    const login = document.getElementById('adminLogin').value;
    const password = document.getElementById('adminPassword').value;
    
    if (!loginAdmin(login, password)) {
        alert('Неверный логин или пароль!');
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
    
    // Валидация данных
    try {
        validateAnimeData({ title, studio, voiceYear });
    } catch (error) {
        alert(error.message);
        return;
    }
    
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

// Функция валидации данных аниме
function validateAnimeData(data) {
    if (!data.title || data.title.length < 1) {
        throw new Error('Название аниме обязательно');
    }
    if (!data.studio || data.studio.length < 1) {
        throw new Error('Студия обязательна');
    }
    if (data.voiceYear < 1990 || data.voiceYear > new Date().getFullYear() + 1) {
        throw new Error('Некорректный год озвучки');
    }
    return true;
}

function saveAnime(title, studio, voiceType, voiceYear, description, voiceActors, poster, rating, isBest, editIndex) {
    // Получаем данные сезонов и спешлов
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
        isBest,
        seasons,
        specials,
        comments: editIndex !== '-1' ? animeList[editIndex].comments || [] : [],
        commentRatings: editIndex !== '-1' ? animeList[editIndex].commentRatings || {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        } : {
            total: 0,
            average: 0,
            distribution: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}
        }
    };
    
    if (editIndex === '-1') {
        // Добавление нового аниме
        animeList.push(animeData);
        showNotification('Аниме успешно добавлено! ✅');
    } else {
        // Редактирование существующего аниме
        animeList[editIndex] = animeData;
        showNotification('Аниме успешно обновлено! ✏️');
    }
    
    saveToLocalStorage();
    displayAnimeList(animeList);
    closeModal();
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

// Поиск с дебаунсом
document.getElementById('searchInput').addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
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
    }, 300);
});

// Local Storage функции
function saveToLocalStorage() {
    localStorage.setItem('animeList', JSON.stringify(animeList));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('animeList');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

function saveUserToLocalStorage() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function loadUserFromLocalStorage() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// Загрузка данных при старте
const savedData = loadFromLocalStorage();
if (savedData) {
    animeList = savedData;
}

const savedUser = loadUserFromLocalStorage();
if (savedUser) {
    currentUser = savedUser;
    document.getElementById('usernameInput').value = currentUser.username;
    document.getElementById('userAvatar').src = currentUser.avatar;
    
    // Восстанавливаем фон если есть
    if (currentUser.background) {
        document.body.classList.add('custom-bg');
        document.body.style.setProperty('--custom-bg', `url(${currentUser.background})`);
    }
}

// Первоначальная загрузка
setupRatingStars();
updateAdminUI();
displayAnimeList(animeList);
updateFilterButtons();

// Закрытие модальных окон при клике вне их
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('animeModal')) {
        closeModal();
    }
    if (e.target === document.getElementById('loginModal')) {
        closeLoginModal();
    }
    if (e.target === document.getElementById('commentRatingModal')) {
        closeCommentRatingModal();
    }
});

// Добавляем начальный сезон при загрузке
document.addEventListener('DOMContentLoaded', function() {
    loadSeasonsData([]);
    loadSpecialsData([]);
});
