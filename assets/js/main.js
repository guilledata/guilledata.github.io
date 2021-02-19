document.addEventListener("DOMContentLoaded", function(event) {

    "use strict";

    // detectar previus url
    var oldURL = document.referrer;

    if (oldURL == 'http://127.0.0.1:5500/') {


    }else{
    
        
    }


     // load particles
     particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        // fadein particles
        // document.querySelector('#particles-js').style.cssText = "opacity: 1;";
    });

 
    
    // m3dlogoCircuit = document.querySelector('#m3dlogocircuit');

    

    
    // document.querySelector('#background-loader').classList.add('opacityOff');
    // // display none background loader
    // document.querySelector('#background-loader').addEventListener("animationend", function() {
    //     document.querySelector('#background-loader').style.cssText = "display: none;";
    //     document.getElementsByTagName('html')[0].style.overflow = "auto";
    // }, false);



    


    // MENU
    const body = document.body;
    const bgColorsBody = ["white", "red", "cyan","magenta",];
    const colorsShadowMenu = ["0px 0px 60px 0px rgba(169, 169, 169, 0.5);",
        "0px 0px 60px 0px rgba(178, 34, 34, 0.6);",
        "0px 0px 60px 0px rgba(0, 255, 255, 0.3);",
        "0px 0px 60px 0px rgba(255, 0, 255, 0.4);",
    ];
    const menu = body.querySelector(".menu");
    // const boxShadowMenu = body.querySelector(".menu");
    const menuItems = menu.querySelectorAll(".menu__item");
    const menuBorder = menu.querySelector(".menu__border");
    let activeItem = menu.querySelector(".active");

    function clickItem(item, index) {

        menu.style.removeProperty("--timeOut");
        
        if (activeItem == item) return;
        
        if (activeItem) {
            activeItem.classList.remove("active");
        }

        
        item.classList.add("active");
        // body.style.backgroundColor = bgColorsBody[index];
        menu.style.cssText = "box-shadow:" + colorsShadowMenu[index];
        console.log(colorsShadowMenu[index] );
        activeItem = item;
        offsetMenuBorder(activeItem, menuBorder);
        
        
    }

    function offsetMenuBorder(element, menuBorder) {

        const offsetActiveItem = element.getBoundingClientRect();
        const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px";
        menuBorder.style.transform = `translate3d(${left}, 0 , 0)`;

    }

    offsetMenuBorder(activeItem, menuBorder);

    menuItems.forEach((item, index) => {

        item.addEventListener("click", () => clickItem(item, index));
        
    })

    window.addEventListener("resize", () => {
        offsetMenuBorder(activeItem, menuBorder);
        menu.style.setProperty("--timeOut", "none");
    });


    // aniview js
    var options = {
        animateThreshold: 100,
        scrollPollInterval: 50
    }
    $('.aniview').AniView(options);





    
    // estrellas projects
  var canvas = document.getElementById('canvaStars'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
      
    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1400;

  // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
  // Cache gradient
  var canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
      canvas2.width = 100;
      canvas2.height = 100;
  var half = canvas2.width/2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, '#fff');
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
      gradient2.addColorStop(1, 'transparent');

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

  // End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }
    
    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x,y) {
    var max = Math.max(x,y),
        diameter = Math.round(Math.sqrt(max*max + max*max));
    return diameter/2;
  }

  var Star = function() {

    this.orbitRadius = random(maxOrbit(w,h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
  }

  Star.prototype.draw = function() {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  }

  for (var i = 0; i < maxStars; i++) {
    new Star();
  }

  function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h)
    
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    };  
    
    window.requestAnimationFrame(animation);
  }

  animation();




});