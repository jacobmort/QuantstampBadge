import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";
import BigNumber from 'bignumber.js';
import Web3 from "web3";

import "./StartAudit.css";
import QuanstampTokenAbi from "./QuanstampToken.abi";
import QuantstampAuditAbi from "./QuantstampAudit.abi";

const QuantstampTokenAddress = '0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d';
const QuantstampContractAddress = '0x74814602062af64fd7a83155645ddb265598220e';

class StartAudit extends Component {
  state = { balance: 0, authorized: 0, web3: null, accounts: null, authorizeContract: null, auditContract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3Socket = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const authorizeContract = new web3.eth.Contract(QuanstampTokenAbi, QuantstampTokenAddress);
      const auditContract = new web3.eth.Contract(QuantstampAuditAbi, QuantstampContractAddress);
      const auditContractEvents = new web3Socket.eth.Contract(QuantstampAuditAbi, QuantstampContractAddress);

      this.setState({ web3: web3, account: accounts[0], authorizeContract: authorizeContract, auditContract: auditContract });
      const qspBalance = await this.getQpsBalance();
      const amountLeftover = await this.getAmountOfAuthorized();

      console.log(qspBalance);
      console.log(amountLeftover);
      this.setState({ balance: qspBalance, authorized: amountLeftover });

      auditContractEvents.events.LogAuditRequested({ fromBlock: 0 }, this.auditEventFired);
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
    await this.state.authorizeContract.methods.approve(QuantstampContractAddress, 3000).send({ from: this.state.account });
  };

  requestAudit = async (uri, price) => {
    await this.state.auditContract.methods.requestAudit(uri, price).send({ from: this.state.account });
  }

  humanReadable(erc20Balance) {
    const divisor = new BigNumber(10).pow(18); // Quanstamp ERC20 is 18 decimals
    return new BigNumber(erc20Balance).div(divisor).toNumber();
  }

  auditEventFired(err, event) {
    console.log(event);
  }


  render() {
    const balance = this.humanReadable(this.state.balance);
    const authorized = this.humanReadable(this.state.authorized);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Quantstamp Github Audit</h1>
        <h3>QPS</h3>
        <div>balance: {balance}</div>
        <div>quantstamp can spend on audits: {authorized}</div>
      </div>
    );
  }
}

export default StartAudit;
