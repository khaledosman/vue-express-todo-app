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
3. Add some types/interfaces
4. Make TODO CRUD operations reusable by moving them into the model class as static/helper methods
5. add some seeders and/or use sequelize-cli

#### Frontned
1. using $emit to create an event bus through multiple components is not optimal, might be better to use vuex for state management instead.. that should also help with updating the list and count after CRUD operations
2. Add styles
3. show some loading states when data is being loaded and disable buttons when loading
4. Implement some Input/Form validation
5. Error handling in case of server errors
6. With too many todos, rendering might get slow as you fetch more data.. use a virtual scrolling library to only render elements being shown instead of all of them
7. Improve usability, no need for confirm/cancel buttons on create and edit.
8. Use fontawesome icons instead for edit/delete buttons
