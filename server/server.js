const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const firebase = require("firebase");
const config = require("./config");

firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('/badge/:githubUser/:repo', (req, res) => {
  const docKey = `${req.params.githubUser}:${req.params.repo}`;
  console.log(docKey);
  firestore.collection('repos').doc(docKey)
    .get()
    .then((val) => {
      let file;
      if (val.data().passing) {
        file = "passing.svg";
      } else {
        file = "failing.svg";
      }
      res.sendFile(path.join(__dirname, '../client/public/images', file));
    })
    .catch((err) => {
      console.log(err)
      res.err(err);
    });
});


// Host react files
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));