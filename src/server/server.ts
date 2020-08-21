import express = require('express');
import path = require('path');

export default class Server {
    public port: number;
    public app: express.Application;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    static init(port: number) {
        return new Server(port);
    }

    private setPublicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    start(callback: ((...args: any) => void)) {
        this.app.listen(this.port, callback);
        this.setPublicFolder();
    }
}