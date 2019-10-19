var { pool } = require('../pool')

// FORUM COMMENT
const getForumComment = (request, response) => {
    pool.query('SELECT * FROM forum_comment', (error, results) =>{
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

const getForumCommentById = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM forum_comment WHERE forum_id = $1 ORDER BY fc_creation_date DESC', [_qparam], (error, results) => {
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

const createForumComment = (request, response) => {
    const {fc_content, user_id, forum_id} = request.body
    var _currentid;

    pool.query('SELECT * FROM forum_comment ORDER BY fc_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "FC0001";
        }
        else
        {
            var currentphase = result.rows[0].course_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "FC" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO forum_comment (fc_id, fc_content, fc_creation_date, user_id, forum_id) VALUES ($1, $2, NOW(), $3, $4)', [_currentid, fc_content, user_id, forum_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(201).json({
            "success": true,
            "message": "Forum Comment has been added"
        });
      })
    })
}

const deleteForumComment = (request, response) => {
    const {fc_id} = request.body

    pool.query('DELETE FROM forum_comment WHERE fc_id = $1', [fc_id], (error, result) =>{
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(200).json({
            "success": true,
            "message": "Forum Comment has been deleted"
        })
    })
}

module.exports = 
{
    getForumComment,
    getForumCommentById,
    createForumComment,
    deleteForumComment
}