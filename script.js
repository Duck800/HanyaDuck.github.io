//  页面挂载后
window.onload = () => {
    // 加载cdn资源 https://cdn.bootcdn.net/ajax/libs/gsap/3.12.2/CSSRulePlugin.min.js
    const script = document.createElement('script')
    script.src = 'https://cdn.bootcdn.net/ajax/libs/gsap/3.12.2/gsap.min.js'
    document.body.appendChild(script)
    script.onload = () => {
        // 加载完成后执行
        // 滚动事件
        (document.getElementById('page-container') || document.body).addEventListener('wheel', (e) => {
            // 页面可视高度
            const innerHeight = window.innerHeight
            // 判断e.deltaY大于0 页面向下滑动 位置坐标向上走
            // y轴移动距离 clamp(最小值, 最大值, 阈值在前两个值之间的值)
            let translateY = gsap.utils.clamp(
                -3 * window.innerHeight,
                0,
                +gsap.getProperty('.page', 'y') +
                (-e.deltaY / Math.abs(e.deltaY)) * innerHeight,
            )
            // 更新页面位置
            gsap.to('.page', {
                y: translateY,
                duration: 0.5,
            })

        })
    }
}

// 获取所有页面元素
const pages = document.querySelectorAll('.page');

// 添加滚动事件监听
window.addEventListener('scroll', () => {
    let currentPage = 0;
    let minDistance = Infinity;

    // 找到当前页面
    pages.forEach((page, index) => {
        const distance = Math.abs(page.getBoundingClientRect().top);
        if (distance < minDistance) {
            minDistance = distance;
            currentPage = index;
        }
    });

    // 更新导航栏高亮
    document.querySelectorAll('.header-nav a').forEach((link, index) => {
        if (index === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// 添加导航栏链接点击事件
document.querySelectorAll('.header-nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = document.getElementById(e.target.getAttribute('href').slice(1));
        targetPage.scrollIntoView({ behavior: 'smooth' });

        // 高亮当前链接
        document.querySelectorAll('.header-nav a').forEach((a) => {
            a.classList.remove('active');
        });
        e.target.classList.add('active');
    });
});