## Database: userlist

### Tables:

**Users**
1. id primary key
2. username varchar not null
3. password varchar not null

### Routes:

Show all Users: `GET /users`
Show One user: `GET /users/:id`
Edit a user: `PATCH /users/:id`
Add a new user `POST /users`
