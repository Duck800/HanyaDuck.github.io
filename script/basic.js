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

// 更新导航栏高亮的函数
function updateNavHighlight(scrollPosition, windowHeight) {
  for (let i = pages.length - 1; i >= 0; i--) {
    const page = pages[i];
    const pageTop = page.offsetTop;
    const pageHeight = page.offsetHeight;
    
    // 计算页面底部相对于文档顶部的位置
    const pageBottom = pageTop + pageHeight;
    
    // 计算视窗底部相对于文档顶部的位置
    const viewportBottom = scrollPosition + windowHeight;
    
    // 如果当前页面的一半以上在视窗中，就高亮对应的导航项
    if (viewportBottom > pageTop + pageHeight / 2) {
      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[i].classList.add('active');
      
      // 设置背景图类
      if (i === 3) {
        document.querySelector('#contact').classList.add('background-scene');
      } else {
        document.querySelector('#contact').classList.remove('background-scene');
      }
      
      break; // 找到匹配的页面后就退出循环
    }
  }
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