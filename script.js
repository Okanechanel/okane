// ==============================
// СИСТЕМА УПРАВЛЕНИЯ ФОНОМ (ИСПРАВЛЕННАЯ)
// ==============================

class BackgroundManager {
    constructor() {
        this.currentBackground = null;
        this.selectedImage = null;
        this.init();
    }

    // Получение сохранённого фона из localStorage
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

    // Сохранение фона в localStorage
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

    // Применение фона (ИСПРАВЛЕННАЯ ФУНКЦИЯ)
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
                    // Стандартный градиент (розово-фиолетовый)
                    body.style.backgroundImage = 'none';
                    body.style.background = 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)';
            }
            
            console.log('Фон применён:', type);
        } catch (e) {
            console.error('Ошибка применения фона:', e);
        }
    }

    // Инициализация (ИСПРАВЛЕНА ПОСЛЕДОВАТЕЛЬНОСТЬ)
    init() {
        // Сначала получаем сохранённый фон
        this.currentBackground = this.getSavedBackground();
        
        // ПРИМЕНЯЕМ фон ДО настройки обработчиков
        if (this.currentBackground) {
            console.log('Загружен сохранённый фон:', this.currentBackground);
            this.applyBackground(
                this.currentBackground.type, 
                this.currentBackground.value
            );
            this.updateCurrentBgName(this.currentBackground.name);
        } else {
            // Применяем стандартный фон
            this.applyBackground('default', '');
            this.updateCurrentBgName('Стандартный');
        }
        
        // Теперь настраиваем обработчики
        this.setupEventListeners();
    }

    // Настройка обработчиков событий (ИСПРАВЛЕНА)
    setupEventListeners() {
        console.log('Настройка обработчиков фона...');
        
        // Кнопка открытия/закрытия панели
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

        // Закрытие при клике вне панели
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
                
                // Убираем активный класс у всех
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Добавляем активный класс выбранному
                option.classList.add('active');
                
                const bgId = option.dataset.bg;
                const bgName = option.querySelector('span').textContent;
                
                // Определяем градиент по ID
                const gradients = {
                    gradient1: 'linear-gradient(135deg, #ff6bcb 0%, #8b5cf6 100%)',
                    gradient2: 'linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)',
                    gradient3: 'linear-gradient(135deg, #f472b6 0%, #d946ef 50%, #a855f7 100%)',
                    gradient4: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 100%)',
                    gradient5: 'linear-gradient(135deg, #be185d 0%, #7e22ce 100%)',
                    gradient6: 'linear-gradient(135deg, #fda4af 0%, #c084fc 100%)'
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
                
                // Деактивируем другие варианты
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
                
                // Деактивируем другие варианты
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
                
                // Деактивируем все варианты
                document.querySelectorAll('.bg-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Сбрасываем превью изображения
                if (imagePreview) {
                    imagePreview.innerHTML = '<p>Изображение не выбрано</p>';
                }
                if (imageUpload) {
                    imageUpload.value = '';
                }
                if (applyImageButton) {
                    applyImageButton.disabled = true;
                }
                
                console.log('Фон сброшен к стандартному');
            });
        }

        // Кнопка экспорта данных
        const exportButton = document.getElementById('exportData');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                exportDatabase();
            });
        }
        
        console.log('Обработчики фона настроены');
    }

    // Обновление информации о текущем фоне
    updateCurrentBgName(name) {
        const element = document.getElementById('currentBgName');
        if (element) {
            element.textContent = name;
        }
    }
}

// ==============================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// (УПРОЩЕННАЯ И ИСПРАВЛЕННАЯ)
// ==============================

// Глобальная переменная для менеджера фонов
let backgroundManager = null;

// Основная функция инициализации
function initApp() {
    console.log('Инициализация приложения...');
    
    // 1. Сначала инициализируем менеджер фонов
    backgroundManager = new BackgroundManager();
    window.backgroundManager = backgroundManager;
    
    // 2. Затем заполняем фильтр жанров
    populateGenreFilter();
    
    // 3. Обновляем статистику
    updateStats();
    
    // 4. Рендерим все аниме
    renderAnimeGrid();
    
    // 5. Настраиваем обработчики событий
    setupAppEventListeners();
    
    console.log('✅ Приложение инициализировано');
}

// Настройка обработчиков событий приложения
function setupAppEventListeners() {
    // Поиск и фильтрация
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterAnime);
    }
    
    if (genreFilter) {
        genreFilter.addEventListener('change', filterAnime);
    }
}

// Запуск приложения при полной загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);

// ==============================
// БАЗА ДАННЫХ АНИМЕ (с примерами ссылок)
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
        link: "https://shikimori.one/animes" // Пример ссылки
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
        link: "" // Пустая строка для ссылки
    },
    {
        id: 3,
        title: "Механика звёзд",
        originalTitle: "Hoshi no Kikaika",
        description: "В далёком будущем человечество обнаруживает, что звёзды являются гигантскими механическими конструкциями, созданными неизвестной цивилизацией.",
        year: 2024,
        episodes: 26,
        studio: "Trigger",
        voiceActors: ["Сергей Иванов", "Мария Ковалёва", "Алексей Смирнов"],
        genres: ["Фантастика", "Меха", "Приключения"],
        link: "" // Пустая строка для ссылки
    },
    {
        id: 4,
        title: "Кафе забытых воспоминаний",
        originalTitle: "Wasureta Kioku no Cafe",
        description: "В маленьком токийском кафе посетители могут заказать не только кофе, но и временный доступ к воспоминаниям других людей.",
        year: 2021,
        episodes: 12,
        studio: "Kyoto Animation",
        voiceActors: ["Екатерина Волкова", "Артём Белов", "Надежда Соколова"],
        genres: ["Повседневность", "Драма", "Мистика"],
        link: "" // Пустая строка для ссылки
    },
    {
        id: 5,
        title: "Алый алхимик",
        originalTitle: "Scarlet Alchemist",
        description: "В мире, где алхимия подчиняется строгим законам равнозначного обмена, юный гений ищет философский камень, чтобы воскресить погибших родителей.",
        year: 2023,
        episodes: 22,
        studio: "Bones",
        voiceActors: ["Александр Новиков", "Юлия Лебедева", "Павел Громов", "Ирина Ветрова"],
        genres: ["Фэнтези", "Боевик", "Драма"],
        link: "" // Пустая строка для ссылки
    },
    {
        id: 6,
        title: "Ритм океана",
        originalTitle: "Umi no Rhythm",
        description: "Группа школьников создаёт музыкальный коллектив, вдохновляясь звуками океана. Их цель — выиграть национальный конкурс молодых исполнителей.",
        year: 2022,
        episodes: 18,
        studio: "P.A. Works",
        voiceActors: ["Светлана Кузнецова", "Денис Попов", "Анна Медведева", "Максим Орлов"],
        genres: ["Музыкальный", "Школа", "Драма"],
        link: "" // Пустая строка для ссылки
    }
];

// ==============================
// ФУНКЦИИ РЕНДЕРИНГА (без изменений)
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
    const totalAnime = animeDatabase.length;
    const uniqueGenres = getAllGenres().length;
    const totalEpisodes = animeDatabase.reduce((sum, anime) => sum + (anime.episodes || 0), 0);
    
    const totalAnimeEl = document.getElementById('totalAnime');
    const uniqueGenresEl = document.getElementById('uniqueGenres');
    const totalEpisodesEl = document.getElementById('totalEpisodes');
    
    if (totalAnimeEl) totalAnimeEl.textContent = totalAnime;
    if (uniqueGenresEl) uniqueGenresEl.textContent = uniqueGenres;
    if (totalEpisodesEl) totalEpisodesEl.textContent = totalEpisodes;
    
    const now = new Date();
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = 
            `${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}`;
    }
}

function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.dataset.id = anime.id;
    
    const hasLink = anime.link && anime.link.trim() !== '';
    
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
                    <span class="detail-label">ID</span>
                    <span class="detail-value">#${anime.id.toString().padStart(3, '0')}</span>
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

function renderAnimeGrid(filteredAnime = animeDatabase) {
    const grid = document.getElementById('animeGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredAnime.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3><i class="fas fa-search"></i> Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или выберите другой жанр</p>
            </div>
        `;
        return;
    }
    
    filteredAnime.forEach(anime => {
        grid.appendChild(createAnimeCard(anime));
    });
}

function filterAnime() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    
    const filtered = animeDatabase.filter(anime => {
        const matchesSearch = 
            anime.title.toLowerCase().includes(searchTerm) ||
            (anime.originalTitle && anime.originalTitle.toLowerCase().includes(searchTerm)) ||
            anime.description.toLowerCase().includes(searchTerm);
        
        const matchesGenre = !selectedGenre || anime.genres.includes(selectedGenre);
        
        return matchesSearch && matchesGenre;
    });
    
    renderAnimeGrid(filtered);
    
    const totalAnimeEl = document.getElementById('totalAnime');
    if (totalAnimeEl) {
        totalAnimeEl.textContent = filtered.length;
    }
}

// ==============================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==============================

function exportDatabase() {
    const dataStr = JSON.stringify(animeDatabase, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `okane-anime-database-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function importDatabase(jsonData) {
    try {
        const newData = JSON.parse(jsonData);
        if (Array.isArray(newData)) {
            animeDatabase.length = 0;
            animeDatabase.push(...newData);
            
            populateGenreFilter();
            updateStats();
            renderAnimeGrid();
            
            console.log('✅ Данные успешно импортированы');
            return true;
        }
    } catch (error) {
        console.error('❌ Ошибка импорта:', error);
    }
    return false;
}

function getNextId() {
    return animeDatabase.length > 0 
        ? Math.max(...animeDatabase.map(item => item.id)) + 1 
        : 1;
}

function validateDatabase() {
    const requiredFields = ['title', 'description', 'year', 'studio'];
    const errors = [];
    
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
        
        if (anime.link && anime.link.trim() !== '') {
            try {
                new URL(anime.link);
            } catch (e) {
                errors.push(`Запись #${index + 1}: некорректная ссылка в поле link`);
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
        renderAnimeGrid();
        console.log(`✅ Ссылка добавлена к аниме "${anime.title}"`);
        return true;
    } catch (e) {
        console.error(`❌ Некорректная ссылка: ${url}`);
        return false;
    }
}

// Автоматическая проверка при загрузке
setTimeout(() => {
    console.log('Проверка целостности данных...');
    validateDatabase();
}, 2000);
