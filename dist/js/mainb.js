console.log("加载成功");

require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    index: "shopcar"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
  }
})
require(["index"], function(index){
    index.body();
  })
  