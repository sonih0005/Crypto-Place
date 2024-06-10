import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const handleCurrency = (e) => {
    switch(e.target.value){
      case "usd":
        setCurrency({name:"usd", Symbol: "$"})
        break;
      case "eur":
        setCurrency({name:"eur", Symbol: "€"})
        break;
      case "inr":
        setCurrency({name:"inr", Symbol: "₹"})
        break;
      default:
        setCurrency("usd")
        break;
    }
  }
  return (
    <div className="navbar">
      <Link to={'/'}><img src={logo} alt="logo" className="logo" /></Link>

      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={handleCurrency}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">inr</option>
        </select>
        <button className="signUpBtn">
          Sign up <img src={arrow} alt="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
