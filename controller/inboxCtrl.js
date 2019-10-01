var { pool } = require('../pool')

// INBOX
const getInbox = (request, response) => {
    pool.query('SELECT * FROM inbox', (error, results) => {
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

const getInboxById = (request, response) => {
    const inbox_id = request.params.id

    pool.query('SELECT * FROM inbox WHERE inbox_id = $1', [inbox_id], (error, results) => {
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

const createInbox = (request, response) => {
    const { inbox_msg, inbox_datetime, user_id } = request.body
    var _currentid;

    pool.query('SELECT * FROM inbox ORDER BY inbox_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "IN0001";
        }
        else
        {
            var currentphase = result.rows[0].inbox_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "IN" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO inbox (inbox_id, inbox_msg, inbox_datetime, user_id) VALUES ($1, $2, $3, $4)', [_currentid, inbox_msg, inbox_datetime, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Inbox added with ID: ${_currentid}`)
        })
    })
}

const updateInbox = (request, response) => {
    const inbox_id = request.params.id
    const { inbox_msg } = request.body

    pool.query('UPDATE inbox SET inbox_msg = $1 WHERE inbox_id = $2', [inbox_msg, inbox_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Inbox modified with ID: ${inbox_id}`)
    })
}

const deleteInbox = (request, response) => {
    const inbox_id = request.params.id

    pool.query('DELETE FROM inbox WHERE inbox_id = $1', [inbox_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Inbox deleted with ID: ${inbox_id}`)
    })
}

module.exports = {
    // INBOX
    getInbox,
    getInboxById,
    createInbox,
    updateInbox,
    deleteInbox
}