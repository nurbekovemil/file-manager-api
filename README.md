# File Manager API

File Manager API — это RESTful API для управления файлами и папками. Реализован с использованием **NestJS** и **TypeScript**.

## Требования
- Node.js 16.x или выше
- npm 7.x или выше
- PostgreSQL

## Установка и запуск

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/nurbekovemil/file-manager-api.git
   cd file-manager-api
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Настройте переменные окружения:
   Создайте файл `.env` в корне проекта и добавьте следующие переменные:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=file_manager
   JWT_SECRET=your_secret_key
   ```

4. Запустите приложение:
   ```bash
   npm run start
   ```

5. Для разработки:
   ```bash
   npm run start:dev
   ```