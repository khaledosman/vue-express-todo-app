# Todo App

## Running the Project

### Running the backend
1. Start the database: `docker-compose up`
2. install dependencies `npm install`
3. Start the server: `yarn start`

### Running the frontend
1. Install dependencies `npm install`
2. Start the static server `yarn start`

### Configuration and Environment variables
1. Server configurations and secrets can be setup in a `.env` file, this file should be added to `.gitignore`
2. postgresql environment vars used in the docker image are setup via `database.env`

### Future work
#### Backend
1. Better error handling
2. implement input validation, perhaps a library like `@hapi/joi` would be beneficial
3. Fix nodemon setup to automatically restart the server on changes
4. better eslint/standard setup
5. Double check performance and security best practices for postgresql & sequelize, like using transactions, indexes and connection pooling.
6. Add some types/interfaces
7. Disable forced sync in production
8. Make TODO CRUD operations reusable by moving them into the model class as static/helper methods

#### Frontned
1. using $emit to create an event bus through multiple components is not optimal, might be better to use vuex for state management instead.. that should also help with updating the list and count after CRUD operations
2. Add styles
3. show some loading states when data is being loaded and disable buttons when loading
4. Implement some Input/Form validation
5. Show confirmation before deleting a task
6. Error handling in case of server errors
7. Add more fields to the todo, like date/time and/or project.
