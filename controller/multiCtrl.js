var { pool } = require('../pool')

// myAccountScene
const accountScene = (request, response) => {
    //getUser
    console.log(request.id);
    pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_id = $1', [request.id], (err, res) => {
        if (err) return response.status(500).json({
            "success": false,
            "message": "Server error"
        });

        if (!response) 
        {
            return response.status(404).json({
                "success": false,
                "message": "User not found"
            })
        }
        else
        {
            return response.status(200).json({
                "success": true,
                "data": res.rows
            });
        } 
    });
}

//homeScene
const homeScene = (request, response) => {
    //event sort latest by date.
    pool.query('SELECT * FROM event ORDER BY event_date DESC LIMIT 3', (err, res) => {
        if(err) return response.status(500).json({
            "success": false,
            "message": "Server not found"
        });

        if(!res)
        {
            return response.status(404).json({
                "success": false,
                "message": "Event not found"
            });
        }
        else
        {
            console.log(res.rows);
            pool.query('SELECT user_email, user_username, user_creation_date, ub_id, inbox_id, user_avatar, user_first_name, user_last_name, user_role, user_membership FROM users WHERE user_id = $1', [request.id], (err, results) => {
                if (err) return response.status(500).json({
                    "success": false,
                    "message": "Server not found"
                });

                if(!results)
                {
                    return response.status(404).json({
                        "success": false,
                        "message": "User not found"
                    });
                }
                else
                {
                    console.log(results.rows);
                    return response.status(200).json({
                        "success": true, 
                        "event": res.rows, 
                        "user": results.rows
                    });
                }
            });
        }
    });
}

module.exports = {
    accountScene,
    homeScene
}