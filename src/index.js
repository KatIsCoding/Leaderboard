import './style.css';
import { postNewScore, getScores } from './gameAPI.js';

const table = document.getElementById('leaderboardTable');

export const addScore = (data, postData=true) => {
  if (table.innerHTML ==="<p>Loading</p>") {
    table.innerHTML = ""
  }
  const newScore = document.createElement('li');
  newScore.innerText = `${data.get('user')}: ${data.get('score')}`;
  table.append(newScore);
  if (postData){
    postNewScore(data.get("user"), data.get("score"))
  }
};

export const loadingState = async () => {
  table.innerHTML = "<p>Loading</p>"
}

window.onload = () => {
  getScores() 
  document.getElementById('addNewScore').addEventListener('submit', (e) => {
    addScore(new FormData(e.target));
    e.preventDefault();
  });
  document.getElementById("refreshLeaderboard").addEventListener("click", (e) => {
    getScores()
  })
};