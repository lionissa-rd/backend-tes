const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'ywkmgbsvxobffr',
//     host: 'ec2-54-235-104-136.compute-1.amazonaws.com',
//     database: 'dentflmojqec1u',
//     password: 'b595f45d57c827a3d6f2425c8ae554f2e70dc7ff7ab1ae57114c7b10bc5821c3',
//     port: 5432,
//     ssl: true
// })

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'admin',
    port: 5432
})

// COURSE
const getCourse = (request, response) => {
    pool.query('SELECT * FROM course', (error, results) =>{
        if (error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getCourseById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM course WHERE course_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM course where course_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createCourse = (request, response) => {
    const { course_id, course_name, course_desc, cl_id, cv_id, ul_id } = request.body

    pool.query('INSERT INTO course (course_id, course_name, course_desc, cl_id, cf_id, cv_id, ul_id) VALUES ($1, $2, $3, $4, $6, $7)', [course_id, course_name, course_desc, cl_id, cv_id, ul_id], (error, result) =>{
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course added with ID: ${course_id}`)
    })
}

const updateCourse = (request, response) => {
    const course_id = request.params.id
    const {course_name} = request.body
    
    pool.query('UPDATE course SET course_name = $1 WHERE course_id $2', [course_name, course_id], (error, result) =>{
        if(error)
        {
            throw error
        }

        response.status(200).send(`Course modified with ID: ${course_id}`)
    })
}

const deleteCourse = (request, response) => {
    const course_id = request.params.id
    
    pool.query('DELETE FROM course WHERE course_id = $1', [course_id], (error, result) =>{
        if(error)
        {
            throw error
        }

        response.status(200).send(`Course deleted with ID: ${course_id}`)
    })
}

// COURSE_FILE
const getCourseFile = (request, response) => {
    pool.query('SELECT * FROM course_file', (error, results) =>{
        if(error)
        {
            throw error
        }
       
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getCourseFileById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM course_file WHERE cf_title LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2)
    {
        pool.query('SELECT * FROM course_file WHERE cf_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createCourseFile = (request, response) => {
    const { cf_id, cf_title, cf_data } = request.params.id

    pool.query('INSERT INTO course_file (cf_id, cf_title, cf_data) VALUES ($1, $2, $3)', [cf_id, cf_title, cf_data], (error, result) => {
        if (error)
        {
            throw error
        }

        response.status(201).send(`Course File added with ID: ${cf_id}`)
    })
}

const updateCourseFile = (request, response) => {
    const cf_id = request.params.id
    const { cf_title } = request.body

    pool.query('UPDATE course_file SET cf_title = $1 WHERE cf_id = $2', [cf_title, cf_id], (error, result) => {
        if(error){
            throw error
        }

        response.status(200).send(`Course File modified with ID: ${cf_id}`)
    })
}

const deleteCourseFile = (request, response) => {
    const cf_id = request.params.id

    pool.query('DELETE FROM course_file WHERE cf_id = $1', [cf_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Course File deleted with ID: ${cf_id}`)
    })
}

// COURSE_LEVEL
const getCourseLevel = (request, response) => {
    pool.query('SELECT * FROM course_level', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getCourseLevelById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM course_level WHERE cf_title LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM course_level WHERE cf_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createCourseLevel = (request, response) => {
    const { cl_id, cl_name, cl_desc } = request.body

    pool.query('INSERT INTO course_level (cl_id, cl_name, cl_desc) VALUES ($1, $2, $3)', [cl_id, cl_name, cl_desc], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Level added with ID: ${cl_id}`)
    })
}

const updateCourseLevel = (request, response) => {
    const cl_id = request.params.id
    const { cl_name } = request.body

    pool.query('UPDATE course_level SET cl_name = $1 WHERE cl_id = $2', [cl_name, cl_id], (error, result) => {
        if(error)
        {
            throw error
        }
        
        response.status(200).send(`Course Level modified with ID: ${cl_id}`)
    })
}

const deleteCourseLevel = (request, response) => {
    const cl_id = request.params.id

    pool.query('DELETE FROM course_level WHERE cl_id = $1', [cl_id], (error, result) => {
        if(error)
        {
            throw error
        }
        response.status(200).send(`Ticket deleted with ID: ${cl_id}`)
    })
}

//COURSE_VIDEO
const getCourseVideo = (request, response) => {
    pool.query('SELECT * FROM course_video', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getCourseVideoById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM course_video WHERE cv_title = %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM course_video WHERE cv_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createCourseVideo = (request, response) => {
    const { cv_id, cv_title, cv_link } = request.body

    pool.query('INSERT INTO course_video (cv_id, cv_title, cv_link) VALUES ($1, $2, $3, $4)', [cv_id, cv_title, cv_link], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Video added with ID: ${cv_id}`)
    })
}

const updateCourseVideo = (request, response) => {
    const cv_id = request.params.id
    const { cv_title } = request.body

    pool.query('UPDATE course_video SET cv_title = $1 WHERE cv_id = $2', [cv_title, cv_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Course Video modified with ID:  ${cv_id}`)
    })
}

const deleteCourseVideo = (request, response) => {
    const cv_id = request.params.id
    
    pool.query('DELETE FROM course_video WHERE cv_id = $1', [cv_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Course Video deleted with ID: ${cv_id}`)
    })
}

//EVENT
const getEvent = (request, response) => {
    pool.query('SELECT * FROM event', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getEventById = (request, response) => {
    const { _order, _qparam } = request.body

    if(_order == 1) //query by name
    {
        pool.query('SELECT * FROM event WHERE event_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by location
    {
        pool.query('SELECT * FROM event WHERE event_location LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 3) //query by id
    {
        pool.query('SELECT * FROM event WHERE event_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createEvent = (request, response) => {
    const { event_id, event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img } = request.body

    pool.query('INSERT INTO (event_id, event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [event_id, event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Event added with ID: ${event_id}`)
    })
}

const updateEvent = (request, response) => {
    const event_id = request.params.id
    const {event_name} = request.body

    pool.query(
        'UPDATE event SET event_name = $1 WHERE event_id = $2', [event_name, event_id],
        (error, result) => {
            if(error)
            {
                throw error
            }

            response.status(200).send(`Event modified with ID: ${event_id}`)
        }
    )
}

const deleteEvent = (request, response) => {
    const event_id = request.params.id

    pool.query('DELETE FROM event WHERE event_id = $1', [event_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event deleted with ID: ${event_id}`)
    })
}

// EVENT_TYPE
const getEventType = (request, response) => {
    pool.query('SELECT * FROM event_type', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getEventTypeById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM event_type WHERE et_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM event_type WHERE et_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createEventType = (request, response) => {
    const { et_id, et_name, et_desc } = request.body

    pool.query('INSERT INTO event_type (et_id, et_name, et_desc) VALUES ($1, $2, $3)', [et_id, et_name, et_desc], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Event Type added with ID: ${et_id}`)
    })
}

const updateEventType = (request, response) => {
    const et_id = request.params.id
    const { et_name } = request.body

    pool.query('UPDATE event_type SET et_name = $1 WHERE et_id = $2', [et_name, et_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event Type modified with ID: ${et_id}`)
    })
}

const deleteEventType = (request, response) => {
    const et_id = request.params.id

    pool.query('DELETE FROm event_type WHERE et_id = $1', [et_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event Type modified with ID: ${et_id}`)
    })
}

// INBOX
const getInbox = (request, response) => {
    pool.query('SELECT * FROM inbox', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getInboxById = (request, response) => {
    const inbox_id = request.params.id

    pool.query('SELECT * FROM inbox WHERE inbox_id = $1', [inbox_id], (error, results) => {
        if(error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const createInbox = (request, response) => {
    const { inbox_id, inbox_msg, inbox_datetime, user_id } = request.body

    pool.query('INSERT INTO inbox (inbox_id, inbox_msg, inbox_datetime, user_id) VALUES ($1, $2, $3, $4)', [inbox_id, inbox_msg, inbox_datetime, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Inbox added with ID: ${inbox_id}`)
    })
}

const updateInbox = (request, response) => {
    const inbox_id = request.params.id
    const { inbox_msg } = request.body

    pool.query('UPDATE inbox SET inbox_msg = $1 WHERE inbox_id = $2', [inbox_msg, inbox_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Inbox modified with ID: ${inbox_id}`)
    })
}

const deleteInbox = (request, response) => {
    const inbox_id = request.params.id

    pool.query('DELETE FROM inbox WHERE inbox_id = $1', [inbox_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Inbox deleted with ID: ${inbox_id}`)
    })
}

// NEWS
const getNews = (request, response) => {
    pool.query('SELECT * FROM news', (error, results) => {
        if(error)
        {
            throw error
        }

        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getNewsById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM news WHERE news_title LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM news WHERE news_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createNews = (request, response) => {
    const { news_id, news_title, news_content, news_date } = request.body

    pool.query('INSERT INTO news (news_id, news_title, news_content, news_date) VALUES ($1, $2, $3, $4)', [news_id, news_title, news_content, news_date], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`News added with ID: ${news_id}`)
    })
}

const updateNews = (request, response) => {
    const news_id = request.params.id
    const { news_title } = request.body

    pool.query(
        'UPDATE news SET news_title = $1 WHERE news_id = $2', [news_title, news_id], (error, result) => {
            if(error)
            {
                throw error
            }

            response.status(200).send(`News modified with ID: ${news_id}`)
        })
}

const deleteNews = (request, response) => {
    const news_id = request.params.id

    pool.query('DELETE FROM news WHERE news_id = $1', [news_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News deleted with ID: ${news_id}`)
    })
}

// NEWS_CATEGORY
// *news category dan news belum ada hubungan?
const getNewsCategory = (request, response) => {
    pool.query('SELECT * FROM news', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getNewsCategoryById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM news_category WHERE nc_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM news_category WHERE nc_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createNewsCategory = (request, response) => {
    const { nc_id, nc_name } = request.body

    pool.query('INSERT INTO news_category (nc_id, nc_name) VALUES ($1, $2)', [nc_id, nc_name], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`News Category added with ID: ${nc_id}`)
    })
}

const updateNewsCategory = (request, response) => {
    const nc_id = request.params.id
    const { nc_name } = request.body

    pool.query('UPDATE news_category SET nc_name = $1 WHERE nc_name = $2', [nc_name, nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Category with ID: ${nc_id}`)
    })
}

const deleteNewsCategory = (request, response) => {
    const nc_id = request.params.id

    pool.query('DELETE FROM news_category WHERE nc_id = $1', [nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Category with ID: ${nc_id}`)
    })
}

// NEWS_COMMENT
const getNewsComment = (request, response) => {
    pool.query('SELECT * FROM news_comment', (error, results) => {
        if(error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getNewsCommentById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //order by name
    {
        pool.query('SELECT * FROM news_comment WHERE nc_content LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2)
    {
        pool.query('SELECT * FROM news_comment WHERE nc_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createNewsComment = (request, response) => {
    const { nc_id, nc_content, nc_date, news_id, user_id } = request.body

    pool.query('INSERT INTO news_comment (nc_id, nc_content, nc_date, news_id, user_id) VALUES ($1, $2, $3, $4, $5)', [nc_id, nc_content, nc_date, news_id, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`News Comment added with ID: ${nc_id}`)
    })
}

const updateNewsComment = (request, response) => {
    const nc_id = request.params.id
    const {nc_content} = request.body

    pool.query('UPDATE news_comment SET nc_content = $1 WHERE nc_id = $2', [nc_content, nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Comment modified with ID: ${nc_id}`)
    })
}

const deleteNewsComment = (request, response) => {
    const nc_id = request.params.id

    pool.query('DELETE FROM news_comment WHERE nc_id = $1', [nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Comment deleted with ID: ${nc_id}`)
    })
}

// TICKET
const getTicket = (request, response) => {
    pool.query('SELECT * FROM ticket', (error, results) =>{
        if (error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getTicketById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM ticket WHERE ticket_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) // query by id
    {
        pool.query('SELECT * FROM ticket WHERE ticket_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createTicket = (request, response) => {
    const { ticket_name, tc_id } = request.body
    var _currentid;

    pool.query('SELECT * FROM ticket ORDER BY ticket_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "TI0001";
        }
        else
        {
            var currentphase = result.rows[0].ticket_id;
            // console.log(currentphase);
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1; 
            // console.log(String(currentphase));
            // console.log(parseInt(currentphase.substring(2, 6))+1);
            // console.log(String(currentphase))
            // console.log(currentnumber);
            _currentid = "TI" + String(currentnumber).padStart(4, '0');
            // console.log(_currentid);
            // console.log('---LIMIT---');
        }

        pool.query('INSERT INTO ticket (ticket_id, ticket_name, ticket_date, tc_id) VALUES ($1, $2, NOW(), $3)', [_currentid, ticket_name, tc_id], (error, result) => {
            if (error)
            {
                throw error;
            }

            response.status(201).send(`Ticket added with ID: ${_currentid}`)
         })
    })

   
}

const updateTicket = (request, response) => {
    const ticket_id = request.params.id
    const {ticket_name} = request.body

    pool.query(
        'UPDATE ticket SET ticket_name = $1 WHERE ticket_id = $2',
        [ticket_name, ticket_id],
        (error, result) => {
            if (error)
            {
                throw error
            }

        response.status(200).send(`Ticket modified with ID: ${ticket_id}`)
    })
}

const deleteTicket = (request, response) => {
    const ticket_id =  request.params.id

    pool.query('DELETE FROM ticket WHERE ticket_id = $1', [ticket_id], (error, result)=> {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket deleted with ID: ${ticket_id}`)
    })
}

// TICKET_CLASS - UPDATE : getTicketClassById become branched!
const getTicketClass = (request, response) => {
    pool.query('SELECT * FROM ticket_class', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getTicketClassById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM ticket_class WHERE tc_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }

        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM ticket_class WHERE tc_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }

            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createTicketClass = (request, response) => {
    const { tc_id, tc_name } = request.body

    pool.query('INSERT INTO ticket_class (tc_id, tc_name) VALUES ($1, $2)', [tc_id, tc_name],(error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Class added with ID: ${tc_id}`)
    })
}

const updateTicketClass = (request, response) => {
    const tc_id = request.params.id
    const { tc_name } = request.body

    pool.query('UPDATE ticket_class SET tc_name = $1 WHERE tc_id = $2', [tc_name, tc_id], (error, result) =>{
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket Class modified with ID: ${tc_id}`)
    })
}

const deleteTicketClass = (request, response) => {
    const tc_id = request.params.id

    pool.query('DELETE FROM ticket_class WHERE tc_id = $1', [tc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket deleted with ID: ${tc_id}`)
    })
}

// TICKET_USER
const getTicketUser = (request, response) => {
    pool.query('SELECT * FROM ticket_user', (error, results) => {
        if(error)
        {
            throw error
        }

        response.status(200).json(results.rows)
    })
}

const getTicketUserById = (request, response) => {
    const { _order, _qparam } = request.body
    
    if (_order == 1) //query by user_id
    {
        pool.query('SELECT * FROM ticket_user WHERE user_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by ticket_id
    {
        pool.query('SELECT * FROM ticket_user WHERE ticket_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createTicketUser = (request, response) => {
    const { user_id, ticket_id } = request.body

    pool.query('INSERT INTO ticket_user (user_id, ticket_id) VALUES ($1, $2)', [user_id, ticket_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Ticket User added with ID: ${user_id}`)
    })
}

const updateTicketUser = (request, response) => {
    const user_id = request.params.id
    const { ticket_id } = request.body

    pool.query('UPDATE ticket_user SET ticket_id = $1 WHERE user_id = $2', [ticket_id, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket User modified with ID: ${user_id}`)
    })
}

const deleteTicketUser = (request, response) => {
    const user_id = request.params.id

    pool.query('DELETE FROM ticket_user WHERE user_id = $1', [user_id], (error, result) => {
        if (error)
        {
            throw error
        }

        response.status(200).send(`Ticket User deleted with ID: ${user_id}`)
    })
}

// USER_BUSINESS - CHANGE IN GET
const getUserBusiness = (request, response) => {
    pool.query('SELECT * FROM user_business', (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }

    })
}

const getUserBusinessById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM user_business WHERE ub_name LIKE $%1$', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by industry category
    {
        pool.query('SELECT * FROM user_business WHERE ub_industry LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 3) //query by id
    {
        pool.query('SELECT * FROM user_business WHERE ub_id = $1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createUserBusiness = (request, response) => {
    const { ub_id, ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio } = request.body

    pool.query('INSERT INTO user_business (ub_id, ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio) VALUES ($1, $2, $3, $4, $5, $6)', [ub_id, ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`User Business added with ID: ${ub_id}`)
    })
}

const updateUserBusiness = (request, response) => {
    const ub_id = request.params.id
    const { ub_name } = request.body

    pool.query('UPDATE user_business SET ub_name = $1 WHERE ub_id = $2', [ub_name, ub_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Business modified with ID: ${ub_id}`)
    })
}

const deleteUserBusiness = (request, response) => {
    const ub_id = request.params.id

    pool.query('DELETE FROM user_business WHERE ub_id = $1', [ub_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Business deleted with ID: ${ub_id}`)
    })
}

// USER_LEVEL
const getUserLevel = (request, response) => {
    pool.query('SELECT * FROM user_level', (error, results) => {
        if(error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getUserLevelById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM user_level WHERE ul_name LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM user_level WHERE ul_id = %1', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createUserLevel = (request, response) => {
    const { ul_id, ul_name } = request.body
    
    pool.query('INSERT INTO user_level (ul_id, ul_name) VALUES ($1, $2)', [ul_id, ul_name], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`User Level added with ID: ${ul_id}`)
    })
}

const updateUserLevel = (request, response) => {
    const ul_id = request.params.id
    const { ul_name } = request.body

    pool.query('UPDATE user_level SET ul_name = $1 WHERE ul_id = $2', [ul_name, ul_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Level modified with ID: ${ul_id}`)
    })
}

const deleteUserLevel = (request, response) => {
    const ul_id = request.params.id

    pool.query('DELETE FROM user_level WHERE ul_id = $1', [ul_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Level deleted with ID: ${ul_id}`)
    })
}

// USERS
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error)
        {
            throw error
        }
        
        if (results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getUsersById = (request, response) => {
    const { _order, _qparam } = request.body

    if(_order == 1) //query by email
    {
        pool.query('SELECT * FROM users WHERE user_email LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    } 
    else if (_order == 2) //query by username
    {
        pool.query('SELECT * FROM users WHERE user_username LIKE %$1%', [_qparam], 
        (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
    else_if (_order == 3) //query by fullname
    {
        pool.query('SELECT * FROM users WHERE user_fullname LIKE %$1%', [_qparam], (error, results) => {
            if(error)
            {
                throw error
            }
            
            if (results.rowCount == 0)
            {
                response.status(200).json({message: 'No Data Found'})
            }
            else
            {
                response.status(200).json(results.rows)
            }
        })
    }
}

const createUsers = (request, response) => {
   const { user_id, user_email, user_username, user_fullname, user_admin_status, ul_id, ub_id, inbox_id, user_status_premium, user_password } = request.body

   pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10)', [user_id, user_email, user_username, user_fullname, user_admin_status, ul_id, ub_id, inbox_id, user_status_premium, user_password], (error, result) => {
       if(error)
       {
           throw error
       }
       else
       {
           response.status(200).json({message: 'User sucessfully inserted'})
       }

   })
}

const updateUsers = (request, response) => {
    const user_id = request.params.id
    const {user_email} = request.body

    pool.query('UPDATE users SET user_email = $1 WHERE user_id = $2', [user_email, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User modified with ID: ${user_id}`)
    })
}

const deleteUsers = (request, response) => {
    const user_id = request.params.id

    pool.query('DELETE FROM user WHERE user_id = $1', [user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User deleted with ID: ${user_id}`)
    })
}

// LOGIN
const checkUser = (request, response) => {
    const { user_email, user_password } = request.body

    pool.query('SELECT * FROM users WHERE user_email = $1 AND user_password = $2', [user_email, user_password], (error, results) => {
        if(error)
        {
            throw error
        }

        if (results.rowCount == 1)
        {
            response.status(200)
        }
        else
        {
            response.status(200).json({message: 'No User Found'})
        }
    })
}

module.exports =
{
    // COURSE
    getCourse, 
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    // COURSE_FILE
    getCourseFile,
    getCourseFileById,
    createCourseFile,
    updateCourseFile,
    deleteCourseFile,
    // COURSE_LEVEL
    getCourseLevel,
    getCourseLevelById,
    createCourseLevel,
    updateCourseLevel,
    deleteCourseLevel,
    // COURSE_VIDEO
    getCourseVideo,
    getCourseVideoById,
    createCourseVideo,
    updateCourseVideo,
    deleteCourseVideo,
    // EVENT
    getEvent,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    // EVENT_TYPE
    getEventType,
    getEventTypeById,
    createEventType,
    updateEventType,
    deleteEventType,
    // INBOX
    getInbox,
    getInboxById,
    createInbox,
    updateInbox,
    deleteInbox,
    // NEWS
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
    // NEWS_CATEGORY
    getNewsCategory,
    getNewsCategoryById,
    createNewsCategory,
    updateNewsCategory,
    deleteNewsCategory,
    // NEWS_COMMENT
    getNewsComment,
    getNewsCommentById,
    createNewsComment,
    updateNewsComment,
    deleteNewsComment,
    // TICKET
    getTicket,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    // TICKET_CLASS
    getTicketClass,
    getTicketClassById,
    createTicketClass,
    updateTicketClass,
    deleteTicketClass,
    //TICKET_USER
    getTicketUser,
    getTicketUserById,
    createTicketUser,
    updateTicketUser,
    deleteTicketUser,
    // USER_BUSINESS
    getUserBusiness,
    getUserBusinessById,
    createUserBusiness,
    updateUserBusiness,
    deleteUserBusiness,
    // USER_LEVEL
    getUserLevel,
    getUserLevelById,
    createUserLevel,
    updateUserLevel,
    deleteUserLevel,
    // USERS
    getUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    //LOGIN
    checkUser
}