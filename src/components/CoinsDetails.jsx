import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import ErrorIn from "./ErrorIn";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"
import ChartCoin from "./ChartCoin";


const CoinsDetails = () => {
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [page, setPage] = useState(1);
    const [days, setDays] = useState("24h")
    const [chartArray, setChartArray] = useState("24h")
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"]


    const switchChart = (key) => {
        switch (key) {
            case "24h":
                setDays("24h");
                setLoading(true);
                break;
            case "7d":
                setDays("7d");
                setLoading(true);
                break;
            case "14d":
                setDays("14d");
                setLoading(true);
                break;
            case "30d":
                setDays("30d");
                setLoading(true);
                break;
            case "60d":
                setDays("60d");
                setLoading(true);
                break;
            case "200d":
                setDays("200d");
                setLoading(true);
                break;
            case "365d":
                setDays("365d");
                setLoading(true);
                break;
            case "max":
                setDays("max");
                setLoading(true);
                break;

            default:
                setDays("24h")
                setLoading(true);
                break;


        }
    }

    const params = useParams();

    useEffect(() => {

        const fetchcoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);
                const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                // console.log(data);
                console.log(chartData);
                setCoin(data);
                setChartArray(chartData.prices)
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
                setLoading(false);
            }
        }



        fetchcoins()
    }, [params.id, currency, days])

    if (error) {
        return <ErrorIn />
    }


    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
    return (
        loading ? <Loader /> : <>
            <div className="container">

                {/* ==================RADIO BUTTONS FOR CURRENCY SYMBOLS============== */}
                <div className="container radio-btns" onChange={(e) => setCurrency(e.target.value)}>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={"inr"} />
                        <label className="form-check-label" htmlFor="inlineRadio1">INR</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={"eur"} />
                        <label className="form-check-label" htmlFor="inlineRadio2">EUR</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={"usd"} />
                        <label className="form-check-label" htmlFor="inlineRadio3">USD</label>
                    </div>
                </div>

                <div className="container mt-10">
                    <ChartCoin arr={chartArray} currency={currencySymbol} days={days} />
                </div>

                <div className="container btns-date mt-5">
                    {
                        btns.map((i) => (
                            <button key={i} onClick={() => switchChart(i)}>{i}</button>
                        ))
                    }
                </div>

                <div className="headingText">
                    <p className="text-center mt-10">
                        Last update on {Date(coin.market_data.last_updated).split('G')[0]}
                    </p>
                </div>

                <div className="coin-details mt-5 container">
                    <div className="image-coin text-center">
                        <img src={coin.image.large} className="img-fluid" alt="" />
                        <h3>{coin.name}</h3>
                        <h4>{currencySymbol}{coin.market_data.current_price[currency]}</h4>
                        <p className="fw-500">
                            {
                                coin.market_data.price_change_percentage_24h > 0 ? (<BiSolidUpArrow className="up" />) : (<BiSolidDownArrow className="low" />)
                            } &nbsp;
                            {coin.market_data.price_change_percentage_24h}%
                        </p>

                        <h3 className="text-center specific-coin-rank">{`#${coin.market_cap_rank}`}</h3>
                    </div>
                    <div className="progress mt-5">
                        <div className="progress-bar bg-success" role="progressbar" aria-label="Success example" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="text-progress mt-2">
                        <p className="fw-bold bg-danger text-light">{`${currencySymbol}${coin.market_data.low_24h[currency]}`}</p>
                        <span className="fw-bold">24H Range</span>
                        <p className="fw-bold bg-success text-light">{`${currencySymbol}${coin.market_data.high_24h[currency]}`}</p>
                    </div>

                    <div className="coin-details-all mt-5">
                        <h3>Max-Supply</h3>
                        <h3>{currencySymbol}{coin.market_data.max_supply ? coin.market_data.max_supply : "NA"}</h3>
                    </div>
                    <div className="coin-details-all mt-5">
                        <h3>Total Supply</h3>
                        <h3>{currencySymbol}{coin.market_data.total_supply}</h3>
                    </div>
                    <div className="coin-details-all mt-5">
                        <h3>Circulating-Supply</h3>
                        <h3>{currencySymbol}{coin.market_data.circulating_supply}</h3>
                    </div>
                </div>





            </div>
        </>
    );

}



export default CoinsDetails
