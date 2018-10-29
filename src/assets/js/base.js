// JavaScript Document
$(function(){
var searchscroll=mui('#searchScroll').scroll();
mui('body').on('tap', 'a', function () { document.location.href = this.href; });
$("#back").bind({
	tap:function(){
		history.back();
		return false;
		}
	});

$(document).bind("touchmove",function(event){
		if($("#searchLayer").hasClass("active")){
			event.preventDefault();
			}
			
		if($(".filterBox ").hasClass("active")){
			event.preventDefault();
			}
		
		if($(".modal-full").hasClass("active")){
			event.preventDefault();
			}
		
		});

var searchScroll=mui('#searchScroll').scroll();		
$("#search,#sousuo").bind({
	tap:function(){
		$("#search").addClass("active");
		$("#searchLayer").addClass("active");
		$("#search .txt").focus();
		return false;
		}
	});
	
$("#search .cancel").bind({
	tap:function(){
		$("#search").removeClass("active");
		$("#searchLayer").removeClass("active");
		$("#search .txt").blur();
		$("#search .txt").val('');
		$(".search .icon-close-fill").removeClass("active");
		return false;
		}
	});

	$(".search .txt").bind({
		keyup:function(){
			if($(this).val()==''){
				$(this).parents(".search").find(".icon-close-fill").removeClass("active");
				}
			else{
				$(this).parents(".search").find(".icon-close-fill").addClass("active");
				}
			}
		});
	
	$(".search .icon-close-fill").bind({
		tap:function(){
			$(this).parents(".search").find(".txt").val('');
			$(this).removeClass("active");
			return false;
			}
		});
		
$(".layer .icon-close").bind({
	tap:function(){
		$(this).parents(".layer").removeClass("active");
		$("#layer-bg").removeClass("active");
		return false;
		}
	});

$(".modal-full .header .close").bind({
	tap:function(){
		$(this).parents(".modal-full").removeClass("active");
		return false;
		}
	});

$(".layer .ok").bind({
	tap:function(){
		$(this).parents(".layer").removeClass("active");
		$("#layer-bg").removeClass("active");
		return false;
		}
	});
$(".layer .cancel").bind({
	tap:function(){
		$(this).parents(".layer").removeClass("active");
		$("#layer-bg").removeClass("active");
		return false;
		}
	});

$(".layer .ok-btn").bind({
	tap:function(){
		$(this).parents(".layer").removeClass("active");
		$("#layer-bg").removeClass("active");
		}
	});

	$(".on-off .bun").bind({
		tap:function(){
			$(this).parent(".on-off").toggleClass("active");
		}
	});

	$("#tool").bind({
		tap:function(){
			if($("#tool-nav").hasClass("active"))
			{
				$("#tool-nav").removeClass("active");
			}
			else{
				$("#tool-nav").addClass("active");
				}
			return false;
			}
		});
	
	$("body").tap(function(evt){
		if($(evt.target).parents("#tool").length==0) {
				$("#tool-nav").removeClass("active");
			}
		});
	
});
//调用弹出层
function openlayer(idn1,idn2){
	$("#"+idn1).addClass("active");
	$("#"+idn2).addClass("active");
	}
function closelayer(idn1,idn2){
	$("#"+idn1).removeClass("active");
	$("#"+idn2).removeClass("active");
	}
	
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return -1;
}
function openMsg(idn){
	var zih=$("#"+idn).outerHeight()*0.5;
	var ziw=$("#"+idn).outerWidth()*0.5;
	$("#"+idn).css({
		"margin-top":-zih+"px",
		"margin-left":-ziw+"px"
		});
	$("#"+idn).fadeIn();
	setTimeout(function(){
		$("#"+idn).fadeOut();
		},2000);
	}

function NavScroll(idn,row){
	var Scroll_w,Scroll_h,jqul,jqli,jqa,jqScroll,row_n,row_w;
	var that=$(idn);
	Scroll_w=$(that).width();
	jqScroll=$(that).find(".scroll-box");
	jqul=$(that).find("ul");
	jqli=$(jqul).find("li");
	row_n=jqli.length;
	row_w=Scroll_w/row;
	$(jqli).css({"width":row_w+"px"});
	$(jqScroll).css({"width":row_n*row_w+"px"});
	$(jqul).css({"width":row_n*row_w+"px"});
	}

function CountScroll(idn){
	var Scroll_w=0,jqul,jqli;
	var that=$(idn);
	jqul=$(that).find(".scroll-box");
	jqli=$(idn).find("li");
	$(jqli).each(function() {
        Scroll_w+=$(this).outerWidth();
    });
	$(jqul).css({"width":Scroll_w+"px"});
	}