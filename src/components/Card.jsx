import React, { useState, useEffect } from "react";
import { server } from "../main";
import axios from "axios";
import Loader from "./Loader";
import ErrorIn from "./ErrorIn";

const Card = () => {

  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchange(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log(err);
      }
    }



    fetchExchange()
  }, [])
  if (error) {
    return <ErrorIn />
  }

  return (
    <div className="card-container mt-5">
      {
        loading ? (<Loader />) : (
          exchange.map((i) => (
            <CardContainer
              name={i.name}
              id={i.id}
              img={i.image}
              rank={i.trust_score_rank}
              key={i.id}
              url={i.url}
            />
          ))
        )
      }
    </div>
  );
};

const CardContainer = ({ name, id, img, rank, url }) => {
  return (
    <div className="container mt-5">
      <a href={url} target="_blank" rel="noopener noreferrer">

        <div className="card">
          {/* <a href={url} target="_blank" rel="noopener noreferrer" /> */}
          <div className="coin-image">
            <img src={img} alt="" />
          </div>
          <div className="text mt-3">
            <h4 className="text-center fw-bold">{name}</h4>
            <h4 className="text-center">Trust-Rank : {rank}</h4>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
