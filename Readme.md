# The Entrepreneur Society

### Comment/Notes
- [x] Finished (fetchable)
- [ ] Ongoing

### Users Collection

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_id  | string | Auto-generated |
| user_email | string | Unique, no user will have the same email |
| user_username | string | Unique, no user will have the same email |
| user_password | string | password of account which has passed frontend verification, hash(password) |
| user_avatar | string/null | Display image in url |
| user_first_name | string | First name for user |
| user_last_name | string | Last name for user |
| user_role | string : enum | Either 'Admin' or 'User' |
| membership | string : enum | Either 'Basic' or 'Premium' |

# Authentication

- [X] Register (SIGN UP SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /register  |
| METHOD      | POST  |
| Description | Endpoint used for user registration |

Request Body
```
{
  email: string,
  password: string (minimum length 6),
  first_name: string,
  last_name: string,
}
```

Response Value
```
{
  success: boolean,
  auth: boolean,
  access_token : generated with JWT middleware, use this for session and authenticate each time fetching,
}
```
# Login
- [X] Login (LOGIN SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /sign-in  |
| METHOD      | POST |
| Description | Endpoint used for login account |

Request Body
```
{
  email: string,
  password: string,
}
```

Response Value
```
{
  success: boolean,
  auth: boolean,
  access_token: generated with JWT middleware, use this for session and authenticate each time fetching,
  expires_in: int (in seconds),

}
```
# Menu Access

- [X] Home (HOME SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /homescene  |
| METHOD      | GET |
| Description | Endpoint used to access home page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  event: data rows,
  user: user profile data (see users collection),
  (if fails)
  message: string,

}
```
# Profile
- [X] Profile (ACCOUNT SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /accountscene  |
| METHOD      | GET |
| Description | Endpoint used to access user profile page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  data:[
    {
      "user_email": string,
      "user_username": string,
      "user_creation_date": date,
      "ub_id": string,
      "inbox_id": string,
      "user_avatar": string,
      "user_first_name": string,
      "user_last_name": string,
      "user_role": enum (Admin, User),
      "user_membership": enum (Basic, Premium),
    }
  ]

}
```
# Event

- [X] Event

| A | B |
| ----------- | ------------- |
| FETCH       | /event/data  |
| METHOD      | GET |
| Description | Endpoint used to access home page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  data: (array of ticket data)[
    {
      ticket_id: string,
      user_id: string,
      event_id: string,
      ticket_qty: integer,
      ticket_date: date
    },
    {
      Other ticket data....
    },
  ]

}
```
# Ticket

- [X] Ticket

| A | B |
| ----------- | ------------- |
| FETCH       | /ticket/data  |
| METHOD      | GET |
| Description | Endpoint used to access home page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  data: (array of ticket data)[
    {
      ticket_id: string,
      user_id: string,
      event_id: string,
      ticket_qty: integer,
      ticket_date: date
    },
    {
      Other ticket data....
    },
  ]

}
```
# Forum

- [X] Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/data  |
| METHOD      | GET |
| Description | Endpoint used to access home page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: (array of forum data)[
        {
            forum_id: string,
            forum_title: string,
            forum_creation_date: date,
            forum_content: string,
            forum_img: string,
            forum_category: string,
        }
    ]
}
```
# Forum create
- [X] FORUM CREATE

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/create  |
| METHOD      | POST |
| Description | Endpoint used to access home page |

Request Body
```
{
  forum_title: string,
  forum_content: string,
  forum_category: string,
}
```

Response Value
```
{
    success: true,
    message: string,
}
```

# Forum Comment

- [X] Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/data  |
| METHOD      | GET |
| Description | Endpoint used to access home page |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: (array of forum data)[
            {
                fc_id: string,
                fc_content: string,
                fc_creation_date: date,
                user_id: string,
                forum_id: string
            }
    ]
}
```
# Forum comment
- [X] FORUM COMMENT CREATE

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/create  |
| METHOD      | POST |
| Description | Endpoint used to access home page |

Request Body
```
{
  fc_content: string,
}
```
Ini pastikan data2 lain bisa langsung fetch dari user yang login

Response Value
```
{
    success: true,
    message: string,
}

```
Like forum mungkin masih salah karena pas mau insert error. Untuk get mohon klarifikasi caranya, tulis aja di readme ini bagian bawah.
Ticket create belom dites karena event masih dikomen.
*/

/*
