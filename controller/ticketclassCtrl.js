var { pool } = require('../pool')

// TICKET_CLASS
const getTicketClass = (request, response) => {
    pool.query('SELECT * FROM ticket_class', (error, results) => {
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

const getTicketClassById = (request, response) => {
    const tc_id = request.params.id

    pool.query('SELECT * FROM ticket WHERE tc_id = $1', [tc_id], (error, result) => {
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

const getTicketClassByName = (request, response) => {
    const tc_name = request.params.id

    pool.query('SELECT * FROM ticket_class WHERE tc_name LIKE %$1%', [tc_name], (error, result) => {
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

const createTicketClass = (request, response) => {
    const { tc_name } = request.body
    var _currentid;

    pool.query('SELECT * FROM ticket_class ORDER BY tc_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "TC0001";
        }
        else
        {
            var currentphase = result.rows[0].tc_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "TC" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO ticket_class (tc_id, tc_name) VALUES ($1, $2)', [_currentid, tc_name],(error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Course Class added with ID: ${_currentid}`)
    })
  })
}

const updateTicketClass = (request, response) => {
    const tc_id = request.params.id
    const { tc_name } = request.body

    pool.query('UPDATE ticket_class SET tc_name = $1 WHERE tc_id = $2', [tc_name, tc_id], (error, result) =>{
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket Class modified with ID: ${tc_id}`)
    })
}

const deleteTicketClass = (request, response) => {
    const tc_id = request.params.id

    pool.query('DELETE FROM ticket_class WHERE tc_id = $1', [tc_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Ticket deleted with ID: ${tc_id}`)
    })
}

module.exports = {
     // TICKET_CLASS
     getTicketClass,
     getTicketClassById,
     getTicketClassByName,
     createTicketClass,
     updateTicketClass,
     deleteTicketClass
}