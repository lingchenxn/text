define(["jquery", "jquery-cookie"], function ($) {
  function body() {
    $(function () {
      // sc_num();
      sc_msg();

      $.ajax({
        url: "../data/car.json",
        success: function(arr){
          var str = ``;
          console.log(arr);
          for(var i = 0; i < arr.length; i++){
            str += `<li class="goods_item">
            <img src="${arr[i].img}" alt="">
            <span>￥290.00</span>
            <div id="${arr[i].id}" class="dl">加入购物车</div>
    </li>`
          }
          $(".car ul").html(str);

        },
        error: function(msg){
          console.log(msg);
        }
      })

      //给加入购物车按钮添加点击
      //设置cookie <1>只能存储字符串  <2>cookie大小限制
      //json数据，id num  [{id:1,num:1},{id:2,num2}];
      $(".car ul").on("click", ".dl", function(){
        //取出当前点击加入购物车按钮的id
        var id = this.id;
        //1、判断是否是第一次添加
        // var first = $.cookie("goods") == null ? true : false;
        var first = !($.cookie("goods"));
        if(first){
          $.cookie("goods", JSON.stringify([{id:id,num:1}]), {
            expires: 7
          });
        }else{
          //2、不是第一次，判定之前是否添加过
          var cookieArr = JSON.parse($.cookie("goods"));
          var same = false; //假设没有相同的数据
          for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
              same = true;
              break;
            }
          }
          same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});

          //3、将处理完的数据存储回去
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          })
        }
        sc_msg();
        // sc_num();
      })

      //给右侧购物车的删除按钮添加点击
      $("#con_one_1 table").on("click", ".d5", function () {
        var id = $(this).closest("tbody").remove().attr("id");
        //删除页面上的节点  从cookie中删除数据
        var cookieArr = JSON.parse($.cookie("goods"));
        // console.log(cookieArr);
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            cookieArr.splice(i, 1);
            break;
          }
        }
        if (cookieArr.length) {
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7,
          });
        } else {
          $.cookie("goods", null);
        }

        //更新数据数量
        // sc_num();
      });
      $("#con_one_1 table").on("click", ".buynum-wrap button", function () {
        var id = $(this).closest("tbody").attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        for (var i = 0; i < cookieArr.length; i++) {
          if (cookieArr[i].id == id) {
            break;
          }
        }
        if (this.innerHTML == "+") {
          cookieArr[i].num++;
        } else {
          cookieArr[i].num == 1
            ? alert("数量为1，不能减少")
            : cookieArr[i].num--;
        }
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7,
        });

        //修改页面上的数量
        $(this).siblings("span").html(`${cookieArr[i].num}`);
        // sc_num();
      });
      function sc_msg(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
          return;
        }
        //下载所有的商品数据
        $.ajax({
          url: "../data/car.json",
          success: function(arr){
            var cookieArr = JSON.parse(cookieStr);
            //精益求精  写算法
            var newArr = [];
            for(var i = 0; i < arr.length; i++){
              for(var j = 0; j < cookieArr.length; j++){
                if(cookieArr[j].id == arr[i].id){
                  arr[i].num = cookieArr[j].num;
                  newArr.push(arr[i]);
                  break;
                }
              }
            }
            //通过newArr。处理数据，将数据添加页面上
            var str = ``;
            for(var i = 0; i < newArr.length; i++){
              str += `<tbody id="${newArr[i].id}">
              <tr class="cart-order">
                  <td class="d1">
                      <input autocomplete="off" type="checkbox" name="check_goods_105952" doClick="check" />
                  </td>
                  <td class="d2">
                      <div class="por-img">
                          <a href="http://www.epet.com/goods/105952.html" target="_blank">
                              <img src="${newArr[i].img}"
                                  />
                          </a>
                      </div>
                      <div class="por-intro" style="margin-top: 30px;">
                          <a href="http://www.epet.com/goods/105952.html" target="_blank" class="c333">
                              [下单返尿片1元体验券]加拿大原装进口 原始猎食渴望 六种鱼肉+美毛专用配方 全犬粮 2kg </a>
                      </div>
                  </td>
                  <td class="d3">
                      <div class="buynum-wrap">
                          <button>+</button>
                          <span>${newArr[i].num}</span>
                          <button>-</button>
                      </div>
                      <p class="c666 mtneg10">有货</p>
                  </td>
                  <td class="d4">￥290.00</td>
                  <td class="d5">
                      <a href="#">[删除]</a>
                  </td>
              </tr>
          </tbody>`;
            }
            $("#con_one_1 table").html(str);
          },
          error: function(msg){
            console.log(msg);
          }
        })
      }
      // function sc_num(){
      //   var cookieStr = $.cookie("goods");
      //   var sum = 0;
      //   if(cookieStr){
      //     var cookieArr = JSON.parse(cookieStr);
      //     for(var i = 0; i < cookieArr.length; i++){
      //       sum += cookieArr[i].num;
      //     }
      //   }
      //   $(".sc_right .sc_num").html(sum);
      // }
    });
  }
  
  return {
    body: body,
  };
});
