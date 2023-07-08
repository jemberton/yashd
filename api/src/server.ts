import express from 'express';
// import { Request, Response } from 'express';
import { routes } from './routes';
import path from 'path';
import mongoDB from './db';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const _PORT = 5172;
const app = express();

var logger = morgan('dev');

//# Load PUG for rendering
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://10.100.5.227:5173', 'http://0.0.0.0:5173'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

//# Use ROUTES
app.use('/', routes);

//# Listen
app.listen(_PORT, () => {
    console.log('-----------------------------------------------');
    console.log('  YASHD API Server');
    console.log('-----------------------------------------------');
    console.log(`> Listening on port ${_PORT} ...`);
    mongoDB.connect();
});
