//IMPORTS
import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import idl from "./idl.json";
import kp from "./keypair.json";

// JSBarcode wrapped in React
import Barcode from "react-barcode";

// Toast Notifs
import toast, { Toaster } from "react-hot-toast";

// My new components
import Carousel from "./Carousel";
import "./Carousel.css";
import Marquee from "./Marquee";
import authpage from "./assets/authpage.gif";

// Main CSS
import "./App.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//CONSTANTS
const { SystemProgram, Keypair } = web3;

/*

uncomment the 3 below lines if you want the users to share one baseAccount
 i've tested it and it works

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

*/

// this creates a new account every time the user refreshes the app
let baseAccount = Keypair.generate();

const programID = new PublicKey("D4qTif2KUt5cKot4RVn1kSxPiXaryKvBJDWbuBLsVybL");
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};

const App = () => {
  //useSTATE
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  //TOASTS

  const showPhantomToast = () =>
    toast("To sign in, download a Phantom Wallet 👻 at https://phantom.app");
  const showConnectedWalletToast = () => toast.success("You're signed in!");
  const showDisconnectedWalletToast = () => toast.success("You've signed out!");
  const showGifSentToast = () => toast.success("Barcode submitted!");

  //ACTIONS

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        showPhantomToast();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      showConnectedWalletToast();
    }
  };

  const disconnectWallet = () => {
    console.log("Wallet Disconnected");
    setWalletAddress(null);
    showDisconnectedWalletToast();
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const getProgram = async () => {
    const idl = await Program.fetchIdl(programID, getProvider());
    return new Program(idl, programID, getProvider());
  };

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("ping");
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
      await getGifList();
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
    }
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return address.substring(0, 4) + "....." + address.substring(40);
  };

  const getGifList = async () => {
    try {
      const program = await getProgram();
      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      console.log("Got the account", account);
      setGifList(account.gifList);
    } catch (error) {
      console.log("Error in getGifList: ", error);
      setGifList(null);
    }
  };

  const sendGif = async () => {
    if (inputValue.length === 0) {
      console.log("No barcode given!");
      return;
    }
    setInputValue("");
    console.log("Barcode:", inputValue);
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.rpc.addGif(inputValue, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
      console.log("Barcode successfully sent to program", inputValue);

      await getGifList();
      showGifSentToast();
    } catch (error) {
      console.log("Error sending Barcode:", error);
    }
  };

  const Card = ({ title, content }) => (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );

  const renderNotConnectedContainer = () => (
    <div className="container">
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <p className="header" href="#">
            CODE128
          </p>
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
          >
            CONNECT WALLET
          </button>
        </div>
      </nav>
      <div className="d-flex justify-content-center sub-header">
        <h1>your memberships, your data, on chain</h1>
      </div>
      <Marquee />
    </div>
  );

  const renderConnectedContainer = () => {
    if (gifList === null) {
      return (
        <div className="container connected-container">
          <div className="jumbotron-fluid auth-wrapper">
            <img className="" alt="Auth Page Landing" src={authpage} />
          </div>
          <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container-fluid">
              <a className="header" href="https://github.com/erikamoji/Intro-to-Solana-Starter#readme">LEARN MORE</a>
              <button
                className="cta-button submit-gif-button"
                onClick={createGifAccount}
              >
                CREATE A NEW KEYCHAIN
              </button>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="connected-container">
          <nav className="navbar fixed-top navbar-expand-lg">
            <div className="container-fluid">
              <p className="header">HELLO, {shortenAddress(walletAddress)}</p>
              <button
                className="cta-button disconnect-wallet-button"
                onClick={disconnectWallet}
              >
                SIGN OUT
              </button>
            </div>
          </nav>
          <nav className="navbar form-inline fixed-bottom">
            <form
              className="form"
              onSubmit={(event) => {
                event.preventDefault();
                sendGif();
              }}
            >
              <input
                type="text"
                placeholder="enter in your loyalty card number"
                value={inputValue}
                onChange={onInputChange}
              />
              <button type="submit" className="cta-button submit-gif-button">
                SUBMIT
              </button>
            </form>
          </nav>
          <Carousel>
            {gifList.map((item, index) => (
              <Card
                title={"CARD " + (index + 1)}
                content={
                  <div className="" key={index}>
                    <Barcode
                      width={1}
                      fontSize={13}
                      format={"CODE128"}
                      value={item.gifLink}
                    />
                  </div>
                }
              />
            ))}
          </Carousel>
        </div>
      );
    }
  };

  //useEFFECTS

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...");

      // Call Solana program here.
      getGifList();
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <Toaster
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
        <div className="header-container">
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
