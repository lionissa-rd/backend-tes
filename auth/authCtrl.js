const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')
var { pool } = require('../pool')

// REGISTER
const register = (request, response) => {
    const email = request.body.userEmail
    const password = bcrypt.hashSync(String(request.body.userPassword))
    const first_name = request.body.userFirstName
    const last_name = request.body.userLastName
    var _message = "Welcome to The Entepreneur Society, " + first_name + " " + last_name;
    var _currentid;
    var user_id;
    var current_time;

    if(!email || !password || !first_name || !last_name)
    {
        response.status(200).json({
            "success": false,
            "auth": false,
            "message": "Please fill all required fields!"
        });
        return;
    }

    pool.query('SELECT * FROM users WHERE user_email = $1', [email], (err, res) => {
        if (err)
        {
            console.log(res)
        }

        if(res.rowCount !== 0)
        {
            return response.status(200).json({
                "success": false,
                "auth": false,
                "message": "Email is already exist"
            });
        }
        else
        {
            pool.query('SELECT NOW() AT TIME ZONE \'Asia/Jakarta\'', (err, res) => {
                if (err)
                {
                    return res.status(500).json({
                        "success": false,
                        "message": "Server error!"
                    });
                }
                else
                {
                    current_time = res.rows[0].timezone;
                    pool.query('SELECT * FROM users ORDER BY user_id DESC LIMIT 1', (err, res) => {
                        if (err) {
                            return res.status(500).json({
                                    "success": false,
                                    "message": "Server error!"
                                });
                        }
                
                        if (res.rowCount == 0) {
                            _currentid = "US0001";
                        }
                        else {
                            var currentphase = res.rows[0].user_id;
                            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
                            _currentid = "US" + String(currentnumber).padStart(4, '0');
                        }
                        console.log(_currentid);
        
                        user_id = _currentid
                
                        pool.query('INSERT INTO users (user_id, user_email, user_password, user_creation_date, user_first_name, user_last_name) VALUES ($1, $2, $3, $4, $5, $6)', [_currentid, email, password, current_time, first_name, last_name], (err, res) => {
                            if (err) {
                                return res.status(500).json({
                                    "success": false,
                                    "message": "Server error!"
                                });
                            }
                
                            pool.query('SELECT * FROM users WHERE user_email = $1', [email], (err, res) => {
                                if (err) return res.status(500).json({
                                    "succcess": false,
                                    "message": "Server error!"
                                });
        
                                const expiresIn = 24 * 60 * 60;
                                const accessToken = jwt.sign({ id: _currentid }, config.secret, {
                                    expiresIn: expiresIn
                                });
        
                                
                                //adding a message to inbox
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
                            
                                    pool.query('INSERT INTO inbox (inbox_id, inbox_msg, inbox_datetime, user_id) VALUES ($1, $2, $3, $4)', [_currentid, _message, current_time, user_id], (error, result) => {
                                        if(error)
                                        {
                                            return response.status(500).json({
                                                "success": false,
                                                "message": "Server error"
                                            });
                                        }
                                
                                            // response.status(201).json({
                                            //     "success": true,
                                            //     "message": "Inbox has been added"
                                            // })
        
                                            response.status(200).json({
                                                "success": true,
                                                "auth": true, 
                                                "token": accessToken
                                            });
                                        });
                                });
                            });
                        });
                    });

                }
            })
            
        }
    });
}

// LOGIN
const login = (request, response) => {
    const email = request.body.userEmail
    var password = request.body.userPassword

    if(!email || !password)
    {
        return response.status(200).json({
            "success": false,
            "auth": false,
            "message": "Please fill all required fields!"
        });
    }
    else if (email.length > 0 && password.length > 0 && email != undefined && password != undefined)
    {
        var password = bcrypt.hashSync(String(password))
        pool.query('SELECT * FROM users WHERE user_email = $1', [email], (err, res) => {
            const  result  =  bcrypt.compare(password, String(res.rows[0].user_password));
            if(!result) return  response.status(401).json({
                "success": false,
                "auth": false,
                "message": "Invalid Password/Username"
            });

            if (err) return  response.status(500).json({
                "success": false,
                "message": "Server error"
            });

            if (!res) return  response.status(404).json({
                "success": false,
                "message": "User not found"
            });

            if (res.rowCount == 0 || !result) 
            {
                return  response.status(404).json({
                    "success": false,
                    "auth": false,
                    "message": "User not found"
                });
            } 
            else
            {
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ id:  res.rows[0].user_id }, config.secret, {
                    expiresIn:  expiresIn
                });
    
                response.status(200).json({ 
                    "success": true,
                    "auth": true,
                    "access_token":  accessToken, 
                    "expires_in":  expiresIn
                });
            }
        });
    }
}

module.exports = {
    register,
    login
}