$('.animate > *').transition({opacity: 0.04, y: "30%"}, 0);
$('.animate').each(function (){
	var waypoints = $(this).waypoint(function() {
	  $("> *", this).each(function (i){
	   		var a = (i + i * 150);
	   		$(this).delay(a).transition({opacity: 1, y: "0"}, 700, function(){
	   			$(this).waypoint('destroy');
	   		});
	   	});
	}, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-fade > *').transition({opacity: 0.04}, 0);
$('.animate-fade').each(function (){
  var waypoints = $(this).waypoint(function() {
    $("> *", this).each(function (i){
        var a = (i + i * 150);
        $(this).delay(a).transition({opacity: 1}, 700, function(){
          $(this).waypoint('destroy');
        });
      });
  }, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-left > *').transition({opacity: 0.02, x: "-30%"}, 0);
$('.animate-left').each(function (){
	var waypoints = $(this).waypoint(function() {
  $("> *", this).each(function (i){
      var a = (i + i * 150);
      $(this).delay(a).transition({opacity: 1, x: "0"}, 700, function(){
        $(this).waypoint('destroy');
      });
    });
	}, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-right > *').transition({opacity: 0.02, x: "30%"}, 0);
$('.animate-right').each(function (){
	var waypoints = $(this).waypoint(function() {
  $("> *", this).each(function (i){
      var a = (i + i * 150);
      $(this).delay(a).transition({opacity: 1, x: "0"}, 700, function(){
        $(this).waypoint('destroy');
      });
    });
	}, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-down > *').transition({opacity: 0.02, y: "-30%"}, 0);
$('.animate-down').each(function (){
	var waypoints = $(this).waypoint(function() {
  $("> *", this).each(function (i){
      var a = (i + i * 150);
      $(this).delay(a).transition({opacity: 1, y: "0"}, 700, function(){
        $(this).waypoint('destroy');
      });
    });
	}, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-blur > *').transition({opacity: 0, y: "30%", filter: "blur(10px)"}, 0);
$('.animate-blur').each(function (){
	var waypoints = $(this).waypoint(function() {
  $("> *", this).each(function (i){
      var a = (i + i * 150);
      $(this).delay(a).transition({opacity: 1, y: "0", filter: "blur(0px)"}, 1500, function(){
        $(this).waypoint('destroy');
      });
    });
	}, {offset: function(){return $(window).height() / 1.15}});
});
$('.animate-count').each(function (){
	//Wrap the number in <span class="count"> and this function counts up from 0 to that number
	var waypoints = $(this).waypoint(function() {
  $("> .count", this).each(function (){
      $(this).prop('Counter',0).delay(400).animate({
          Counter: $(this).text()
      }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          },
          complete: function(){
             $(this).parent().waypoint('destroy');
             console.log($(window).height());
          }
      });
    });
	}, {offset: function(){return $(window).height() / 2}});
});