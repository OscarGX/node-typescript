import Server from './server/server';
import router from './routes/routes';

const app = Server.init(3000);
app.app.use(router);

app.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});