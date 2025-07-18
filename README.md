# Rive OBS Plugin

Интерактивное приложение для отображения Rive анимаций в OBS Studio через Browser Source с поддержкой drag & drop загрузки и внешних URL.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
riveObsPlugin/
├── app/
│   ├── components/
│   │   └── RiveFileUploader.tsx  # Компонент загрузки файлов
│   ├── api/
│   │   ├── animation/route.ts    # API для управления анимациями
│   │   ├── upload/route.ts       # API для загрузки файлов
│   │   └── files/route.ts        # API для списка файлов
│   ├── obs/page.tsx             # Страница только для OBS
│   ├── globals.css              # Глобальные стили
│   ├── layout.tsx               # Основной layout
│   ├── page.tsx                 # Главная страница
│   └── registry.tsx             # Компоненты для Rive
├── public/
│   └── animations/              # Место для .riv файлов
└── ...
```

## 🎨 Использование с Rive

### Основные возможности

1. **Прозрачный фон**: Анимации автоматически воспроизводятся с прозрачным фоном
2. **Автоматическое воспроизведение**: Анимация начинается сразу после загрузки
3. **Drag & Drop**: Перетащите .riv файл в область загрузки
4. **URL загрузка**: Вставьте URL на .riv файл для загрузки из интернета
5. **OBS интеграция**: Специальная страница для OBS с полностью прозрачным фоном

### Настройка OBS Studio

1. Добавьте Browser Source в OBS Studio
2. Для основной страницы используйте: `http://localhost:3000` (или актуальный порт)
3. **Для OBS используйте**: `http://localhost:3000/obs` (или актуальный порт)
   - Полностью прозрачный фон
   - Без шапки и подвала
   - Анимация по центру экрана
   - Автоматическое воспроизведение
4. Рекомендуемые настройки:
   - Width: 1920
   - Height: 1080
   - FPS: 60 (для плавной анимации)
   - CSS: `body { background: transparent !important; }`

### Прозрачность и центрирование
- Страница `/obs` имеет собственный layout без UI элементов
- Анимация автоматически центрируется по экрану
- Полностью прозрачный фон для идеального наложения в OBS
- Автоматическое воспроизведение анимации

### 1. Подготовка анимации

**Способ 1: Drag & Drop**
- Перетащите .riv файл прямо в область загрузки
- Файл автоматически сохранится в `public/animations/`

**Способ 2: URL загрузка**
- Вставьте ссылку на .riv файл в поле URL
- Поддерживаются внешние ссылки (CDN, облачные хранилища)

**Способ 3: Ручная загрузка**
- Поместите .riv файл в папку `public/animations/`
- Выберите файл из списка доступных

### 2. Подключение к OBS

**Вариант 1: Полная страница с управлением**
- URL: `http://localhost:3000`
- Включает элементы управления

**Вариант 2: Только анимация** ⭐ Рекомендуется
- URL: `http://localhost:3000/obs`
- Полноэкранная анимация без элементов управления
- Поддержка горячих клавиш (1, 2, 3)

**Настройки Browser Source:**
- Размеры: 1920x1080 (или по необходимости)
- Обновлять браузер: ✅ включить
- Закрыть источник: ❌ выключить

### 3. Управление анимацией

**Через веб-интерфейс:**
- Используйте кнопки на главной странице
- Состояния синхронизируются между всеми страницами

**Горячие клавиши** (работают на `/obs` странице):
- `1` - Idle состояние
- `2` - Active состояние  
- `3` - Hover состояние

**Через API:**
```bash
# Получить текущее состояние
curl http://localhost:3000/api/animation

# Установить состояние
curl -X POST http://localhost:3000/api/animation \
  -H "Content-Type: application/json" \
  -d '{"state": "active"}'
```

## 🔧 Новые возможности

### Загрузка файлов

- **Drag & Drop**: Перетащите .riv файлы прямо в браузер
- **URL загрузка**: Поддержка внешних ссылок на .riv файлы
- **Автоматическое сканирование**: Список локальных файлов обновляется автоматически

### Синхронизация состояний

- Изменения на главной странице передаются в OBS
- API для внешнего управления
- Сохранение состояния между перезагрузками

### OBS оптимизация

- Отдельная страница `/obs` без лишних элементов
- Полноэкранный режим
- Минимальные ресурсы
- Горячие клавиши для быстрого переключения

## 📦 Команды

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run start` - Запуск продакшен сервера
- `npm run lint` - Проверка кода ESLint

## 🎯 Как перенести файлы из другого workspace

### Способ 1: Копирование через интерфейс

1. Откройте workspace агента
2. Выделите нужный код (Cmd+A)
3. Скопируйте (Cmd+C)
4. Переключитесь в этот workspace
5. Вставьте код в соответствующий файл (Cmd+V)

### Способ 2: Через файловую систему

```bash
# Из папки с проектом агента
cp -r * /path/to/riveObsPlugin/

# Или для конкретных файлов
cp app/page.tsx /path/to/riveObsPlugin/app/
cp next.config.js /path/to/riveObsPlugin/
```

### Способ 3: Drag & Drop (NEW!)

Теперь вы можете просто перетащить .riv файлы из workspace агента прямо в веб-интерфейс!

## 🛠️ Troubleshooting

### Анимация не загружается

1. **Проверьте консоль браузера** на ошибки
2. **Убедитесь, что файл существует:**
   ```bash
   ls -la public/animations/
   ```
3. **Попробуйте перезагрузить страницу**
4. **Проверьте формат файла** (.riv)

### Drag & Drop не работает

1. Убедитесь, что файл имеет расширение `.riv`
2. Проверьте размер файла (лимит ~50MB)
3. Попробуйте использовать URL загрузку

### OBS не показывает анимацию

1. **Проверьте URL**: используйте `/obs` для лучшей производительности
2. **Обновите Browser Source** в OBS
3. **Проверьте размеры**: установите правильные размеры источника
4. **Перезапустите сервер** если необходимо

### Состояния не синхронизируются

1. Проверьте API: `curl http://localhost:3000/api/animation`
2. Откройте консоль браузера для отладки
3. Убедитесь, что обе страницы открыты

## 🎮 Интеграция с внешними системами

### Stream Deck

Используйте HTTP запросы для переключения состояний:

```
POST http://localhost:3000/api/animation
Body: {"state": "active"}
```

### WebSocket (будущие версии)

Планируется добавление WebSocket для реального времени.

## 📝 Заметки

- ✅ Next.js 14 с App Router
- ✅ TailwindCSS для стилей  
- ✅ Rive интеграция через `@rive-app/react-canvas`
- ✅ TypeScript поддержка
- ✅ API для внешнего управления
- ✅ Drag & Drop загрузка файлов
- ✅ URL загрузка внешних файлов
- ✅ Оптимизированная страница для OBS
- ✅ Горячие клавиши
- ✅ Синхронизация состояний

## 🤝 Поддержка

Если у вас есть вопросы или проблемы:
1. Проверьте раздел Troubleshooting
2. Откройте консоль браузера для отладки
3. Создайте issue в репозитории

---

**Создано с помощью Cursor AI Agent** 🤖

### Changelog

**v2.0.0** (Current)
- ✅ Добавлена поддержка drag & drop
- ✅ Загрузка по URL  
- ✅ Отдельная OBS страница
- ✅ API для управления состояниями
- ✅ Горячие клавиши
- ✅ Синхронизация между страницами

**v1.0.0**
- Базовая функциональность Rive + OBS
