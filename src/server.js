const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 5001
const app = express()


let ID = 0


app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static( path.join(__dirname, 'public')))
app.set('views',  path.join(__dirname, 'views'))                                                                                                                                                                    


const announcementRout = require('./routes/announcements.js')
const rout = require('./routes/routs.js')

const fechData = require('./controllers/announcements.js')


app.get('/', (req, res) => res.render('home'))
app.get('/admin', (req, res) => res.render('admin'))
app.get('/adm/login', (req, res) => res.render('login'))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app.use('/add', (req, res) => res.render('addEvent'))
app.use('/about', (req, res) => res.render('about'))

app.get('/data',fechData.ALL)
app.get('/admin/data',fechData.DATA)

app.use('/announcement',rout,(req,res) => {
    ID = req.postId
    req.postId = 0
})

app.use('/56846846818416',(req,res,next) => {
    if(ID == 0) {
        next()
    }else req.postId = ID, ID = 0, next() 
},announcementRout)



app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))                                                                                                                                                                        