# tes
Project Tematik - T.E.S. (The Entrepreneurs Society)

1. Fork this repo
2. git clone this repo
3. edit git remote
4. npm install / yarn
5. Happy Coding! :)

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
<br/>
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
*/
Notes yang perlu diubah/pastikan
Di mana bakal simpen gambar-gambar?
Di response Value:
success ---> success

/*
