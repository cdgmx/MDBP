const animationContainer = document.querySelector('.svg-animation');
const animationContainer2 = document.querySelector('.svg-animation2');

//--for sidenavs -//
$(document).ready(function() {
 
  // SideNav Button Initialization
  $(".button-collapse").sideNav();
    // SideNav Scrollbar Initialization
    var sideNavScrollbar = document.querySelector('.custom-scrollbar');
    var ps = new PerfectScrollbar(sideNavScrollbar);


    //Loading lottie file
    $.getJSON('data1.json', function(data){
      const animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
      rendererSettings: {
      preserveAspectRatio: 'none'}
    
    });
    });
    $.getJSON('data3.json', function(data){
      const animation2 = lottie.loadAnimation({
      container: animationContainer2,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
      rendererSettings: {
      preserveAspectRatio: 'none'}
    
    });
    });


    
    
});








//--for scrolling and gradient-//

// const gra = function(min, max) {
//   return Math.random() * (max - min) + min;
// }
// const init = function(){
//   let items = document.querySelectorAll('section');
//   for (let i = 0; i < items.length; i++){
//       items[i].style.background = randomColor({luminosity: 'light'});
//   }
//   cssScrollSnapPolyfill()
// }
// init();

//







