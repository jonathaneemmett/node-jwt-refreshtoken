## React - JWT secure authentication and authorization

Implementation of React with the Node JWT and refreshtoken api authentication and authorization.

Clone this repo, then run this in the root directory

    npm run setUp

Set your .env file in backend.

    mv example.env .env

Set these values in the .env

    MONGO_URI='YOUR_MONGO_URI'
    JWT_SECRET='YOUR_JWT_SECRET'

Set the .env file in both front end folders.

    cd react-frontend && mv example.env .env

    cd svelteKit-frontend && mv example.env .env

Set the values for respective .env

    REACT_APP_API_SERVER="YOUR_LOCAL_SERVER_URL" // local this would be http://localhost:5100

    API_SERVER="YOUR_LOCAL_SERVER_URL" // local this would be http://localhost:5100

then from the root you can run:

    npm run dev-react

or

    npm run dev-svelteKit

This will run the front and backend since concurrently is installed.

Live Demos can be found here

    For React:

    https://node-jwt-refreshtoken-react.vercel.app/

    For SvelteKit:

    coming soon!
