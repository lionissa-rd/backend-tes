var { pool } = require('../pool')

// NEWS
const getNews = (request, response) => {
    pool.query('SELECT * FROM news', (error, results) => {
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

const getNewsById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM news WHERE news_title LIKE %$1%', [_qparam], (error, results) => {
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
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM news WHERE news_id = $1', [_qparam], (error, results) => {
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
            throw error
        }

        response.status(201).send(`News added with ID: ${_currentid}`)
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
                throw error
            }

            response.status(200).send(`News modified with ID: ${news_id}`)
        })
}

const deleteNews = (request, response) => {
    const news_id = request.params.id

    pool.query('DELETE FROM news WHERE news_id = $1', [news_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News deleted with ID: ${news_id}`)
    })
}

module.exports = {
    // NEWS
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
}