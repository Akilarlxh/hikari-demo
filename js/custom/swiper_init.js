// 首页顶部推荐文章轮播图
var hkr_swiper = new Swiper("#hkr-swiper-container", {
  direction: "horizontal", //横向切换
  loop: true,
  grabCursor : true,//鼠标悬停时显示抓手
  updateOnWindowResize: true,
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2000,//2秒切换一次
    pauseOnMouseEnter: true, //鼠标进入停止切换，离开恢复切换
  },
});

// 页面菜单栏轮播图
var hkr_menu_swiper = new Swiper(".menu-item-container", {
  direction: "horizontal", //横向切换
  loop: true,
  updateOnWindowResize: true,
  grabCursor : true,//鼠标悬停时显示抓手
  slidesPerView: 1,
  spaceBetween: 10,
  mousewheel: true,
  pagination: {
    el: ".hkr-menu-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,//3秒切换一次
    pauseOnMouseEnter: true, //鼠标进入停止切换，离开恢复切换
  },
  
});

// 友链页面轮播图
var hkr_link_swiper = new Swiper("#flink-swiper-container", {
  direction: "horizontal", //横向切换
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  updateOnWindowResize: true,
  grabCursor : true,//鼠标悬停时显示抓手
  spaceBetween: 10,
  mousewheel: true,
  pagination: {
    el: "#flink-swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,//3秒切换一次
    pauseOnMouseEnter: true, //鼠标进入停止切换，离开恢复切换
  },
});

