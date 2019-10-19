var { pool } = require('../pool')

// FORUM
const getForum = (request, response) => {
    pool.query('SELECT * FROM forum', (error, results) =>{
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

const getForumByLatest = (request, response) => {
    pool.query('SELECT * FROM forum ORDER BY forum_creation_date DESC LIMIT 3', (error, results) =>{
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

const getForumById = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM forum WHERE forum_id = $1', [_qparam], (error, results) => {
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

const getForumByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM forum WHERE forum_title = $1', [_qparam], (error, results) => {
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

const createForum = (request, response) => {
    const { forum_title, forum_content, forum_img, forum_category } = request.body
    var _currentid;

    pool.query('SELECT * FROM course ORDER BY course_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "FR0001";
        }
        else
        {
            var currentphase = result.rows[0].course_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "FR" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO forum (forum_id, forum_title, forum_creation_date, forum_content, forum_img, forum_category) VALUES ($1, $2, NOW(), $3, $4, $5)', [_currentid, forum_title, forum_content, forum_img, forum_category], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(201).json({
            "success": true,
            "message": "Forum has been added"
        });
      })
    })
}

const updateForum = (request, response) => {
    const {forum_id, forum_title, forum_content} = request.body

    pool.query('UPDATE forum SET forum_title = $1 WHERE forum_id = $2', [forum_title, forum_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }
        else
        {
            pool.query('UPDATE forum SET forum_content = $1 WHERE forum_id = $2', [forum_content, forum_id], (error, result) =>{
                if(error)
                {
                    return response.status(500).json({
                        "success": false,
                        "message": "Server error"
                    });
                }
        
                response.status(200).json({
                    "success": true,
                    "message": "Forum has been modified"
                })
            })
        }
    })

    
}

const deleteForum = (request, response) => {
    const {forum_id} = request.body

    pool.query('DELETE FROM forum WHERE forum_id = $1', [forum_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(200).json({
            "success": true,
            "message": "Forum has been deleted"
        })
    })
}

module.exports = 
{
    getForum,
    getForumByLatest,
    getForumById,
    getForumByName,
    createForum,
    updateForum,
    deleteForum
}