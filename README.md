# Документація API

Цей документ описує кінцеві точки API для застосунку.

## Базова URL-адреса

Усі кінцеві точки API відносні до базової URL-адреси вашого застосунку.

## Аутентифікація

Аутентифікація потрібна для деяких кінцевих точок, позначених як **[Аутентифіковано]**.
Аутентифікація здійснюється за допомогою аутентифікації **Bearer Token**.

Коли потрібна аутентифікація, вам потрібно включити заголовок у ваш запит:
auth: Bearer <your_token>

Токен отримується після успішної реєстрації або входу через кінцеві точки `/auth`.

## Кінцеві точки

---

### Роутер Auth (`/auth`)

Цей роутер обробляє аутентифікацію та реєстрацію користувачів.

#### 1. Реєстрація користувача

*   **Кінцева точка:** `/auth/register`
*   **Метод:** `POST`
*   **Опис:** Реєструє новий обліковий запис користувача.
*   **Тіло запиту:** `application/json`

    ```json
    {
        "account_type": "shelter" | "volunteer",
        "email": "user@example.com",
        "password": "securePassword"
    }
    ```

    *   `account_type` (рядок, обов'язково): Тип облікового запису для реєстрації. Дозволені значення: `shelter`, `volunteer`.
    *   `email` (рядок, обов'язково): Адреса електронної пошти користувача. Має бути унікальною.
    *   `password` (рядок, обов'язково): Пароль користувача.

*   **Коди відповіді:**

    *   `201 Created`: Обліковий запис успішно зареєстровано. Повертає токен та інформацію про користувача.

        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "account_type": "shelter",
            "email": "user@example.com"
        }
        ```

    *   `409 Conflict`: Електронна пошта вже використовується.

        ```json
        {
            "message": "Email is already in use"
        }
        ```

    *   `500 Internal Server Error`: Не вдалося зареєструвати користувача.

        ```json
        {
            "message": "Failed to register",
            "error": "Детальна інформація про помилку"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X POST \
      http://localhost:3000/auth/register \
      -H 'Content-Type: application/json' \
      -d '{
            "account_type": "shelter",
            "email": "newuser@example.com",
            "password": "password123"
        }'
    ```

#### 2. Вхід користувача

*   **Кінцева точка:** `/auth/login`
*   **Метод:** `POST`
*   **Опис:** Здійснює вхід в існуючий обліковий запис користувача.
*   **Тіло запиту:** `application/json`

    ```json
    {
        "email": "user@example.com",
        "password": "securePassword"
    }
    ```

    *   `email` (рядок, обов'язково): Адреса електронної пошти користувача.
    *   `password` (рядок, обов'язково): Пароль користувача.

*   **Коди відповіді:**

    *   `200 OK`: Вхід успішний. Повертає токен аутентифікації.

        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

    *   `401 Unauthorized`: Недійсні облікові дані (електронна пошта або пароль).

        ```json
        {
            "message": "Email and password are required"
        }
        ```

        ```json
        {
            "message": "Invalid email"
        }
        ```

        ```json
        {
            "message": "Invalid password"
        }
        ```

    *   `500 Internal Server Error`: Не вдалося увійти.

        ```json
        {
            "message": "Failed to log in",
            "error": "Детальна інформація про помилку"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X POST \
      http://localhost:3000/auth/login \
      -H 'Content-Type: application/json' \
      -d '{
            "email": "user@example.com",
            "password": "password123"
        }'
    ```

---

### Роутер Animal (`/animal`)

Цей роутер обробляє операції, пов'язані з тваринами.

#### 1. Додати тварину [Аутентифіковано]

*   **Кінцева точка:** `/animal/add`
*   **Метод:** `POST`
*   **Опис:** Додає нову тварину до притулку. Потрібна аутентифікація як обліковий запис притулку. `shelter_id` автоматично береться з ID аутентифікованого користувача.
*   **Тіло запиту:** `application/json`

    ```json
    {
        "name": "Buddy",
        "specie": "Dog",
        "age": 3
    }
    ```

    *   `name` (рядок, обов'язково): Ім'я тварини.
    *   `specie` (рядок, обов'язково): Вид тварини (наприклад, "Dog", "Cat").
    *   `age` (число, обов'язково): Вік тварини в роках.

*   **Авторизація:** Bearer Token потрібен у заголовку `auth`.
*   **Коди відповіді:**

    *   `201 Created`: Тварину успішно додано. Повертає порожню JSON-відповідь.

        ```json
        {}
        ```

    *   `500 Internal Server Error`: Не вдалося додати тварину.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X POST \
      http://localhost:3000/animal/add \
      -H 'Content-Type: application/json' \
      -H 'auth: Bearer <your_token>' \
      -d '{
            "name": "Buddy",
            "specie": "Dog",
            "age": 3
        }'
    ```

#### 2. Оновити тварину [Аутентифіковано]

*   **Кінцева точка:** `/animal/{id}`
*   **Метод:** `PUT`
*   **Опис:** Оновлює інформацію про існуючу тварину. Потрібна аутентифікація як обліковий запис притулку.
*   **Параметри шляху:**
    *   `id` (ціле число, обов'язково): ID тварини для оновлення.
*   **Тіло запиту:** `application/json` (необов'язкові поля)

    ```json
    {
        "name": "Updated Buddy",
        "specie": "Dog",
        "age": 4
    }
    ```

    *   `name` (рядок, необов'язково): Нове ім'я тварини.
    *   `specie` (рядок, необов'язково): Новий вид тварини.
    *   `age` (число, необов'язково): Новий вік тварини.
    *   **Примітка:** Ви можете оновити одне, декілька або всі ці поля.

*   **Авторизація:** Bearer Token потрібен у заголовку `auth`.
*   **Коди відповіді:**

    *   `200 OK`: Тварину успішно оновлено. Повертає порожню JSON-відповідь.

        ```json
        {}
        ```

    *   `400 Bad Request`: Не надано жодних полів для оновлення.

        ```json
        {
            "error": "No fields to update"
        }
        ```

    *   `404 Not Found`: Тварину не знайдено.

        ```json
        {
            "error": "Animal not found"
        }
        ```

    *   `500 Internal Server Error`: Не вдалося оновити тварину.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X PUT \
      http://localhost:3000/animal/123 \
      -H 'Content-Type: application/json' \
      -H 'auth: Bearer <your_token>' \
      -d '{
            "age": 4
        }'
    ```

#### 3. Видалити тварину [Аутентифіковано]

*   **Кінцева точка:** `/animal/{id}`
*   **Метод:** `DELETE`
*   **Опис:** Видаляє тварину. Потрібна аутентифікація як обліковий запис притулку.
*   **Параметри шляху:**
    *   `id` (ціле число, обов'язково): ID тварини для видалення.
*   **Авторизація:** Bearer Token потрібен у заголовку `auth`.
*   **Коди відповіді:**

    *   `200 OK`: Тварину успішно видалено. Повертає порожню JSON-відповідь.

        ```json
        {}
        ```

    *   `404 Not Found`: Тварину не знайдено.

        ```json
        {
            "error": "Animal not found"
        }
        ```

    *   `500 Internal Server Error`: Не вдалося видалити тварину.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X DELETE \
      http://localhost:3000/animal/123 \
      -H 'auth: Bearer <your_token>'
    ```

#### 4. Пошук тварин

*   **Кінцева точка:** `/animal/search`
*   **Метод:** `GET`
*   **Опис:** Пошук тварин з необов'язковими фільтрами та сортуванням.
*   **Параметри запиту:**

    *   `query` (рядок, необов'язково): Пошуковий запит для фільтрації за іменем тварини (без урахування регістру, частковий збіг).
    *   `specie` (рядок, необов'язково): Фільтр за видом тварини (точний збіг).
    *   `age` (число, необов'язково): Фільтр за віком тварини (точний збіг).
    *   `sort_by` (рядок, необов'язково): Поле для сортування результатів. Дозволені значення: `age`, `created_at`, `name`. За замовчуванням: `created_at`.
    *   `sort_order` (рядок, необов'язково): Порядок сортування. Дозволені значення: `asc` (за зростанням), `desc` (за спаданням). За замовчуванням: `desc`.

*   **Коди відповіді:**

    *   `200 OK`: Успішний пошук. Повертає список тварин, що відповідають критеріям.

        ```json
        {
            "animals": [
                {
                    "id": 1,
                    "name": "Buddy",
                    "specie": "Dog",
                    "age": 4,
                    "created_at": "2024-01-01T12:00:00.000Z",
                    "shelter_name": "Happy Paws Shelter",
                    "address": "123 Main St",
                    "city": "New York"
                },
                {
                    "id": 2,
                    "name": "Lucy",
                    "specie": "Cat",
                    "age": 2,
                    "created_at": "2024-01-02T10:00:00.000Z",
                    "shelter_name": "Cozy Home Animal Shelter",
                    "address": "456 Oak Ave",
                    "city": "Los Angeles"
                }
                // ... більше тварин
            ]
        }
        ```

    *   `500 Internal Server Error`: Не вдалося виконати пошук.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl "http://localhost:3000/animal/search?query=Bud&specie=Dog&sort_by=name&sort_order=asc"
    ```

#### 5. Отримати тварину за ID

*   **Кінцева точка:** `/animal/{id}`
*   **Метод:** `GET`
*   **Опис:** Отримує детальну інформацію про конкретну тварину за її ID.
*   **Параметри шляху:**
    *   `id` (ціле число, обов'язково): ID тварини для отримання.
*   **Коди відповіді:**

    *   `200 OK`: Тварину знайдено. Повертає детальну інформацію про тварину.

        ```json
        {
            "animal": {
                "id": 1,
                "name": "Buddy",
                "specie": "Dog",
                "age": 4,
                "created_at": "2024-01-01T12:00:00.000Z",
                "shelter_id": 123
                // ... інші властивості тварини
            }
        }
        ```

    *   `404 Not Found`: Тварину не знайдено.

        ```json
        {
            "error": "Animal not found"
        }
        ```

    *   `500 Internal Server Error`: Не вдалося отримати тварину.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl "http://localhost:3000/animal/123"
    ```

---

### Роутер Shelter (`/shelter`)

Цей роутер обробляє операції, пов'язані з профілем притулку.

#### 1. Створити/Оновити профіль притулку [Аутентифіковано]

*   **Кінцева точка:** `/shelter/profile`
*   **Метод:** `POST`
*   **Опис:** Створює або оновлює профіль притулку для аутентифікованого облікового запису притулку. Якщо профіль вже існує для облікового запису, він буде оновлений.
*   **Тіло запиту:** `application/json`

    ```json
    {
        "name": "Happy Paws Shelter",
        "category": "Dog & Cat",
        "address": "123 Main St",
        "city": "New York",
        "description": "We are a no-kill shelter dedicated to...",
        "accepts_animals": true
    }
    ```

    *   `name` (рядок, обов'язково): Назва притулку.
    *   `category` (рядок, обов'язково): Категорія тварин, якими займається притулок (наприклад, "Dog", "Cat", "Dog & Cat").
    *   `address` (рядок, обов'язково): Адреса притулку.
    *   `city` (рядок, обов'язково): Місто, де знаходиться притулок.
    *   `description` (рядок, необов'язково): Опис притулку.
    *   `accepts_animals` (логічне значення, необов'язково): Вказує, чи приймає притулок наразі тварин.

*   **Авторизація:** Bearer Token потрібен у заголовку `auth`.
*   **Коди відповіді:**

    *   `201 Created`: Профіль притулку успішно створено або оновлено. Повертає порожню JSON-відповідь.

        ```json
        {}
        ```

    *   `500 Internal Server Error`: Не вдалося створити/оновити профіль притулку.

        ```json
        {
            "error": "Internal server error" // В реальному коді повертайте повідомлення про помилку
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X POST \
      http://localhost:3000/shelter/profile \
      -H 'Content-Type: application/json' \
      -H 'auth: Bearer <your_token>' \
      -d '{
            "name": "Happy Paws Shelter",
            "category": "Dog & Cat",
            "address": "123 Main St",
            "city": "New York",
            "description": "We are a no-kill shelter...",
            "accepts_animals": true
        }'
    ```

#### 2. Отримати всі притулки

*   **Кінцева точка:** `/shelter/all`
*   **Метод:** `GET`
*   **Опис:** Отримує список усіх профілів притулків.
*   **Коди відповіді:**

    *   `200 OK`: Успішне отримання. Повертає список профілів притулків.

        ```json
        {
            "rows": [
                {
                    "id": 123,
                    "name": "Happy Paws Shelter",
                    "category": "Dog & Cat",
                    "address": "123 Main St",
                    "city": "New York",
                    "description": "We are a no-kill shelter...",
                    "accepts_animals": true
                },
                {
                    "id": 456,
                    "name": "Cozy Home Animal Shelter",
                    "category": "Cat",
                    "address": "456 Oak Ave",
                    "city": "Los Angeles",
                    "description": "A cozy place for cats...",
                    "accepts_animals": false
                }
                // ... більше притулків
            ]
        }
        ```

    *   `500 Internal Server Error`: Не вдалося отримати притулки.

        ```json
        {
            "error": "Internal server error" // В реальному коді повертайте повідомлення про помилку
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl "http://localhost:3000/shelter/all"
    ```

#### 3. Пошук притулків

*   **Кінцева точка:** `/shelter/search`
*   **Метод:** `GET`
*   **Опис:** Пошук притулків з необов'язковими фільтрами та сортуванням.
*   **Параметри запиту:**

    *   `query` (рядок, необов'язково): Пошуковий запит для фільтрації за назвою притулку (без урахування регістру, частковий збіг).
    *   `category` (рядок, необов'язково): Фільтр за категорією притулку (точний збіг).
    *   `city` (рядок, необов'язково): Фільтр за містом (точний збіг).
    *   `sort_by` (рядок, необов'язково): Поле для сортування результатів. Дозволені значення: `city`, `name`, `category`, `address`, `accepts_animals`. За замовчуванням: `name`.
    *   `sort_order` (рядок, необов'язково): Порядок сортування. Дозволені значення: `asc` (за зростанням), `desc` (за спаданням). За замовчуванням: `desc`.

*   **Коди відповіді:**

    *   `200 OK`: Успішний пошук. Повертає список притулків, що відповідають критеріям.

        ```json
        {
            "shelters": [
                {
                    "id": 123,
                    "name": "Happy Paws Shelter",
                    "category": "Dog & Cat",
                    "address": "123 Main St",
                    "city": "New York",
                    "description": "We are a no-kill shelter...",
                    "accepts_animals": true
                },
                // ... більше притулків
            ]
        }
        ```

    *   `500 Internal Server Error`: Не вдалося виконати пошук.

        ```json
        {
            "error": "Internal server error"
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl "http://localhost:3000/shelter/search?query=Happy&category=Dog & Cat&city=New York&sort_by=name&sort_order=asc"
    ```

---

### Роутер Volunteer (`/volunteer`)

Цей роутер обробляє операції, пов'язані з профілем волонтера.

#### 1. Створити/Оновити профіль волонтера [Аутентифіковано]

*   **Кінцева точка:** `/volunteer/profile`
*   **Метод:** `POST`
*   **Опис:** Створює або оновлює профіль волонтера для аутентифікованого облікового запису волонтера. Якщо профіль вже існує для облікового запису, він буде оновлений.
*   **Тіло запиту:** `application/json`

    ```json
    {
        "name": "John Doe"
    }
    ```

    *   `name` (рядок, обов'язково): Ім'я волонтера.

*   **Авторизація:** Bearer Token потрібен у заголовку `auth`.
*   **Коди відповіді:**

    *   `201 Created`: Профіль волонтера успішно створено або оновлено. Повертає порожню JSON-відповідь.

        ```json
        {}
        ```

    *   `500 Internal Server Error`: Не вдалося створити/оновити профіль волонтера.

        ```json
        {
            "error": "Internal server error" // В реальному коді повертайте повідомлення про помилку
        }
        ```

*   **Приклад запиту:**

    ```bash
    curl -X POST \
      http://localhost:3000/volunteer/profile \
      -H 'Content-Type: application/json' \
      -H 'auth: Bearer <your_token>' \
      -d '{
            "name": "John Doe"
        }'
    ```