// ==============================
// СИСТЕМА УПРАВЛЕНИЯ ФОНОМ
// ==============================

class BackgroundManager {
    constructor() {
        this.currentBackground = null;
        this.selectedImage = null;
        this.init();
    }

    getSavedBackground() {
        try {
            const saved = localStorage.getItem('okaneBackground');
            if (!saved) return null;
            return JSON.parse(saved);
        } catch (e) {
            console.error('Ошибка загрузки фона:', e);
            return null;
        }
    }

    saveBackground(type, value, name) {
        try {
            const background = { 
                type, 
                value, 
                name, 
                timestamp: new Date().toISOString() 
            };
            localStorage.setItem('okaneBackground', JSON.stringify(background));
            this.currentBackground = background;
            console.log('Фон сохранён:', name);
        } catch (e) {
            console.error('Ошибка сохранения фона:', e);
        }
    }

    applyBackground(type, value) {
        const body = document.body;
        
        try {
            switch(type) {
                case 'gradient':
                    body.style.backgroundImage = 'none';
                    body.style.background = value;
                    break;
                    
                case 'color':
                    body.style.backgroundImage = 'none';
                    body.style.background = value;
                    break;
                    
                case 'image':
                    body.style.background = 'none';
                    body.style.backgroundImage = `url('${value}')`;
                    body.style.backgroundSize = 'cover';
                    body.style.backgroundPosition = 'center';
                    body.style.backgroundAttachment = 'fixed';
                    break;
                    
                default:
                    body.style.backgroundImage = 'none';
                    body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
            }
        } catch (e) {
            console.error('Ошибка применения фона:', e);
        }
    }

    init() {
        this.currentBackground = this.getSavedBackground();
        
        if (this.currentBackground) {
            this.applyBackground(
                this.currentBackground.type, 
                this.currentBackground.value
            );
            this.updateCurrentBgName(this.currentBackground.name);
        } else {
            this.applyBackground('default', '');
            this.updateCurrentBgName('Стандартный');
        }
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const settingsButton = document.getElementById('settingsButton');
        const closeSettings = document.getElementById('closeSettings');
        const settingsPanel = document.getElementById('settingsPanel');
        
        if (settingsButton && settingsPanel) {
            settingsButton.addEventListener('click', (e) => {
                e.stopPropagation();
                settingsPanel.classList.toggle('active');
            });
        }
        
        if (closeSettings && settingsPanel) {
            closeSettings.addEventListener('click', () => {
                settingsPanel.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (settingsPanel && settingsPanel.classList.contains('active') && 
                !settingsPanel.contains(e.target) && 
                !settingsButton.contains(e.target)) {
                settingsPanel.classList.remove('active');
            }
        });

        // Градиенты
        document.querySelectorAll('.bg-option[data-bg^="gradient"]').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                option.classList.add('active');
                const bgId = option.dataset.bg;
                const bgName = option.querySelector('span').textContent;
                
                const gradients = {
                    gradient1: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    gradient2: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                    gradient3: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
                    gradient4: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    gradient5: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    gradient6: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)'
                };
                
                if (gradients[bgId]) {
                    this.applyBackground('gradient', gradients[bgId]);
                    this.saveBackground('gradient', gradients[bgId], `Градиент: ${bgName}`);
                    this.updateCurrentBgName(`Градиент: ${bgName}`);
                }
            });
        });

        // Сплошные цвета
        document.querySelectorAll('.bg-option[data-bg^="color"]').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                option.classList.add('active');
                const bgColor = option.style.backgroundColor;
                const bgName = option.querySelector('span').textContent;
                
                this.applyBackground('color', bgColor);
                this.saveBackground('color', bgColor, `Цвет: ${bgName}`);
                this.updateCurrentBgName(`Цвет: ${bgName}`);
            });
        });

        // Загрузка изображения
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        const applyImageButton = document.getElementById('applyImage');
        
        if (imageUpload && applyImageButton) {
            imageUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                if (!file.type.startsWith('image/')) {
                    alert('Пожалуйста, выберите файл изображения');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    alert('Изображение слишком большое. Максимальный размер: 5MB');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.selectedImage = e.target.result;
                    imagePreview.innerHTML = `<img src="${this.selectedImage}" alt="Предпросмотр">`;
                    applyImageButton.disabled = false;
                };
                reader.readAsDataURL(file);
            });

            applyImageButton.addEventListener('click', () => {
                if (!this.selectedImage) {
                    alert('Сначала выберите изображение');
                    return;
                }
                
                this.applyBackground('image', this.selectedImage);
                this.saveBackground('image', this.selectedImage, 'Пользовательское изображение');
                this.updateCurrentBgName('Пользовательское изображение');
                
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
            });
        }

        // Выбор цвета из палитры
        const applyColorButton = document.getElementById('applyColor');
        if (applyColorButton) {
            applyColorButton.addEventListener('click', () => {
                const color = document.getElementById('colorPicker').value;
                
                this.applyBackground('color', color);
                this.saveBackground('color', color, `Выбранный цвет: ${color}`);
                this.updateCurrentBgName(`Выбранный цвет: ${color}`);
                
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
            });
        }

        // Сброс фона
        const resetButton = document.getElementById('resetBackground');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.applyBackground('default', '');
                localStorage.removeItem('okaneBackground');
                this.currentBackground = null;
                this.selectedImage = null;
                this.updateCurrentBgName('Стандартный');
                
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                if (imagePreview) imagePreview.innerHTML = '<p>Изображение не выбрано</p>';
                if (imageUpload) imageUpload.value = '';
                if (applyImageButton) applyImageButton.disabled = true;
            });
        }
    }

    updateCurrentBgName(name) {
        const element = document.getElementById('currentBgName');
        if (element) element.textContent = name;
    }
}

// ==============================
// БАЗА ДАННЫХ АНИМЕ
// ==============================

const animeDatabase = [
    {
        id: 1,
        title: "Путешествие в небеса",
        originalTitle: "Sora no Tabi",
        description: "История о девочке, которая путешествует между мирами на летающем корабле, ищет легендарные небесные острова и раскрывает тайны древней цивилизации.",
        year: 2023,
        episodes: 24,
        studio: "Studio Colorido",
        voiceActors: ["Анна Кириллова", "Михаил Светлов", "Елена Громова"],
        genres: ["Приключения", "Фэнтези", "Драма"],
        type: "tv",
        link: "https://shikimori.one/animes",
        image: ""
    },
    {
        id: 2,
        title: "Тень сакуры",
        originalTitle: "Sakura Kage",
        description: "В эпоху Эдо юная ниндзя должна защитить свою деревню от таинственной организации, использующей запретные техники магии.",
        year: 2022,
        episodes: 13,
        studio: "WIT Studio",
        voiceActors: ["Дмитрий Петров", "Ольга Сидорова", "Иван Новиков", "Татьяна Морозова"],
        genres: ["Боевик", "Исторический", "Сверхъестественное"],
        type: "tv",
        link: "",
        image: ""
    },
    {
        id: 3,
        title: "Механика звёзд: Фильм",
        originalTitle: "Hoshi no Kikaika Movie",
        description: "Полнометражный фильм по мотивам сериала. Экипаж космического корабля обнаруживает невероятную тайну происхождения вселенной.",
        year: 2024,
        episodes: 1,
        studio: "Trigger",
        voiceActors: ["Сергей Иванов", "Мария Ковалёва", "Алексей Смирнов"],
        genres: ["Фантастика", "Меха", "Приключения"],
        type: "movie",
        link: "",
        image: ""
    },
    {
        id: 4,
        title: "Кафе забытых воспоминаний: OVA",
        originalTitle: "Wasureta Kioku no Cafe OVA",
        description: "Особый эпизод, раскрывающий прошлое владельца кафе и происхождение магического кофейного аппарата.",
        year: 2022,
        episodes: 2,
        studio: "Kyoto Animation",
        voiceActors: ["Екатерина Волкова", "Артём Белов", "Надежда Соколова"],
        genres: ["Повседневность", "Драма", "Мистика"],
        type: "ova",
        link: "",
        image: ""
    },
    {
        id: 5,
        title: "Алый алхимик: ONA серии",
        originalTitle: "Scarlet Alchemist Web Series",
        description: "Эксклюзивный веб-сериал, доступный только через стриминговые сервисы. Показывает альтернативную временную линию.",
        year: 2023,
        episodes: 8,
        studio: "Bones",
        voiceActors: ["Александр Новиков", "Юлия Лебедева", "Павел Громов", "Ирина Ветрова"],
        genres: ["Фэнтези", "Боевик", "Драма"],
        type: "ona",
        link: "",
        image: ""
    },
    {
        id: 6,
        title: "Ритм океана: Special Episode",
        originalTitle: "Umi no Rhythm Special",
        description: "Праздничный спешл-эпизод, выпущенный к годовщине сериала. Герои участвуют в музыкальном фестивале.",
        year: 2023,
        episodes: 1,
        studio: "P.A. Works",
        voiceActors: ["Светлана Кузнецова", "Денис Попов", "Анна Медведева", "Максим Орлов"],
        genres: ["Музыкальный", "Школа", "Драма"],
        type: "special",
        link: "",
        image: ""
    },
    {
        id: 7,
        title: "Ночной дозор: OVA коллекция",
        originalTitle: "Night Watch OVA Collection",
        description: "Сборник из трёх OVA-эпизодов, расширяющих вселенную основного сериала. Каждая история рассказывает о разных персонажах.",
        year: 2021,
        episodes: 3,
        studio: "Madhouse",
        voiceActors: ["Владимир Антонов", "Елена Смирнова", "Игорь Козлов"],
        genres: ["Фэнтези", "Боевик", "Детектив"],
        type: "ova",
        link: "",
        image: ""
    },
    {
        id: 8,
        title: "Виртуальная реальность: ONA проект",
        originalTitle: "Virtual Reality Project",
        description: "Инновационный ONA проект, созданный с использованием технологий виртуальной реальности. Каждый эпизод — это отдельное приключение.",
        year: 2024,
        episodes: 6,
        studio: "Science SARU",
        voiceActors: ["Дмитрий Волков", "Анастасия Петрова"],
        genres: ["Фантастика", "Приключения", "Психологическое"],
        type: "ona",
        link: "",
        image: ""
    },
    {
        id: 9,
        title: "Новогодний спешл",
        originalTitle: "New Year Special",
        description: "Праздничный спешл-эпизод, выпущенный к Новому году. Герои отмечают праздники и подводят итоги года.",
        year: 2023,
        episodes: 1,
        studio: "P.A. Works",
        voiceActors: ["Светлана Кузнецова", "Денис Попов"],
        genres: ["Повседневность", "Комедия"],
        type: "special",
        link: "",
        image: ""
    }
];

// ==============================
// ФУНКЦИИ ДЛЯ ВКЛАДОК
// ==============================

let currentTab = 'all';
let currentFilteredAnime = animeDatabase;

function updateTabCounts() {
    const counts = {
        all: animeDatabase.length,
        tv: animeDatabase.filter(a => a.type === 'tv').length,
        movie: animeDatabase.filter(a => a.type === 'movie').length,
        ova: animeDatabase.filter(a => a.type === 'ova').length,
        ona: animeDatabase.filter(a => a.type === 'ona').length,
        special: animeDatabase.filter(a => a.type === 'special').length
    };

    document.getElementById('tabAllCount').textContent = counts.all;
    document.getElementById('tabTvCount').textContent = counts.tv;
    document.getElementById('tabMovieCount').textContent = counts.movie;
    document.getElementById('tabOvaCount').textContent = counts.ova;
    document.getElementById('tabOnaCount').textContent = counts.ona;
    document.getElementById('tabSpecialCount').textContent = counts.special;
}

function filterByTab(tab) {
    currentTab = tab;
    
    if (tab === 'all') {
        currentFilteredAnime = animeDatabase;
    } else {
        currentFilteredAnime = animeDatabase.filter(anime => anime.type === tab);
    }
    
    applyCurrentFilters();
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabType = tab.dataset.tab;
            filterByTab(tabType);
        });
    });
    
    updateTabCounts();
}

// ==============================
// ФУНКЦИИ РЕНДЕРИНГА
// ==============================

function getAllGenres() {
    const genres = new Set();
    animeDatabase.forEach(anime => {
        anime.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
}

function populateGenreFilter() {
    const genreFilter = document.getElementById('genreFilter');
    if (!genreFilter) return;
    
    const genres = getAllGenres();
    genreFilter.innerHTML = '<option value="">Все жанры</option>';
    
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function updateStats() {
    const totalAnime = currentFilteredAnime.length;
    const uniqueGenres = new Set();
    const totalEpisodes = currentFilteredAnime.reduce((sum, anime) => sum + (anime.episodes || 0), 0);
    
    currentFilteredAnime.forEach(anime => {
        anime.genres.forEach(genre => uniqueGenres.add(genre));
    });
    
    document.getElementById('totalAnime').textContent = totalAnime;
    document.getElementById('uniqueGenres').textContent = uniqueGenres.size;
    document.getElementById('totalEpisodes').textContent = totalEpisodes;
    
    // УБРАНО ОБНОВЛЕНИЕ ВРЕМЕНИ:
    // const now = new Date();
    // const lastUpdateEl = document.getElementById('lastUpdate');
    // if (lastUpdateEl) {
    //     lastUpdateEl.textContent = 
    //         `${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}`;
    // }
}

function getTypeBadge(type) {
    const badges = {
        'tv': 'TV Сериал',
        'movie': 'Фильм',
        'ova': 'OVA',
        'ona': 'ONA',
        'special': 'Special'
    };
    
    return badges[type] || type;
}

function getTypeIcon(type) {
    const icons = {
        'tv': 'fas fa-tv',
        'movie': 'fas fa-video',
        'ova': 'fas fa-compact-disc',
        'ona': 'fas fa-globe',
        'special': 'fas fa-star'
    };
    
    return icons[type] || 'fas fa-film';
}

function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.dataset.id = anime.id;
    card.dataset.type = anime.type;
    
    const hasLink = anime.link && anime.link.trim() !== '';
    const hasImage = anime.image && anime.image.trim() !== '';
    
    let previewHTML = '';
    if (hasImage) {
        previewHTML = `
            <div class="anime-preview">
                <img src="${anime.image}" alt="${anime.title}" class="anime-preview-img">
                <span class="anime-type-badge">${getTypeBadge(anime.type)}</span>
            </div>
        `;
    } else {
        previewHTML = `
            <div class="anime-preview">
                <div class="preview-placeholder">
                    <div>
                        <i class="${getTypeIcon(anime.type)}"></i>
                        <p>${getTypeBadge(anime.type)}</p>
                    </div>
                </div>
                <span class="anime-type-badge">${getTypeBadge(anime.type)}</span>
            </div>
        `;
    }
    
    let titleHTML = '';
    if (hasLink) {
        titleHTML = `
            <a href="${anime.link}" target="_blank" class="anime-title-link">
                ${anime.title} <i class="fas fa-external-link-alt link-icon"></i>
            </a>
        `;
    } else {
        titleHTML = `<h3 class="anime-title">${anime.title}</h3>`;
    }
    
    card.innerHTML = `
        ${previewHTML}
        <div class="anime-header">
            ${titleHTML}
            ${anime.originalTitle ? `<p class="original-title">${anime.originalTitle}</p>` : ''}
        </div>
        <div class="anime-content">
            <p class="anime-description">${anime.description}</p>
            
            <div class="details-grid">
                <div class="detail-item">
                    <span class="detail-label">Год</span>
                    <span class="detail-value">${anime.year}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Эпизоды</span>
                    <span class="detail-value">${anime.episodes}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Студия</span>
                    <span class="detail-value">${anime.studio}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Тип</span>
                    <span class="detail-value">${getTypeBadge(anime.type)}</span>
                </div>
            </div>
            
            <div class="genres">
                ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
            </div>
            
            <div class="voice-actors">
                <h4 class="voice-title"><i class="fas fa-microphone"></i> Актёры озвучки:</h4>
                <div class="actors-list">
                    ${anime.voiceActors.map(actor => `<span class="actor-tag">${actor}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function renderAnimeGrid() {
    const grid = document.getElementById('animeGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (currentFilteredAnime.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3><i class="fas fa-search"></i> Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или выберите другую вкладку/жанр</p>
            </div>
        `;
        return;
    }
    
    currentFilteredAnime.forEach(anime => {
        grid.appendChild(createAnimeCard(anime));
    });
}

function applyCurrentFilters() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    
    let filtered = animeDatabase;
    
    if (currentTab !== 'all') {
        filtered = filtered.filter(anime => anime.type === currentTab);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(anime => 
            anime.title.toLowerCase().includes(searchTerm) ||
            (anime.originalTitle && anime.originalTitle.toLowerCase().includes(searchTerm)) ||
            anime.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (selectedGenre) {
        filtered = filtered.filter(anime => anime.genres.includes(selectedGenre));
    }
    
    currentFilteredAnime = filtered;
    renderAnimeGrid();
    updateStats();
}

// ==============================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ==============================

let backgroundManager = null;

function initApp() {
    console.log('Инициализация приложения...');
    
    backgroundManager = new BackgroundManager();
    window.backgroundManager = backgroundManager;
    
    setupTabs();
    populateGenreFilter();
    applyCurrentFilters();
    setupAppEventListeners();
    
    console.log('✅ Приложение инициализировано');
}

function setupAppEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => applyCurrentFilters());
    }
    
    if (genreFilter) {
        genreFilter.addEventListener('change', () => applyCurrentFilters());
    }
    
    const checkDataButton = document.querySelector('.action-button');
    if (checkDataButton) {
        checkDataButton.addEventListener('click', validateDatabase);
    }
}

document.addEventListener('DOMContentLoaded', initApp);

// ==============================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==============================

function validateDatabase() {
    const requiredFields = ['title', 'description', 'year', 'studio', 'type'];
    const errors = [];
    const validTypes = ['tv', 'movie', 'ova', 'ona', 'special'];
    
    animeDatabase.forEach((anime, index) => {
        requiredFields.forEach(field => {
            if (!anime[field]) {
                errors.push(`Запись #${index + 1} (ID: ${anime.id}): отсутствует поле "${field}"`);
            }
        });
        
        if (typeof anime.year !== 'number') {
            errors.push(`Запись #${index + 1}: год должен быть числом`);
        }
        
        if (!Array.isArray(anime.genres) || anime.genres.length === 0) {
            errors.push(`Запись #${index + 1}: должен быть хотя бы один жанр`);
        }
        
        if (!Array.isArray(anime.voiceActors) || anime.voiceActors.length === 0) {
            errors.push(`Запись #${index + 1}: должен быть хотя бы один актёр озвучки`);
        }
        
        if (!validTypes.includes(anime.type)) {
            errors.push(`Запись #${index + 1}: некорректный тип аниме "${anime.type}". Допустимые: tv, movie, ova, ona, special`);
        }
        
        if (anime.link && anime.link.trim() !== '') {
            try {
                new URL(anime.link);
            } catch (e) {
                errors.push(`Запись #${index + 1}: некорректная ссылка в поле link`);
            }
        }
        
        if (anime.image && anime.image.trim() !== '') {
            try {
                new URL(anime.image);
            } catch (e) {
                errors.push(`Запись #${index + 1}: некорректный URL изображения в поле image`);
            }
        }
    });
    
    if (errors.length === 0) {
        alert('✅ Все данные корректны!');
        console.log('✅ Структура данных валидна');
        return true;
    } else {
        alert('❌ Обнаружены ошибки в данных. Проверьте консоль.');
        console.error('❌ Ошибки в данных:', errors);
        return false;
    }
}

function getNextId() {
    return animeDatabase.length > 0 
        ? Math.max(...animeDatabase.map(item => item.id)) + 1 
        : 1;
}

function addLinkToAnime(animeId, url) {
    const anime = animeDatabase.find(a => a.id === animeId);
    if (!anime) {
        console.error(`Аниме с ID ${animeId} не найдено`);
        return false;
    }
    
    try {
        if (url && url.trim() !== '') {
            new URL(url);
        }
        
        anime.link = url;
        applyCurrentFilters();
        console.log(`✅ Ссылка добавлена к аниме "${anime.title}"`);
        return true;
    } catch (e) {
        console.error(`❌ Некорректная ссылка: ${url}`);
        return false;
    }
}

function addImageToAnime(animeId, imageUrl) {
    const anime = animeDatabase.find(a => a.id === animeId);
    if (!anime) {
        console.error(`Аниме с ID ${animeId} не найдено`);
        return false;
    }
    
    try {
        if (imageUrl && imageUrl.trim() !== '') {
            new URL(imageUrl);
        }
        
        anime.image = imageUrl;
        applyCurrentFilters();
        console.log(`✅ Изображение добавлено к аниме "${anime.title}"`);
        return true;
    } catch (e) {
        console.error(`❌ Некорректный URL изображения: ${imageUrl}`);
        return false;
    }
}

setTimeout(() => {
    console.log('Проверка целостности данных...');
    validateDatabase();
}, 2000);
