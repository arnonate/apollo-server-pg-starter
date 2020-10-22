# Ready Core Server

## Setting up PostgreSQL
To run locally, you should set up a PostgreSQL instance. Homebrew is the easiest way to do this.

To get Homebrew on Mac:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

To install PostgreSQL:
```bash
brew update
brew install postgresql
```

Check your version:
```bash
postgres --version
postgres (PostgreSQL) 13.0
```

Start and Stop PostgreSQL:
```bash
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop
```

Create and delete local DB instance:
```bash
createdb readycore
dropdb readycore
```

Interact with DB in PostgreSQL shell:
```bash
psql readycore
# \list - List all of your actual databases.
# \c dbname - Connect to another database.
# \d - List the relations of your currently connected database.
# \d tablename - Shows information for a specific table.
# CMD + d to exit
```

To run the project you will need a local `.env` file with the following contents relevant to your local DB:
```bash
# .env
PORT=8000
DATABASE=readycore
DATABASE_USER=username
DATABASE_PASSWORD=username
```

## Running the Server

Once PostgreSQL is set up and your DB is linked in `.env`, simply run `yarn start`.

## Interacting with the GraphQL Server in Playground

### List users:
```graphql
{
  users {
    id
    username
    visits {
      id
      note
    }
  }
}
```

### List visits:
```graphql
{
  visits {
    id
    note
    user {
      id
      username
    }
  }
}
```

### Create a visit:
Use the following variables in your request:
```graphql
{
  "userId": <number>,
  "note": <string>
}
```

```graphql
mutation CreateVisit($userId: ID!, $note: String!) {
  createVisit(userId: $userId, note: $note) {
    id
  }
}
```

### Delete a visit:
Use the following variables in your request:
```graphql
{
  "id": <number>,
}
```

```graphql
mutation DeleteVisit($id: ID!) {
  deleteVisit(id: $id)
}
```