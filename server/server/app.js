import 'babel-polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import path from 'path';
import { db } from "./ db/database";
import { AppRouting } from "./routing/app.routing";
import { JwtStrategy, LocalStrategy } from './middleware/auth';

export const app = express();

db.run();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/client')));

passport.initialize();
LocalStrategy.apply();
JwtStrategy.apply();

AppRouting.generate(app);
