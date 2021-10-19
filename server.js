// Just for deploying to heroku
// It seems earlier Heroku was not capable of running react-scripts start
// Therefore, after deploying a react app to Heroku and opening the app
// the app would crash
// This does not happen anymore, but it seems Heroku starts the app as you 
// would do locally and not by running the built app, as you would do in production
// Link: https://jasoncote.co/deploy-production-build-create-react-app-to-heroku
const express = require('express');
const path =  require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Specified by Heroku

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('React app running on port ', PORT);
});