[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/ubien/quantstampbadge)](https://quantstamp-badge.herokuapp.com/start-audit/ubien/quantstampbadge)  <---- This thing.

## Add a Quantstamp Badge To Your Repo
If you have solidity (.sol) files you want checked for common security fails have [Quantstamp's](https://quantstamp.com/) network of auditors run a suite of tools against your code.

## How Does It Work?
Add this link to your `README.md` and replace username/repo

```
[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/GITHUB_USERNAME/REPO_NAME)](https://quantstamp-badge.herokuapp.com/start-audit/GITHUB_USERNAME/REPO_NAME)
```

The badge will initially start looking like this:
[![Quantstamp Status](https://quantstamp-badge.herokuapp.com/badge/GITHUB_USERNAME/REPO_NAME)](https://quantstamp-badge.herokuapp.com/start-audit/cryptocopycats/awesome-cryptokitties) (note: link to badge is purposely broken here so that it will remain in initial state)

If you click through the "fund me" badge above you end up on a page for the crypto kitties repo.  People can donate [QSP](https://coinmarketcap.com/currencies/quantstamp/) to fund an audit.  It displays all of the .sol files found in the repo and their current audit status.  If enough QSP has been donated you can trigger an audit from the page.
