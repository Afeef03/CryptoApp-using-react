import React, { useState, useEffect } from "react";
import { server } from "../main";
import axios from "axios";
import Loader from "./Loader";
import ErrorIn from "./ErrorIn";
import { Link } from "react-router-dom";



const Coin = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const [page, setPage] = useState(1);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  useEffect(() => {

    const fetchcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log(err);
      }
    }



    fetchcoin()
  }, [currency, page])
  if (error) {
    return <ErrorIn />
  }

  return (
    <>
      {/* ==================RADIO BUTTONS FOR CURRENCY SYMBOLS============== */}
      <div className="container radio-btns" onChange={(e) => setCurrency(e.target.value)}>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"inr"} />
          <label className="form-check-label" for="inlineRadio1">INR</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"eur"} />
          <label className="form-check-label" for="inlineRadio2">EUR</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={"usd"} />
          <label className="form-check-label" for="inlineRadio3">USD</label>
        </div>
      </div>

     
      <div className="card-container mt-5">

        {
          loading ? (<Loader />) : (
            coin.map((i) => (
              <CardContainer
                name={i.name}
                id={i.id}
                img={i.image}
                price={i.current_price}
                key={i.id}
                url={i.url}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))
          )
        }

      </div>
      <div className="card-container">

        <button className="mt-3 btn btn-danger" onClick={() => changePage(2)}>
          2
        </button>
      </div>
    </>


  );
};

const CardContainer = ({ name, id, img, price, url, currencySymbol = "₹", symbol }) => {
  return (
    <div className="container mt-5">
      <Link to={`/coins/${id}`} target="blank" rel="noopener noreferrer">

        <div className="card">
          <div className="coin-image">
            <img src={img} alt="" />
          </div>
          <div className="text mt-3">
            <h4 className="text-center ">{name}</h4>
            <h3 className="text-center fw-bold">{symbol}</h3>
            <h4 className="text-center">{price ? `${currencySymbol} ${price}` : "NA"}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Coin;
