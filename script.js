var $star = $('.star')
var $circle = $('.circle')
var $square = $('.square')

var screenConfig = {
  opening: {
    duration: 5,
    phase2Duratiin: 1.6
  }
}

var ans = []

opening()

function opening() {
  TweenLite.to($star, screenConfig.opening.duration, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($circle, screenConfig.opening.duration, {rotation: 360, ease: Power2.easeOut})
  TweenLite.to($square, screenConfig.opening.duration, {rotation: -360, ease: Power2.easeOut})

  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale: 1.1}})
  TweenLite.to($circle, screenConfig.opening.duration / 2, {css: {scale: 1}, delay: screenConfig.opening.duration / 2})

  TweenLite.to($square, screenConfig.opening.phase2Duratiin, {css: {scale: 7}, ease: Power2.easeOut, delay: screenConfig.opening.duration - 1})
  TweenLite.to($circle, 1.6, {css: {scale: 7}, ease: Power2.easeOut, delay: screenConfig.opening.duration - 0.7})
  TweenLite.to($star, 0.6, {css: {scale: 7}, ease: Power2.easeOut, delay: screenConfig.opening.duration - 0.4, onComplete: function() {
    $('.opening').remove()
    screenQ1Start()
  }})
}

function screenQ1Start() {
  $('.screenQ1').css('background', '#1469FF')
  $('.screenQ1 .text-block').animate({opacity: 0}, 500, function() {
    $('.screenQ1 .q-section').animate({opacity: 1}, 500)
  })

  $('.screenQ1 .q-section__options').click(function(e) {
    var value = $(e.target).attr('data-value')
    if (!value) return
    ans.push(value)

    $square.remove()
    $triangle.remove()
    $circle.remove()

    TweenLite.to($('.screenQ1 .animate-section'), 0.5, {css: {left: '0%'}, onComplete: function() {
      $('.screenQ1').remove()
      screenQ2Start()
    }});
  })

  var $square = $('.screenQ1 .animate-section__square') //top: 100
  var $triangle = $('.screenQ1 .animate-section__triangle') //top: 300
  var $circle = $('.screenQ1 .animate-section__circle') // bottom: -100

  TweenLite.to($('.screenQ1 .animate-section'), 1, {css: {left: '60%'}, delay: 1})
  TweenLite.to($square, 2, {css: {top: '100px'}, ease: Power3.easeOut, delay: 2});
  TweenLite.to($triangle, 2, {css: {top: '300px'}, ease: Power2.easeOut, delay: 2});
  TweenLite.to($circle, 2, {css: {bottom: '-100px'}, ease: Power2.easeOut, delay: 2});

  TweenLite.to($square, 4, {rotation: 360, ease: Power3.easeOut, delay: 4});
  TweenLite.to($triangle, 4, {rotation: -360, ease: Power2.easeOut, delay: 4});
  TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4});
}

function screenQ2Start () {
  $('.screenQ2 .animate-section').css('right', '100%')
  $('.screenQ2 .q-section').animate({opacity: 1}, 500)

  $('.screenQ2 .q-section__options').click(function(e){
    var value = $(e.target).attr('data-value')
    if (!value) return
    ans.push(value)
    
    $square.remove()
    $triangle.remove()
    $circle.remove()
    TweenLite.to($('.screenQ2 .animate-section'), 0.5, {css: {right: '0%'}, onComplete: () => {
      screenCalculating()
    }});
  })

  var $square = $('.screenQ2 .animate-section__square')
  var $triangle = $('.screenQ2 .animate-section__triangle')
  var $circle = $('.screenQ2 .animate-section__circle')

  TweenLite.to($('.screenQ2 .animate-section'), 1, {css: {right: '60%'}, delay: 0.5});
  TweenLite.to($square, 2, {css: {bottom: '200px'}, ease: Power3.easeOut, delay: 2});
  TweenLite.to($triangle, 2, {css: {top: '-50px'}, ease: Power2.easeOut, delay: 2});
  TweenLite.to($circle, 2, {css: {bottom: '200px'}, ease: Power2.easeOut, delay: 2});

  TweenLite.to($square, 4, {rotation: '+=360', ease: Power3.easeOut, delay: 4});
  TweenLite.to($triangle, 4, {rotation: '-=360', ease: Power2.easeOut, delay: 4});
  TweenLite.to($circle, 4, {css: {x: '+=20', y: '+=30'}, ease: Power2.easeOut, delay: 4});
}

function getRandom(lower, upper) {
    return Math.random()*(upper - lower) + lower
}

function screenCalculating(){
  $('.screenQ2').remove()
  $('.calculating').removeClass('hide')
  $('body').css('overflow', 'auto')

  var controller = new ScrollMagic.Controller();

  var total = 50;
  var colors = ['white', 'black', '#0027C8']
  for( var i = 0; i<total; i++) {
      var size = Math.floor(Math.random()*200 + 100)
      var color = colors[i%3]
      $('.calculating').append(`<div class='small-circle small-circle${i}' style='background:${color};position:fixed;bottom:-300px;width:${size}px;height:${size}px'>`)
  }

  for(var i = 0; i<total; i++) {
      var topP = getRandom(300, 500)
      var left = getRandom(1000, 3000)
      new ScrollMagic.Scene({triggerElement: ".trigger" + ((i % 4) + 1), duration: Math.random()*3000 + 500})
        .setTween(TweenLite.to($('.small-circle' + i), 10, {css: {top: `-${topP}px`, left: `${left}px`}}))
        .addTo(controller);
  }

  $(window).scroll(function() {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height())) {
      $('.calculating').remove()
      $('.screenResult').removeClass('hide')
      TweenLite.to($('.screenResult'), 1, {css: {width: '100vw'}, ease: Power2.easeOut, onComplete: () => {
        screenResultStart()
      }});
    }
  });
}

function screenResultStart() {
  const phase1Duration = 2

  TweenLite.to($('.triangle1'), phase1Duration, {css: {top: '50%'}, ease: Power2.easeOut});
  TweenLite.to($('.triangle2'), phase1Duration, {css: {top: '0'}, ease: Power3.easeOut});
  TweenLite.to($('.triangle3'), phase1Duration, {css: {top: '60%'}, ease: Power1.easeOut});
  TweenLite.to($('.triangle4'), phase1Duration, {css: {top: '20%'}, ease: Power3.easeOut});
  TweenLite.to($('.triangle5'), phase1Duration, {css: {top: '10%'}, ease: Power2.easeOut});
  TweenLite.to($('.triangle6'), phase1Duration, {css: {top: '60%'}, ease: Power1.easeOut});
  TweenLite.to($('.triangle7'), phase1Duration, {css: {top: '45%'}, ease: Power3.easeOut});

  TweenLite.to($('.screenResult__text'), phase1Duration, {css: {opacity: '1'}});
  TweenLite.to($('.screenResult__ans'), phase1Duration, {css: {opacity: '1'}});

  TweenLite.to($('.triangle-blue'), phase1Duration, {css: {bottom: '0'}, ease: Power2.easeOut});
  TweenLite.to($('.triangle-white'), phase1Duration, {css: {bottom: '0'}, ease: Power1.easeOut});
  TweenLite.to($('.triangle-black'), phase1Duration, {css: {bottom: '0'}, ease: Power3.easeOut});

  const phase2Delay = phase1Duration + 0.5

  TweenLite.to($('.triangle3'), 2, {css: {top: '312px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle5'), 2, {css: {top: '230px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle7'), 2, {css: {top: '395px', left: '814px'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.triangle1'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle2'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle4'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle6'), 2, {css: {top: '-200px'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.triangle-blue'), 2, {css: {bottom: '200px', left: '300px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle-white'), 2, {css: {bottom: '360px', left: '326px', rotation: '60deg'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.triangle-black'), 2, {css: {bottom: '338px', left: '426px', rotation: '30deg'}, ease: Power3.easeOut, delay: phase2Delay});

  TweenLite.to($('.screenResult__text'), 2, {css: {top: '110px', left: '894px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.screenResult__ans'), 2, {css: {top: '169', left: '945px'}, ease: Power3.easeOut, delay: phase2Delay});
  TweenLite.to($('.screenResult__result'), 2, {css: {opacity: 1}, ease: Power3.easeOut, delay: phase2Delay})

  TweenLite.to($('.triangle-white'), 4, {css: {rotation: '+=120deg'}, delay: phase2Delay + 1});
  TweenLite.to($('.triangle-black'), 4, {css: {rotation: '-=180deg'}, delay: phase2Delay + 1});
  TweenLite.to($('.triangle-blue'), 4, {css: {x: '+=30', y: '-=20'}, delay: phase2Delay + 1});
}

