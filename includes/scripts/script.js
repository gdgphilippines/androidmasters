var logo, label, nav;
function responsive() {
	$parent = $(".action-bar");
	$register = ($parent.children(".register").length == 0) ? 0 : $parent.children(".register").outerWidth();
	if(logo+nav+110 > $parent.outerWidth() - $register) {
		$parent.find("ul").hide();
		$parent.find("#logo .label").hide();
		$parent.find(".menu").css("display", "inline-block");
	} else if(logo+label+nav+110 > $parent.outerWidth() - $register) {
		$parent.find("ul").show();
		$parent.find("#logo .label").hide();
		$parent.find("#logo").css("margin-right", "10px");
		$parent.find(".menu").hide();
	} else  {
		$parent.find("#logo .label").show();
		$parent.find("#logo").css("margin-right", "30px");
		$parent.find(".menu").hide();
	}
	$(".container").css("margin-top", $parent.outerHeight());
	$(".button").each(function() {
		if($(this).find("i.icon").length == 0) 
			$(this).css("padding", "15px");
	})
}
$(document).ready(function() {
	logo = $(".action-bar #logo .logo").outerWidth();
	label = $(".action-bar .label").outerWidth();
	nav = $(".action-bar ul").outerWidth();
	responsive();
	$(".action-bar .menu").click(function() {
		$(".slider").animate({
			"left": "0px"
		}, 500);
	})
	$(".slider a").click(function() {
		$(".slider").animate({
			"left": "-300px"
		}, 500);
	})
})
$(window).resize(function() {
	responsive();
})