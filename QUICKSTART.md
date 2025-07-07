# 🚀 Быстрый старт - Rive OBS Plugin

## Шаг 1: Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить сервер разработки
npm run dev
```

Сервер будет доступен по адресу: `http://localhost:3000`

## Шаг 2: Добавление анимации

1. Поместите ваш `.riv` файл в папку `public/animations/`
2. Отредактируйте `app/page.tsx` и замените путь:
   ```tsx
   src: '/animations/your-animation.riv'
   ```

## Шаг 3: Настройка OBS

1. Добавьте новый источник → **Browser Source**
2. Настройки:
   - **URL**: `http://localhost:3000`
   - **Ширина**: 1920
   - **Высота**: 1080
   - **Обновлять браузер**: включить
   - **Закрыть источник**: выключить

## Шаг 4: Тестирование

1. Откройте браузер на `http://localhost:3000`
2. Используйте кнопки для управления анимацией
3. Проверьте отображение в OBS

## 🔧 Дополнительные настройки

### Прозрачный фон

Добавьте в `app/globals.css`:

```css
body {
  background: transparent !important;
}
```

### Полноэкранная анимация

В `app/page.tsx` измените размеры:

```tsx
<div className="w-screen h-screen">
  <RiveComponent />
</div>
```

### Горячие клавиши

Добавьте обработчики клавиш:

```tsx
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    switch(e.key) {
      case '1': setAnimationState('idle'); break;
      case '2': setAnimationState('active'); break;
      case '3': setAnimationState('hover'); break;
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## 📝 Перенос файлов из workspace агента

### Метод 1: Ручное копирование

1. Откройте workspace агента
2. Скопируйте содержимое нужных файлов
3. Вставьте в соответствующие файлы этого проекта

### Метод 2: Drag & Drop

1. Откройте проводник/файловый менеджер
2. Найдите папку с проектом агента
3. Перетащите файлы в соответствующие папки

### Метод 3: Терминал

```bash
# Найти workspace агента
find ~ -name "package.json" -path "*/workspace*" -exec dirname {} \;

# Скопировать файлы
cp /path/to/agent/workspace/app/* ./app/
cp /path/to/agent/workspace/public/* ./public/
```

## 🎯 Полезные советы

- Всегда проверяйте консоль браузера на ошибки
- Используйте **Inspect Element** для отладки
- Перезапустите сервер после изменения конфигурации
- Обновите Browser Source в OBS после изменений

## 📞 Поддержка

Если что-то не работает:
1. Проверьте консоль браузера
2. Убедитесь, что сервер запущен
3. Проверьте пути к файлам
4. Перезапустите OBS

---

**Готово! Теперь вы можете использовать Rive анимации в OBS! 🎬** 