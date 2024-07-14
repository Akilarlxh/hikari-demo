//友链页面mini样式点击监测
// 检查页面是否存在 .flink-mini-item 元素
if (document.querySelectorAll('.flink-mini-item').length > 0) {
  // 添加事件监听器到 .flink-mini-item 元素上
  document.querySelectorAll('.flink-mini-item').forEach(item => {
    item.addEventListener('click', handleFLinkMiniItemClick);
  });

  function handleFLinkMiniItemClick(event) {
    
    const fLinkMiniCoverBox = document.querySelector('#flink-mini-cover-box');
    const fLinkMiniID = fLinkMiniCoverBox.querySelector('.flink-mini-meta-id')
    const fLinkMiniSiteshot = fLinkMiniCoverBox.querySelector('.flink-mini-siteshot');
    const fLinkMiniMetaDescr = fLinkMiniCoverBox.querySelector('.flink-mini-meta-descr');
    const fLinkMiniAvatar = fLinkMiniCoverBox.querySelector('.flink-mini-avatar');

    // 获取 .flink-mini-item 上的 data 属性值
    const name = event.currentTarget.dataset.name;
    const link = event.currentTarget.dataset.link;
    const descr = event.currentTarget.dataset.descr;
    const avatar = event.currentTarget.dataset.avatar;
    const siteshot = event.currentTarget.dataset.siteshot;

    // 更新 #flink-mini-cover-box 中的元素
    fLinkMiniCoverBox.setAttribute('href', link);
    fLinkMiniCoverBox.setAttribute('target', '_blank');
    fLinkMiniCoverBox.setAttribute('title', descr);
    fLinkMiniID.textContent = name;
    fLinkMiniSiteshot.setAttribute('src', siteshot);
    fLinkMiniMetaDescr.textContent = descr;
    fLinkMiniAvatar.setAttribute('src', avatar);
  }
}
// 友链页面mini样式搜索功能
function initSearchAndRefresh() {
  // 获取页面中的所有 .flink-mini-item 元素
  const miniItemContainer = document.querySelector('.item-container');
  const miniItems = document.querySelectorAll('.flink-mini-item');
  const miniItemCount = miniItems.length;

  // 检查 localStorage 中是否存在 fLinkItemData
  let fLinkItemData = JSON.parse(localStorage.getItem('fLinkItemData'));

  // 如果 fLinkItemData 不存在或 .flink-mini-item 数量发生变化,则重新构建
  if (!fLinkItemData || fLinkItemData.count !== miniItemCount) {
    fLinkItemData = {};
    miniItems.forEach((item) => {
      const dataName = item.dataset.name;
      const dataLink = item.dataset.link;
      fLinkItemData[dataLink] = {
        name: dataName,
        link: dataLink
      };
    });
    fLinkItemData.count = miniItemCount;
    localStorage.setItem('fLinkItemData', JSON.stringify(fLinkItemData));
  }

  // 添加搜索和刷新功能
  const fLinkSearchInput = document.querySelector('.flink-mini-search-input');
  const fLinkRefreshButton = document.querySelector('.flink-mini-refresh-button');

  function applySearchAndRefresh() {
    const searchTerm = fLinkSearchInput.value.toLowerCase();

    // 如果 fLinkItemData 不存在,则重新构建
    if (!fLinkItemData) {
      fLinkItemData = JSON.parse(localStorage.getItem('fLinkItemData'));
    }

    document.querySelectorAll('.flink-mini-item').forEach((item) => {
      const dataName = item.dataset.name.toLowerCase();
      const dataLink = item.dataset.link.toLowerCase();
      if (dataName.includes(searchTerm) || dataLink.includes(searchTerm)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  if(fLinkSearchInput){
    fLinkSearchInput.addEventListener('input', applySearchAndRefresh);
  }
  if(fLinkRefreshButton){
    fLinkRefreshButton.addEventListener('click', () => {
      // 清空搜索输入框
      fLinkSearchInput.value = '';
      applySearchAndRefresh();
    });
  }

}

// 在 PJAX 的回调函数中重新执行相关的 JavaScript 代码
document.addEventListener('pjax:success', function() {
  initSearchAndRefresh();
});

// 初次加载时执行一次
initSearchAndRefresh();