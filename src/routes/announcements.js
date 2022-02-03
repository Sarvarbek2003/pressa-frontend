const controller = require('../controllers/announcements.js')

const router = require('express').Router()


router.get('/', controller.GET)
router.get('/all', controller.ALL)

module.exports = router