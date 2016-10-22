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
	});
	DialogBox.reposition();
	$(document).on("click", "#sharefacebook", function() {
		$width = 500;
		$height = 400;
		$top = ($(window).height()-$height)/2;
		$left = ($(window).width()-$width)/2;
		window.open("https://www.facebook.com/sharer/sharer.php?u="+DialogBox.link, "_blank", "toolbar=no, scrollbars=yes, resizable=no, top="+$top+", left="+$left+", width="+$width+", height="+$height+"");
	})
	$(document).on("click", "#sharetwitter", function() {
		$width = 500;
		$height = 400;
		$top = ($(window).height()-$height)/2;
		$left = ($(window).width()-$width)/2;
		window.open("https://twitter.com/home?status="+DialogBox.link, "_blank", "toolbar=no, scrollbars=yes, resizable=no, top="+$top+", left="+$left+", width="+$width+", height="+$height+"");
	})
	$(document).on("click", "#sharegoogleplus", function() {
		$width = 500;
		$height = 400;
		$top = ($(window).height()-$height)/2;
		$left = ($(window).width()-$width)/2;
		window.open("https://plus.google.com/share?url="+DialogBox.link, "_blank", "toolbar=no, scrollbars=yes, resizable=no, top="+$top+", left="+$left+", width="+$width+", height="+$height+"");
	});
	$(".blur").click(function() {
		$(this).hide();
		DialogBox.el.hide();
		$("body").css({
			"overflow": "auto"
		})
	})
})
var DialogBox = {
	el: $(".dialog-box"),
	link: "",
	reposition: function() {
		var height = this.el.outerHeight();
		var sheight = $(window).height();
		var width = this.el.outerWidth();
		var swidth = $(window).width();
		this.el.css({
			"top": (sheight-height)/2+"px",
			"left": (swidth-width)/2+"px"
		});
	}
}

$(window).resize(function() {
	responsive();
})
function loadApp(key) {
	DialogBox.link = apps[key].link;
	$(".blur").show();
	DialogBox.el.show();
	DialogBox.el.find("table img").attr("src", "includes/images/apps/"+apps[key].name+".png");
	DialogBox.el.find("#app-name").html(apps[key].name);
	DialogBox.el.find("#team-name").html(apps[key].team);
	DialogBox.el.find("#app-category").html(apps[key].category);
	DialogBox.el.find(".install").attr("href", apps[key].link);
	DialogBox.el.find("p#desc").html(apps[key].desc);
	DialogBox.reposition();
	$("body").css({
		"overflow": "hidden"
	})
}