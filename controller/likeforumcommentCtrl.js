var { pool } = require('../pool')

// LIKE FORUM'S COMMENT
const getLikeForumComment = (request, response) => {
    const fc_id = request.params.id

    pool.query('SELECT COUNT(*) FROM likes_forum_comment WHERE fc_id = $1', [fc_id], (error, results) =>{
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

const createLikeForumComment = (request, response) => {
    const {forum_id, fc_id, user_id} = request.body
    var _currentid;

    pool.query('SELECT * FROM likes_forum_comment ORDER BY lfc_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "LC0001";
        }
        else
        {
            var currentphase = result.rows[0].course_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "LC" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO likes_forum_comment (lfc_id, forum_id, fc_id, user_id) VALUES ($1, $2, $3, $4)', [_currentid, forum_id, fc_id, user_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(201).json({
            "success": true,
            "message": "Like for Forum's Comment has been added"
        });
      })
    })
}

// harus ganti POST
const deleteLikeForumComment = (request, response) => {
    const {user_id, fc_id } = request.body

    pool.query('DELETE FROM likes_forum_comment WHERE user_id = $1 AND fc_id = $2', [user_id, fc_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(200).json({
            "success": true,
            "message": "Like for Forum's Comment has been deleted"
        })
    })
}

module.exports = 
{
    getLikeForumComment,
    createLikeForumComment,
    deleteLikeForumComment
}
