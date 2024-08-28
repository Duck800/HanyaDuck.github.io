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
}

// 移动圆形
function moveCircle(pageIndex) {
  circles.forEach((circle, index) => {
    if (index === 0) {
      if (pageIndex === 0) {
        circle.classList.remove('moveleft');
        circle.classList.remove('movedown');
      } else if(pageIndex === 2) {
        circle.classList.remove('moveleft');
        circle.classList.add('movedown');
      }
      else{
        circle.classList.remove('movedown');
        circle.classList.add('moveleft');
      }
    }
    else if (index === 1) {
      if (pageIndex === 2) {
        circle.classList.add('move');
      } else {
        circle.classList.remove('move');
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
