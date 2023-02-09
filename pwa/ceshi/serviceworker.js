// 此代码在其自己的工作线程或线程中执行
self.addEventListener("install", event => {
    console.log("已安装服务人员");
});
self.addEventListener("activate", event => {
    console.log("服务工作者已激活");
});
self.addEventListener("fetch", event => {
    //虚拟事件监听器
});