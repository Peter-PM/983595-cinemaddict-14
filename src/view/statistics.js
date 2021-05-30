import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {calculationRating} from '../utils/common.js';
import {dateStatisticHours} from '../utils/date.js';
import {dateStatisticMitutes} from '../utils/date.js';
import dayjs from 'dayjs';

const getGenres = (films) => {
  const allGenres = films.map((film) => film.genre).flat();
  const uniq = [...new Set(allGenres)];

  return {
    labels: uniq,
    data: uniq.map((genre) => allGenres.filter((item) => item === genre).length),
  };
};

const renderChart = (statisticCtx, films) => {
  const genres = getGenres(films);
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres.labels,
      datasets: [{
        data: genres.data,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 40,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createUserStatistic = (films) => {

  const createTotalDurations = () => {
    let duration = 0;
    films.forEach((element) => {
      duration += element.duration;
    });
    return duration;
  };
  const totalTime = createTotalDurations();

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${calculationRating(films.length)}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="day">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${films.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${dateStatisticHours(totalTime)}<span class="statistic__item-description">h</span> ${dateStatisticMitutes(totalTime)} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000" height=""></canvas>
      </div>

    </section>`
  );
};


export default class UserStatistic extends SmartView {
  constructor(films) {
    super();
    this._films = films;

    this._currentFilter = 'All';

    this._dayChart = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._setCharts = this._setCharts.bind(this);

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
    if (this._daysChart !== null) {
      this._daysChart = null;
    }
  }

  _dataChangeHandler(evt) {
    const value = evt.target.value;

    const films = this._films.filter((film) => {
      return dayjs(film.watchedDate) >= dayjs().subtract(1, value).toDate();
    });
    this.updateData({
      films: films,
    });
  }

  getTemplate() {
    return createUserStatistic(this._films);
  }

  _changeDate(dateFrom, type) {
    return dayjs().subtract(dateFrom, type).toDate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._daysChart !== null) {
      this._daysChart = null;
    }

    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._dataChangeHandler);

    const daysCtx = this.getElement().querySelector('.statistic__chart');

    this._daysChart = renderChart(daysCtx, this._films);
  }
}

