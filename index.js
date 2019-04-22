class Tab {

  // 抽取对象 共有的方法   对象就是 tab  
  // tab 功能 有 点击切换   点击 +  添加 tab   点击 减去 删除tab  
  constructor(id) {
    // 最大的盒子
    this.id = document.querySelector(id);
    // 上面 li 
    this.tabs = this.id.querySelectorAll('li');
    // 下面的切换seciton
    this.sections = this.id.querySelectorAll('section');
    // 里面的加号 
    this.add = this.id.querySelector('.tabadd');
    // 减号
    this.jian = this.id.querySelectorAll('.fisrstnav .iconfont');
    // 双击修改 span 
    this.titleSpan = this.id.querySelectorAll('.fisrstnav li span:first-child');
    this.init();
  }

  // 初始化操作
  init() {
    console.log(this.titleSpan);
    this.reset();
    // 给所有tabs 注册点击事件调用 切换方法
    for (var i = 0; i < this.tabs.length; i++) {
      this.tabs[i].index = i;
      // 点击tab栏可以切换
      this.tabs[i].onclick = this.tabToggle.bind(this.tabs[i], this);
      // 点击减号 可以移除
      this.jian[i].onclick = this.removeTab.bind(this.jian[i], this);
      // 点击tab栏更换内容
      this.titleSpan[i].ondblclick = this.change.bind(this.titleSpan[i], this);
      // 点击内容区域更换文字内容
      this.sections[i].ondblclick = this.change.bind(this.sections[i], this);
    }
    // 调用 添加方法
    this.add.onclick = this.addTab.bind(this.add, this)
  }
  // 切换tab栏
  tabToggle(tab) {
    tab.clearClass();
    this.className = 'liactive';
    tab.sections[this.index].className = 'conactive';
  }
  // 清除原先样式
  clearClass(callback) {
    for (var i = 0; i < this.tabs.length; i++) {
      this.tabs[i].className = '';
      this.sections[i].className = ''

    }
    callback && callback();

  }

  // 因为添加完毕后， 动态生成了新的 元素 所以从新获取 最新的列表
  reset() {
    this.tabs = this.id.querySelectorAll('li');
    this.sections = this.id.querySelectorAll('section');
    this.jian = this.id.querySelectorAll('.iconfont');
    this.titleSpan = this.id.querySelectorAll('.fisrstnav li span:first-child');
  }

  // 移除 tab 做法
  removeTab(tab, e) {
    e.stopPropagation();
    tab.id.querySelector('.fisrstnav ul:first-child').removeChild(tab.tabs[this.parentNode.index]);
    tab.id.querySelector('.tabscon').removeChild(tab.sections[this.parentNode.index]);
    tab.clearClass(function () {
      if (tab.id.querySelector('.fisrstnav ul').children.length !== 0) {
        tab.id.querySelector('.fisrstnav ul li:last-child').className = 'liactive';
        tab.id.querySelector('.tabscon section:last-child').className = 'conactive';
      }
    });
  }
  // 可以更改文字内容
  change() {
    //双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    var str = this.innerHTML;
    this.innerHTML = "<input input='text' >";
    this.children[0].focus();
    this.children[0].onblur = function () {
      if (this.value != '') {
        this.parentNode.innerHTML = this.value;
      } else {
        this.parentNode.innerHTML = str;
      }
    }
  }
  addTab(tab) {
    tab.clearClass();
    var random = Math.random()
    var li = '<li class="liactive"><span>Tab</span><span class="iconfont icon-guanbi"></span></li>'
    var section = '<section class="conactive">New Tab content' + random + '</section>'

    // 将元素追加到页面结构中去
    tab.id.querySelector('.fisrstnav ul:first-child').insertAdjacentHTML('beforeend', li)
    tab.id.querySelector('.tabscon').insertAdjacentHTML('beforeend', section)
    tab.reset();
    // tab.init();
  };
}
var tab = new Tab('#tab');