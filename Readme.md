# The Entrepreneur Society

### Comment/Notes
- [x] Finished (fetchable)
- [ ] Ongoing

### Users Collection

| Name | Type | Description |
| ---- | ---- | ----------- |
| user_id  | string | Auto-generated |
| user_email | string | Unique, no user will have the same email |
| user_password | string | password of account which has passed frontend verification, hash(password) |
| user_avatar | string/null | Display image in url |
| user_first_name | string | First name for user |
| user_last_name | string | Last name for user |
| user_role | string : enum | Either 'Admin' or 'User' | Can't be null |
| membership | string : enum | Either 'Basic' or 'Premium' | Can't be null |

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
  userEmail: string,
  userPassword: string (minimum length 6),
  userFirstName: string,
  userLastName: string,
}
```

Response Value
```
{
  success: boolean,
  auth: boolean,
  token : generated with JWT middleware, use this for session and authenticate each time fetching,
}
```
# Login
- [X] Login (LOGIN SCENE)

| A | B |
| ----------- | ------------- |
| FETCH       | /login  |
| METHOD      | POST |
| Description | Endpoint used for login account |

Request Body
```
{
  userEmail: string,
  userPassword: string,
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

- [X] Get Event

| A | B |
| ----------- | ------------- |
| FETCH       | /event/data  |
| METHOD      | GET |
| Description | Endpoint used to get all event. Arranged based on Event's Date |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  data: [
    {
      event_id: string,
      event_name: string,
      event_description: string,
      event_img: string,
      event_category: string,
      event_price: int, 
      available_seat: int,
      event_date: date
    }
  ]

}
```
- [X] Create Event

| A | B |
| ----------- | ------------- |
| FETCH       | /event/create  |
| METHOD      | POST |
| Description | Endpoint used to create an event |

Request Body
```
{
  event_name: string,
  event_description: string,
  event_img: string,
  event_category: string,
  event_price: int,
  available_seat: int,
  event_date: date
}
```

Response Value
```
{
  success: boolean,
  data: [
    {
      event_id: string,
      event_name: string,
      event_description: string,
      event_img: string,
      event_category: string,
      event_price: int, 
      available_seat: int,
      event_date: date,
      event_place: string
    }
  ],
  message: string

}
```

- [X] Delete Event

| A | B |
| ----------- | ------------- |
| FETCH       | /event/delete |
| METHOD      | POST |
| Description | Endpoint used to delete certain event|

Request Body
```
 event_id: string
```

Response Value
```
{
  success: boolean,
  message: string
}
```


# Ticket

- [X] Get Ticket

| A | B |
| ----------- | ------------- |
| FETCH       | /ticket/data  |
| METHOD      | GET |
| Description | Endpoint used to get all ticket available |

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
  success: boolean,
  data: [
    {
      ticket_id: string,
      user_id: string,
      event_id: string,
      ticket_qty: integer,
      ticket_date: date
    }
  ]

}
```

- [X] Get Ticket by Ticket ID

| A | B |
| ----------- | ------------- |
| FETCH       | /ticket/data/user/:id|
| METHOD      | GET |
| Description | Endpoint used to get all ticket owned by an user|

Request Body
```
None. Replace :id with user_id instead
```

Response Value
```
{
  success: boolean,
  data: [
    {
      ticket_id: string,
      user_id: string,
      event_id: string,
      ticket_qty: integer,
      ticket_date: date
    }
  ]

}
```

- [X] Create Ticket

| A | B |
| ----------- | ------------- |
| FETCH       | /ticket/create|
| METHOD      | POST|
| Description | Endpoint used to create ticket|

Request Body
```
{
  event_id: string,
  ticket_qty: int
}
```

Response Value
```
{
  success: boolean,
  data: [
    {
      ticket_id: string,
      event_id: string,
      ticket_qty: integer,
      ticket_date: date
    }
  ],
  message: Ticket has been successfully bought.

}
```

- [X] Delete Ticket

| A | B |
| ----------- | ------------- |
| FETCH       | /ticket/delete|
| METHOD      | POST|
| Description | Endpoint used to delete ticket|

Request Body
```
{
  ticket_id: string
}
```

Response Value
```
{
  success: boolean,
  message: string

}
```

# Inbox
- [X] Get Inbox (Messages)

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/data  |
| METHOD      | GET |
| Description | Endpoint used to get all message data|

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: [
        {
          inbox_id: string,
          inbox_msg: string,
          inbox_datetime: date,
          user_id: string
        }
    ]
}
```

- [X] Get Inbox by Id (Messages)

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/data/id/:id  |
| METHOD      | GET |
| Description | Endpoint used to get all message data based on User ID|

Request Body
```
None. Repplace :id with user_id instead.
```

Response Value
```
{
    success: boolean,
    data: [
        {
          inbox_id: string,
          inbox_msg: string,
          inbox_datetime: date,
          user_id: string
        }
    ]
}
```


- [X] Create Inbox (Messages)
 Create Message is automatically done with:
  - Register
  - Create Ticket
  
- [X] Delete Inbox (Messages)

| A | B |
| ----------- | ------------- |
| FETCH       | /inbox/delete|
| METHOD      | POST |
| Description | Endpoint used to delete a message in inbox|

Request Body
```
{
  inbox_id: string
}
```

Response Value
```
{
    success: boolean,
    message: string,
}
```
 

# Forum

- [X] Get All Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/data  |
| METHOD      | GET |
| Description | Endpoint used to get all forum data|

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: [
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


- [X] Get All Forum (Latest)

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/data/latest  |
| METHOD      | GET |
| Description | Endpoint used to get 3 newest forum by date|

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: [
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

- [X] Create Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/create  |
| METHOD      | POST |
| Description | Endpoint used to create forum|

Request Body
```
{
  forum_title: string,
  forum_content: string,
  forum_img: string,
  forum_category: string
}
```

Response Value
```
{
    success: true,
    data: [
      {
        forum_id: string,
        forum_title: string,
        forum_creation_date: date,
        forum_content: string,
        forum_img: string,
        forum_category: string
      }
    ]
    message: string,
}
```

- [X] Delete Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /forum/delete|
| METHOD      | POST |
| Description | Endpoint used to create forum|

Request Body
```
{
  forum_id: string
}
```

Response Value
```
{
    success: boolean,
    message: string,
}
```

# Forum Comment

- [X] Get Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/data|
| METHOD      | GET |
| Description | Endpoint used to get all forum comments|

Request Body
```
None, just make sure to login first with valid credentials.
```

Response Value
```
{
    success: boolean,
    data: [
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

- [X] Get Forum Comment by Forum ID

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/data/id/:id|
| METHOD      | GET |
| Description | Endpoint used to get forum's comment by Forum ID|

Request Body
```
None. (Put forum_id in the :id).
```

Response Value
```
{
    success: boolean,
    data: [
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

- [X] Create Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/create|
| METHOD      | POST|
| Description | Endpoint used to create forum comment|

Request Body
```
{
  fc_content: string,
  forum_id: string
}
```

Response Value
```
{
    success: boolean,
    data: [
            {
                fc_id: string,
                fc_content: string,
                fc_creation_date: date,
                user_id: string,
                forum_id: string
            }
    ],
    message: string
}
```

- [X] Delete Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /forumcomment/delete|
| METHOD      | POST|
| Description | Endpoint used to create forum comment|

Request Body
```
{
  fc_id: string
}
```

Response Value
```
{
    success: boolean,
    message: string
}
```

# Like Forum
- [X] Get Like Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforum/data/id/:id|
| METHOD      | GET|
| Description | Endpoint used to get all the like in a forum|

Request Body
```
None. (Put forum_id in :id)
```

Response Value
```
{
    success: boolean,
    data: string
}
```

- [X] Create Like Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforum/create|
| METHOD      | POST|
| Description | Endpoint used to create a like in a forum|

Request Body
```
{
  forum_id: string
}
```

Response Value
```
{
    success: boolean,
    data: [
      {
        lf_id: string,
        forum_id: string
      }
    ],
    message: string
}
```

- [X] Delete Like Forum

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforum/delete|
| METHOD      | POST|
| Description | Endpoint used to create a like in a forum|

Request Body
```
{
  forum_id: string
}
```

Response Value
```
{
    success: boolean,
    message: string
}
```

# Like Forum Comment
- [X] Get Like Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforumcomment/data/id/:id|
| METHOD      | GET|
| Description | Endpoint used to get all the like in a comment in a forum|

Request Body
```
None. (Put fc_id in :id).
```

Response Value
```
{
    success: boolean,
    data: string
}
```

- [X] Create Like Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforumcomment/create|
| METHOD      | POST|
| Description | Endpoint used to create a like in a comment in a forum|

Request Body
```
{
  fc_id: string
}
```

Response Value
```
{
    success: boolean,
    data: [
      {
        lfc_id: string,
        forum_id: string,
        fc_id: string
      }
    ],
    message: string
}
```

- [X] Delete Like Forum Comment

| A | B |
| ----------- | ------------- |
| FETCH       | /likeforumcomment/delete|
| METHOD      | POST|
| Description | Endpoint used to delete a like in a comment in a forum|

Request Body
```
{
  fc_id: string
}
```

Response Value
```
{
    success: boolean,
    message: string
}
```
