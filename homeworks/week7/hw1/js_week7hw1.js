document
  .querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false; // 預設沒有錯誤，必填欄位都有填
    const values = {};
    const inputs = document.querySelectorAll('.must'); // 找 .must 底下的 input
    for (let i = 0; i < inputs.length; i += 1) {
      values[inputs[i].name] = inputs[i].value;
      if (inputs[i].value === null || inputs[i].value === '') { // 或是 !input.value
        inputs[i].parentNode.classList.remove('hide-error'); // parentNode 找上層
        hasError = true; // 有欄位沒填所以有錯誤
      } else {
        inputs[i].parentNode.classList.add('hide-error');
      }
    }

    const elements = document.querySelectorAll('.what-type'); // 找底下有沒有 radio
    for (let i = 0; i < elements.length; i += 1) {
      const radios = elements[i].querySelectorAll('input[type=radio]');
      if (!radios.length) {
        // eslint-disable-next-line
        continue; // 陣列長度是 true 的話代表陣列裡面有元素
      }
      const hasValue = [...radios].some(radio => radio.checked);
      // some(): 測試陣列中是否至少有一個元素，通過該函式所實作的測試
      if (!hasValue) {
        elements[i].classList.remove('hide-error');
        hasError = true;
      } else {
        elements[i].classList.add('hide-error');
        const r = elements[i].querySelector('input[type=radio]:checked'); // 有選到的 radio
        values[r.name] = r.id;
      }
    }
    if (!hasError) {
      alert(JSON.stringify(values));
    }
  });

// 先驗證必填欄位
// 如果有空白，不送出表單，且空白欄位下面加紅字提示
// 都沒空白，送出表單，alert 出現輸入的資訊。


/*
function validBlank() {
  let input = document.querySelectorAll(".must").value;
  if (input === null || input === "") {
    const div = document.createElement("div")
    div.classList.add("warning")
    div.innerHTML = `此欄位為必填`
    document.querySelector(".must").appendChild(div)
  }
}
*/
