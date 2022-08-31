import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';

import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../../services/cryptoApi';
import LineChart from '../LineChart/LineChart';
import Loader from '../Loader/Loader';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fe0357',
    borderRadius: '10px',
  },
}));

const CryptoDetails = () => {
  const classes = useStyles();
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: 'Rank',
      value: cryptoDetails?.rank,
      icon: <StarBorderPurple500Icon />,
    },
    {
      title: 'Btc Price',
      value: ` ${cryptoDetails?.btcPrice && millify(cryptoDetails?.btcPrice)}`,
      icon: <BoltIcon />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <PriceCheckIcon />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <DynamicFeedIcon />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <CurrencyExchangeIcon />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <TaskAltIcon />
      ) : (
        <CancelIcon />
      ),
      icon: <InfoOutlinedIcon />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <InfoOutlinedIcon />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <InfoOutlinedIcon />,
    },
  ];

  return (
    <div className="details-Container">
      <div className="heading">
        <h1>
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </h1>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>

      <div className="hero">
        <div className="select">
          <FormControl fullWidth>
            <InputLabel id="label" className="label">
              Select Timeperiod
            </InputLabel>
            <Select
              className={classes.root}
              labelId="label"
              value={timeperiod}
              label="Select Timeperiod"
              onChange={(e) => setTimeperiod(e.target.value)}
            >
              {time.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="chart-container">
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />
        </div>

        <div className="stats">
          <div className="left">
            <h2>{cryptoDetails.name} Value Statistics</h2>
            <p className="text">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>

            <div className="data">
              {stats.map(({ icon, title, value }) => (
                <div className="item">
                  <div className="name">
                    <p>{icon}</p>
                    <p>{title}</p>
                  </div>

                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="right">
            <h2>Other Stats Info</h2>
            <p className="text">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>

            <div className="data">
              {genericStats.map(({ icon, title, value }) => (
                <div className="item">
                  <div className="name">
                    <p>{icon}</p>
                    <p>{title}</p>
                  </div>

                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="info">
        <div className="main">
          <h2>What is {cryptoDetails.name}?</h2>
          <p style={{ color: 'white' }}>
            {HTMLReactParser(cryptoDetails.description)}
          </p>
        </div>

        <div className="links">
          <h2>{cryptoDetails.name} Links</h2>
          <div className="links-box">
            {cryptoDetails.links?.map((link) => (
              <div key={link.name} className="link">
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
                <h3>{link.type}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
