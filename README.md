# GW2

## Build

`npm run build`

## API Token

From https://account.arena.net/applications you can get an API token in order to anonymously allo third party apps (like this one) to get data from your Guild Wars 2 account.

## Run

### Requisites

*Your browser must support generators.*

On your browser console:

`gw2.Api.Account.getAsync("API KEY HERE").then(console.log.bind(console))`