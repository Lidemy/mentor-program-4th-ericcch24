// 跳脫格式，防止使用者輸入符合 html 格式的內容，清單列出的東西會變形。
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 新增
document
  .querySelector('.add-button')
  .addEventListener('click', () => {
    const input = document.querySelector('.blank').value;
    const div = document.createElement('div');
    div.classList.add('list__item');
    div.innerHTML = `
    <input type="checkbox" />
    <span class="content">${escapeHtml(input)}</span>
    <button class="delete">delete</button>
    `;
    if (input) {
      document.querySelector('.list__area').appendChild(div);
      // document.querySelector(".list__area2").appendChild(div);
      // 在同一層 node 節點用 appendChild 並不會複製只會移動，所以此時 div 只會出現在 .list__area2 上面
      document.querySelector('.blank').value = ''; // 不能直接 input = ""，這樣只是把變數內容清空，要明確指定元素才有用。
    } else {
      alert('please type something');
    }
  });

document
  .querySelector('.list')
  .addEventListener('click', (e) => {
    // 刪除
    if (e.target.classList.contains('delete')) {
      document.querySelector('.list__area')
        .removeChild(e.target.closest('.list__item'));
      // 也可以這樣 e.target.parentNode.remove()
      return;
    }

    // 完成打勾
    // 與作業一表單的 radio checked 不同的地方在於，這邊是動態偵測打勾的動作去插入移除 class，
    // 表單則是要判斷整個表單裡面的 radio 有沒有被選，所以要整個表單找一遍有沒有 radio 再判斷。
    if (e.target.checked) {
      e.target.parentNode.classList.add('finish');
    } else {
      e.target.parentNode.classList.remove('finish');
    }
  });

/* 作業一的方法用不起來
const elements = document.querySelector(".list");
for (let element of elements) {
  const checkboxes = element.querySelectorAll("input[type=checkbox]");
  console.log([...checkboxes].checked)
  if (!checkboxes.length) continue;
  let isChecked = [...checkboxes].forEach(checkbox => checkbox.checked);
  if (isChecked) {
    element.classList.add("finish");
  } else {
    element.classList.remove("finish");
  }
}
*/
