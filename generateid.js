function generateid (_tableparam, _idparam, _idcodeparam) {
    var table = {
        course : 1,
        course_file : 2,
        course_level : 3,
        course_video : 4,
        event : 5,
        event_type : 6,
        inbox : 7,
        news : 8,
        news_category : 9,
        news_comment : 10,
        ticket : 11,
        ticket_class : 12,
        ticket_user : 13,
        user_business : 14,
        user_level : 15,
        users : 16
    };

    var _currentid;

    const db_table = [
        "course",
        "course_file",
        "course_level",
        "course_video",
        "event",
        "event_type",
        "inbox",
        "news",
        "news_category",
        "news_comment",
        "ticket",
        "ticket_class",
        "ticket_user",
        "user_business",
        "user_level",
        "users"
    ];

    const db_table_id = [
        "course_id",
        "cf_id",
        "cl_id",
        "cv_id",
        "event_id",
        "et_id",
        "inbox_id",
        "news_id",
        "nc_id",
        "nc_id",
        "ticket_id",
        "tc_id",
        "",
        "ub_id",
        "ul_id",
        "user_id"
    ];

    const table_id_code = [
        "CR", //course
        "CF", //course_file
        "CL", //course_level
        "CV", //course_video
        "EV", //event
        "ET", //event_type
        "IN", //inbox
        "NE", //news
        "NT", //news_category
        "NM", //news_comment
        "TI", //ticket
        "TC", //ticket_class
        "UB", //user_business
        "UL", //user_level
        "US", //users
    ];
    //ticket_user doesn't have its' own unique id format since it is a table that combined user's and ticket's unique ids only.

    //steps:
    //1. query all for the whole table (order by id)
    //2. point the biggest data (according the id)
    //3. a. if there is no data in the table - then the data started with 0001
    //3. b. if there are data in the table - then the data continued from the biggest number
    //4. the result should be like e.g, "C0002" (course), "CF0002" (course_file) 
    // -> result: table_id_code + 000 + order number

    pool.query('SELECT * FROM $1 ORDER BY $2 DESC LIMIT 1', [db_table[_tableparam], db_table_id[_idparam]], (error, results) => {
        if(results.rowCount == 0)
        {
            var _currentid = table_id_code[_idcodeparam] + "0001"; 
        }
        else
        {
            var currentphase = results.rows[0];
            var currentnumber = parseInt(currentphase.substring(5)) + 1;
            var _currentid = table_id_code[_idcodeparam] + "000" + String(currentnumber);
        }

        return _currentid;
    })

    pool.query('SELECT * FROM ticket ORDER BY ticket_id DESC LIMIT 1', (error, results) => {
        if (results.rowCount == 0)
        {
            _currentid = "TI0001";
        }
        else
        {
            var currentphase = results.rows[0];
            var currentnumber = parseInt(currentphase.substr(5)) + 1;
            _currentid = "TI000" + String(currentnumber);
        }
    })

    return _currentid;
}