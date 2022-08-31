/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import icon from '../../images/cryptocurrency.png';

import './styles.css';

const Navbar = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={active ? 'navbar active' : 'navbar'}>
      <Button
        className="menu-btn"
        color="secondary"
        variant="contained"
        onClick={() => setActive(!active)}
      >
        <MenuOutlinedIcon />
      </Button>
      <div className={active ? 'logo-container active' : 'logo-container'}>
        <img src={icon} alt="logo" className="logo" />
        <h2>
          <Link to="/" className={active ? 'logo-text active' : 'logo-text'}>
            CryptoNews
          </Link>
        </h2>
      </div>

      <div className="menu">
        <Link to="/" className={active ? 'item active' : 'item'} title="Home">
          <HomeOutlinedIcon className="item-icon" />
          <h4 className={active ? 'item-text active' : 'item-text'}>Home</h4>
        </Link>

        <Link
          to="/cryptocurrencies"
          className={active ? 'item active' : 'item'}
          title="Cryptocurrencies"
        >
          <CurrencyBitcoinOutlinedIcon className="item-icon" />
          <h4 className={active ? 'item-text active' : 'item-text'}>
            Cryptocurrencies
          </h4>
        </Link>

        <Link
          to="/news"
          className={active ? 'item active' : 'item'}
          title="News"
        >
          <NewspaperOutlinedIcon className="item-icon" />
          <h4 className={active ? 'item-text active' : 'item-text'}>News</h4>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
