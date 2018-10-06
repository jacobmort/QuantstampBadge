import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";

import "./StartAudit.css";
import QuanstampAbi from "./Quanstamp.abi.js";
const QuantstampTokenAddress = '0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d';
const QuantstampContractAddress = '0x74814602062af64fd7a83155645ddb265598220e';

class StartAudit extends Component {
  state = { balance: 0, authorized: 0, web3: null, accounts: null, authorizeContract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      let authorizeContract = new web3.eth.Contract(QuanstampAbi, QuantstampTokenAddress);


      this.setState({ web3: web3, account: accounts[0], authorizeContract: authorizeContract });
      const qspBalance = await this.getQpsBalance();
      const amountLeftover = await this.getAmountOfAuthorized();
      console.log(qspBalance);
      console.log(amountLeftover);
      this.setState({ balance: qspBalance, authorized: amountLeftover });
      // this.authorizeQuantstamp();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  getQpsBalance = async () => {
    return this.state.authorizeContract.methods.balanceOf(this.state.account).call();
  }

  getAmountOfAuthorized = async () => {
    return this.state.authorizeContract.methods.allowance(this.state.account, QuantstampContractAddress).call();
  }

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
        <h3>QPS</h3>
        <div>balance: {this.state.balance}</div>
        <div>quantstamp can spend on audits: {this.state.authorized}</div>
      </div>
    );
  }
}

export default StartAudit;
