# House For Paws (hackathon2025-test)

Цей проект є веб-додатком, розробленим для допомоги у пошуку та перегляді інформації про тварин та притулки. Він включає функціональність для реєстрації та авторизації користувачів, перегляду каталогу, пошуку та додавання до обраного.

## Технології

* **Фронтенд:** React, Vite, React Router, Redux (з Redux Toolkit та Redux Persist), Axios, Formik, Yup
* **Бекенд:** Node.js, Express
* **База даних:** MySQL (на основі залежностей та коду сервісів)
* **Автентифікація:** JWT (JSON Web Tokens)

## Реалізована Функціональність

### Загальне для Користувачів (Волонтери/Представники Притулків):

1.  **Автентифікація:**
    * Реєстрація нових користувачів через Email та пароль.
    * Вхід в систему за допомогою Email та пароля.
    * Можливість виходу з системи (Logout).
    * Збереження стану автентифікації та даних користувача (ім'я, email, токен) за допомогою Redux Persist.
    * Сторінка профілю користувача для перегляду імені та email, а також для виходу з системи.
    * Захищені маршрути, доступні тільки автентифікованим користувачам.
    * Перемикач "volunteer" / "shelter" на формі реєстрації (на даний момент впливає тільки на UI, логіка реєстрації універсальна).

2.  **Перегляд Контенту:**
    * **Головна сторінка (Home):** Відображення карток (тварин/притулків) з можливістю "завантажити ще" (lazy loading).
    * **Сторінка Пошуку/Каталогу (Search):** Відображення всіх доступних карток з можливістю фільтрації та пошуку.
    * **Сторінка Деталей (Item):** Детальний перегляд інформації про конкретну тварину/притулок при переході з картки.

3.  **Пошук та Фільтрація:**
    * Пошук за ключовим словом (назвою).
    * Фільтрація за основною категорією (Animals / Shelters).
    * Фільтрація за підкатегорією (Cats / Dogs або Shelter / Vet Clinic - залежно від основної категорії).
    * Сортування за назвою (A-Z, Z-A).
    * *Примітка: Фільтрація за віком, станом здоров'я та місцезнаходженням, а також сортування за ціною, що згадувалися у початкових вимогах, на даний момент не реалізовані повністю або відсутні.*

4.  **Обране (Favorites):**
    * Можливість додати картку до списку обраного (іконка серця на картці).
    * Сторінка "Favorite" для перегляду збережених карток.
    * Можливість видалити картку зі списку обраного.
    * Збереження списку обраного для кожного користувача за допомогою Redux Persist.

5.  **Сповіщення:**
    * Відображення сповіщень про успішні дії (наприклад, вхід, реєстрація, додавання до обраного) або помилки.

### Бекенд:

* API для реєстрації та логіну користувачів.
* API для отримання списку тварин/притулків:
    * З можливістю пошуку за назвою.
    * З можливістю сортування за назвою.
    * З можливістю отримання даних "кластерами" для реалізації lazy loading на фронтенді.
    * З можливістю отримання даних за конкретним ID.
* Використання JWT для захисту ендпоінтів та ідентифікації користувачів (хоча `verifyToken` не використовується активно в поточних роутах `bankRoutes`).
* Підключення до бази даних MySQL для зберігання та отримання даних.

## Встановлення та Запуск

### Бекенд:

1.  Перейдіть до директорії `backend`.
2.  Створіть файл `.env` на основі `.env.example` (якщо він є) та вкажіть необхідні дані для підключення до БД та секретний ключ JWT.
3.  Встановіть залежності: `npm install`
4.  Запустіть сервер розробки: `npm run dev`

### Фронтенд:

1.  Перейдіть до директорії `react-app`.
2.  Встановіть залежності: `npm install`
3.  Запустіть клієнт розробки: `npm run dev`
4.  Відкрийте додаток у браузері за адресою, вказаною у консолі (зазвичай `http://localhost:5173` або подібна).

## Не реалізовано (з початкових вимог):

* Розширена функціональність для притулків (управління оголошеннями, прийом тварин від волонтерів).
* Створення оголошень притулками.
* Фільтрація за віком, станом здоров'я тварини.
* Можливість зв'язку з притулком через сайт (система повідомлень).
* Функціонал "здати знайдену тварину" та форма запиту на тварину.
* Можливість донатити.
* Реєстрація/логін через соціальні мережі.
