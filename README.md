# Welcome to CODE128

 Store barcodes on chain with [Solana](https://solana.com/) using [Phantom Wallet](https://phantom.app/). Keep any alphanumeric barcode, with the anonymity you desire. This dApp was built for [BuildrPr3tti's first Solana Camp.](https://github.com/buildpr3tti/Intro-to-Solana-Starter)  

### 🗳️🚀 [Try it yourself](https://erikamoji.vercel.app/)

> AVAILABLE ON ANY SIZED SCREEN. Mobile, Tablet, Desktop. 
- Don't forget to switch to `devnet`



**Built with** Javascript, Rust, Anchor, React, CSS
- [react-barcode](https://github.com/kciter/react-barcode), a React wrapper for [JSBarcode](https://github.com/lindell/JsBarcode).
- [react-hot-toast](https://react-hot-toast.com/)
- [Material Design](https://developers.google.com/fonts/docs/material_icons) icons and [CSS.gg](https://github.com/astrit/css.gg) icons using [react-icons](https://react-icons.github.io/react-icons)
- styled with [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/), CSS [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), [favicon.io](https://favicon.io/)

**Notes on this build**

Currently the app creates a new account on refresh/initialization in `intro-to-solana-project/src/App.js` with the line `let baseAccount = Keypair.generate();`. This is for testing purposes so you can see the flow of a new user on the dApp. Remove this and proceed to read below if you'd like instructions on how to create a shared `baseAccount` and the flow for already having an account.
 
>I have left comments inside of `App.js` right above `let baseAccount = Keypair.generate();` . Uncomment the 3 below lines if you want the users to share one baseAccount. I've tested it and it works.
  
    const arr = Object.values(kp._keypair.secretKey);
    const secret = new Uint8Array(arr);
    const baseAccount = web3.Keypair.fromSecretKey(secret);


**Next steps:** QR code support, Individual user accounts, enabling removal of specific barcodes, styling the toast notifs, Safari compatible styling

## How to clone

To get started:

- Click the fork button. You've now created your own version of the project.
- Click the clone button and copy the link that appears from the drop down menu.
- In your terminal, cd to your preferred folder (Desktop) and run this command: `git clone <https://github.com/>... `(paste in your own link that ou copied in the previous step)
- Change directory into the new folder by running the command `cd intro-to-solana-starter`
- Install the project dependencies by running the command `npm install`
- Start the development server (local host) by running the command `npm start`
- Start coding!
