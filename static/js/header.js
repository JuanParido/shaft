$(function(){
	var menbutton = $(".mega_menu_dropdown");
	var menu = $(".mega_menu");

	menbutton.click(function(){
		if(menu.hasClass("active"))	{
			console.log("hidden");
			menu.fadeOut("100");
			menu.removeClass("active");
		}
		else {
			console.log("showen");
			menu.addClass("active");
			menu.slideDown("300, ease");
		}
	});
});