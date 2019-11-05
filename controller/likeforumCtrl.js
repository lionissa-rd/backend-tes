var { pool } = require('../pool')

// LIKE FORUM
const getLikeForum = (request, response) => {
    const forum_id = request.params.id

    pool.query('SELECT COUNT(*) FROM likes_forum WHERE forum_id = $1', [forum_id], (error, results) =>{
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
                "data": response.rows
            });
        }
    })
}

const createLikeForum = (request, response) => {
    const {forum_id} = request.body
    var _currentid;

    pool.query('SELECT * FROM likes_forum ORDER BY lf_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "LF0001";
        }
        else
        {
            var currentphase = result.rows[0].course_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "LF" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO likes_forum (lc_id, forum_id, user_id) VALUES ($1, $2, $3)', [_currentid, forum_id, request.id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(201).json({
            "success": true,
            "message": "Like for Forum has been added"
        });
      })
    })
}

// harus ganti POST
const deleteLikeForum = (request, response) => {
    const {forum_id} = request.body

    pool.query('DELETE FROM likes_forum WHERE user_id = $1 AND forum_id = $2', [request.id, forum_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(200).json({
            "success": true,
            "message": "Like for Forum has been deleted"
        })
    })
}

module.exports = 
{
    getLikeForum,
    createLikeForum,
    deleteLikeForum
}