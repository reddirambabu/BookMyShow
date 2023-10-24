const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");

const databasePath = path.join(__dirname, "bookmyshow.db");

const app = express();


app.use(express.json());
app.use(cors()); 

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(8000, () =>
      console.log("Server Running at http://localhost:8000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const validatePassword = (password) => {
  return password.length > 4;
};

app.post("/register", async (request, response) => {
  const { username, email, password,number, gender, location } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
  const databaseUser = await database.get(selectUserQuery);

  if (databaseUser === undefined) {
    const createUserQuery = `
     INSERT INTO
      user (username, email, password, number,gender, location)
     VALUES
      (
       '${username}',
       '${email}',
       '${hashedPassword}',
       '${number}',
       '${gender}',
       '${location}'  
      );`;
    if (validatePassword(password)) {
      await database.run(createUserQuery);
      response.send("User created successfully");
    } else {
      response.status(400);
      response.send("Password is too short");
    }
  } else {
    response.status(400);
    response.send("User already exists");
  }
});
 
app.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const databaseUser = await database.get(selectUserQuery);

  if (databaseUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(
      password,
      databaseUser.password
    );
    if (isPasswordMatched === true) {
      response.send("Login success!");
    } else {
      response.status(400);
      response.send("Invalid password");
    }
  }
});

app.put("/change-password", async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE username = '${username}';`;
  const databaseUser = await database.get(selectUserQuery);
  if (databaseUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      databaseUser.password
    );
    if (isPasswordMatched === true) {
      if (validatePassword(newPassword)) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordQuery = `
          UPDATE
            user
          SET
            password = '${hashedPassword}'
          WHERE
            username = '${username}';`;

        const user = await database.run(updatePasswordQuery);

        response.send("Password updated");
      } else {
        response.status(400);
        response.send("Password is too short");
      }
    } else {
      response.status(400);
      response.send("Invalid current password");
    }
  }
});




const convertDbObjectsToResponseObjectUsers = (dbObject) => {
    return {
        id : dbObject.user_id ,
        name : dbObject.user_name,
        email  : dbObject.email , 
        number : dbObject.phone_number,
        address : dbObject.location,
    };
};

const convertDbObjectsToResponseObjectMovies = (dbObject) =>{
  return {
    id : dbObject.movie_id, 
    title : dbObject.title,
    rating:dbObject.rating,
    description:dbObject.Description,
    genere:dbObject.Genre,
    Language:dbObject.Language, 
    releaseData : dbObject.ReleaseDate,
    country:dbObject.country,
    image : dbObject.image,
  }
}

app.get("/users" , async(request , response) => {
    const allCustomersQuery = `select * from user;` ;
    const allCustomers = await database.all(allCustomersQuery);
    response.send( allCustomers.map((eachObject) => convertDbObjectsToResponseObjectUsers(eachObject)));
});

app.get("/movies" , async(request , response) => {
  const moviesQuery = `select * from movie;`;
  const allMovies = await database.all(moviesQuery);
  response.send( allMovies.map( (eachObject) => convertDbObjectsToResponseObjectMovies(eachObject)  ));
})


app.get("/movies/:id" , async(request , response) => {
  const {id} = request.params
  const singleMovieQuery = `select * from movie where movie_id = ${id} ;`;
  const movieData = await database.get(singleMovieQuery);
  response.send(movieData);
})