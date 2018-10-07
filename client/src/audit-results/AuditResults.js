import React, { Component } from "react";

const githubSearchApi = "https://api.github.com/search/code?q=solidity+in:file+extension:sol+repo:"; //ubien/ShitCoinGrabBag";

class AuditResults extends Component {
  state = { solFiles: [], auditResults: {}, limit: 3000 };

  componentDidMount = async () => {
    this.getSolidityFilesFromGithub(this.props.githubUser, this.props.repo)
      .then((json) => {
        this.setState({ solFiles: json.items });
      });
    this.getAuditResults(this.props.githubUser, this.props.repo)
      .then((fileMap) => {
        const auditResults = {}
        fileMap.forEach((file) => {
          Object.assign(auditResults, file);
        })
        this.setState({ auditResults: auditResults });
      });
  };

  getSolidityFilesFromGithub(githubUser, repo) {
    return fetch(`${githubSearchApi}${githubUser}/${repo}`)
      .then((results) => results.json());
  }

  getAuditResults(githubUser, repo) {
    return fetch(`/audit/${githubUser}/${repo}`)
      .then(results => results.json());
  }

  handleLimitChange(evt) {
    this.setState({ limit: evt.target.value });
  }


  auditLink(file) {
    const filePath = `https://raw.githubusercontent.com/${this.props.githubUser}/${this.props.repo}/master/${file.path}`;
    let status = 0;
    if (filePath in this.props.statusUpdates) {
      status = this.props.statusUpdtes[filePath];
    }

    if (status > 0 && status < 4) {
      return (<span>Contract is being processed</span>);
    } else if (false && file.name in this.state.auditResults) {
      return (<a href={`${this.state.auditResults[file.name]}`} >Full Report</a >)
    } else if (status === 4 || status === 5) {
      console.log(`status > 4- link should already been in DB and removed from in progress:${file.name}`);
    } else {
      let timeoutMessage = "";
      if (status === 6) {
        timeoutMessage = "<span>The Audit timed out and will need to be re-submitted";
      }
      return (<div>{timeoutMessage}<button onClick={this.props.startAudit.bind(this, filePath, this.state.limit)}>Start Audit</button></div>);
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Contracts in Repo</h3>
          <div>
            <span>QSP Spend Limit</span>
            <input type="number" value={this.state.limit} onChange={this.handleLimitChange.bind(this)} />
          </div>
          {this.state.solFiles.map((file, i) => {
            return (
              <div key={i}>
                <span>{file.name}</span>
                <span>{this.auditLink(file)}</span>
              </div>
            )
          })}
        </div>
      </div >
    );
  }
}

export default AuditResults;
