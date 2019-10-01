var { pool } = require('../pool')

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
    const { nc_content, nc_date, news_id, user_id } = request.body
    var _currentid;

    pool.query('SELECT * FROM news_comment ORDER BY nc_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "NM0001";
        }
        else
        {
            var currentphase = result.rows[0].nc_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "NM" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO news_comment (nc_id, nc_content, nc_date, news_id, user_id) VALUES ($1, $2, $3, $4, $5)', [_currentid, nc_content, nc_date, news_id, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`News Comment added with ID: ${_currentid}`)
    })
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

module.exports = {
     // NEWS_COMMENT
     getNewsComment,
     getNewsCommentById,
     createNewsComment,
     updateNewsComment,
     deleteNewsComment
}