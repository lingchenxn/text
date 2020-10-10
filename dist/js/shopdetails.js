define(["jquery"],function($){
    function details(){
        $(function(){
            $("#photo").mouseenter(function(){
              $("#mark,#big").show();
            }).mouseleave(function(){
              $("#mark,#big").hide();
            }).mousemove(function(ev){
              var l = ev.pageX - $(this).offset().left - 100;
              var t = ev.pageY - $(this).offset().top - 100;
              //限制出界
              l = Math.max(0, l);
              l = Math.min(100, l);
              t = Math.max(0, t);
              t = Math.min(100, t);

              $("#mark").css({
                left: l,
                top: t
              })
              $("#big img").css({
                left: -2 * l,
                top: -2 * t
              })
            })
          })
    }

    //换图片
    $(".picroll ul").on("mouseenter","li",function(){
        $(this).css("borderColor"," #e3101e").siblings("li").css("borderColor", 'transparent');
        $("#pop").html(`<img src="../images/img/${$(this).index() + 1}.jpg" alt="">
        <div id="pop"></div>`);
        $("#big").html(`<img src="../images/img/${$(this).index() + 1}.jpg" alt="">`)
      })
    return {
        details:details,
    };
})