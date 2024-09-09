// 获取所有页面元素
const pages = document.querySelectorAll('.page');
const circles = document.querySelectorAll('.circle-box div');
// 获取所有导航链接元素
const navLinks = document.querySelectorAll('.header-nav a');

// 添加滚轮滑动事件监听
let currentPage = 0;
let isScrolling = false;

window.addEventListener('wheel', (event) => {
  if (isScrolling) return;
  isScrolling = true;

  if (event.deltaY > 0) {
    // 向下滚动
    if (currentPage < pages.length - 1) {
      currentPage++;
      scrollToPage(currentPage);
      moveCircle(currentPage);
    }
  } else {
    // 向上滚动
    if (currentPage > 0) {
      currentPage--;
      scrollToPage(currentPage);
      moveCircle(currentPage);
    }
  }

  setTimeout(() => {
    isScrolling = false;
  }, 500);
});

// 添加导航链接点击事件监听
navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    currentPage = index;
    scrollToPage(currentPage);
    moveCircle(currentPage);
  });
});

// 滚动到指定页面
function scrollToPage(pageIndex) {
  pages[pageIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  // 更新导航栏高亮
  navLinks.forEach((link, index) => {
    if (index === pageIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 设置背景图类
  if (pageIndex === 3) {
    document.querySelector('#contact').classList.add('background-scene');
  } else {
    document.querySelector('#contact').classList.remove('background-scene');
  }
}

// 创建一个新的 <style> 元素
const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

const radius = 250; // 圆半径

let keyframes = '@keyframes orbit-moon {';

for (let i = 0; i <= 100; i += 1) {
  const angle = 90 + (i / 100) * 180; // 从 90° 到 270°
  const x = radius * Math.cos((angle * Math.PI) / 180); // X 坐标
  const y = radius * Math.sin((angle * Math.PI) / 180); // Y 坐标
  keyframes += `${i}% { transform: translate(${x}px, ${-y}px) rotate(${angle}deg); }\n`; // y 值取反
}

keyframes += '}';

// 将关键帧添加到新创建的样式表中
styleSheet.innerHTML = keyframes;

// 移动圆形
function moveCircle(pageIndex) {
  const circles = document.querySelectorAll('.circle');

  circles.forEach((circle, index) => {
    if (index === 0) { // 小圆
      if (pageIndex === 0) {
        circle.classList.remove('moveleft', 'movedown', 'moon');
      } else if (pageIndex === 3) {
        circle.classList.remove('moveleft', 'moon');
        circle.classList.add('movedown');
      } else if (pageIndex === 2) {
        circle.classList.remove('moveleft', 'movedown');
        circle.classList.add('moon'); // 添加月亮样式
      } else {
        circle.classList.remove('movedown', 'moon');
        circle.classList.add('moveleft');
      }
    } else if (index === 1) { // 大圆
      if (pageIndex === 3) {
        circle.classList.add('move');
        circle.classList.remove('earth');
      } else if (pageIndex === 2) {
        circle.classList.remove('move');
        circle.classList.add('earth'); // 添加地球样式
      } else {
        circle.classList.remove('move', 'earth');
      }
    }
  });
}

// 获取下载按钮元素
const downloadBtn = document.querySelector('.download');

// 添加点击事件监听
downloadBtn.addEventListener('click', () => {
  // 创建一个临时链接
  const tempLink = document.createElement('a');
  tempLink.href = './Hanya CV.pdf'; // 替换为您的简历文件路径
  tempLink.download = 'Hanya-CV(CN&EN).pdf'; // 设置下载文件名称
  tempLink.setAttribute('target', '_blank'); // 在新标签页打开

  // 点击触发下载
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
});
