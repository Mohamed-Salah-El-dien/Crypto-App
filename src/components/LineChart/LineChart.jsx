import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import './styles.css';

ChartJS.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    let timestamp = coinHistory?.data?.history[i].timestamp * 1000;
    coinTimestamp.push(new Date(timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#fe0357',
        borderColor: '#fe0357',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'lightblue',
        },
      },
      x: {
        ticks: {
          color: 'lightblue',
        },
      },
    },
  };

  return (
    <div className="chart">
      <div className="top">
        <h2>{coinName} Price Chart </h2>
        <div className="chart-info">
          <p>Change: {coinHistory?.data?.change}%</p>
          <p>
            Current {coinName} Price: $ {currentPrice}
          </p>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
