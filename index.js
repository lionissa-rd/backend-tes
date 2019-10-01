const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const middleware = require('./middleware')
const port = 3001
const router = express.Router();

const auth = require('./auth/authCtrl')
const course = require('./controller/courseCtrl')
const course_file = require('./controller/coursefileCtrl')
const course_level = require('./controller/courselevelCtrl')
const course_video = require('./controller/coursevideoCtrl')
const event = require('./controller/eventCtrl')
const event_type = require('./controller/eventtypeCtrl')
const inbox = require('./controller/inboxCtrl')
const news_comment = require('./controller/newscommentCtrl')
const news_category = require('./controller/newscategoryCtrl')
const news = require('./controller/newsCtrl')
const ticket_class = require('./controller/ticketclassCtrl')
const ticket_user = require('./controller/ticketuserCtrl')
const ticket = require('./controller/ticketCtrl')
const user_business = require('./controller/userbusinessCtrl')
const users = require('./controller/usersCtrl')
const multi = require('./controller/multiCtrl')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

// INDEX
// app.get('/', middleware.checkToken);

// REGISTER
app.post('/register', auth.register);
// LOGIN
app.post('/login', auth.login);
// ACCOUNTSCENE
app.get('/accountscene', middleware.checkToken, multi.accountScene);
// HOMESCENE
app.get('/homescene', middleware.checkToken, multi.homeScene);

// COURSE
app.get('/course/data', middleware.checkToken,course.getCourse)
app.get('/course/data/id/:id', middleware.checkToken, course.getCourseById)
app.get('/course/data/name/:id', middleware.checkToken,course.getCourseByName)
app.post('/course/create', middleware.checkToken, course.createCourse)
app.put('/course/update/:id', middleware.checkToken, course.updateCourse)
app.delete('/course/delete/:id', middleware.checkToken, course.deleteCourse)

// // COURSE_FILE
// app.get('/coursefile/data', course_file.getCourseFile)
// app.post('/coursefile/data', course_file.getCourseFileById)
// app.post('/coursefile/create', course_file.createCourseFile)
// app.put('/coursefile/update/:id', course_file.updateCourseFile)
// app.delete('/coursefile/delete/:id', course_file.deleteCourseFile)

// // COURSE_LEVEL
// app.get('/courselevel/data', course_level.getCourseLevel)
// app.post('/courselevel/data', course_level.getCourseLevelById)
// app.post('/courselevel/create', course_level.createCourseLevel)
// app.put('/courselevel/update/:id', course_level.updateCourseLevel)
// app.delete('/courselevel/delete/:id', course_level.deleteCourseLevel)

// // COURSE_VIDEO
// app.get('/coursevideo/data', course_video.getCourseVideo)
// app.post('/coursevideo/data', course_video.getCourseVideoById)
// app.post('/coursevideo/create', course_video.createCourseVideo)
// app.put('/coursevideo/update/:id', course_video.updateCourseVideo)
// app.delete('/coursevideo/delete/:id', course_video.deleteCourseVideo)

// // EVENT
// app.get('/event/data', event.getEvent)
// app.post('/event/data', event.getEventById)
// app.post('/event/create', event.createEvent)
// app.put('/event/update/:id', event.updateEvent)
// app.delete('/event/delete/:id', event.deleteEvent)

// // EVENT_TYPE
// app.get('/eventtype/data', event_type.getEventType)
// app.post('/eventtype/data', event_type.getEventTypeById)
// app.post('/eventtype/create', event_type.createEventType)
// app.put('/eventtype/update/:id', event_type.updateEventType)
// app.delete('/eventtype/delete/:id', event_type.deleteEventType)

// // INBOX
// app.get('/inbox/data', inbox.getInbox)
// app.post('/inbox/data', inbox.getInboxById)
// app.post('/inbox/create', inbox.createInbox)
// app.put('/inbox/update/:id', inbox.updateInbox)
// app.delete('/inbox/delete/:id', inbox.deleteInbox)

// // NEWS
// app.get('/news/data', news.getNews)
// app.post('/news/data/title/:name', news.getNewsByTitle)
// app.post('/news/create', news.createNews)
// app.put('/news/update/:id', news.updateNews)
// app.delete('/news/delete/:id', news.deleteNews)

// // NEWS_CATEGORY
// app.get('/newscategory/data', news_category.getNewsCategory)
// app.post('/newscategory/data', news_category.getNewsCategoryById)
// app.post('/newscategory/create', news_category.createNewsCategory)
// app.put('/newscategory/update/:id', news_category.updateNewsCategory)
// app.delete('/newscategory/delete/:id', news_category.deleteNewsCategory)

// // NEWS_COMMENT
// app.get('/newscomment/data', news_comment.getNewsComment)
// app.post('/newscomment/data', news_comment.getNewsCommentById)
// app.post('/newscomment/create', news_comment.createNewsComment)
// app.put('/newscomment/update/:id', news_comment.updateNewsComment)
// app.delete('/newscomment/delete:id', news_comment.deleteNewsComment)

// TICKET
app.get('/ticket/data', middleware.checkToken, ticket.getTicket)
app.get('/ticket/data/id/:id', middleware.checkToken, ticket.getTicketById)
app.get('/ticket/data/name/:id', middleware.checkToken, ticket.getTicketByName)
app.post('/ticket/create', middleware.checkToken, ticket.createTicket)
app.put('/ticket/update/:id', middleware.checkToken, ticket.updateTicket)
app.delete('/ticket/delete/:id', middleware.checkToken, ticket.deleteTicket)

// // TICKET_CLASS
// app.get('/ticketclass/data',  middleware.checkToken, ticket_class.getTicketClass)
// app.post('/ticketclass/data',  middleware.checkToken, ticket_class.getTicketClassById)
// app.post('/ticketclass/create', middleware.checkToken, ticket_class.createTicketClass)
// app.put('/ticketclass/update/:id', middleware.checkToken, ticket_class.updateTicketClass)
// app.delete('/ticketclass/delete/:id',  middleware.checkToken,ticket_class.deleteTicketClass)

// // TICKET_USER
// app.get('/ticketuser/data', middleware.checkToken, ticket_user.getTicketUser)
// app.get('/ticketuser/:id',  middleware.checkToken, ticket_user.getTicketUserById)
// app.post('/ticketuser/create',  middleware.checkToken, ticket_user.createTicketUser)
// app.put('/ticketuser/update/:id',  middleware.checkToken, ticket_user.updateTicketUser)
// app.delete('/ticketuser/delete/:id',  middleware.checkToken, ticket_user.deleteTicketUser)

// // USER_BUSINESS
// app.get('/userbusiness/data', user_business.getUserBusiness)
// app.get('/userbusiness/data/:id', user_business.getUserBusinessByName)
// app.get('/userbusiness/data/:id), user_business.getUserBusinessByBusiness)
// app.post('/userbusiness/create', user_business.createUserBusiness)
// app.put('/userbusiness/update/:id', user_business.updateUserBusiness)
// app.delete('/userbusiness/delete/:id', user_business.deleteUserBusiness)

// USERS
app.get('/users/data', middleware.checkToken, users.getUsers)
// getusersbyid is on accountscene endpoint
app.get('/users/data/email/:id', middleware.checkToken, users.getUsersByEmail)
app.get('/users/data/username/:id', middleware.checkToken, users.getUsersByUsername)
app.get('/users/data/firstname/:id', middleware.checkToken, users.getUsersByFirstName)
app.get('/users/data/lastname/:id', middleware.checkToken,users.getUsersByLastName)
// create user is on register endpoint
app.put('/users/update/:id', middleware.checkToken, users.updateUsers)
app.delete('/users/delete/:id', middleware.checkToken, users.deleteUsers)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `App running on port ${port}.`
  )
})

