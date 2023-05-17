// nodemon 설치: npm i nodemon --save-dev
import express from 'express'; //npm i express
import cors from 'cors'; //npm i cors
import morgan from 'morgan'; //npm i morgan
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import {config} from './config.js'
import { initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';
// import { db } from "./db/database.js"

const app = express();
const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('tiny')); // 사용자들이 들어오면 log를 console에 찍어준다.

// 미들웨어 등록
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

// 아예 error가 일어날 경우
app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500)
});

// db.getConnection().then((connection) => console.log(connection))

sequelize.sync().then(() => {
    // console.log(client);
    const server = app.listen(config.host.port)
    initSocket(server)
})
