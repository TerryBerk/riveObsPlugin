# Rive OBS Plugin

Интерактивное приложение для отображения Rive анимаций в OBS Studio через Browser Source.

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
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Основной layout
│   ├── page.tsx           # Главная страница
│   └── registry.tsx       # Компоненты для Rive
├── public/
│   └── animations/        # Место для .riv файлов
├── lib/                   # Утилиты и хелперы
├── pages/                 # Дополнительные страницы
└── rive-obs-app/          # Специализированные компоненты
```

## 🎨 Использование с Rive

### 1. Подготовка анимации

1. Создайте анимацию в Rive Editor
2. Экспортируйте как `.riv` файл
3. Поместите файл в папку `public/animations/`

### 2. Подключение к OBS

1. Добавьте Browser Source в OBS
2. URL: `http://localhost:3000`
3. Установите нужные размеры (например, 1920x1080)

### 3. Интерактивность

- Используйте кнопки на странице для управления состояниями анимации
- Анимации автоматически реагируют на изменения состояний

## 🔧 Настройка

### Изменение анимации

В файле `app/page.tsx` измените путь к анимации:

```tsx
const { RiveComponent } = useRive({
  src: '/animations/your-animation.riv',  // Ваш файл
  stateMachines: 'State Machine 1',
  autoplay: true,
})
```

### Добавление новых состояний

В `app/registry.tsx` добавьте новые кнопки:

```tsx
<button
  onClick={() => handleStateChange('new-state')}
  className="px-4 py-2 bg-orange-500 text-white rounded"
>
  New State
</button>
```

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

### Способ 3: Через Git

Если проект агента в git:

```bash
git remote add agent-project /path/to/agent/project
git fetch agent-project
git merge agent-project/main
```

## 🛠️ Troubleshooting

### Анимация не загружается

1. Проверьте путь к `.riv` файлу
2. Убедитесь, что файл в папке `public/animations/`
3. Проверьте консоль браузера на ошибки

### Ошибки TypeScript

```bash
# Переустановите зависимости
rm -rf node_modules package-lock.json
npm install
```

### Проблемы с OBS

1. Убедитесь, что сервер запущен (`npm run dev`)
2. Проверьте URL в Browser Source
3. Установите правильные размеры для источника

## 📝 Заметки

- Проект использует Next.js 14 с App Router
- Стили написаны на TailwindCSS
- Rive интеграция через `@rive-app/react-canvas`
- Автоматическая поддержка TypeScript

## 🤝 Поддержка

Если у вас есть вопросы или проблемы, создайте issue в репозитории.

---

**Создано с помощью Cursor AI Agent** 🤖
