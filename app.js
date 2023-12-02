import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import session from "express-session";
import UsersRoutes from "./users/routes.js";
import ReviewsRoutes from "./reviews/routes.js";
import BooksRoutes from "./books/routes.js";
import dotenv from 'dotenv';
dotenv.config();


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING).then(r => console.log("Connected to MongoDB"));

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(
    session(sessionOptions)
);

app.use(express.json());

UsersRoutes(app);
ReviewsRoutes(app);
BooksRoutes(app);

app.get('/', (req, res) => {
    res.send('BRJ Server is running on port 4000');
});

app.listen(process.env.PORT || 4000, () => {
    console.log("BRJ Server is running on port 4000");
});
