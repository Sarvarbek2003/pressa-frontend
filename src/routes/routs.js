const controller = require('../controllers/announcements.js')
const router = require('express').Router()
const rendere = require('../middlewares/renderhtml.js')

router.get('/:postId', rendere.REN)

module.exports = router