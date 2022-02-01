const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 5001
const app = express()
const axios = require('axios').default;

let ID = 0


app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static( path.join(__dirname, 'public')))
app.set('views',  path.join(__dirname, 'views'))                                                                                                                                                                    

const announcementRout = require('./routes/announcements.js')
const bot = require('./bot/bot.js')
const rout = require('./routes/routs.js')


app.get('/', (req, res) => res.render('index'))
app.get('/adm/login', (req, res) => res.render('login'))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app.use('/add', (req, res) => res.render('elon'))

app.get('/post', bot.BOT)
app.use('/announcement',rout,(req,res) => {
    ID = req.postId
    req.postId = 0
})

app.use('/56846846818416',(req,res,next) => {
    if(ID == 0) {
        next()
    }else req.postId = ID, ID = 0, next() 
},announcementRout)

// bot.BOT()

app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))                                                                                                                                                                        