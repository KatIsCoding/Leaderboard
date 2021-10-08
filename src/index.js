/* eslint-disable import/no-cycle */
import { postNewScore, getScores } from './gameAPI.js';

require('./stars.css');
require('./toast.css');
require('./style.css');

export const table = document.getElementById('leaderboardTable');
const LOADMSG = document.createElement('p');
LOADMSG.innerText = 'Loading';

export const addScore = (data, postData = true) => {
  const tableArr = [].slice.call(table.children);
  if (tableArr.includes(LOADMSG)) {
    table.innerHTML = '';
  }
  const newScore = document.createElement('li');
  newScore.innerText = `${data.get('user')}: ${data.get('score')}`;
  table.append(newScore);
  if (postData) {
    postNewScore(data.get('user'), data.get('score'));
  }
};

export const loadingState = async () => {
  table.innerHTML = '';
  table.appendChild(LOADMSG);
};

window.onload = () => {
  getScores();
  document.getElementById('addNewScore').addEventListener('submit', (e) => {
    addScore(new FormData(e.target));
    e.preventDefault();
  });
  document.getElementById('refreshLeaderboard').addEventListener('click', () => {
    getScores();
  });

  Array.prototype.forEach.call(document.getElementById('bg').children, (star) => {
    const rand = Math.random() * (-3920 + 720) + 720;
    const sign = Math.round(Math.random()) ? 1 : -1;
    star.style.right = `${rand * sign}px`;
    star.style['animation-delay'] = `${Math.random() * (5 - 0.1) + 0.1}s`;
  });
};