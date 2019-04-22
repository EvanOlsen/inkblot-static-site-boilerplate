
function initialize() {
	$('.iframe-container, .video-container').fitVids();
	$('.full-height').css({minHeight: $(window).height() * 1.05 + 'px'});
	//$('.header-auto-height, header#main').css('height',$(window).width()/1.7 +'px');
	if (document.body.clientWidth < 500) {
		var small = true;
	} else if (document.body.clientWidth > 500) {
		small = false;
	}
	if (small === true) {
      $('.mobile-full-height').css({minHeight: $(window).height() + 'px'});
      $('.full-height').css({minHeight: $(window).height() + 85 + 'px'});
      $('ul.main-nav').each(function (){
        $("> li", this).each(function (){
          $(this).transition({opacity: 0, scale: "1.1", y: "-30px"}, 0, function(){
          });
        });
      });
	} else {
		$('#main-nav').unbind();
		$('.mobile-full-height').css({minHeight: ''});
		$('#main-nav').transition({opacity: 1, y:'0'}, 200, 'snap', function(){
			$('#main-nav').css({display: "none", zIndex: "10000", height: 'auto'});
		});
		$('ul.main-nav').each(function (){
			$("> li", this).each(function (){
			  $(this).transition({opacity: 1, scale: "1", y: "0px"}, 0, function(){});
			});
		})
	}
	var bLazy = new Blazy({ 
		success: function(ele) {
			$(ele).parent().addClass('image-loaded');
			$(ele).parent().removeClass('loading');
		},
		offset: 100
    });
}
function stopPropagation(e) {
    if(e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
    } else {
    	e.preventDefault();
        e.returnValue = false;
    }    
}
function openURL(href){
    var link = href;  //$(this).attr('href'); 
    function refreshInit() {
    	fitty.fitAll();
		initialize();
    }                                   
    $.ajax({                                                             
        url: link,
        type: 'GET',
        cache: true,
        beforeSend: function() {
            $('.loading-wrapper').css({zIndex: 100000, display: 'block'});
		    $('.loading-wrapper').transition({opacity: 1, y: "0"});
	    	function loadingLoop(){
				$('.loading-wrapper #inkblob-loader #big-blob').transition({rotate: 0, scale: [1, 0.7]}, 1000, 'ease-in-out').transition({rotate: 360, scale: [0.7, 0.5]}, 1000, 'ease-in-out', loadingLoop);
				$('.loading-wrapper #inkblob-loader #small-blob').transition({x: '-130px', scale: [1, 0.4]}).transition({x: '-20px', scale: [0.5, 0.1]}).transition({x: '10px', scale: [0.5, 0.1]}).transition({x: '135px', scale: [1, 0.4]}).transition({x: '10px'}, function(){
				});
			}
		    loadingLoop();
        },
        success: function(data) {
            $('#ajax-load-area').html($(data).filter('#ajax-load-area').html());
            window.scrollTo(0, 0);
		    $('.loading-wrapper').transition({opacity: 0, y: "0"}, function(){
			    return refreshInit();
		    });
		    $('.loading-wrapper').css({zIndex: -2000, display: 'none'});
		    var newPageTitle = $(data).filter("title").text();
		    history.pushState({href: href}, newPageTitle, href);
		    $('title').text(newPageTitle);
        },
        error: function() {
            console.log('Failure');
            $('.loading-wrapper').transition({opacity: 0, y: "0"});
		    $('.loading-wrapper').css({zIndex: -2000, display: 'none'});
        }
    });
}


$(document).ready(function() {
	var subMenuIsOpen;
	$(window).resize(function(){
		$('#main-nav').unbind();
	    $('.full-height').css({minHeight: $(window).height() * 1.05 + 'px'});
	    $('.header-auto-height, header#main').css('height',$(window).width()/1.7 +'px');
		initialize();
	});
	
	var NavisOpen = false;
	$('.main-nav .btn-toggle').click(function(event){
		stopPropagation(event);
		NavisOpen = !NavisOpen;
		var x = '#' + $(this).attr('data-target');
		if(NavisOpen) {
			$(x).css({display: "block", zIndex: "90", height: $(window).height() + 'px'});
			$(x).transition({opacity: 1, y:'0'}, 200, 'snap', function(){
				$('ul.main-nav').each(function (){
					$("> li", this).each(function (i){
						var a = (i + i * 60);
						$(this).delay(a).transition({opacity: 1, scale: "1", y: "0"}, 400, function(){
						});
					});
				});
			});
			$(x).addClass('drawer-open');
			$(this).addClass('drawer-open');
		} else {
			$(x).transition({opacity: 0, y:'-30px'}, 200, 'snap', function(){
			$(x).css({display: "none", zIndex: "-10000", height: $(window).height() + 'px'});
	        $('ul.main-nav .submenu').removeClass('drawer-open');
	        $('.btn-submenu-dropdown').removeClass('drawer-open');
	        $('ul.main-nav').each(function (){
	          $("> li", this).each(function (){
	            $(this).transition({opacity: 0, scale: "1.1", y: "-30px"}, 0, function(){
	            });
	          });
	        });
			});
			$(x).removeClass('drawer-open');
			$(this).removeClass('drawer-open');
		}
	});
	// Mobile: When main menu drop down button is clicked, close all other drop down menus
	$('.btn-submenu-dropdown').each(function (){
		var subNavisOpen = false;
		$(this).on('click', function(){
		  stopPropagation(event);
		  subNavisOpen = !subNavisOpen;
		  if(subNavisOpen) {
		    $(this).parent().siblings().find('.submenu').removeClass('drawer-open');
		    $(this).parent().siblings().find('.btn-submenu-dropdown').removeClass('drawer-open');
		    $(this).parent().siblings().removeClass('hover');
		    $(this).parent().addClass('hover');
		    $(this).addClass('drawer-open');
		    var subNavisOpen = true;
		  } else {
		    $(this).parent().find('.submenu').removeClass('drawer-open');
		    $(this).parent().removeClass('hover');
		    $(this).removeClass('drawer-open');
		  }
		});
	});
	$('[data-targetted=true]').hide();
	$('[data-function=accordion]').on('click',function(event){
		stopPropagation(event);
		var x = '#' + $(this).attr('data-target');
		$(x).show('fast');
	});
	$('[data-function=toggle-switcher]').on('click',function(event){
		stopPropagation(event);
		var a = $(this);
		var parentGroup = $(this).closest('.toggleGroup');
		var x = '#' + $(this).attr('data-target');
		$(x).show('fast');
		$('.toggleItem').not(x).hide('fast');
		$(parentGroup).find('[data-function=toggle-switcher]').removeClass('active');
		$(a).addClass('active');
	});
	$('[data-function=more]').on('click',function(event){
		stopPropagation(event);
		var a = $(this);
		var x = '#' + $(this).attr('data-target');
		$(x).show('fast');
		$(a).hide();
	});
	$('button[data-toggle=collapse]').on('click',function(){
		stopPropagation(event);
		var x = '#' + $(this).attr('data-target');
		$(x).toggleClass('drawer-open');
		$(this).toggleClass('drawer-open');
	});
	
	$('[data-function=scrollto]').each(function (){
		$(this).attr('data-target', $(this).attr('href'));
		$(this).removeAttr('href');
	});
	$('[data-function=scrollto]').on('click',function(event){
		stopPropagation(event);
		var x;
		if ($(this).attr('data-target')) {
			x = $(this).attr('data-target');
		} else {
			x = $(this).attr('href');
		}
		$('html,body').animate({
          scrollTop: $(x).offset().top - 20
        }, 200);
	});
	$("[data-function=tab-links] a").removeAttr("href");
	$('[data-function=tabs] [data-function=tab-links] a, [data-function=tabs] [data-function=tab-links] button').on('click', function(event)  {
    	stopPropagation(event);
        var currentAttrValue = $(this).attr('data-target');
        // Show/Hide Tabs
        $('[data-function=tab]' + currentAttrValue).show().siblings('[data-function=tab]').hide();
        // Change/remove current tab to active
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('[data-function=tab-links]').removeClass('active');
    });
    $('[data-function=tabs] [data-function=tab-links]').on('change', function(event)  {
    	stopPropagation(event);
        var currentAttrValue =  $('option:selected', this).attr('data-target');
        $('[data-function=tab]' + currentAttrValue).siblings('[data-function=tab]').hide(0);
        $('[data-function=tab]' + currentAttrValue).show(0, function(){
        	$('input', this).first().focus();
        });
    });
	$('.backtotop').on('click',function(event){
		stopPropagation(event);
		$('html,body').animate({
          scrollTop: $('html,body').offset().top - 100
        }, 200);
	});
	// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.project-detail-directional-menu').outerHeight();
	$(window).scroll(function(){
	    didScroll = true;
	});
	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);
	function hasScrolled() {
		/*if (document.body.clientWidth < 500) {*/
		    var st = $(this).scrollTop();
		    // Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;
		    // If they scrolled down and are past the navbar, add class .nav-up.
		    // This is necessary so you never see what is "behind" the navbar.
		    if (st > lastScrollTop && st > navbarHeight){
		        // Scroll Down
		        $('.project-detail-directional-menu').removeClass('up').addClass('down');
		       /* $('nav.main-nav #main-navigation').removeClass('drawer-open');
		        $('nav.main-nav .btn-toggle.main-menu').removeClass('drawer-open');
				$('.btn-submenu-dropdown').removeClass('drawer-open');
		        $('nav.main-nav #main-navigation').transition({opacity: 0, y:'30px', height: '0px'}, 400, 'snap', function(){
    				$('nav.main-nav #main-navigation').css({display: "none", zIndex: "-10000", height: 0 + 'px'});
    				NavisOpen = false;
    			});*/
		    } else {
		        // Scroll Up
		        if(st + $(window).height() < $(document).height()) {
		            $('.project-detail-directional-menu').removeClass('down').addClass('up');
		        }
		    }
		    if (document.body.scrollTop === 0){
		    	 $('nav.main-nav').addClass('transparent');
		    	 $('.project-detail-directional-menu').removeClass('up').addClass('down');
		    }
		    lastScrollTop = st;
		/*} else {
			 $('nav.main-nav').removeClass('nav-up').addClass('nav-down');
		}*/
	}
	initialize();
});