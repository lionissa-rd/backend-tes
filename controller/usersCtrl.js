var { pool } = require('../pool')

// USERS
const getUsers = (request, response) => {
    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users', (error, results) => {
        if(error)
        {
           return response.status(500).json({
               "success": false,
               "message": "Server error"
           });
        }

        if (results.rowCount == 0)
        {
            // response.status(200).json({message: 'No Data Found'})
            return response.status(200).json({
                "success": true,
                "data": {},
                "message": "No data available"
            });
        }
        else
        {
            // response.status(200).json(results.rows)
            return response.status(200).json({
                "success": true,
                "data": results.rows
            });
        }
    })
}

const getUsersByEmail = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_email = $1', [_qparam], (error, results) => {
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

const getUsersByUsername = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_username = $1', [_qparam], (error, results) => {
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

const getUsersByFirstName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_first_name = $1', [_qparam], (error, results) => {
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

const getUsersByLastName = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_last_name = $1', [_qparam], (error, results) => {
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

// const createUsers = (request, response) => {
//    const { user_email, user_username, user_fullname, user_admin_status, ul_id, ub_id, inbox_id, user_status_premium, user_password } = request.body
//    var _currentid;

//    pool.query('SELECT * FROM users ORDER BY user_id DESC LIMIT 1', (error, result) => {
//        if(result.rowCount == 0)
//        {
//            _currentid = "US0001";
//        }
//        else
//        {
//            var currentphase = result.rows[0].user_id;
//            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
//            _currentid = "US" + String(currentnumber).padStart(4, '0');
//        }

//    pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10)', [_currentid, user_email, user_username, user_fullname, user_admin_status, ul_id, ub_id, inbox_id, user_status_premium, user_password], (error, result) => {
//        if(error)
//        {
//            throw error
//        }
//        else
//        {
//            response.status(200).json({message: 'User sucessfully inserted'})
//        }
//    })
//  })
// }

const updateUsers = (request, response) => {
    const {user_id, user_email} = request.body

    pool.query('UPDATE users SET user_email = $1 WHERE user_id = $2', [user_email, user_id], (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        //response.status(200).send(`User modified with ID: ${user_id}`)
        response.status(200).json({
            "success": true,
            "message": "User has been modified"
        });
    })
}

const deleteUsers = (request, response) => {
    const {user_id} = request.body

    pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, result) => {
        if(error)
        {
            return response.status(500).json({
                "success": false,
                "message": "Server error"
            });
        }

        // response.status(200).send(`User deleted with ID: ${user_id}`)
        response.status(200).json({
            "success": true,
            "message": "User has been deleted"
        });
    })
}

module.exports = {
    // USERS
    getUsers,
    getUsersByEmail,
    getUsersByUsername,
    getUsersByFirstName,
    getUsersByLastName,
    updateUsers,
    deleteUsers
}