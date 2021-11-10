const express = require('express')
const publicRouter = express.Router()
const PublicController = require('../controllers/public/PublicUserController')
const Usercourse = require('../controllers/public/UserCourseController')
const authentication = require('../middlewares/authentication')

publicRouter.post('/register', PublicController.register)
publicRouter.post('/login', PublicController.login)

publicRouter.use(authentication)

publicRouter.get('/userCourse', Usercourse.getAll)
publicRouter.get('/userCourses/:courseId', Usercourse.getById)

module.exports = publicRouter