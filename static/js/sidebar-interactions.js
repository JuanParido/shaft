$(function(){
	$('body').addClass('sb-l-m');
  var leftlogo = $('.logo-left');
  var rightlogo = $('.logo-right');
  var menubtn = $('.toggleMenu');
  var vpwidth = $(window).width();
  var main = $('.the-content');
  var ctlogo = $('.head-ct-logo');

  //Initial styles
  if (vpwidth < 900){
    leftlogo.hide();
    rightlogo.show();
    menubtn.addClass('fa-bars');
    menubtn.removeClass('fa-arrow-left');
    // main.css('width', '94.8%');
    // main.css('background', 'yellow');
    // main.css('float', 'left');
  }
  else {
    leftlogo.show();
    rightlogo.hide();
    menubtn.removeClass('fa-bars');
    menubtn.addClass('fa-arrow-left');
    // main.css('width', '84.8%');
    // main.css('background', 'green');
    // main.css('float', 'left');
  }



  var collapsedButtons = function() {
    flag = true;
    var vpwidth = $(window).width();
    var sidebarCollapsed = $('body').hasClass('sb-l-m');
    $('.zb-btn').removeClass('menu-open');
    var sidebarToggle = function() {
      if (vpwidth < 900){
        if (sidebarCollapsed == false) {
          leftlogo.fadeOut(300);
          rightlogo.fadeIn(300);
          menubtn.addClass('fa-arrow-left');
          menubtn.removeClass('fa-bars');
          flag = true;
        }
        else {
          leftlogo.hide();
          rightlogo.show();
          menubtn.addClass('fa-bars');
          menubtn.removeClass('fa-arrow-left');
          flag = false;
          

        }
      }
      else {
        if (sidebarCollapsed == true) {
          leftlogo.fadeOut(300);
          rightlogo.fadeIn(300);
          menubtn.addClass('fa-bars');
          menubtn.removeClass('fa-arrow-left');
          flag = false;

        }
        else {
          leftlogo.fadeIn(300);
          rightlogo.fadeOut(300);
          menubtn.removeClass('fa-bars');
          menubtn.addClass('fa-arrow-left');
          flag = true;

        }
      }

      //Content container width upon viewport

      if (sidebarCollapsed == false) {
        main.css('margin-left', '270px');
        flag = true;
      }
      else {
        if (vpwidth <= 720) {
          main.css('margin-left', '65px');
        }
        else {
          main.css('margin-left', '80px');
        }
        flag = false;
      }         
    }

    $('.zb-btn').on('click', function(e) {
      if (flag == false) {
        var vpwidth = $(window).width();
        $('body').removeClass('sb-l-m');
        $('.zb-btn').removeClass('menu-open');
        $(this).toggleClass('menu-open');
        flag = true;
        if (vpwidth < 900) {
          leftlogo.hide();
          rightlogo.show();
          menubtn.removeClass('fa-bars');
          menubtn.addClass('fa-arrow-left');
        }
        else {
          leftlogo.fadeIn(300);
          rightlogo.fadeOut(300);
          menubtn.removeClass('fa-bars');
          menubtn.addClass('fa-arrow-left');
        }
      }
    });
    sidebarToggle();
  };
menubtn.click(collapsedButtons);
$(window).resize(collapsedButtons);
});