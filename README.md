## React - JWT secure authentication and authorization

Implementation of React with the Node JWT and refreshtoken api authentication and authorization.

Clone this repo, then run npm i

    npm i

Set your .env file in backend.

    mv example.env .env

Set these values in the .env

    MONGO_URI='YOUR_MONGO_URI'
    JWT_SECRET='YOUR_JWT_SECRET'

From the root you can run:

    npm run dev

This will run the front and backend since concurrently is installed.
