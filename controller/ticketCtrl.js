var { pool } = require('../pool')

// TICKET
const getTicket = (request, response) => {
    pool.query('SELECT * FROM ticket', (error, results) =>{
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

const getTicketById = (request, response) => {
    const ticket_id = request.params.id

    pool.query('SELECT * FROM ticket WHERE ticket_id = $1', [ticket_id], (error, result) => {
        if (error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        if (result.rowCount == 0)
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

const getTicketByUser = (request, response) => {
    const user_id = request.params.id

    pool.query('SELECT * FROM ticket WHERE user_id = $1', [user_id], (error, result) => {
        if (error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        if (result.rowCount == 0)
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

const createTicket = (request, response) => {
    const { user_id, event_id, ticket_qty } = request.body
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

        pool.query('INSERT INTO ticket (ticket_id, user_id, event_id, ticket_qty, ticket_date) VALUES ($1, $2, $3, $4, NOW())', [_currentid, user_id, event_id, ticket_qty], (error, result) => {
            if (error)
            {
               return response.status(500).json({
                   "success": false,
                   "message": "Server error"
               });
            }

            //response.status(201).send(`Ticket added with ID: ${_currentid}`)
            response.status(201).json({
                "success": true,
                "message": "Ticket has been added"
            })
         })
    })
}

// const updateTicket = (request, response) => {
//     const ticket_id = request.params.id
//     const {ticket_name} = request.body

//     pool.query(
//         'UPDATE ticket SET ticket_name = $1 WHERE ticket_id = $2',
//         [ticket_name, ticket_id],
//         (error, result) => {
//             if (error)
//             {
//                 response.status(500).json({
//                     "success": false,
//                     "message": "Server error"
//                 });
//             }

//         //response.status(200).send(`Ticket modified with ID: ${ticket_id}`)
//         response.status(200).json({
//             "success": true,
//             "message": "Ticket has been modified"
//         });
//     })
// }

const deleteTicket = (request, response) => {
    const {ticket_id} =  request.body

    pool.query('DELETE FROM ticket WHERE ticket_id = $1', [ticket_id], (error, result)=> {
        if(error)
        {
            response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(200).send(`Ticket deleted with ID: ${ticket_id}`)
        response.status(200).json({
            "success": true,
            "message": "Ticket has been deleted"
        });
    })
}

module.exports = {
    // TICKET
    getTicket,
    getTicketById,
    getTicketByUser,
    createTicket,
    deleteTicket
}