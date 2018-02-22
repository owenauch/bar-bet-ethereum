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
  background-color: #E37222;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  font-size: 16px;
`

const StyledSelect = styled.select`
  background: white;
  width: 268px;
  margin: 10px;
  padding: 5px;
  font-size: 16px;
  line-height: 1;
  border-radius: 3px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  height: 34px;
  display: block;
`

class SettleBet extends Component {
  constructor(props) {
    super(props)

    this.state = {
      betHash: "",
      betWinner: ""
    }
  }

  handleBetHashChange = (event) => {
    this.setState({betHash: event.target.value})
  }

  handleBetWinnerChange = (event) => {
    this.setState({betWinner: event.target.value})
  }

  render () {
    const { betHash, betWinner } = this.state
    const { confirmedBetHash } = this.props
    return (
      <OuterDiv>
        <SubtitleText>Settle a bet as the arbiter:</SubtitleText>
        <Label for='bet-hash'>Bet hash:</Label>
        <TextInput id='bet-hash' type='text'
          value={betHash} onChange={this.handleBetHashChange} />
        <Label>Who won the bet?</Label>
        <StyledSelect value={this.state.value} onChange={this.handleBetWinnerChange}>
          <option value="proposer">Proposer</option>
          <option value="accepter">Accepter</option>
        </StyledSelect>
        <SubmitButton
          onClick={() => {
            const proposerWon = 'proposer' === betWinner
            this.props.settleBet(betHash, proposerWon)}}
        >
          Accept Bet
        </SubmitButton>
        {confirmedBetHash && <div>
          <SubtitleText>Bet Settled! The winner has been paid.</SubtitleText>
          <SubtitleText>Bet Hash:</SubtitleText>
          <SmallerText>{confirmedBetHash}</SmallerText>
        </div>
        }
      </OuterDiv>
    )
  }
}

export default SettleBet