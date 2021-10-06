/* eslint-disable import/no-cycle */
import { loadingState, addScore } from './index.js';

const GAMEID = '2XrRdmsDhup1wio5IuwU';
const BASEURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
let LOADING = false;

export const postNewScore = async (username, score) => {
  fetch(`${BASEURL}games/${GAMEID}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: username,
      score,
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((res) => {
    // Using this with Bootstrap for a toast notification later on
    if (res.status === 200) {
      return true;
    }
    return false;
  });
};

const renderTasks = (success = false, data = []) => {
  if (success) {
    data.forEach((el) => {
      el.get = (key) => el[key];
      addScore(el, false);
    });
  }
};

export const getScores = async () => {
  await loadingState();
  if (!LOADING) {
    LOADING = true;
    fetch(`${BASEURL}games/${GAMEID}/scores/`).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => renderTasks(true, json.result));
      } else {
        renderTasks(false, []);
      }
      LOADING = false;
    });
  }
};
