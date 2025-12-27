// ==============================
// СИСТЕМА УПРАВЛЕНИЯ ФОНОМ
// ==============================

class BackgroundManager {
    constructor() {
        this.currentBackground = this.getSavedBackground();
        this.selectedImage = null;
        this.init();
    }

    // Получение сохранённого фона из localStorage
    getSavedBackground() {
        const saved = localStorage.getItem('okaneBackground');
        if (!saved) return null;
        
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Ошибка загрузки фона:', e);
            return null;
        }
    }

    // Сохранение фона в localStorage
    saveBackground(type, value, name) {
        const background = { type, value, name, timestamp: new Date().toISOString() };
        localStorage.setItem('okaneBackground', JSON.stringify(background));
        this.currentBackground = background;
    }

    // Применение фона
    applyBackground(type, value) {
        const body = document.body;
        
        switch(type) {
            case 'gradient':
                body.style.background = value;
                body.style.backgroundImage = 'none';
                break;
                
            case 'color':
                body.style.background = value;
                body.style.backgroundImage = 'none';
                break;
                
            case 'image':
                body.style.backgroundImage = `url('${value}')`;
                body.style.backgroundSize = 'cover';
                body.style.backgroundPosition = 'center';
                body.style.backgroundAttachment = 'fixed';
                body.style.background = 'none';
                break;
                
            default:
                // Стандартный градиент
                body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                body.style.backgroundImage = 'none';
        }
    }

    // Инициализация
    init() {
        // Применяем сохранённый фон при загрузке
        if (this.currentBackground) {
            this.applyBackground(
                this.currentBackground.type, 
                this.currentBackground.value
            );
            this.updateCurrentBgName(this.currentBackground.name);
        }
        
        this.setupEventListeners();
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Кнопка открытия/закрытия панели
        document.getElementById('settingsButton').addEventListener('click', () => {
            document.getElementById('settingsPanel').classList.toggle('active');
        });

        document.getElementById('closeSettings').addEventListener('click', () => {
            document.getElementById('settingsPanel').classList.remove('active');
        });

        // Закрытие при клике вне панели
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('settingsPanel');
            const button = document.getElementById('settingsButton');
            
            if (panel.classList.contains('active') && 
                !panel.contains(e.target) && 
                !button.contains(e.target)) {
                panel.classList.remove('active');
            }
        });

        // Предустановленные градиенты
        document.querySelectorAll('.bg-option[data-bg^="gradient"]').forEach(option => {
            option.addEventListener('click', () => {
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
                    gradient1: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    gradient2: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                    gradient3: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
                    gradient4: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    gradient5: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    gradient6: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)'
                };
                
                this.applyBackground('gradient', gradients[bgId]);
                this.saveBackground('gradient', gradients[bgId], `Градиент: ${bgName}`);
                this.updateCurrentBgName(`Градиент: ${bgName}`);
            });
        });

        // Сплошные цвета
        document.querySelectorAll('.bg-option[data-bg^="color"]').forEach(option => {
            option.addEventListener('click', () => {
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
        
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите файл изображения');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) { // 5MB
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

        // Применение изображения
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

        // Выбор цвета из палитры
        document.getElementById('applyColor').addEventListener('click', () => {
            const color = document.getElementById('colorPicker').value;
            
            this.applyBackground('color', color);
            this.saveBackground('color', color, `Выбранный цвет: ${color}`);
            this.updateCurrentBgName(`Выбранный цвет: ${color}`);
            
            // Деактивируем другие варианты
            document.querySelectorAll('.bg-option').forEach(opt => {
                opt.classList.remove('active');
            });
        });

        // Сброс фона
        document.getElementById('resetBackground').addEventListener('click', () => {
            this.applyBackground('default', '');
            localStorage.removeItem('okaneBackground');
            this.currentBackground = null;
            this.updateCurrentBgName('Стандартный');
            
            // Деактивируем все варианты
            document.querySelectorAll('.bg-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Сбрасываем превью изображения
            document.getElementById('imagePreview').innerHTML = '<p>Изображение не выбрано</p>';
            document.getElementById('imageUpload').value = '';
            this.selectedImage = null;
            applyImageButton.disabled = true;
        });
    }

    // Обновление информации о текущем фоне
    updateCurrentBgName(name) {
        document.getElementById('currentBgName').textContent = name;
    }
}

// ==============================
// БАЗА ДАННЫХ АНИМЕ
// Добавлено поле link для ссылок в названиях
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
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
        link: "" // <-- ПУСТАЯ СТРОКА ДЛЯ ССЫЛКИ
    }
];

// ==============================
// ФУНКЦИИ РЕНДЕРИНГА
// Обновлено для поддержки ссылок в названиях
// ==============================

// Получение всех уникальных жанров
function getAllGenres() {
    const genres = new Set();
    animeDatabase.forEach(anime => {
        anime.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
}

// Заполнение фильтра жанров
function populateGenreFilter() {
    const genreFilter = document.getElementById('genreFilter');
    const genres = getAllGenres();
    
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Обновление статистики
function updateStats() {
    const totalAnime = animeDatabase.length;
    const uniqueGenres = getAllGenres().length;
    const totalEpisodes = animeDatabase.reduce((sum, anime) => sum + (anime.episodes || 0), 0);
    
    document.getElementById('totalAnime').textContent = totalAnime;
    document.getElementById('uniqueGenres').textContent = uniqueGenres;
    document.getElementById('totalEpisodes').textContent = totalEpisodes;
    
    // Дата последнего обновления
    const now = new Date();
    document.getElementById('lastUpdate').textContent = 
        `${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}`;
}

// Создание карточки аниме (с поддержкой ссылок)
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.dataset.id = anime.id;
    
    // Проверяем, есть ли ссылка
    const hasLink = anime.link && anime.link.trim() !== '';
    
    // Формируем HTML для названия
    let titleHTML = '';
    if (hasLink) {
        // Если есть ссылка - делаем кликабельную ссылку
        titleHTML = `
            <a href="${anime.link}" target="_blank" class="anime-title-link">
                ${anime.title} <i class="fas fa-external-link-alt link-icon"></i>
            </a>
        `;
    } else {
        // Если нет ссылки - обычный заголовок
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
                <h4 class="voice-title">Актёры озвучки:</h4>
                <div class="actors-list">
                    ${anime.voiceActors.map(actor => `<span class="actor-tag">${actor}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Рендеринг всех аниме
function renderAnimeGrid(filteredAnime = animeDatabase) {
    const grid = document.getElementById('animeGrid');
    grid.innerHTML = '';
    
    if (filteredAnime.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или выберите другой жанр</p>
            </div>
        `;
        return;
    }
    
    filteredAnime.forEach(anime => {
        grid.appendChild(createAnimeCard(anime));
    });
}

// Фильтрация аниме
function filterAnime() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedGenre = document.getElementById('genreFilter').value;
    
    const filtered = animeDatabase.filter(anime => {
        const matchesSearch = 
            anime.title.toLowerCase().includes(searchTerm) ||
            (anime.originalTitle && anime.originalTitle.toLowerCase().includes(searchTerm)) ||
            anime.description.toLowerCase().includes(searchTerm);
        
        const matchesGenre = !selectedGenre || anime.genres.includes(selectedGenre);
        
        return matchesSearch && matchesGenre;
    });
    
    renderAnimeGrid(filtered);
    
    // Обновляем статистику с учётом фильтров
    document.getElementById('totalAnime').textContent = filtered.length;
}

// ==============================
// ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// ==============================

function initApp() {
    // Инициализация менеджера фона
    window.backgroundManager = new BackgroundManager();
    
    // Заполняем фильтр жанров
    populateGenreFilter();
    
    // Обновляем статистику
    updateStats();
    
    // Рендерим все аниме
    renderAnimeGrid();
    
    // Настраиваем обработчики событий
    document.getElementById('searchInput').addEventListener('input', filterAnime);
    document.getElementById('genreFilter').addEventListener('change', filterAnime);
    
    // Сохраняем в localStorage для целостности (если нужно)
    localStorage.setItem('animeDatabase', JSON.stringify(animeDatabase));
    
    console.log('✅ Каталог аниме инициализирован. Всего записей:', animeDatabase.length);
    console.log('📝 Для изменения данных редактируйте массив animeDatabase в файле script.js');
    console.log('🔗 Чтобы добавить ссылку, заполните поле "link" в объекте аниме');
}

// Запуск приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);

// ==============================
// ДОБАВЛЕННЫЕ СТИЛИ ДЛЯ ССЫЛОК В CSS
// ==============================

// Добавьте эти стили в конец файла styles.css

const linkStyles = `
.anime-title-link {
    color: #4cc9f0;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
    border-bottom: 2px solid transparent;
    margin-bottom: 8px;
    line-height: 1.3;
}

.anime-title-link:hover {
    color: #f72585;
    border-bottom-color: #f72585;
    transform: translateY(-2px);
}

.anime-title-link:active {
    transform: translateY(0);
}

.link-icon {
    font-size: 0.9rem;
    margin-left: 5px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.anime-title-link:hover .link-icon {
    opacity: 1;
}

.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    background: rgba(30, 41, 59, 0.7);
    border-radius: 18px;
    border: 2px dashed #334155;
}

.no-results h3 {
    color: #f8fafc;
    margin-bottom: 15px;
    font-size: 1.8rem;
}

.no-results p {
    color: #94a3b8;
    font-size: 1.1rem;
}
`;

// Вставка стилей в страницу
document.addEventListener('DOMContentLoaded', function() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = linkStyles;
    document.head.appendChild(styleSheet);
});

// ==============================
// ФУНКЦИИ ДЛЯ РАЗРАБОТЧИКОВ
// ==============================

// Экспорт данных в JSON (для скачивания)
function exportDatabase() {
    const dataStr = JSON.stringify(animeDatabase, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `okane-anime-database-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Импорт данных из JSON (осторожно - перезаписывает!)
function importDatabase(jsonData) {
    try {
        const newData = JSON.parse(jsonData);
        if (Array.isArray(newData)) {
            // В реальном приложении здесь была бы проверка структуры
            animeDatabase.length = 0;
            animeDatabase.push(...newData);
            
            // Перерисовываем интерфейс
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

// Автогенерация ID для новых записей
function getNextId() {
    return animeDatabase.length > 0 
        ? Math.max(...animeDatabase.map(item => item.id)) + 1 
        : 1;
}

// Проверка целостности данных (обновлена для ссылок)
function validateDatabase() {
    const requiredFields = ['title', 'description', 'year', 'studio'];
    const errors = [];
    
    animeDatabase.forEach((anime, index) => {
        // Проверка обязательных полей
        requiredFields.forEach(field => {
            if (!anime[field]) {
                errors.push(`Запись #${index + 1} (ID: ${anime.id}): отсутствует поле "${field}"`);
            }
        });
        
        // Проверка типов данных
        if (typeof anime.year !== 'number') {
            errors.push(`Запись #${index + 1}: год должен быть числом`);
        }
        
        if (!Array.isArray(anime.genres) || anime.genres.length === 0) {
            errors.push(`Запись #${index + 1}: должен быть хотя бы один жанр`);
        }
        
        if (!Array.isArray(anime.voiceActors) || anime.voiceActors.length === 0) {
            errors.push(`Запись #${index + 1}: должен быть хотя бы один актёр озвучки`);
        }
        
        // Проверка ссылки (если есть)
        if (anime.link && anime.link.trim() !== '') {
            try {
                new URL(anime.link);
            } catch (e) {
                errors.push(`Запись #${index + 1}: некорректная ссылка в поле link`);
            }
        }
    });
    
    if (errors.length === 0) {
        console.log('✅ Структура данных валидна');
        return true;
    } else {
        console.error('❌ Обнаружены ошибки в данных:', errors);
        return false;
    }
}

// Функция для добавления ссылки к существующему аниме
function addLinkToAnime(animeId, url) {
    const anime = animeDatabase.find(a => a.id === animeId);
    if (!anime) {
        console.error(`Аниме с ID ${animeId} не найдено`);
        return false;
    }
    
    try {
        // Проверяем, валидна ли ссылка
        if (url && url.trim() !== '') {
            new URL(url);
        }
        
        anime.link = url;
        renderAnimeGrid(); // Перерисовываем сетку
        console.log(`✅ Ссылка добавлена к аниме "${anime.title}"`);
        return true;
    } catch (e) {
        console.error(`❌ Некорректная ссылка: ${url}`);
        return false;
    }
}

// Пример использования функции addLinkToAnime:
// addLinkToAnime(1, "https://example.com/anime/sora-no-tabi");

// Выполняем валидацию при запуске
setTimeout(validateDatabase, 1000);
