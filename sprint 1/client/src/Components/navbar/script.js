function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile) {
      if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    
      } else {
        menuMobile.classList.add('open');

      }
    }
  }

  export default menuShow;