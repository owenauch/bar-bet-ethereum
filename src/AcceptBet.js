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

class AcceptBet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      betHash: "",
    }
  }

  handleBetHashChange = (event) => {
    this.setState({betHash: event.target.value})
  }

  render () {
    const { betHash } = this.state
    const { confirmedBetHash, winningCondition, betValue } = this.props
    return (
      <OuterDiv>
        <SubtitleText>Accept a bet as the accepter:</SubtitleText>
        <Label for='bet-hash'>Bet hash:</Label>
        <TextInput id='bet-hash' type='text'
          value={betHash} onChange={this.handleBetHashChange} />
        <SubmitButton
          onClick={() => {this.props.acceptBet(betHash)}}
        >
          Accept Bet
        </SubmitButton>
        {confirmedBetHash && <div>
          <SubtitleText>Accepted Bet Hash</SubtitleText>
          <SmallerText>{confirmedBetHash}</SmallerText>
          <SubtitleText>Accepted Bet Winning Condition</SubtitleText>
          <SmallerText>{winningCondition}</SmallerText>
          <SubtitleText>Accepted Bet Value</SubtitleText>
          <SmallerText>{betValue}</SmallerText>
        </div>
        }
      </OuterDiv>
    )
  }
}

export default AcceptBet