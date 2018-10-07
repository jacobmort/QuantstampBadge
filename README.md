[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/ubien/quantstampbadge)](https://quantstamp-badge.herokuapp.com/start-audit/ubien/quantstampbadge)  <---- This thing.

## WARNING: This was built as part of EthSF Hackathon and is not ready for primetime yet

## Add a Quantstamp Badge To Your Repo
If you have solidity (.sol) files you want checked for common security pitfalls have [Quantstamp's](https://quantstamp.com/) network of auditors run a suite of tools against your code.

## How Does It Work?
Add this link to your `README.md` and replace username/repo

```
[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/GITHUB_USERNAME/REPO_NAME)](https://quantstamp-badge.herokuapp.com/start-audit/GITHUB_USERNAME/REPO_NAME)
```

The badge will initially start off like this:
[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/GITHUB_USERNAME/REPO_NAME)](https://quantstamp-badge.herokuapp.com/start-audit/cryptocopycats/awesome-cryptokitties) (note: link to badge is purposely broken here so that it will remain in initial state)

When you click through the "fund me" badge above you end up on a page for the crypto kitties repo (try it!).  People can donate [QSP](https://coinmarketcap.com/currencies/quantstamp/) to fund an audit.  It displays all of the .sol files found in the repo along with their current audit status.  If enough QSP has been donated you can trigger an audit from the page.

If everything goes well the "fund me" badge will turn into this 
[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/test/pass)](https://quantstamp-badge.herokuapp.com/start-audit/test/pass)

## Development
`npm run server` && `npm run client` to get them started.  In my scramble to get this up on Heroku you'll need to add `http://localhost:5000` to api calls made from frontend if you run this locally.

## Why?
Green badges feel good.  And hopefully we can make everyone's eth a little safer when it's parked in contracts.
