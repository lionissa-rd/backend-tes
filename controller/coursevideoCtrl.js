var { pool } = require('../pool')

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

const getCourseVideoByName = (request, response) => {
    const _qparam = request.params.id
    
    pool.query('SELECT * FROM course_video WHERE cv_title = $1', [_qparam], (error, results) => {
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

const createCourseVideo = (request, response) => {
    const { cv_title, cv_link } = request.body
    var _currentid;

    pool.query('SELECT * FROM course_video ORDER BY cv_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "CV0001";
        }
        else
        {
            var currentphase = result.rows[0].cv_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "CV" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO course_video (cv_id, cv_title, cv_link) VALUES ($1, $2, $3, $4)', [_currentid, cv_title, cv_link], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Video added with ID: ${_currentid}`)
    })
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

module.exports = {
    // COURSE_VIDEO
    getCourseVideo,
    getCourseVideoByName,
    createCourseVideo,
    updateCourseVideo,
    deleteCourseVideo
}