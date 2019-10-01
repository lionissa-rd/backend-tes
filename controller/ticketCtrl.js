var { pool } = require('../pool')

// TICKET
const getTicket = (request, response) => {
    pool.query('SELECT * FROM ticket', (error, results) =>{
        if (error)
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

const getTicketById = (request, response) => {
    const ticket_id = request.params.id

    pool.query('SELECT * FROM ticket WHERE ticket_id = $1', [ticket_id], (error, result) => {
        if (error)
        {
            throw error
        }

        if (result.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getTicketByName = (request, response) => {
    const ticket_name = request.params.id

    pool.query('SELECT * FROM ticket WHERE ticket_name = $1', [ticket_name], (error, result) => {
        if(error)
        {
            throw error
        }

        if(result.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const createTicket = (request, response) => {
    const { ticket_name, tc_id } = request.body
    var _currentid;

    pool.query('SELECT * FROM ticket ORDER BY ticket_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "TI0001";
        }
        else
        {
            var currentphase = result.rows[0].ticket_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "TI" + String(currentnumber).padStart(4, '0');
        }

        pool.query('INSERT INTO ticket (ticket_id, ticket_name, ticket_date, tc_id) VALUES ($1, $2, NOW(), $3)', [_currentid, ticket_name, tc_id], (error, result) => {
            if (error)
            {
                throw error;
            }

            response.status(201).send(`Ticket added with ID: ${_currentid}`)
         })
    })
}

const updateTicket = (request, response) => {
    const ticket_id = request.params.id
    const {ticket_name} = request.body

    pool.query(
        'UPDATE ticket SET ticket_name = $1 WHERE ticket_id = $2',
        [ticket_name, ticket_id],
        (error, result) => {
            if (error)
            {
                throw error
            }

        response.status(200).send(`Ticket modified with ID: ${ticket_id}`)
    })
}

const deleteTicket = (request, response) => {
    const ticket_id =  request.params.id

    pool.query('DELETE FROM ticket WHERE ticket_id = $1', [ticket_id], (error, result)=> {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket deleted with ID: ${ticket_id}`)
    })
}

module.exports = {
    // TICKET
    getTicket,
    getTicketById,
    getTicketByName,
    createTicket,
    updateTicket,
    deleteTicket
}