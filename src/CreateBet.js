import React, { Component } from 'react'
import styled from 'styled-components'

const OuterDiv = styled.div`
  background-color: #EEAA7B;
  padding: 15px;
`

const SubtitleText = styled.h2`
  color: white;
  font-size: 25px;
`
const SmallerText = styled.p`
  color: white;
  font-size: 20px;
`

const Label = styled.label`
  color: white;
  font-size: 18px;
`

const TextInput = styled.input`
  height: 34px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  margin: 10px;
`

const NumberInput = styled.input`
  height: 34px;
  border-radius: 3px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  margin: 10px;
`

const SubmitButton = styled.button`
  background-color: #07889B;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  font-size: 16px;
`

class CreateBet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accepterAddress: "",
      arbiterAddress: "",
      winningCondition: "",
      betValue: 0
    }
  }

  handleAccepterAddressChange = (event) => {
    this.setState({accepterAddress: event.target.value})
  }

  handleArbiterAddressChange = (event) => {
    this.setState({arbiterAddress: event.target.value})
  }

  handleWinningConditionChange = (event) => {
    this.setState({winningCondition: event.target.value})
  }

  handleBetValueChange = (event) => {
    this.setState({betValue: event.target.value})
  }

  render () {
    const { accepterAddress, arbiterAddress, winningCondition, betValue } = this.state
    const { betHash } = this.props
    return (
      <OuterDiv>
        <SubtitleText>Create a bet as the proposer:</SubtitleText>
        <Label for='accepter-address'>Accepter address (person accepting the bet):</Label>
        <TextInput id='accepter-address' type='text'
          value={accepterAddress} onChange={this.handleAccepterAddressChange} />
        <Label for='arbiter-address'>Arbiter address (third party who will decide which person won the bet):</Label>
        <TextInput id='arbiter-address' type='text'
          value={arbiterAddress} onChange={this.handleArbiterAddressChange} />
        <Label for='winning-condition'>Winning Condition (in what case does the proposer win the bet):</Label>
        <TextInput id='winning-condition' type='text'
          value={winningCondition} onChange={this.handleWinningConditionChange} />
        <Label for='bet-value'>Bet Value (in wei):</Label>
        <NumberInput id='bet-value' type='number'
          value={betValue} onChange={this.handleBetValueChange} />
        <SubmitButton
          onClick={() => {this.props.createBet(accepterAddress, arbiterAddress, winningCondition, betValue)}}
        >
          Create Bet
        </SubmitButton>
        {betHash && <div>
          <SubtitleText>Your bet hash -- save this so that accepter and arbiter can interact with your bet!</SubtitleText>
          <SmallerText>{betHash}</SmallerText>
        </div>
        }
      </OuterDiv>
    )
  }
}

export default CreateBet