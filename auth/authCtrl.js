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
            pool.query('SELECT * FROM users ORDER BY user_id DESC LIMIT 1', (err, res) => {
                if (err) {
                    console.log(res)
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
        
                pool.query('INSERT INTO users (user_id, user_email, user_password, user_creation_date, user_first_name, user_last_name) VALUES ($1, $2, $3, NOW(), $4, $5)', [_currentid, email, password, first_name, last_name], (err, res) => {
                    if (err) return res.status(500).json({
                        "success": false,
                        "message": "Server error!"
                    });
        
                    pool.query('SELECT * FROM users WHERE user_email = $1', [email], (err, res) => {
                        if (err) return res.status(500).json({
                            "success": false,
                            "message": "Server error!"
                        });

                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jwt.sign({ id: _currentid }, config.secret, {
                            expiresIn: expiresIn
                        });

                        response.status(200).json({
                            "success": true,
                            "auth": true, 
                            "token": accessToken});
                    });
                });
            });
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
                    "expires_in":  expiresIn});
            }
        });
    }
}

module.exports = {
    register,
    login
}