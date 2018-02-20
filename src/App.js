import React, { Component } from 'react'
import BarBetContract from '../build/contracts/BarBet.json'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      ownerAddress: 0
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const barBet = contract(BarBetContract)
    barBet.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var barBetInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      barBet.deployed().then((instance) => {
        barBetInstance = instance

        // gets the owner of the contract
        return barBetInstance.owner()
      }).then((ownerAddress) => {
        // Update state with the result.
        return this.setState({ ownerAddress })
      })
    })
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default App
