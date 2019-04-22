class Tab {

  // 抽取对象 共有的方法   对象就是 tab  
  // tab 功能 有 点击切换   点击 +  添加 tab   点击 减去 删除tab  
  constructor(id) {
    // 最大的盒子
    this.id = document.querySelector(id);
    this.firstNav = this.id.querySelector('.fisrstnav');
    this.tabsCon = this.id.querySelector('.tabscon');
    // 里面的加号 
    this.add = this.id.querySelector('.tabadd');
    // 获取静态列表
    this.updateNodeList();
    // 注册事件
    this.registerAction();
  }

  // 重新获取最新的列表
  updateNodeList() {
    // 上面 li 
    this.lis = this.id.querySelectorAll('li');
    // 下面的切换seciton
    this.sections = this.id.querySelectorAll('section');
    // 减号
    this.jian = this.id.querySelectorAll('.iconfont');
    // 双击修改 span 
    this.titleSpan = this.id.querySelectorAll('.fisrstnav li span:first-child');
  }

  registerAction() {
    // 添加Tab不需要事件代理
    this.add.onclick = this.addTab.bind(this.add, this)
    // 事件代理
    this.delegate(this.firstNav, 'li', 'click', this.tabToggle)
    this.delegate(this.firstNav, '.icon-guanbi', 'click', this.removeTab)
    this.delegate(this.firstNav, '.title', 'dblclick', this.change)
    this.delegate(this.tabsCon, '.content', 'dblclick', this.change)
  }

  // 添加tab
  addTab(tab) {
    tab.clearClass();
    var random = Math.random()
    var li = '<li class="liactive"><span class="title">Tab</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="content conactive">New Tab content' + random + '</section>'

    // 将元素追加到页面结构中去
    tab.id.querySelector('.fisrstnav ul:first-child').insertAdjacentHTML('beforeend', li)
    tab.id.querySelector('.tabscon').insertAdjacentHTML('beforeend', section)
    tab.updateNodeList();
  }

  // 切换tab栏
  tabToggle(tab) {
    tab.clearClass();
    this.classList.add('liactive');
    var i = Array.prototype.indexOf.call(tab.lis, this)
    tab.sections[i].classList.add('conactive');
  }

  // 清除原先样式
  clearClass() {
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].classList.remove('liactive');
      this.sections[i].classList.remove('conactive')
    }
  }

  // 移除 tab 做法
  removeTab(tab) {
    var i = Array.prototype.indexOf.call(tab.lis, this.parentNode)

    // console.log(i, tab.lis)
    tab.lis[i].remove()
    tab.sections[i].remove()
    tab.updateNodeList()

    if (--i < 0) i = 0

    if (tab.lis[i]) {
      tab.lis[i].click()
    }
  }

  // 更改文字内容
  change() {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    var str = this.innerText;
    this.innerHTML = '<input input="text" >';
    var input = this.children[0];
    input.value = str;
    input.focus();
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    }
    input.onkeydown = function (e) {
      if (e.keyCode === 13) this.blur()
    }
  }

  // 核心: 事件代理 + 闭包 有一定难度  
  delegate(parent, selector, eventName, eventHandler) {
    function getTarget(ele) {
      if (ele.matches(selector)) return ele
      while (ele = ele.parentNode) {
        if (ele.matches(selector)) {
          return ele
        }
      }
      return null
    }
    parent.addEventListener(eventName, function (e) {
      if (e.target.matches(selector) || e.target.matches(selector + ' *')) {
        eventHandler.call(getTarget(e.target), this, e);
        this.updateNodeList()
      }
    }.bind(this))
  }

}
var tab = new Tab('#tab');