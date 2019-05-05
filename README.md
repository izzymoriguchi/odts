## Quick start using docker-compose
1. Make sure your docker is running.
2. `sudo docker-compose build` (this might take a while)
3. `sudo docker-compose up` (this might take a while)
4. Access http://localhost:3000/ on a web browser to start using the application!

---



## Set up without docker-compose
#### Follow instructions below to set up if you'd like to run without using docker container
1. Clone this project
`git clone https://github.com/izzymoriguchi/odts.git`

2. Under odts directory, first run the following:

 `npm install` : this installs all packages specified in package.json into node_modules folder
 
 `cd backend` 
 
 `npm install` : under backend folder, also need to install packages into their node_modules folder

`npm start` : this starts an app

Note that at this point it opens up the web app but the backend is not setup yet.

3. Set up mongod
  - If you have used mongod before:
  
      `mongod` or `sudo mongod --auth`
     
  - If it's your first time working with mongod:
  
      `brew install mongodb`
      
      `mkdir -p /data/db`
      
      `mongod`
      
4. Set up your local mongodb
  - `mongo` : start mongo shell
  
  - `use odts`: creates db called odts if doesn't exist
  
  - create a user for db by doing: 
  
  `db.createUser(
     {
       user: "cs218",
       pwd: "cs218",
       roles: [ { role: "readWrite", db: "odts" } ]
     }
   )`
  
  
 5. Run: `nodemon server` under backend directory