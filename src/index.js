import './style.css';
import { postNewScore, getScores } from './gameAPI.js';

export const table = document.getElementById('leaderboardTable');
const LOADMSG = document.createElement("p")
LOADMSG.innerText = "Loading"


export const addScore = (data, postData = true) => {
  const tableArr = [].slice.call(table.children)
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
  table.innerHTML = ""
  table.appendChild(LOADMSG)
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
};