function responsive() {
	$parent = $(".action-bar");
	console.log($parent.children("#logo").width() + $parent.children("ul").width());
	console.log($parent.width() - $parent.children(".register").width());
	if($parent.children("#logo").width() + $parent.children("ul").width() + 30 > $parent.width() - $parent.children(".register").width()) {
		$parent.find("#logo .label").hide();
		$parent.find("#logo").css("margin-right", "10px");
	} else {
		$parent.find("#logo .label").show();
		$parent.find("#logo").css("margin-right", "30px");
	}
	$(".container").css("margin-top", $parent.outerHeight());
	$(".button").each(function() {
		if($(this).find("i.icon").length == 0) 
			$(this).css("padding", "15px");
	})
}
$(document).ready(function() {
	responsive();
})
$(window).resize(function() {
	responsive();
})