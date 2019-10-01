var { pool } = require('../pool')

// NEWS_CATEGORY
// *news category dan news belum ada hubungan?
const getNewsCategory = (request, response) => {
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

const getNewsCategoryById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM news_category WHERE nc_name LIKE %$1%', [_qparam], (error, results) => {
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
        pool.query('SELECT * FROM news_category WHERE nc_id = $1', [_qparam], (error, results) => {
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

const createNewsCategory = (request, response) => {
    const { nc_name } = request.body
    var _currentid;

    pool.query('SELECT * FROM news_category ORDER BY nc_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "NT0001";
        }
        else
        {
            var currentphase = result.rows[0].nc_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "NT" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO news_category (nc_id, nc_name) VALUES ($1, $2)', [_currentid, nc_name], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`News Category added with ID: ${_currentid}`)
    })
  })
}

const updateNewsCategory = (request, response) => {
    const nc_id = request.params.id
    const { nc_name } = request.body

    pool.query('UPDATE news_category SET nc_name = $1 WHERE nc_name = $2', [nc_name, nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Category with ID: ${nc_id}`)
    })
}

const deleteNewsCategory = (request, response) => {
    const nc_id = request.params.id

    pool.query('DELETE FROM news_category WHERE nc_id = $1', [nc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`News Category with ID: ${nc_id}`)
    })
}

module.exports = {
     // NEWS_CATEGORY
     getNewsCategory,
     getNewsCategoryById,
     createNewsCategory,
     updateNewsCategory,
     deleteNewsCategory
}