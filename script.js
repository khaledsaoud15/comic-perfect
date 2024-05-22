const swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    speed: 1000,
    autoplay: {
      delay: 0,
    },

    freeMode: {
      enabled: true,
      sticky: false,
    },

        effect: "coverflow",
        coverflowEffect: {
        rotate: 40,
        slideShadows: true,
        },

    spaceBetween: 30,
    loop: true,
  
});
