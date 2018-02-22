import React, { Component } from 'react'
import BarBetContract from '../build/contracts/BarBet.json'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'

import CreateBet from './CreateBet.js'
import AcceptBet from './AcceptBet.js'
import SettleBet from './SettleBet.js'

const Header = styled.div`
  background-color: #66B9BF;
  height: 100px;
  color: white;
  font-size: 40px;
  line-height: 100px;
  padding: 15px;
  font-family: 'Roboto', sans-serif;
`

const MainContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      createBetHash: null,
      acceptBetHash: null,
      acceptBetWinningCondition: '',
      acceptBetValue: null
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
  }

  // create a bet on the contract
  createBetTransaction = (accepterAddress, arbiterAddress, winningCondtion, betValue) => {
    const contract = require('truffle-contract')
    const barBet = contract(BarBetContract)
    barBet.setProvider(this.state.web3.currentProvider)

    var barBetInstance;
    barBet.deployed().then((instance) => {
      barBetInstance = instance
      // create a bet with the given arguments
      return barBetInstance.createBet(accepterAddress, arbiterAddress, winningCondtion, {from: this.state.web3.eth.accounts[0], value: betValue})
    }).then((result) => {
      // set the state with the new bet hash
      this.setState({createBetHash: result.logs[0].args.betHash})
    })
  }

  // accept a bet on the contract
  acceptBetTransaction = (betHash) => {
    const contract = require('truffle-contract')
    const barBet = contract(BarBetContract)
    barBet.setProvider(this.state.web3.currentProvider)

    var barBetInstance;
    barBet.deployed().then((instance) => {
      barBetInstance = instance
      // look up bet with this hash
      return barBetInstance.bets(betHash)
    }).then((result) => {
      // extract data about bet
      console.log(result)
      const betValue = result[4].c[0]
      const winningCondition = result[3]
      this.setState({acceptBetWinningCondition: winningCondition, acceptBetValue: betValue})

      // accept the bet with the matching bet value
      return barBetInstance.acceptBet(betHash, {from: this.state.web3.eth.accounts[0], value: betValue})
    }).then((result) => {
      this.setState({acceptBetHash: result.logs[0].args.betHash})
    })
  }

  // settle a bet on the contract
  settleBetTransaction = (betHash, proposerWon) => {
    const contract = require('truffle-contract')
    const barBet = contract(BarBetContract)
    barBet.setProvider(this.state.web3.currentProvider)

    var barBetInstance;
    barBet.deployed().then((instance) => {
      barBetInstance = instance

      // transaction to settle bet
      return barBetInstance.settleBet(betHash, proposerWon, {from: this.state.web3.eth.accounts[0]})
    }).then((result) => {
      console.log(result)
    })
  }

  render() {
    return (
      <div>
        <Header>
          Ethereum Bar Bet
        </Header>
        <MainContainer>
          <CreateBet createBet={this.createBetTransaction} betHash={this.state.createBetHash}/>
          <AcceptBet
            acceptBet={this.acceptBetTransaction}
            confirmedBetHash={this.state.acceptBetHash}
            winningCondition={this.state.acceptBetWinningCondition}
            betValue={this.state.acceptBetValue}
          />
          <SettleBet settleBet={this.settleBetTransaction} />
        </MainContainer>
      </div>
    );
  }
}

export default App