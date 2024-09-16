// 定义每个集合的内容和标题
const collections = {
    nantong: {
        title: "Nantong, Jiangsu",
        items: [
            { type: 'medium', title: '南通风光', description: '美丽的江海之城' },
            { type: 'medium', title: '狼山', description: '南通著名景点' },
            { type: 'medium', title: '狼山', description: '南通著名景点' },
            { type: 'square', title: '狼山', description: '南通著名景点' },
            { type: 'long', title: '狼山', description: '南通著名景点' },
            { type: 'tall', title: '狼山', description: '南通著名景点' },
            { type: 'large', title: '狼山', description: '南通著名景点' },
            { type: 'large', title: '狼山', description: '南通著名景点' },
        ]
    },
    tongji: {
        title: "同济大学",
        items: [
            { type: 'large', title: '同济大学', description: '百年学府' },
            { type: 'square', title: '四平路校区', description: '主校区风貌' },
        ]
    },
    // 为其他集合添加内容...
};

function createBentoItem(item) {
    return `
        <div class="bento-item ${item.type}">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `;
}

function updateCollectionTitle(collectionName) {
    const titleElement = document.querySelector('.collection-title');
    titleElement.textContent = collections[collectionName].title;
}

function updateBentoGrid(collectionName) {
    const bentoGrid = document.querySelector('.bento-grid');
    const collectionItems = collections[collectionName].items;
    
    if (collectionItems) {
        bentoGrid.innerHTML = collectionItems.map(createBentoItem).join('');
    } else {
        bentoGrid.innerHTML = '<p>No items found for this collection.</p>';
    }

    updateCollectionTitle(collectionName);
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.bento-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const collectionName = link.getAttribute('data-collection');
            updateBentoGrid(collectionName);
            
            // 更新活动链接样式
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 默认显示第一个集合
    const firstCollectionName = navLinks[0].getAttribute('data-collection');
    updateBentoGrid(firstCollectionName);
    navLinks[0].classList.add('active');
});