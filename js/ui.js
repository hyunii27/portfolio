$(function(){    
	$(window).scroll(function(){
        var $scroll_top  = $(this).scrollTop(),
			$go_top = $(".go_top"),
        	$val = ($(document).height() - $(window).height()) - $(".ex_footer").outerHeight();

		/* go top */
		$go_top.on("click", function(){
            $("html, body").stop().animate({scrollTop: 0}, 300);
        });
		
        /* top button fixed */		
        if ($scroll_top >= $val)
            $go_top.addClass("btm");
        else
            $go_top.removeClass("btm");
    });
    
	//open_layer02();
	open_layer();
	
	$(window).on("click", function(){
		close_layer();
	});
});


/* layer popup */
function open_layer(){
	$(".openlayer").each(function(){
       $(this).on("click", function(e){
		   var $return_focus = this,
               $data_id,
			   $layer_type = "";
		   
		   if ($(this).attr("id"))
			   $data_id = $("#" + $(this).attr("id"));
		   
		   if ($(this).hasClass("without"))
			   $layer_type = "without";
		   
		   $(".curtain").remove();
           show_layer($data_id, $layer_type);
		   e.preventDefault();
		});
    });
	close_layer();
}

function show_layer(obj, type){
    $("body").append("<div class='curtain'></div>").addClass("scroll_hidden");
	
	if (type == "without")
		$(".layer_wrap").show().addClass("show").find(".layer").addClass("without").show();
    else
		$(".layer_wrap").show().addClass("show").find(".layer").show();
	
	var $info = $(obj).find(".info").text().split(","),
		$logo = $(obj).find(".logo").attr("src"),
		$project = $(obj).find(".project").text(),
		$url = $(obj).find(".url").text().split(","),
		$url_txt = "",
		$txt = $(obj).find(".txt").text(),
		$imgs = $(obj).find(".img").text().split(","),
		$img_txt = "";	
	
	$("#layer_popup .pop_logo").attr({
		src : $logo,
		alt : $info[1]
	});
	$("#layer_popup .pop_category").text($info[0]);
	$("#layer_popup .pop_client").text($info[1]);
	$("#layer_popup .pop_date").text($info[2]);
	$("#layer_popup .pop_project").text($project);
	$("#layer_popup .pop_txt").text($txt);
	
	if (!$(obj).find(".url").text() == ""){
		for (var i=0; i < $url.length; i++){
			$url_txt = $url_txt + "<a href=" + $url[i] + " target='_blank'>" + $url[i] + "</a>"
		}
		$("#layer_popup .pop_url").html($url_txt);
	} else{
		$("#layer_popup .pop_url").text("-");
	}
	
	if (!$(obj).find(".img").text() == ""){
		for (var i=0; i < $imgs.length; i++){
			$img_txt = $img_txt + "<img src=" + $imgs[i] + " alt='" + $project + (i+1) + "'>";
		}
		$("#layer_popup .pop_img_box").html($img_txt);
	} else{
		$("#layer_popup .pop_img_box").hide();
		$("#layer_popup").addClass("without");
	}
}

function hide_layer(obj, return_focus){
    if (obj)
        obj.hide();
    else
        $(".layer").hide();
    
    if (return_focus)
        $(return_focus).attr("tabindex", "0").focus();
    
    $(".layer_wrap").hide().removeClass("show");
    $(".layer_wrap .layer").removeClass("without");
	$("#layer_popup .pop_img_box").show();
    $("body").removeClass("scroll_hidden").find(".curtain").remove();
}

function close_layer(){
    $(".layer .closelayer").on("click", function(){
        hide_layer("", ""); 
    });
}
