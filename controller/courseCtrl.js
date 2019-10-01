var { pool } = require('../pool')

// COURSE
const getCourse = (request, response) => {
    pool.query('SELECT * FROM course', (error, results) =>{
        if (error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        if (results.rowCount == 0)
        {
            return response.status(200).json({
                "success": true,
                "data": {},
                "message": "No data available"
            });
        }
        else
        {
            return response.status(200).json({
                "success": true,
                "data": results.rows
            });
        }
    })
}

const getCourseById = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM course WHERE course_id = $1', [_qparam], (error, results) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        if(results.rowCount == 0)
        {
            return response.status(200).json({
                "success": true,
                "data": {},
                "message": "No data available"
            });
        }
        else
        {
            return response.status(200).json({
                "success": true,
                "data": results.rows
            });
        }
    })
}

const getCourseByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM course WHERE course_name = $1', [_qparam], (error, results) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        if(results.rowCount == 0)
        {
            return response.status(200).json({
                "success": true,
                "data": {},
                "message": "No data available"
            });
        }
        else
        {
            return response.status(200).json({
                "success": true,
                "data": results.rows
            });
        }
    })
}

const createCourse = (request, response) => {
    const { course_name, course_desc, cl_id, cv_id, ul_id } = request.body
    var _currentid;

    pool.query('SELECT * FROM course ORDER BY course_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "CR0001";
        }
        else
        {
            var currentphase = result.rows[0].course_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "CR" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO course (course_id, course_name, course_desc, cl_id, cf_id, cv_id, ul_id) VALUES ($1, $2, $3, $4, $6, $7)', [_currentid, course_name, course_desc, cl_id, cv_id, ul_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(201).send(`Course added with ID: ${_currentid}`)
        response.status(201).json({
            "success": true,
            "message": "Course has been added"
        });
      })
    })


}

const updateCourse = (request, response) => {
    const course_id = request.params.id
    const {course_name} = request.body

    pool.query('UPDATE course SET course_name = $1 WHERE course_id $2', [course_name, course_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(200).send(`Course modified with ID: ${course_id}`)
        response.status(200).json({
            "success": true,
            "message": "Course has been modified"
        })
    })
}

const deleteCourse = (request, response) => {
    const course_id = request.params.id

    pool.query('DELETE FROM course WHERE course_id = $1', [course_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(200).send(`Course deleted with ID: ${course_id}`)
        response.status(200).json({
            "success": true,
            "message": "Course has been deleted"
        })
    })
}

module.exports = {
    getCourse,
    getCourseById,
    getCourseByName,
    createCourse,
    updateCourse,
    deleteCourse
}