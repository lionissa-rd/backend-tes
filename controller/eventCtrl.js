var { pool } = require('../pool')

//EVENT
const getEvent = (request, response) => {
    pool.query('SELECT * FROM event', (error, results) => {
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

const getEventByName = (request, response) => {
    const _qparam = request.params.id
    
    pool.query('SELECT * FROM event WHERE event_name = $1', [_qparam], (error, results) => {
        if(error)
        {
            throw error
        }

        if(results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getEventByPrice = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM event WHERE event_price = $1', [_qparam], (error, results) => {
        if(error)
        {
            throw error
        }

        if(results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const getEventByLocation = (request, response) => {
    const _qparam = request.params.id

    pool.query('SELECT * FROM event WHERE event_location = $1', [_qparam], (error, results) => {
        if(error)
        {
            throw error
        }

        if(results.rowCount == 0)
        {
            response.status(200).json({message: 'No Data Found'})
        }
        else
        {
            response.status(200).json(results.rows)
        }
    })
}

const createEvent = (request, response) => {
    const { event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img } = request.body
    var _currentid;

    pool.query('SELECT * FROM event ORDER BY event_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "EV0001";
        }
        else
        {
            var currentphase = result.rows[0].event_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "EV" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO event (event_id, event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [_currentid, event_name, event_location, event_details, event_prize, ticket_id, et_id, event_img], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Event added with ID: ${_currentid}`)
    })
  })
}

const updateEvent = (request, response) => {
    const event_id = request.params.id
    const {event_name} = request.body

    pool.query(
        'UPDATE event SET event_name = $1 WHERE event_id = $2', [event_name, event_id],
        (error, result) => {
            if(error)
            {
                throw error
            }

            response.status(200).send(`Event modified with ID: ${event_id}`)
        }
    )
}

const deleteEvent = (request, response) => {
    const event_id = request.params.id

    pool.query('DELETE FROM event WHERE event_id = $1', [event_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event deleted with ID: ${event_id}`)
    })
}

module.exports = {
    // EVENT
    getEvent,
    getEventByName,
    getEventByLocation,
    createEvent,
    updateEvent,
    deleteEvent
}