// nav顶栏相关
// 获取当前时间
var box = document.getElementById('nav-date-box')

//不足十位补零
var addZero = val => val < 10 ? '0' + val : val
//把阿拉伯数字的星期转化为中国汉字的星期 // 星期映射表
var trans = val => {
    var obj = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
    }
    return obj[val]
}
setTime()
//获取时间的方法
function setTime() {
    var time = new Date();
    // var year = time.getFullYear(); // 获取年
    // var month = time.getMonth() + 1; // 获取月（是从0到11，所以我们要给他加1）
    // var date = time.getDate(); // 获取日
    var hour = time.getHours(); // 获取小时
    var min = time.getMinutes(); // 获取分钟
    var sec = time.getSeconds(); // 获取秒
    var day = time.getDay(); // 获取星期几(0是星期日)


    var value = addZero(hour) +
        ':' + addZero(min) + ":" + addZero(sec) + ' 星期' + trans(day)
    // 把所有的时间拼接到一起
    box.innerText = value
    // console.log(value)
    // 把拼接好的时间插入到页面

}
// 让定时器每间隔一秒就执行一次setTime这个方法（这是实现时钟的核心）
setInterval(setTime, 1000)

// 点击激活按钮后启动菜单栏
document.getElementById('start-cab').addEventListener('click', () => {
    document.getElementById('cab').classList.remove("cabsink") //驾驶舱上浮
    document.getElementById('hkr-menu-box').classList.remove("menusink") //菜单栏上浮
    document.getElementById('cab').classList.remove("cabend") //驾驶舱启动
    document.getElementById('hkr-menu-box').classList.remove("menuend") //菜单栏显现
    document.getElementById('footer').classList.add("cabfixed") //底栏固定
})
// 点击关闭按钮关闭菜单栏
document.getElementById('end-cab').addEventListener('click', () => {
    document.getElementById('cab').classList.add("cabend") //驾驶舱结束动画
    document.getElementById('hkr-menu-box').classList.add("menuend") //菜单栏结束动画
    document.getElementById('footer').classList.remove("cabfixed") //底栏移除固定
    setTimeout(function () {
        document.getElementById('hkr-menu-box').classList.add("menusink") //菜单栏下沉
        document.getElementById('cab').classList.add("cabsink") //驾驶舱下沉
    }, 1800)
})
// 点击页面选项后关闭菜单栏，延时一段时间后再跳转。
function ark_menu_link(link) {
    //首先播放菜单栏结束动画，保留驾驶舱版块
    document.getElementById('hkr-menu-box').classList.add("menuend")
    //延时0.5s待动画放完后再启动跳转
    setTimeout(function () {
        //动画播放完后菜单栏下沉
        document.getElementById('hkr-menu-box').classList.add("menusink")
        // 对跳转链接进行判断，站外链接直接跳转
        if (link.includes('https://') || link.includes('http://')) {
            window.location.href = link;
        }
        // 若是站内链接,先判断是否有pjax
        else {
            if (pjax) {
                pjax.loadUrl(link);
            }
            else {
                window.location.href = link;
            }
        }
    }, 500)
}

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
document.addEventListener('DOMContentLoaded', () => {
    // 获取所有 .flink-mini-item 元素
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
  
    // 添加搜索功能
    const fLinkSearchInput = document.querySelector('.flink-mini-search-input');
    const fLinkRefreshButton = document.querySelector('.flink-mini-refresh-button');
  
    fLinkSearchInput.addEventListener('input', () => {
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
    });
  
    fLinkRefreshButton.addEventListener('click', () => {
      // 清空搜索输入框
      fLinkSearchInput.value = '';
  
      // 显示所有 .flink-mini-item 元素
      document.querySelectorAll('.flink-mini-item').forEach((item) => {
        item.classList.remove('hidden');
      });
    });
  });