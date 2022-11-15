import express from "express"
import session from "express-session"
import path from 'path'
import MongoStore from 'connect-mongo'
import config from '../../../connection.js';
import { webAuth } from "../../auth/index.js";
import { faker } from "@faker-js/faker";
import Container from "../../../DAOs/connectionMongo.js"

const products = new Container();



const router = express.Router();

router.use(session({
    secret: 'TOP SECRET',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cxnStr }),
    cookie: {
        maxAge: 600000
    }
}))


router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/home', webAuth, (req, res) => {
    const username = req.session?.username
    res.render(path.join(process.cwd(), '/views/home.ejs'),{username}) 
})


router.get('/login', (req, res) => {
    const username = req.session?.username
    if (username) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/partials/login.html'))
    }
})

router.get('/logout', (req, res) => {
    const username = req.session?.username
    if (username) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), '/views/logout.ejs'), {username})
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});

router.post("/home", (req, res) => {
	const product = req.body;
	products.createData(product);
	res.redirect("/home");
});

router.post('/login', (req, res) => {
    console.log(req.session)
    console.log(req.body)

    req.session.username = req.body.username

    res.redirect('/home')
})

router.get("/api/productos-test", (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }

    res.render('test.ejs', { response: response })
})

export default router;