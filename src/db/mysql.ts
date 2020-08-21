import mysql = require('mysql');

export default class MySQL {
    private static __instance: MySQL;
    cnn: mysql.Connection;

    constructor() {
        this.cnn = mysql.createConnection({
            user: 'user',
            password: 'pass',
            host: 'localhost',
            database: 'database'
        });
        this.connect();
    }

    public static get instance() {
        return this.__instance || (this.__instance = new this());
    }

    static executeQuery(query: string, callback: ((...args: any) => void)) {
        this.instance.cnn.query(query, (err, results: Object[], fields: Object[]) => {
            if (err) {
                callback('Error en el query');
            }
            else if (results.length === 0) {
                callback('No se encontró información');
            } else {
                callback(null, results);
            }
        });
    }

    private connect() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Base de datos conectada');
        });
    }
}