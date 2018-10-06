import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";

import "./StartAudit.css";
import QuanstampAbi from "./Quanstamp.abi.js";
const QuantstampTokenAddress = '0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d';
const QuantstampContractAddress = '0x74814602062af64fd7a83155645ddb265598220e';

class StartAudit extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      let authorizeContract = new web3.eth.Contract(QuanstampAbi, QuantstampTokenAddress);


      this.setState({ web3: web3, account: accounts[0], authorizeContract: authorizeContract });
      // this.setState({ web3, accounts }, this.authorizeQuantstamp);
      // this.authorizeQuantstamp();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  authorizeQuantstamp = async () => {
    this.state.authorizeContract.methods.approve(QuantstampContractAddress, 3000).send({ from: this.state.account });
  };

  requestAudit = async () => {

  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Quantstamp Github Audit</h1>
      </div>
    );
  }
}

export default StartAudit;
