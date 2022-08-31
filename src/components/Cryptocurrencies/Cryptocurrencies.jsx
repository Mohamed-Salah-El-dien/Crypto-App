import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/styles';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import Loader from '../Loader/Loader';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fe0357',
    borderRadius: '10px',
  },
}));

const Cryptocurrencies = ({ simplified }) => {
  const classes = useStyles();
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <div className="container">
      {!simplified && (
        <div className="search">
          <TextField
            className={classes.root}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            label="Search For A Currency"
            variant="filled"
            color="info"
          />
        </div>
      )}

      <div className="grid">
        {cryptos?.map((currency) => (
          <Link
            key={currency.uuid}
            to={`/crypto/${currency.uuid}`}
            className="link"
          >
            <div className="card">
              <div className="title">
                <div className="left">
                  <img src={currency.iconUrl} alt="logo" className="img" />
                  <h3>{currency.name}</h3>
                </div>
                <h3 className="right">{currency.rank}</h3>
              </div>

              <div className="content">
                <p className="info">Price: {millify(currency.price)}</p>
                <p className="info">
                  Market Cap: {millify(currency.marketCap)}
                </p>
                <p className="info">Daily Change: {currency.change}%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
