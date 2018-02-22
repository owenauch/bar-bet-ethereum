# bar-bet-ethereum
Smart contract to allow two parties to place a bar bet arbitrated by a third party.

## How to Run:
1) Clone the repo: `git clone https://github.com/owenauch/bar-bet-ethereum.git`
2) Install dependencies: `npm install`
3) Install truffle globally (if you don't already have it): `npm install -g truffle`
4) Start private dev blockchain: `truffle develop`
5) Compile the contracts (while in truffle develop console): `compile`
6) Migrate the contracts: `migrate`
7) Outside the truffle develop console, start up the webserver: `npm run start`
8) Set MetaMask private network to `http://127.0.0.1:9545`

You're free to start settling bets in Ether on the development network!
