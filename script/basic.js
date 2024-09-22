// 获取所有页面元素和导航链接
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.header-nav a');

// 监听滚动事件
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;

  // 更新导航栏高亮
  updateNavHighlight(scrollPosition, windowHeight);
});

// 页面加载后立即运行一次更新函数
updateNavHighlight(window.pageYOffset, window.innerHeight);

// 更新导航栏高亮的函数
function updateNavHighlight(scrollPosition, windowHeight) {
  let activeIndex = 0;
  const documentHeight = document.documentElement.scrollHeight;

  // 检查是否滚动到了文档底部
  const isAtBottom = (window.innerHeight + window.scrollY) >= documentHeight - 1;

  if (isAtBottom) {
    // 如果在底部，激活最后一个导航项
    activeIndex = pages.length - 1;
  } else {
    // 否则，遍历所有页面找到当前应该激活的页面
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const pageTop = page.offsetTop;
      const pageHeight = page.offsetHeight;
      
      // 如果滚动位置在当前页面的上半部分，激活该页面的导航项
      if (scrollPosition < pageTop + pageHeight / 2) {
        activeIndex = i;
        break;
      }
    }
  }

  // 更新导航栏高亮
  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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