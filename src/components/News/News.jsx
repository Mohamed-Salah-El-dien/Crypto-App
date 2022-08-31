import React, { useState } from 'react';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import Loader from '../Loader/Loader';

import './styles.css';

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <div className="news">
      {!simplified && (
        <FormControl className="select">
          <InputLabel id="label">Select a Crypto</InputLabel>
          <Select
            className="box"
            labelId="label"
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
            {data?.data?.coins?.map((currency) => (
              <MenuItem value={currency.name}>{currency.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <div className="news-container">
        {cryptoNews.value.map((news, i) => (
          <div className="card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="img-container">
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />

                <h2>{news.name}</h2>
              </div>

              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>

              <div className="provider">
                <div className="info">
                  <img
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />

                  <h3 className="name">{news.provider[0]?.name}</h3>
                </div>

                <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
