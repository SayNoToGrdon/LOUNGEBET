  //  --------🌠----------- //
 //  🌟 	 Nima 	    🌟 //
//  ----------🌠--------- //
    // Dropdown for header
    // Disable click
    $('.acc .title,.acc .dropdown, .selectDropdown').not('.lang .dropdown').click(function (e) {
        if ($('.dropdown.animate').length) {
            // e.stopPropagation();
        }
    });

    //  Temporary //
    $('.lang a').click(function (e) {
        e.preventDefault();
    });

    //Custom dropdown function call
    customDropdown();

    // Lightbox on click
    $('.lightbox').click(function () {
        $('.slides').slick('slickPause');
    });
    $('.fancybox-close').click(function () {
        $('.slides').slick('slickPlay');
    });


    // Slick Slider
    // Slides for the landing page
    $('.slides').slick({
        dots: true,
        infinite: true,
        autoplay: true,
        duration: 5000,
        arrows: false,
        useCSS: false,
        responsive: [{
            breakpoint: 1024,
            settings: {}
        }, {
            breakpoint: 600,
            settings: {}
        }, {
            breakpoint: 480,
            settings: {}
        }]
    });
    // Slides for the payment methods on footer
    $('.slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        variableWidth: true,
        arrows: false,
        autoplaySpeed: 2000,
        draggable: false,
        useCSS: false
    });
    // Slides for the Casino page
    $('.promoSlider').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 1500,
        fade: true,
        useCSS: false,
        arrows: false,
        variableWidth: false
    });
    // Slides for the Casino page
    $('.jackpotSlider').slick({
        // infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesPerRow: 4,
        draggable: false,
        arrows: false
    });


    $('.jackpotSlider').addClass('animate').slick('setPosition');
    // Trigger next button
    $('.next-button-slick').click(function () {
        $('.slider').slick('slickNext');
    });
    $('.casinoPage .sliderControls .next').click(function () {
        $('.jackpotSlider').slick('slickNext');
        $('.casinoPage .jackpotSlider .list').removeClass('opacity');
    });
    $('.casinoPage .sliderControls .prev').click(function () {
        $('.jackpotSlider').slick('slickPrev');
        $('.casinoPage .jackpotSlider .list').removeClass('opacity');
    });

    // Limit Game list Text
    $('.casinoPage .gameList .list li .bottom p').each(function () {
        var text = $(this);
        if ($(text).text().length > 17) {
            $(this).text($(this).text().substr(0, 17) + '...');
        }
    });

    // Currrent Time and TimeZone to the sub menu
    var interval = setInterval(function () {
        var container = $('header .timeStamp');
        var d = new Date().toTimeString().split(' ')[0];
        var currentTime = new Date();
        var currentTimezone = currentTime.getTimezoneOffset();
        currentTimezone = (currentTimezone / 60) * -1;
        var GMT = 'GMT';
        if (currentTimezone !== 0) {
            GMT += currentTimezone > 0 ? '+' : ' ';
            GMT += currentTimezone;
        }
        container.html(d + '  ' + GMT);
    }, 100);

    // Currrent Time and TimeZone to the sub menu
    var intervalShort = setInterval(function () {
        var container = $('.slotInterface .timeStamp');
        var d = new Date().toTimeString().split(' ')[0];
        var currentTime = new Date();
        var currentTimezone = currentTime.getTimezoneOffset();
        currentTimezone = (currentTimezone / 60) * -1;
        container.html(d);
        container.text(function(i, text) {
            return text.slice(0, -3);
        });
    }, 1000);

    var $window = $(window);

    // gameFit();
    // Resize behavior
    $window.on('resize', function (event) {
        // gameFit();
    });

    var $goToTop = $('.goToTop');
    $goToTop.click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 400);
    });
    // Scroll behavior
    $window.scroll(function () {
        var $body = $('body');
        var $header = $('header');
        if ($(window).scrollTop() > $('body').height() / 4) {
            $goToTop.fadeIn(400);
        } else {
            $goToTop.fadeOut(400);
        }
        if ($(window).scrollTop() > 70) {
            $header.addClass('sticky');
        } else {
            $header.removeClass('sticky');
        }
    });


    if ($('body').is('.slotInterface')) {

        var pageWidth, pageHeight;
        var basePage = {
            width: 1280,
            height: 720,
            scale: 1,
            scaleX: 1,
            scaleY: 1
        };

        var $page = $('.wrap1 .wrap');
        var $controls = $('.controls');

        if ($('body').hasClass('fullWidth')) {
            $('html').addClass('noOverflow');
        }

        // Using underscore to delay resize method till finished resizing window
        $(window).resize(_.debounce(function () {
                if ($(window).width() > 750) {
                    getPageSize();
                    scalePages($page, pageWidth, pageHeight);
                    var position = $('.info').offset();
                    $('.floatContext').offset(position);
                }
                var winheightAsideContent = $(window).height() - 105;
                var winheight = $(window).height();
                $('.slotInterface aside').height(winheight);
                var asideGames = $('aside .games .list');
                var winheightAsideGamesContent = $(window).height() - 280;
                asideGames.height(winheightAsideGamesContent);
                asidePromo.height(winheightAsideContent);

                var aside = $('aside');
                var asideToggle = $('aside .toggle');
                var slotOffset = $('.slotInterface .wrap1 .wrap').offset().left;


                if (slotOffset > 160) {
                    $('.wrap1').addClass('transformIsOn');
                } else {
                    aside.removeClass('animate');
                    $('header').removeClass('animate');
                    $('.wrap1').removeClass('transformIsOn');
                    $('.wrap1').removeClass('transform');
                }
        }));



        $('.mainGame').addClass('animate');


        $('.slotInterface .mainGame .controls li.expand').on("click",function () {
            toggleFullScreen();
            $(this).toggleClass('active');
            $('.wrap1').toggleClass('expanded');
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
            setTimeout(function(){
                var position = $('.info').offset();
                $('.floatContext').offset(position);
            }, 1000);
        });

        $('.slotInterface .mainGame .controls li.popup a').click(function (e) {
            e.preventDefault();
            window.location = 'casino.html#gameList';
            window.open($(this).attr("href"), "popupWindow", "width=1240,height=720");
        });

        $('.slotInterface .mainGame .controls li.fav').click(function () {
            $(this).toggleClass('active');
        });


        getPageSize();
        scalePages($page, pageWidth, pageHeight);


    }


    if ( !! $('aside').offset()) { // make sure ".sticky" element exists
        var casinoAside = $('aside');

        var stickyTop = casinoAside.offset().top; // returns number
        var stickyHeight = casinoAside.height() + 86;

        // var stickyTop = $('aside').offset().top; // returns number
        $(window).on('scroll', function () { // scroll event
            var limit = $('.LoadMoreWrap').offset().top + 50 - stickyHeight;

            var windowTop = $(window).scrollTop() + 50; // returns number

            if (stickyTop < windowTop) {
                casinoAside.css({
                    position: 'fixed',
                    top: 0,
                        'padding-top': 50,
                        'margin-bottom': -50
                });
            } else {
                casinoAside.css({
                    'position': 'static',
                        'padding-top': 0,
                        'margin-bottom': 0
                });
            }

            if (limit < windowTop) {
                var diff = limit - windowTop;
                casinoAside.css({
                    top: diff
                });
            }
        });

    }

    $('header .balance .title').on('click', function () {
        var title = $('.balance .title');
    });
    $('header .balance .toggle').on('click', function () {
        var title = $('.balance .title');
        var $this = $(this);
        title.toggleClass('hide');
        title.toggleClass('hover');
        $this.text(function(i, text){
            return text === "Show Balance" ? "Hide Balance" : "Show Balance";
        });
    });

    $('header .balance .title').mouseover(function() {
            var title = $('.balance .title');
            var text = $('header .balance .toggle');
            if (text.text() === 'Show Balance' && title.is('.hide')) {
                setTimeout(function(){
                    title.removeClass('hide');
                }, 100);
            }
    }).mouseleave(function() {
            var title = $('.balance .title');
            var text = $('header .balance .toggle');
            if (text.text() === 'Show Balance' && !title.is('.hide')) {
                setTimeout(function(){
                    title.addClass('hide');
                }, 100);
            }
    });

    if ($('.slotInterface')){
        $('.slotInterface .wrap1').append('<div class="floatContext"></div>');
        $('.slotInterface .context').appendTo('.floatContext');
        var position = $('.info').offset();
        $('.floatContext').offset(position);
        $('.info').click(function(){
            $('.floatContext').toggleClass('animate');
        });
        var aside = $('aside');
        var asidePromo = $('aside .promo .list');
        var asideGames = $('aside .games .list');
        var asideToggle = $('aside .toggle');
        var winheight = $(window).height();
        var winheightAsideContent = $(window).height() - 105;
        var winheightAsideGamesContent = $(window).height() - 280;
        asideGames.height(winheightAsideGamesContent);
        asidePromo.height(winheightAsideContent);

        aside.height(winheight);
        // asidePromo.height(winheightAsideContent);
        // asideGames.height(winheightAsideGamesContent);
        asideToggle.click(function(){
            var slotOffset = $('.slotInterface .wrap1 .wrap').offset().left;
            aside.toggleClass('animate');
            $('header').toggleClass('animate');
            if (slotOffset > 200) {
                $('.wrap1').addClass('transformIsOn');
                $('.wrap1').toggleClass('transform');
            } else {
                setTimeout(function(){
                    $('.wrap1').removeClass('transformIsOn');
                }, 500);
                $('.wrap1').removeClass('transform');
            }
            getPageSize();
            scalePages($page, pageWidth, pageHeight);
            setTimeout(function(){
                var position = $('.info').offset();
                $('.floatContext').offset(position);
            }, 1000);
        });
        $('aside .mainTitle').click(function(){
            $('aside .mainTitle').not($(this)).removeClass('active').next().slideUp(0);
            $(this).next().fadeToggle(200);
            $(this).toggleClass('active');

            var parent = $(this).parent().height();
            $('aside .games .list').css('margin-bottom',-parent);
        });
        $('aside .tabs i.games').click(function(){
            $('aside .tabs i').removeClass('active');
            $(this).addClass('active');
            $('aside .tabsContent .promo').fadeOut(0);
            $('aside .tabsContent .games').fadeIn();
        });
        $('aside .tabs i.promo').click(function(){
            $('aside .tabs i').removeClass('active');
            $(this).addClass('active');
            $('aside .tabsContent .games').fadeOut(0);
            $('aside .tabsContent .promo').fadeIn();
        });

    }
    if($('.scrollbar').length){
        $('.scrollbar').niceScroll({cursorcolor:"#C2C2C2", cursorwidth: "5px", cursorborder:"0",  mousewheel: true, cursor: false, hidecursordelay:100});
    }


$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
    var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if (isFullScreen === false){
        console.log(false);
            // toggleFullScreen();
        $('.expand').removeClass('active');
        $('.wrap1').removeClass('expanded');
        getPageSize();
        scalePages($page, pageWidth, pageHeight);
        setTimeout(function(){
            var position = $('.info').offset();
            $('.floatContext').offset(position);
        }, 1000);
    }

});

    var $sidebarList = $('.myAccount aside li.main');
    $sidebarList.not('.home').mouseover(function() {
        $('.myAccount aside li.main, .helpCenter aside li.main').removeClass('hover');
        $(this).addClass('hover');
    }).mouseleave(function() {
        $('.myAccount aside li.main, .helpCenter aside li.main').removeClass('hover');
    });
    var $depositWrap = $(
        '.myAccount .deposit.default ul.blocks .wrapper, .helpCenter .deposit.default ul.blocks .wrapper');
    $depositWrap.click(function() {
        var $this = $(this).parent().find('.details');
        $('.details').not($this).slideUp(300);

        //Lina for HC payments deposits
        if($(this).parent().hasClass('hc_payment')){
            if(!$(this).parent().hasClass('expanded')){
                $(this).parent().addClass('expanded');
                $('.list').not($(this).parent()).removeClass('expanded');
            } else {
                $(this).parent().removeClass('expanded');
            }
        }

        $this.slideToggle(300);
    });

    var $depositAmountParent = $(
        '.myAccount .deposit.provider .select li, .helpCenter .deposit.provider .select li');
    var $depositAmount = $(
        '.myAccount .deposit.provider .select li span,.helpCenter .deposit.provider .select li span');
    var $depositAmountInput = $(
        '.myAccount .deposit.provider .right .text input,.helpCenter .deposit.provider .right .text input');
    $depositAmountParent.click(function() {
        var text = $(this).find('span').text();
        $depositAmountInput.val(text);
    });
    var myAccountMainContent = $('.myAccount .mainContent');

    if ($('.container.balanceManagement').length) {
        $('#scrollbarPromos').niceScroll({
            cursorcolor: "#C2C2C2",
            cursorwidth: "8px",
            railpadding: {
                top: 0,
                right: -9,
                left: 0,
                bottom: 0
            }
        });
    }
    var $accordion = $('.myAccount .accordion, .helpCenter .accordion');
    var $accordionTitle = $('.myAccount .accordion .title, .helpCenter .accordion .title');
    var $accordionContainer = $('.myAccount .accordion .container, .helpCenter .accordion .container');
    $accordionTitle.click(function() {
        var $thisTitle = $(this);
        $accordionContainer.not($thisTitle).next().slideUp(300);
        $(this).parent().toggleClass('expanded');
        $(this).next().slideToggle(300);
    });
    $('.cardFormat').keyup(function() {
        var cardFormat = $(this).val().split("-").join("");
        if (cardFormat.length > 0) {
            cardFormat = cardFormat.match(new RegExp('.{1,4}',
                'g')).join("-");
        }
        $(this).val(cardFormat);
    });


  //Lina for help center search & rspgaming
  //Accordion
  var $toggledBlock = $('.helpCenter .toggleBox .title');
  $toggledBlock.click(function() {
      $('.helpCenter .toggleBox').removeClass('expanded');
      var $this = $(this).parents('.toggleBox').find(
          '.details');
      $('.details').not($this).slideUp(300);
      if ($this.is(':visible')) {
          $this.slideUp(300);
          $this.parent('.toggleBox').removeClass('expanded');
      } else {
          $this.slideDown(300);
          $this.parent('.toggleBox').addClass('expanded');
      }
  });

  //Accordion helpCenter helpSearch
  var $toggledBlockSearch = $('.helpCenter .toggleBoxSearch .title');
  $toggledBlockSearch.click(function() {
      $('.helpCenter .toggleBoxSearch').removeClass('expanded');
      var $this = $(this).parents('.toggleBoxSearch').find('.details');
      var $thisli = $(this).parents('.toggleBoxSearch').find('.details>ol>li');
      var $this_height = $this.height();
      var text_height = $(this).parents('.toggleBoxSearch').find('.details>ol').height();
      $('.details').not($this).animate({height: 20}, 300);
      if ($this_height != 20) {
          $this.animate({height: 20}, 300);
          $this.parent('.toggleBoxSearch').removeClass('expanded');
      } else {
          $this.animate({height: text_height}, 300);
          $this.parent('.toggleBoxSearch').addClass('expanded');
      }
  });

