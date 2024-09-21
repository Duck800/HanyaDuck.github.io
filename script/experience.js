// 定义每个集合的内容和标题
const collections = {
    nantong: {
        title: "Nantong",
        items: [
            { type: 'medium', title: 'Hao River', image: 'Nantong/HaoRiver.jpg' },
            { type: 'medium', title: 'West Railway Station', image: 'Nantong/WestStation.jpg' },
            { type: 'medium', title: 'Wolf Hill', image: 'Nantong/WolfHill.jpg' },
            { type: 'square', title: 'Huoxiang Tea', image: 'Nantong/HuoxiangTea.jpg' },
            { type: 'long', title: '潮平两岸阔', description: "The tide is high, and the shores stretch wide<br>A serene expanse where beauty does abide." },
            { type: 'tall', title: 'Bamboo Backyard', image: 'Nantong/Bamboo.jpg' },
            { type: 'large', title: 'Gate of Wolf Hill', image: 'Nantong/GateOfWolfHill.jpg' },
            { type: 'large', title: 'Nantong Museum', image: 'Nantong/Museum.jpg' },
        ]
    },
    tongji: {
        title: "Tongji",
        items: [
            { type: 'medium', title: 'Hao River', image: 'Nantong/HaoRiver.jpg' },
            { type: 'medium', title: 'West Railway Station', image: 'Nantong/WestStation.jpg' },
            { type: 'medium', title: 'Wolf Hill', image: 'Nantong/WolfHill.jpg' },
            { type: 'square', title: 'Huoxiang Tea', image: 'Nantong/HuoxiangTea.jpg' },
            { type: 'long', title: '潮平两岸阔', description: "The tide is high, and the shores stretch wide<br>A serene expanse where beauty does abide." },
            { type: 'tall', title: 'Bamboo Backyard', image: 'Nantong/Bamboo.jpg' },
            { type: 'large', title: 'Gate of Wolf Hill', image: 'Nantong/GateOfWolfHill.jpg' },
            { type: 'large', title: 'Nantong Museum', image: 'Nantong/Museum.jpg' },
        ]
    },
    qinghai_gansu: {
        title: "Qinghai-Gansu",
        items: [
            { type: 'medium', title: 'Hao River', image: 'Gansu&Qinghai/Jingfan.jpg' },
            { type: 'medium', title: 'West Railway Station', image: 'Gansu&Qinghai/Priarie.jpg' },
            { type: 'medium', title: 'Wolf Hill', image: 'Gansu&Qinghai/Lanshan.jpg' },
            { type: 'square', title: 'Huoxiang Tea', image: 'Gansu&Qinghai/Chaka.jpg' },
            { type: 'long', title: '人生是旷野 非轨道', description: "Life is wilderness, not bound by track<br>In freedom's dance, we shan't look back." },
            { type: 'tall', title: 'Bamboo Backyard', image: 'Gansu&Qinghai/College.jpg' },
            { type: 'large', title: 'Gate of Wolf Hill', image: 'Gansu&Qinghai/Horse.jpg' },
            { type: 'large', title: 'Nantong Museum', image: 'Gansu&Qinghai/TaerTemple.jpg' },
        ]
    },
};

function createBentoItem(item, folder) {
    if (!item.description && !item.image) {
        // 如果只有标题，直接返回只包含标题的 div
        return `
            <div class="bento-item ${item.type}">
                <b>${item.title}</b>
            </div>
        `;
    }

    const backgroundStyle = item.image
        ? `style="background-image: url('./public/experience/${item.image}'); background-size: cover; background-position: center;"`
        : '';

    const content = item.description
        ? `
            <div class="bento-item-content">
                <b>${item.title}</b>
                <p>${item.description}</p>
            </div>
          `
        : '';

    return `
        <div class="bento-item ${item.type}" ${backgroundStyle}>
            ${content}
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
