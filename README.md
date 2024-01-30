# How to work?

1 -Go to "mongodb-express-node" project and...

- - set up the environment variables in the .env file

```

# server
SERVER_PORT: <port number>
# example: 3001

# mongodb
MONGODB_URI: <string url>
# example: mongodb+srv://gmlgustavoml:dpJXM19F6qvknMCx@cluster0.k6g3sg8.mongodb.net/

MONGODB_DBNAME: <string name database>
# example: "TestDB"

```

- - run the command "npm install"
- - run the command "npm run dev"

---

2 -Go to "graphql-server" project and...

- - set up the environment variables in the .env file

```

GRAPHQL_PORT= <port number>
# example: 4000

NODE_API_URI=<here you should put the URL generated from the "mongodb-express-node" project>
# example: "http://localhost:3001/api"

```

- - run the command "npm install"
- - run the command "npm run dev"

---

3 -Go to "react-graphql-client" project and...

- - set up the environment variables in the .env file

```
VITE_GRAPHQL_URI=<string url graphql>
# example : "http://localhost:4000/"
```

- - run the command "npm install"
- - run the command "npm run dev"

## Take into account the following: ( _BRANCH_ )

[ master ] This branch contain the final stable version of the project.

[ basic ] This branch refers to the basic code to start the project. Here you can see the first version without any optimization or refactoring. The main idea of this one is only to show how to work with the basic code.

[ basic-refactor ] You can see on this branch, an improvement above the _basic_ branch version, applying some refactoring of the code. Here you will see improvements such as some new folders, better behavior on the code, some good practices, etc.
