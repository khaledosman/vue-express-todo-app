# Todo App

## Running the Project

### Running the backend
1. Start the database: `docker-compose up`
2. install dependencies `yarn`
3. Start the server: `yarn start`

### Running the frontend
1. Install dependencies `yarn`
2. Start the static server `yarn start`

### Testing the frontend
1. run `yarn test:e2e` to run the e2e tests
2. run `yarn test:unit` to run the unit tests

### Configuration and Environment variables
1. Server configurations and secrets can be setup in `.env` file, this file should be added to `.gitignore` but is left for demo purposes
2. postgresql environment vars used by the docker image are setup via `database.env`

### Future work

#### Backend

1. Better error handling
2. implement input validation
3. Add some types/interfaces
4. Make TODO CRUD operations reusable by moving them into the model class as static/helper methods instead of having the logic in the controllers
5. add some seeders and/or use sequelize-cli

#### Frontned

1. Add styles
2. show some loading states when data is being loaded and disable buttons when loading
3. Implement some Input/Form validation
4. Error handling in case of server errors
5. With too many todos, rendering might get slow as you fetch more data despite infinite scrolling implemented.. use a virtual scrolling library to only render elements being shown instead of all of them
6. Improve usability, no need for confirm/cancel buttons on create and edit, just do inline editing.
7. Use icons instead for edit/delete buttons
