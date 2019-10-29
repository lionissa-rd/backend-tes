const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const middleware = require('./middleware')
const port = 3001
const router = express.Router();

const auth = require('./auth/authCtrl')
const course = require('./controller/courseCtrl')
const event = require('./controller/eventCtrl')
const forum = require('./controller/forumCtrl')
const forum_comment = require('./controller/forumcommentCtrl')
const inbox = require('./controller/inboxCtrl')
const like_forum = require('./controller/likeforumCtrl')
const like_forum_comment = require('./controller/likeforumcommentCtrl')
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

// GANTI PUT KE POST UNTUK UPDATE

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
app.get('/course/data', middleware.checkToken, course.getCourse)
app.get('/course/data/id/:id', middleware.checkToken, course.getCourseById)
app.get('/course/data/name/:id', middleware.checkToken, course.getCourseByName)
app.post('/course/create', middleware.checkToken, course.createCourse)
app.post('/course/update', middleware.checkToken, course.updateCourse)
app.post('/course/delete', middleware.checkToken, course.deleteCourse)

// EVENT
app.get('/event/data', middleware.checkToken, event.getEvent)
app.get('/event/data/id/:id', middleware.checkToken, event.getEventById)
app.get('/event/data/name/:id', middleware.checkToken, event.getEventByName)
app.get('/event/data/cat/:id', event.getEventByCategory)
app.post('/event/create', middleware.checkToken, event.createEvent)
app.post('/event/update/:id', middleware.checkToken, event.updateEvent)
app.post('/event/delete', middleware.checkToken, event.deleteEvent)

// FORUM
app.get('/forum/data', middleware.checkToken, forum.getForum)
app.get('/forum/data/latest', middleware.checkToken, forum.getForumByLatest)
app.get('/forum/data/id/:id', middleware.checkToken, forum.getForumById)
app.post('/forum/create', middleware.checkToken, forum.createForum)
app.post('/forum/update', middleware.checkToken, forum.updateForum)
app.post('/forum/delete', middleware.checkToken, forum.deleteForum)

// FORUM'S COMMENT
app.get('/forumcomment/data', middleware.checkToken, forum_comment.getForumComment)
app.get('/forumcomment/data/id/:id', middleware.checkToken, forum_comment.getForumCommentById)
app.post('/forumcomment/create', middleware.checkToken, forum_comment.createForumComment)
app.post('/forumcomment/delete', middleware.checkToken, forum_comment.deleteForumComment)

// // INBOX
// app.get('/inbox/data', inbox.getInbox)
// app.post('/inbox/data', inbox.getInboxById)
// app.post('/inbox/create', inbox.createInbox)
// app.post('/inbox/update/:id', inbox.updateInbox)
// app.post('/inbox/delete/:id', inbox.deleteInbox)

// LIKE FORUM
app.get('/likeforum/data/id/:id', middleware.checkToken, like_forum.getLikeForum)
app.post('/likeforum/create', middleware.checkToken, like_forum.createLikeForum)
app.post('/likeforum/delete', middleware.checkToken, like_forum.deleteLikeForum)

// LIKE FORUM'S COMMENT
app.get('/likeforumcomment/data/id/:id', middleware.checkToken, like_forum_comment.getLikeForumComment)
app.post('/likeforumcomment/create', middleware.checkToken, like_forum_comment.createLikeForumComment)
app.post('/likeforumcomment/delete', middleware.checkToken, like_forum_comment.deleteLikeForumComment)

// TICKET
app.get('/ticket/data', middleware.checkToken, ticket.getTicket)
app.get('/ticket/data/id/:id', middleware.checkToken, ticket.getTicketById)
app.get('/ticket/data/user/:id', middleware.checkToken, ticket.getTicketByUser)
app.post('/ticket/create', middleware.checkToken, ticket.createTicket)
app.post('/ticket/delete', middleware.checkToken, ticket.deleteTicket)

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
app.post('/users/update', middleware.checkToken, users.updateUsers)
app.post('/users/delete', middleware.checkToken, users.deleteUsers)

const PORT = process.env.PORT || 3001;
const PORT2 = process.env.PORT || 3002;

app.listen(PORT2, () => {
  console.log(
    `App running on port ${port}.`
  )
})

