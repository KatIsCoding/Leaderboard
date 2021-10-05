import './style.css';

const addScore = (data) => {
  const table = document.getElementById('leaderboardTable');
  const newScore = document.createElement('li');
  newScore.innerText = `${data.get('name')}: ${data.get('score')}`;
  table.append(newScore);
};

window.onload = () => {
  document.getElementById('addNewScore').addEventListener('submit', (e) => {
    addScore(new FormData(e.target));
    e.preventDefault();
  });
};