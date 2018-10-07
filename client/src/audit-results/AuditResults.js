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
    return fetch(`http://localhost:5000/audit/${githubUser}/${repo}`)
      .then(results => results.json());
  }

  handleLimitChange(evt) {
    this.setState({ limit: evt.target.value });
  }


  auditLink(file) {
    if (false && file.name in this.state.auditResults) {
      return (<a href={`${this.state.auditResults[file.name]}`} >Full Report</a >)
    } else {
      return <button onClick={this.props.startAudit.bind(this, `https://raw.githubusercontent.com/${this.props.githubUser}/${this.props.repo}/master/${file.path}`, this.state.limit)}>Start Audit</button>;
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
