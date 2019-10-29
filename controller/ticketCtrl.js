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
    var _message1 = "Ticket for event ";
    var _message2 = " has been bought!";
    var current_time;

    pool.query('SELECT NOW() AT TIME ZONE \'Asia/Jakarta\'', (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }
        else
        {
            current_time = result.rows[0].timezone;
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
                
                pool.query('INSERT INTO ticket (ticket_id, user_id, event_id, ticket_qty, ticket_date) VALUES ($1, $2, $3, $4, $5)', [_currentid, user_id, event_id, ticket_qty, current_time], (error, result) => {
                    if (error)
                    {
                       return response.status(500).json({
                           "success": false,
                           "message": "Server error"
                       });
                    }
        
                    //response.status(201).send(`Ticket added with ID: ${_currentid}`)
                    // response.status(201).json({
                    //     "success": true,
                    //     "message": "Ticket has been added"
                    // });
        
                    pool.query('UPDATE event SET available_seat = available_seat - $1 WHERE event_id = $2', [ticket_qty, event_id], (error, result) => {
                        if(error)
                        {
                            return response.status(500).json({
                                "success": false,
                                "message": "Server error"
                            });
                        }
        
                        // response.status(201).json({
                        //     "success": true,
                        //     "message1": "Ticket has been added",
                        //     "message2": "Number of seat has been updated"
                        // });
                        pool.query('SELECT * from event WHERE event_id = $1', [event_id], (error, result) => {
                           if(error)
                           {
                               return response.status(500).json({
                                   "success": false,
                                   "message": "Server error"
                               });
                           }
                           
                           var _eventname = result.rows[0].event_name;
                           var _fullmessage = _message1 + _eventname + _message2;
                        
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
                    
                            pool.query('INSERT INTO inbox (inbox_id, inbox_msg, inbox_datetime, user_id) VALUES ($1, $2, $3, $4)', [_currentid, _fullmessage, current_time, user_id], (error, result) => {
                                if(error)
                                {
                                    return response.status(500).json({
                                        "success": false,
                                        "message": "Server error"
                                    });
                                }
                    
                                    response.status(200).json({
                                        "success": true,
                                        "message": "Ticket has been successfully bought."
                                    });
                                });
                            });
                        });
                    });
                 });
            });
        }
    });

    
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