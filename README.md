
## Local Setup

- Clone the repository.
```
git clone https://github.com/Yaxhveer/note-taking-api
cd note-taking-api
```

- Create a MongoDB database and obtain the `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

- Create the .env file with reference to the .env.example

```
PORT = 8000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

- Install Dependencies

```
npm install
```

- Run

```
node server
```
