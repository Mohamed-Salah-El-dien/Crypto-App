import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies';
import News from '../News/News';
import Loader from '../Loader/Loader';

import './styles.css';

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <div className="home">
      <div className="intro">
        <h2 className="heading">Global Crypto Stats</h2>
        <div className="grid">
          <div className="item">
            <h3>Total Cryptocurrencies</h3>
            <p>{globalStats.totalCoins}</p>
          </div>

          <div className="item">
            <h3>Total Exchanges</h3>
            <p>{globalStats.totalExchanges}</p>
          </div>

          <div className="item">
            <h3>Total Market Cap</h3>
            <p>{`$${millify(globalStats.totalMarketCap)}`}</p>
          </div>

          <div className="item">
            <h3>Total 24h Volume</h3>
            <p>{`$${millify(globalStats.total24hVolume)}`}</p>
          </div>

          <div className="item">
            <h3>Total Markets</h3>
            <p>{millify(globalStats.totalMarkets)}</p>
          </div>
        </div>
      </div>

      <div className="crypto">
        <div className="crypto-intro">
          <h2>Top 10 Cryptos In The World</h2>
          <Link to="/cryptocurrencies" className="Link">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<UnfoldMoreIcon />}
            >
              Show more
            </Button>
          </Link>
        </div>

        <Cryptocurrencies simplified />
      </div>

      <div className="home-news">
        <div className="news-intro">
          <h2>Latest Crypto News</h2>
          <Link to="/news" className="Link">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<UnfoldMoreIcon />}
            >
              Show more
            </Button>
          </Link>
        </div>

        <News simplified />
      </div>
    </div>
  );
};

export default Homepage;
