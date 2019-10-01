var { pool } = require('../pool')

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

const getCourseFileByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM course_file WHERE cf_title = $1', [_qparam], (error, results) => {
        if(error)
        {
            throw error
        }

        if(results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const createCourseFile = (request, response) => {
    const { cf_title, cf_data } = request.params.id
    var _currentid;

    pool.query('SELECT * FROM course_file ORDER BY cf_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "CF0001";
        }
        else
        {
            var currentphase = result.rows[0].cf_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "CF" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO course_file (cf_id, cf_title, cf_data) VALUES ($1, $2, $3)', [_currentid, cf_title, cf_data], (error, result) => {
        if (error)
        {
            throw error
        }

        response.status(201).send(`Course File added with ID: ${_currentid}`)
    })
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

module.exports = {
    // COURSE_FILE
    getCourseFile,
    getCourseFileByName,
    createCourseFile,
    updateCourseFile,
    deleteCourseFile
}