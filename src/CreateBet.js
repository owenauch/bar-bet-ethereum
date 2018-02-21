import React, { Component } from 'react'
import styled from 'styled-components'

const SubtitleText = styled.h2`
  color: white;
  font-size: 25px;
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
    }
  }

  render () {
    return (
      <div>
        <SubtitleText>Create a bet as the proposer:</SubtitleText>
        <Label for='accepter-address'>Accepter address (party accepting the bet):</Label>
        <TextInput id='accepter-address' type='text'/>
        <Label for='arbiter-address'>Arbiter address (third-party who will decide which party won the bet):</Label>
        <TextInput id='arbiter-address' type='text'/>
        <Label for='winning-condition'>Winning Condition (in what case does the proposer win the bet):</Label>
        <TextInput id='winning-condition' />
        <Label for='bet-value'>Bet Value (in wei):</Label>
        <NumberInput id='bet-value' type='number'/>
        <SubmitButton>Create Bet</SubmitButton>
      </div>
    )
  }
}

export default CreateBet