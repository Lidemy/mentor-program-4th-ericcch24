document
  .querySelector('.question__area')
  .addEventListener('click', (e) => {
    const element = e.target.closest('.question__line');
    if (element) {
      element.classList.toggle('line-hide');
    }
  });

/*
function closest(node, className) {
  while(node && node.classList) {
    if (node.classList.contains(className)) {
      // 尋找 node 的 classList 有沒有包含目標 className
      return node
    }
    node = node.parentNode // 持續往上層找
  }
}
*/

// 按下標題，判斷有沒有 hide
// 若有，把 hide 移除
// 若沒有，加入 hide
