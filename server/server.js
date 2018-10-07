const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const firebase = require("firebase");
if (process.env.NODE_ENV === 'production') {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  });
} else {
  const config = require("./config");
  firebase.initializeApp(config);
}
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.get('/badge/:githubUser/:repo', (req, res) => {
  const docKey = `${req.params.githubUser}:${req.params.repo}`;
  firestore.collection('repos').doc(docKey)
    .get()
    .then((val) => {
      let file;
      if (!val.data()) {
        file = "fund-me.svg";
      }
      else if (val.data().passing) {
        file = "passing.svg";
      } else {
        file = "failing.svg";
      }
      res.sendFile(path.join(__dirname, '../client/public/images', file));
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.render('error', { error: err })
    });
});
app.get('/audit/:githubUser/:repo', (req, res) => {
  const docKey = `${req.params.githubUser}:${req.params.repo}`;
  firestore.collection('repos').doc(docKey)
    .get()
    .then((val) => {
      res.send(val.data().contracts);
    });
});

app.post('/audits-in-progress/add/:githubUser/:repo/:id', (req, res) => {

});

app.post('/audits-in-progress/remove/:githubUser/:repo/:id/', (req, res) => {

});

app.post(`/audit/save/:githubUser/:repo/:success/:link`, (req, res) => {
  const docKey = `${req.params.githubUser}:${req.params.repo}`;
  firestore.collection('repos').doc(docKey).set({
    passing: req.params.success === 'true' ? 1 : 0
  }, { merge: true });

  res.status(200).send();
});

app.get('/audits-in-progress/:githubUser/:repo/', (req, res) => {
  const docKey = `${req.params.githubUser}:${req.params.repo}`;
  firestore.collection('repos').doc(docKey)
    .get()
    .then((val) => {
      res.send(val.data().inprogress);
    });

    
  firestore.collection('repos').doc(docKey).set({

  })
})


// Host react files
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));