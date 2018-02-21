import React, { Component } from 'react'
import BarBetContract from '../build/contracts/BarBet.json'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'

import CreateBet from './CreateBet.js'

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
  background-color: #EEAA7B;
  padding: 15px;
  font-family: 'Roboto', sans-serif;
`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
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
  createBet = (accepterAddress, arbiterAddress, winningCondtion, betValue) => {
    console.log('gars')
  }

  render() {
    return (
      <div>
        <Header>
          Ethereum Bar Bet
        </Header>
        <MainContainer>
          <CreateBet createBet={this.createBet}/>
        </MainContainer>
      </div>
    );
  }
}

export default App