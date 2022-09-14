// For use in Browser:                                           <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
// For use in Node.js (must install first):                      const { ethers } = require("ethers");
// For use in ES6 or TypeScript (must install first):            import { ethers } from "ethers";

// Get provider from ethers (connect to wallet from browser)
const provider = new ethers.providers.Web3Provider(window.ethereum);

ensDomain = "nick.eth"

// Connect to wallet and get account (eth address)
async function getAccount() {
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    return account;
}

// Get resolver from ens Name & get details from it
async function getDetails() {
    const resolver = await provider.getResolver(ensDomain);
    email = await resolver.getText("email");
    url = await resolver.getText("url");
    avatar = await resolver.getText("avatar");
    twitter = await resolver.getText("com.twitter");
    github = await resolver.getText("com.github");
    discord = await resolver.getText("com.discord");
    stuff = [email, url, avatar, twitter, github, discord]
    console.log(stuff);
}

getDetails();
