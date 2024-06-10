import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. sign up to
          explore more about Cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            value={input}
            placeholder="Search crypto"
            onChange={inputHandler}
            required
            list="coinList"
          />
          <datalist id="coinList">
            {allCoin.map((coin) => (
              <option key={coin.id} value={coin.name}/>
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="crypto-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="marketCap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((coinItem) => (
          <Link className="crypto-layout" key={coinItem.id} to={`/coin/${coinItem.id}`}>
            <p>{coinItem.market_cap_rank}</p>
            <div>
              <img src={coinItem.image} alt="coin-img" />
              <p>{coinItem.name + " - " + coinItem.symbol}</p>
            </div>
            <p>
              {currency.Symbol} {coinItem.current_price.toLocaleString()}
            </p>
            <p
              className={
                coinItem.price_change_percentage_24h > 0 ? "green" : "red"
              }
            >
              {Math.floor(coinItem.price_change_percentage_24h * 100) / 100}{" "}
            </p>
            <p className="marketCap">
              {currency.Symbol} {coinItem.market_cap.toLocaleString()}{" "}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
