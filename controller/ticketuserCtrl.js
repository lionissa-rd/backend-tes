var { pool } = require('../pool')

// TICKET_USER
const getTicketUser = (request, response) => {
    pool.query('SELECT * FROM ticket_user', (error, results) => {
        if(error)
        {
            throw error
        }

        response.status(200).json(results.rows)
    })
}

const getTicketUserById = (request, response) => {
    const { _order, _qparam } = request.body
    
    if (_order == 1) //query by user_id
    {
        pool.query('SELECT * FROM ticket_user WHERE user_id = $1', [_qparam], (error, results) => {
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
    else if (_order == 2) //query by ticket_id
    {
        pool.query('SELECT * FROM ticket_user WHERE ticket_id = $1', [_qparam], (error, results) => {
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

const createTicketUser = (request, response) => {
    const { user_id, ticket_id } = request.body
    // tidak generate id karena kedua isinya foreign key yg nunjuk ke masing-masing table yang diunjuk
    pool.query('INSERT INTO ticket_user (user_id, ticket_id) VALUES ($1, $2)', [user_id, ticket_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Ticket User added with ID: ${user_id}`)
    })
}

const updateTicketUser = (request, response) => {
    const user_id = request.params.id
    const { ticket_id } = request.body

    pool.query('UPDATE ticket_user SET ticket_id = $1 WHERE user_id = $2', [ticket_id, user_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket User modified with ID: ${user_id}`)
    })
}

const deleteTicketUser = (request, response) => {
    const user_id = request.params.id

    pool.query('DELETE FROM ticket_user WHERE user_id = $1', [user_id], (error, result) => {
        if (error)
        {
            throw error
        }

        response.status(200).send(`Ticket User deleted with ID: ${user_id}`)
    })
}

module.exports = {
    //TICKET_USER
    getTicketUser,
    getTicketUserById,
    createTicketUser,
    updateTicketUser,
    deleteTicketUser
}