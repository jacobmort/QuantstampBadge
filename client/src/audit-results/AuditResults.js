import React, { Component } from "react";

const githubApi = "https://api.github.com/search/code?q=solidity+in:file+extension:sol+repo:"; //ubien/ShitCoinGrabBag";

class AuditResults extends Component {
  state = { solFiles: [], auditResults: {} };

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
    return fetch(`${githubApi}${githubUser}/${repo}`)
      .then((results) => results.json());
  }

  getAuditResults(githubUser, repo) {
    return fetch(`/audit/${githubUser}/${repo}`)
      .then(results => results.json());
  }

  auditLink(filename) {
    if (filename in this.state.auditResults) {
      return (<a href={`${this.state.auditResults[filename]}`} >Full Report</a >)
    } else {
      return <button onClick={this.props.startAudit}>Start Audit</button>;
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>Contracts in Repo</h3>
          {this.state.solFiles.map((file, i) => {
            return (
              <div key={i}>
                <span>{file.name}</span>
                <span>{this.auditLink(file.name)}</span>
              </div>
            )
          })}
        </div>
      </div >
    );
  }
}

export default AuditResults;
