/* eslint-disable */
import $ from 'jquery';
import { getComments, addComments } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getLoadMoreButton, getForm } from './templates';


export function init(options) {
  let siteKey = ''; // 因為有不同地方會用到 siteKey 所以先設定為空字串
  let apiUrl = '';
  let containerElement = null;
  let commentDOM = null;
  let lastId = null;
  let isEnd = false;
  let loadMoreClassName; 
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  loadMoreClassName = `${siteKey}-load-more`;
  commentsClassName = `${siteKey}-comments`;
  formClassName = `${siteKey}-add-comment-form`;
  commentsSelector = `.${commentsClassName}`;
  formSelector = `.${formClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);

  commentDOM = $(commentsSelector);
  getNewComments();

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments();
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComments((apiUrl, siteKey, newCommentData, data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentToDOM(commentDOM, newCommentData, true);
    });
  });
  function getNewComments() {
    if (isEnd) {
      return;
    }
    $(`.${loadMoreClassName}`).hide();

    getComments((apiUrl, siteKey, lastId, data) => {
      const commentDOM = $(commentsSelector);
      if (!data.ok) {
        alert(data.message);
        return;
      }

      const comments = data.discussions;
      for (let comment of comments) {
        appendCommentToDOM(commentDOM, comment);
      }
      const length = comments.length;
      if (length < 5) {
        isEnd = true;
        $(`.${loadMoreClassName}`).hide();
      } else {
        lastId = comments[length - 1].id;
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName);
        commentDOM.append(loadMoreButtonHTML);
      }
    });
  }
}
/* eslint-enable */
