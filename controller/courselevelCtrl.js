var { pool } = require('../pool')

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

const getCourseLevelByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM course_level WHERE cf_title = $1', [_qparam], (error, results) => {
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

const createCourseLevel = (request, response) => {
    const { cl_name, cl_desc } = request.body

    var _currentid;

    pool.query('SELECT * FROM course_level ORDER BY cl_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "CL0001";
        }
        else
        {
            var currentphase = result.rows[0].cl_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "CL" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO course_level (cl_id, cl_name, cl_desc) VALUES ($1, $2, $3)', [_currentid, cl_name, cl_desc], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Level added with ID: ${_currentid}`)
    })
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

module.exports = {
    // COURSE_LEVEL
    getCourseLevel,
    getCourseLevelByName,
    createCourseLevel,
    updateCourseLevel,
    deleteCourseLevel
}