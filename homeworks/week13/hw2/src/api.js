/* eslint-disable import/no-unresolved, no-shadow */
import $ from 'jquery';

export function getComments(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (before) {
    url += `&before=${before}`;
  }
  $.ajax({
    method: 'GET',
    url,
  }).done((data) => {
    cb(data);
  });
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
  }).done((data) => {
    cb(data);
  });
}
/* eslint-enable import/no-unresolved, no-shadow */
