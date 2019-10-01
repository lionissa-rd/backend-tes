var { pool } = require('../pool')

// EVENT_TYPE
const getEventType = (request, response) => {
    pool.query('SELECT * FROM event_type', (error, results) => {
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

const getEventTypeById = (request, response) => {
    const { _order, _qparam } = request.body

    if (_order == 1) //query by name
    {
        pool.query('SELECT * FROM event_type WHERE et_name LIKE %$1%', [_qparam], (error, results) => {
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
    else if (_order == 2) //query by id
    {
        pool.query('SELECT * FROM event_type WHERE et_id = $1', [_qparam], (error, results) => {
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
}

const createEventType = (request, response) => {
    const { et_name, et_desc } = request.body
    var _currentid;

    pool.query('SELECT * FROM event_type ORDER BY et_id DESC LIMIT 1', (error, result) => {
        if(result.rowCount == 0)
        {
            _currentid = "ET0001";
        }
        else
        {
            var currentphase = result.rows[0].et_id;
            var currentnumber = parseInt(String(currentphase).substring(2, 6)) + 1;
            _currentid = "ET" + String(currentnumber).padStart(4, '0');
        }

    pool.query('INSERT INTO event_type (et_id, et_name, et_desc) VALUES ($1, $2, $3)', [_currentid, et_name, et_desc], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(201).send(`Event Type added with ID: ${_currentid}`)
    })
  })
}

const updateEventType = (request, response) => {
    const et_id = request.params.id
    const { et_name } = request.body

    pool.query('UPDATE event_type SET et_name = $1 WHERE et_id = $2', [et_name, et_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event Type modified with ID: ${et_id}`)
    })
}

const deleteEventType = (request, response) => {
    const et_id = request.params.id

    pool.query('DELETE FROm event_type WHERE et_id = $1', [et_id], (error, result) => {
        if(error)
        {
            throw error
        }

        response.status(200).send(`Event Type modified with ID: ${et_id}`)
    })
}

module.exports = {
     // EVENT_TYPE
     getEventType,
     getEventTypeById,
     createEventType,
     updateEventType,
     deleteEventType
}