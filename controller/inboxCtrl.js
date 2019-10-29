var { pool } = require('../pool')

// INBOX
const getInbox = (request, response) => {
    pool.query('SELECT * FROM inbox', (error, results) => {
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

const getInboxById = (request, response) => {
    const user_id = request.params.id

    pool.query('SELECT * FROM inbox WHERE user_id = $1', [user_id], (error, results) => {
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

const createInbox = (request, response) => {
    const { inbox_msg, user_id } = request.body
    var _currentid;
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
        
                pool.query('INSERT INTO inbox (inbox_id, inbox_msg, inbox_datetime, user_id) VALUES ($1, $2, $3, $4)', [_currentid, inbox_msg, current_time, user_id], (error, result) => {
                    if(error)
                    {
                        return response.status(500).json({
                            "success": false,
                            "message": "Server error"
                        });
                    }
            
                        response.status(201).json({
                            "success": true,
                            "message": "Inbox has been added"
                        });
                    });
            });
        }
    })

    
}

// const updateInbox = (request, response) => {
//     const {  inbox_id, inbox_msg } = request.body

//     pool.query('UPDATE inbox SET inbox_msg = $1 WHERE inbox_id = $2', [inbox_msg, inbox_id], (error, result) => {
//         if(error)
//         {
//             return response.status(500).json({
//                 "success": false,
//                 "message": "Server error"
//             });
//         }

//         response.status(200).json({
//             "success": true,
//             "message": "Inbox has been modified"
//         });
//     })
// }

const deleteInbox = (request, response) => {
    const {inbox_id} = request.body

    pool.query('DELETE FROM inbox WHERE inbox_id = $1', [inbox_id], (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        response.status(200).json({
            "success": true,
            "message": "Inbox has been deleted"
        });
    })
}

module.exports = {
    // INBOX
    getInbox,
    getInboxById,
    createInbox,

    deleteInbox
}