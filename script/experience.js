// 定义每个集合的内容和标题
const collections = {
    nantong: {
        title: "Nantong",
        items: [
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 1, small: 1 }, title: 'Hao River', image: 'Nantong/HaoRiver.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 2, small: 2 }, title: 'West Railway Station', image: 'Nantong/WestStation.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 3, small: 5 }, title: 'Wolf Hill', image: 'Nantong/WolfHill.jpg' },
            { responsiveType: { default: 'square', small: 'square' }, order: { default: 4, small: 4 }, title: 'Huoxiang Tea', image: 'Nantong/HuoxiangTea.jpg' },
            { responsiveType: { default: 'long', small: 'long' }, order: { default: 5, small: 3 }, title: '潮平两岸阔', description: "The tide is high, and the shores stretch wide<br>A serene expanse where beauty does abide." },
            { responsiveType: { default: 'tall', small: 'medium' }, order: { default: 6, small: 7 }, title: 'Bamboo Backyard', image: 'Nantong/Bamboo.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 7, small: 8 }, title: 'Gate of Wolf Hill', image: 'Nantong/GateOfWolfHill.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 8, small: 6 }, title: 'Nantong Museum', image: 'Nantong/Museum.jpg' },
        ]
    },
    tongji: {
        title: "Tongji",
        items: [
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 1, small: 1 }, title: 'Hao River', image: 'Nantong/HaoRiver.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 2, small: 2 }, title: 'West Railway Station', image: 'Nantong/WestStation.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 3, small: 5 }, title: 'Wolf Hill', image: 'Nantong/WolfHill.jpg' },
            { responsiveType: { default: 'square', small: 'square' }, order: { default: 4, small: 4 }, title: 'Huoxiang Tea', image: 'Nantong/HuoxiangTea.jpg' },
            { responsiveType: { default: 'long', small: 'long' }, order: { default: 5, small: 3 }, title: '潮平两岸阔', description: "The tide is high, and the shores stretch wide<br>A serene expanse where beauty does abide." },
            { responsiveType: { default: 'tall', small: 'medium' }, order: { default: 6, small: 7 }, title: 'Bamboo Backyard', image: 'Nantong/Bamboo.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 7, small: 8 }, title: 'Gate of Wolf Hill', image: 'Nantong/GateOfWolfHill.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 8, small: 6 }, title: 'Nantong Museum', image: 'Nantong/Museum.jpg' },
        ]
    },
    qinghai_gansu: {
        title: "Qinghai-Gansu",
        items: [
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 1, small: 1 }, title: 'Jingfan', image: 'Gansu&Qinghai/Jingfan.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 2, small: 2 }, title: 'Prairie', image: 'Gansu&Qinghai/Priarie.jpg' },
            { responsiveType: { default: 'medium', small: 'medium' }, order: { default: 3, small: 5 }, title: 'Lanshan', image: 'Gansu&Qinghai/Lanshan.jpg' },
            { responsiveType: { default: 'square', small: 'square' }, order: { default: 4, small: 4 }, title: 'Chaka', image: 'Gansu&Qinghai/Chaka.jpg' },
            { responsiveType: { default: 'long', small: 'long' }, order: { default: 5, small: 3 }, title: '人生是旷野 非轨道', description: "Life is wilderness, not bound by track<br>In freedom's dance, we shan't look back." },
            { responsiveType: { default: 'tall', small: 'medium' }, order: { default: 6, small: 7 }, title: 'College', image: 'Gansu&Qinghai/College.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 7, small: 8 }, title: 'Horse', image: 'Gansu&Qinghai/Horse.jpg' },
            { responsiveType: { default: 'large', small: 'medium' }, order: { default: 8, small: 6 }, title: 'Taer Temple', image: 'Gansu&Qinghai/TaerTemple.jpg' },
        ]
    },
};

function createBentoItem(item, screenWidth) {
    const currentType = screenWidth <= 1200 ? item.responsiveType.small : item.responsiveType.default;

    let content = '';
    if (!item.description && !item.image) {
        content = `<b>${item.title}</b>`;
    } else if (item.description) {
        content = `
            <div class="bento-item-content">
                <b>${item.title}</b>
                <p>${item.description}</p>
            </div>
        `;
    }

    const backgroundStyle = item.image
        ? `style="background-image: url('./public/experience/${item.image}'); background-size: cover; background-position: center;"`
        : '';

    return `
        <div class="bento-item ${currentType}" ${backgroundStyle}>
            ${content}
        </div>
    `;
}

function updateCollectionTitle(collectionName) {
    const titleElement = document.querySelector('.collection-title');
    titleElement.textContent = collections[collectionName].title;
}

function updateBentoGrid(collectionName) {
    currentCollection = collectionName;  // 确保在这里设置 currentCollection
    const bentoGrid = document.querySelector('.bento-grid');
    const collectionItems = collections[collectionName].items;

    if (collectionItems) {
        const screenWidth = window.innerWidth;
        
        const sortedItems = collectionItems.sort((a, b) => {
            const orderA = screenWidth <= 1200 ? a.order.small : a.order.default;
            const orderB = screenWidth <= 1200 ? b.order.small : b.order.default;
            return orderA - orderB;
        });
        console.log("sort well")

        bentoGrid.innerHTML = sortedItems.map(item => createBentoItem(item, screenWidth)).join('');
    } else {
        bentoGrid.innerHTML = '<p>No items found for this collection.</p>';
    }

    updateCollectionTitle(collectionName);

    // 更新激活状态
    const navLinks = document.querySelectorAll('.bento-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-collection') === collectionName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.bento-nav a');
    const folders = document.querySelectorAll('.bento-nav .folder-name');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const collectionName = link.getAttribute('data-collection');
            updateBentoGrid(collectionName);
        });
    });

    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            folder.parentElement.classList.toggle('open');
        });
    });

    // 默认显示第一个集合
    const firstLink = navLinks[0];
    const firstCollectionName = firstLink.getAttribute('data-collection');
    updateBentoGrid(firstCollectionName);

    // 打开默认集合所在的文件夹
    const defaultFolder = firstLink.closest('.folder');
    if (defaultFolder) {
        defaultFolder.classList.add('open');
    }
});

let currentCollection = '';
let resizeTimeout;

window.addEventListener('resize', () => {
    console.log('Resize event triggered');
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log(`Resize timeout fired. Current collection: ${currentCollection}`);
        if (currentCollection) {
            updateBentoGrid(currentCollection);
        } else {
            console.log('No current collection set');
        }
    }, 100); // 将延迟减少到 100 毫秒
});

// 确保在页面加载时设置初始 collection
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.bento-nav a');
    const firstLink = navLinks[0];
    if (firstLink) {
        const firstCollectionName = firstLink.getAttribute('data-collection');
        console.log(`Initial collection set to: ${firstCollectionName}`);
        updateBentoGrid(firstCollectionName);
    } else {
        console.log('No navigation links found');
    }
});