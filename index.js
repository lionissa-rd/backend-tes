const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const config = require('./config')
const middleware = require('./middleware')
const port = 3001
const router = express.Router();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

// REGISTER
app.post('/register', db.register);
// LOGIN
app.post('/login', db.login);
// ACCOUNTSCENE
app.get('/accountscene', middleware.checkToken, db.accountScene);
// HOMESCENE
app.get('/homescene', middleware.checkToken, db.homeScene);
// INDEX
// app.get('/', middleware.checkToken);


// app.get('/', (request, response) => {
//     response.json({info: 'Node.js, Express, and Postgres API'})
// })

// // COURSE
// app.get('/course/data', db.getCourse)
// app.post('/course/data', db.getCourseById)
// app.post('/course/create', db.createCourse)
// app.put('/course/update/:id', db.updateCourse)
// app.delete('/course/delete/:id', db.deleteCourse)

// // COURSE_FILE
// app.get('/coursefile/data', db.getCourseFile)
// app.post('/coursefile/data', db.getCourseFileById)
// app.post('/coursefile/create', db.createCourseFile)
// app.put('/coursefile/update/:id', db.updateCourseFile)
// app.delete('/coursefile/delete/:id', db.deleteCourseFile)

// // COURSE_LEVEL
// app.get('/courselevel/data', db.getCourseLevel)
// app.post('/courselevel/data', db.getCourseLevelById)
// app.post('/courselevel/create', db.createCourseLevel)
// app.put('/courselevel/update/:id', db.updateCourseLevel)
// app.delete('/courselevel/delete/:id', db.deleteCourseLevel)

// // COURSE_VIDEO
// app.get('/coursevideo/data', db.getCourseVideo)
// app.post('/coursevideo/data', db.getCourseVideoById)
// app.post('/coursevideo/create', db.createCourseVideo)
// app.put('/coursevideo/update/:id', db.updateCourseVideo)
// app.delete('/coursevideo/delete/:id', db.deleteCourseVideo)

// // EVENT
// app.get('/event/data', db.getEvent)
// app.post('/event/data', db.getEventById)
// app.post('/event/create', db.createEvent)
// app.put('/event/update/:id', db.updateEvent)
// app.delete('/event/delete/:id', db.deleteEvent)

// // EVENT_TYPE
// app.get('/eventtype/data', db.getEventType)
// app.post('/eventtype/data', db.getEventTypeById)
// app.post('/eventtype/create', db.createEventType)
// app.put('/eventtype/update/:id', db.updateEventType)
// app.delete('/eventtype/delete/:id', db.deleteEventType)

// // INBOX
// app.get('/inbox/data', db.getInbox)
// app.post('/inbox/data', db.getInboxById)
// app.post('/inbox/create', db.createInbox)
// app.put('/inbox/update/:id', db.updateInbox)
// app.delete('/inbox/delete/:id', db.deleteInbox)

// // NEWS
// app.get('/news/data', db.getNews)
// app.post('/news/data', db.getNewsById)
// app.post('/news/create', db.createNews)
// app.put('/news/update/:id', db.updateNews)
// app.delete('/news/delete/:id', db.deleteNews)

// // NEWS_CATEGORY
// app.get('/newscategory/data', db.getNewsCategory)
// app.post('/newscategory/data', db.getNewsCategoryById)
// app.post('/newscategory/create', db.createNewsCategory)
// app.put('/newscategory/update/:id', db.updateNewsCategory)
// app.delete('/newscategory/delete/:id', db.deleteNewsCategory)

// // NEWS_COMMENT
// app.get('/newscomment/data', db.getNewsComment)
// app.post('/newscomment/data', db.getNewsCommentById)
// app.post('/newscomment/create', db.createNewsComment)
// app.put('/newscomment/update/:id', db.updateNewsComment)
// app.delete('/newscomment/delete:id', db.deleteNewsComment)

// TICKET
app.get('/ticket/data', db.getTicket)
//app.post('/ticket/data', db.getTicketById)
app.get('/ticket/data/:id', db.getTicketById)
app.get('/ticket/data/:name', db.getTicketByName)
app.post('/ticket/create', db.createTicket)
app.put('/ticket/update/:id', db.updateTicket)
app.delete('/ticket/delete/:id', db.deleteTicket)

// TICKET_CLASS
app.get('/ticketclass/data', db.getTicketClass)
app.post('/ticketclass/data', db.getTicketClassById)
app.post('/ticketclass/create', db.createTicketClass)
app.put('/ticketclass/update/:id', db.updateTicketClass)
app.delete('/ticketclass/delete/:id', db.deleteTicketClass)

// // USER_BUSINESS
// app.get('/userbusiness/data', db.getUserBusiness)
// app.get('/userbusiness/data/:id', db.getUserBusinessByName)
// app.get('/userbusiness/data/:id), db.getUserBusinessByBusiness)
// app.post('/userbusiness/create', db.createUserBusiness)
// app.put('/userbusiness/update/:id', db.updateUserBusiness)
// app.delete('/userbusiness/delete/:id', db.deleteUserBusiness)

// // USER_LEVEL
// app.get('/userlevel/data', db.getUserLevel)
// app.post('/userlevel/data', db.getUserLevelById)
// app.post('/userlevel/create', db.createUserLevel)
// app.put('/userlevel/update/:id', db.updateUserLevel)
// app.delete('/userlevel/delete/:id', db.deleteUserLevel)

// USERS
app.get('/users/data', db.getUsers)
app.get('/users/data/:id', db.getUsersByEmail)
app.get('/users/data/:id', db.getUsersByUsername)
app.get('/users/data/:id', db.getUsersByFirstName)
app.get('/users/data/:id', db.getUsersByLastName)
app.post('/users/create', db.createUsers)
app.put('/users/update/:id', db.updateUsers)
app.delete('/users/delete/:id', db.deleteUsers)

// app.listen(port, () => {
//     console.log(
//           `App running on port ${port}.`
//     )
// })

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `App running on port ${port}.`
  )
})

