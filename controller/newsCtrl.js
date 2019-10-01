var { pool } = require('../pool')

// NEWS
const getNews = (request, response) => {
    pool.query('SELECT * FROM news', (error, results) => {
        if(error)
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

const getNewsByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM news WHERE news_title = $1', [_qparam], (error, results) => {
        if(error)
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
            // response.status(200).json(results.rows)
            return response.status(200).json({
                "success": true,
                "data": result.rows
            })
        }
    })
}

const createNews = (request, response) => {
    const { news_title, news_content, news_date } = request.body
    var _currentid;

    pool.query('SELECT * FROM news ORDER BY news_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "NE0001";
        }
        else
        {
            var currentphase = result.rows[0].news_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "NE" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO news (news_id, news_title, news_content, news_date) VALUES ($1, $2, $3, $4)', [_currentid, news_title, news_content, news_date], (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        // response.status(201).send(`News added with ID: ${_currentid}`)
        response.status(201).json({
            "success": true,
            "message": "News has been added"
        });
    })
  })
}

const updateNews = (request, response) => {
    const news_id = request.params.id
    const { news_title } = request.body

    pool.query(
        'UPDATE news SET news_title = $1 WHERE news_id = $2', [news_title, news_id], (error, result) => {
            if(error)
            {
                return response.status(500).json({
                    "success": false,
                    "message": "Server error"
                });
            }

            //response.status(200).send(`News modified with ID: ${news_id}`)
            response.status(200).json({
                "success": true,
                "message": "News has been modified"
            })
        })
}

const deleteNews = (request, response) => {
    const news_id = request.params.id

    pool.query('DELETE FROM news WHERE news_id = $1', [news_id], (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(200).send(`News deleted with ID: ${news_id}`)
        response.status(200).json({
            "success": true,
            "message": "News has been deleted"
        })
    })
}

module.exports = {
    // NEWS
    getNews,
    getNewsByName,
    createNews,
    updateNews,
    deleteNews
}