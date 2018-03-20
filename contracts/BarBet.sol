pragma solidity ^0.4.17;

contract BarBet {
    // owner of the contract
    address public owner;
    
    // struct to represent a bet made between
    // two addresses
    struct Bet {
        // gambler who wants condition to be true
        address proposer;
        // gambler who wants condition to be false
        address accepter;
        // gambler who determines whether bet was won or lots
        address arbiter;
        // if this happens, proposer wins
        string winningCondition;
        // each person sends this much money to the contract
        uint value;
        // bet has been paid by both parties
        bool paid;
        // bet has been settled by arbiter
        bool settled;
    }
    
    // mapping of betHashes to bets
    // hashes are in keccak-256
    mapping(bytes32 => Bet) public bets;
    
    // constructor -- only run at the beginning
    function BarBet() public {
        owner = msg.sender;
    }
    
    // fallback function
    function() public payable {}

    // events for each function
    event BetCreated(bytes32 betHash);
    event BetCancelled(bytes32 betHash);
    event BetAccepted(bytes32 betHash);
    event BetSettled(bytes32 betHash);

    // create a bet as the proposer
    function createBet(address accepter, address arbiter, string winningCondition) public payable returns (bytes32) {
        // block.timestamp hashed to ensure no duplicate block hashes
        bytes32 betHash = keccak256(msg.sender,accepter,arbiter,winningCondition, block.timestamp);
        bets[betHash] = (Bet(msg.sender, accepter, arbiter, winningCondition, msg.value, false, false));
        BetCreated(betHash);
        return betHash;
    }
    
    // cancel bet as proposer before other side is paid
    function cancelBet(bytes32 betHash) public returns(bytes32) {
        Bet storage b = bets[betHash];
        // make sure it's proposer
        require(b.proposer == msg.sender);
        // make sure it hasn't been paid by the other party yet
        require(b.paid == false);
        delete bets[betHash];
        msg.sender.transfer(b.value);
        BetCancelled(betHash);
        return betHash;
    }
    
    // accept a bet as the accepter
    function acceptBet(bytes32 betHash) public payable returns(bytes32) {
        Bet storage b = bets[betHash];
        // check to make sure that the bet exists and it's the correct accepter
        require(b.accepter == msg.sender);
        // check to make sure it hasn't been paid yet
        require(b.paid == false);
        // check to make sure they paid the correct amount
        require(b.value == msg.value);
        b.paid = true;
        BetAccepted(betHash);
        return betHash;
    }
    
    // settle a bet as the arbiter
    function settleBet(bytes32 betHash, bool proposerWon) public returns(bytes32) {
        Bet storage b = bets[betHash];
        // make sure it's actually the arbiter
        require(b.arbiter == msg.sender);
        // make sure it's been paid by both parties
        require(b.paid == true);
        // make sure it hasn't been settled yet
        require(b.settled == false);
        if (proposerWon) {
            // if proposer won, send double value
            // their escrowed funds plus accepter's
            b.proposer.transfer(b.value*2);
        } else {
            b.accepter.transfer(b.value*2);
        }
        // mark as settled
        b.settled = true;
        BetSettled(betHash);
        return betHash;
    }
}