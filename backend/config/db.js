import mariadb from "mariadb";
import config from "../config.json" with { type: 'json' };

const pool = mariadb.createPool({
    host: 'localhost',  // Адреса сервера
    user: config.DB_USER,       // Логін
    password: config.DB_PASS,       // Пароль
    database: config.DB_NAME,   // Назва бази даних
    connectionLimit: 10  // Ліміт на кількість одночасних зʼєднань
});

export default async function queryDB(query, params) {
    let conn;

    try {
        conn = await pool.getConnection();
        console.log('Connected to MariaDB');
        const result = await conn.query(query, params);
        return result;
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    } finally {
        if (conn) conn.release(); // TODO: упевнитися чи перевірка if (conn) правильна
    }
}