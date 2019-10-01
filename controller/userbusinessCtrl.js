var { pool } = require('../pool')

// USER_BUSINESS - CHANGE IN GET
const getUserBusiness = (request, response) => {
    pool.query('SELECT * FROM user_business', (error, results) => {
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

const getUserBusinessByName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM user_business WHERE ub_name = $1', [_qparam], (error, results) => {
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

const getUserBusinessByIndustry = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM user_business WHERE ub_industry = $1', [_qparam], (error, result) => {
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

const createUserBusiness = (request, response) => {
    const { ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio } = request.body
    var _currentid;

    pool.query('SELECT * FROM user_business ORDER BY ub_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "UB0001";
        }
        else
        {
            var currentphase = result.rows[0].ub_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "UB" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO user_business (ub_id, ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio) VALUES ($1, $2, $3, $4, $5, $6)', [_currentid, ub_name, ub_industry, ub_staffnumber, ub_marketingsales, ub_bio], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`User Business added with ID: ${_currentid}`)
    })
  })
}

const updateUserBusiness = (request, response) => {
    const ub_id = request.params.id
    const { ub_name } = request.body

    pool.query('UPDATE user_business SET ub_name = $1 WHERE ub_id = $2', [ub_name, ub_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Business modified with ID: ${ub_id}`)
    })
}

const deleteUserBusiness = (request, response) => {
    const ub_id = request.params.id

    pool.query('DELETE FROM user_business WHERE ub_id = $1', [ub_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`User Business deleted with ID: ${ub_id}`)
    })
}

module.exports = {
    // USER_BUSINESS
    getUserBusiness,
    getUserBusinessByName,
    getUserBusinessByIndustry,
    createUserBusiness,
    updateUserBusiness,
    deleteUserBusiness
}