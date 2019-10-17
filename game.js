class game {
  constructor() {
    this.boomNum = 10 //雷数
    this.lineNum = 9 //棋盘行数
    // this.arr = this.randomSquare01(this.lineNum)
    this.arr = []
    this.time = 0
    this.timeFun = null
    this.begin = true
    // this.newLi()
  }
  //生成棋盘
  newLi() {
    var contentDom = document.querySelector('.main_ul')
    var htmlText = ''
    contentDom.innerHTML = htmlText
    var arr = this.arr
    for (let i = 0; i < arr.length; i++) {
      htmlText += `
        <li data-Y=${i} class='li_center'>         
        ${this.newSpan(i, arr[i])}
        </li>
      `
      contentDom.innerHTML = htmlText
    }
    this.addClick()
  }
  newSpan(indexY, arr) {
    var re = ''
    for (let i = 0; i < arr.length; i++) {
      re += `<span class="one_ray" data-boom=${arr[i]} data-X=${i} data-Y=${indexY}></span>`
    }
    return re
  }
  // 绑定顶级事件
  addClick() {
    var contentDom = document.querySelector('.main_ul')
    var timeDom = document.querySelector('.time_num')
    this.begin = true
    contentDom.addEventListener('click', (e) => {
      var num = e.target.getAttribute("data-boom")
      //开始计时
      if (this.begin && num != null) {
        this.timeFun = setInterval(() => {
          this.time++;
          timeDom.innerHTML = `用时:${this.time}秒`
        }, 1000)
        this.begin = false
      }
      if (num === '0') {
        this.forShow(e.target)
      } else if (num != '0' && num != '9' && num != null) {
        e.target.classList.add("show")
        e.target.innerHTML = num
      } else if (num === '9') {
        this.gameOver()
      }

    })
    // item.addEventListener('click', this.showOff)
  }

  // //事件
  // eventClick(e){

  // }
  //点击了雷,游戏结束
  gameOver() {
    var spanList = document.querySelectorAll('.one_ray')
    spanList.forEach((it) => {
      if (it.getAttribute("data-boom") == '9') {
        it.classList.add("boomShow")
      }
    })
    setTimeout(() => {
      if (confirm("gameOver")) {
        console.log('true');
      } else {
        console.log('false');
      }
    }, 0)

    // alert('gameOver')
    // 停止计时
    clearInterval(this.timeFun);
    // this.newLi()
  }
  //遍历显示 0 周围的格子
  forShow(e) {
    var spanList = document.querySelectorAll('.one_ray')
    var X = Number(e.getAttribute("data-X"))
    var Y = Number(e.getAttribute("data-Y"))
    var boom = e.getAttribute("data-boom")
    //上面 3 个
    if ((Y - 1) >= 0) {
      var befor = (Y - 1) * this.lineNum + (X)
      if ((X - 1) > 0) {
        var befor1 = (Y - 1) * this.lineNum + (X - 1)
      }
      if ((X + 1) < this.lineNum) {
        var befor2 = (Y - 1) * this.lineNum + (X + 1)
      }
    }
    //下面 3 个
    if ((Y + 1) < this.lineNum) {
      var after = (Y + 1) * this.lineNum + (X)
      if ((X - 1) >= 0) {
        var after1 = (Y + 1) * this.lineNum + (X - 1)
      }
      if ((X + 1) < this.lineNum) {
        var after2 = (Y + 1) * this.lineNum + (X + 1)
      }
    }

    //中间 3 个
    var index = Y * this.lineNum + X
    spanList[index].classList.add("show")
    if ((X - 1) >= 0) {
      var index1 = Y * this.lineNum + (X - 1)
    }
    if ((X + 1) < this.lineNum) {
      var index2 = Y * this.lineNum + (X + 1)
    }

    var list = [befor, befor1, befor2, index, index1, index2, after, after1, after2]
    // console.log(list, 'list');
    for (let i = 0; i < list.length; i++) {
      // const element = array[i];
      var it = list[i]
      var item = spanList[it]
      if (it != undefined && item) {
        // item.classList.add("show")
        var num = item.getAttribute("data-boom")
        if (num != '0' && num != '9') {
          item.innerHTML = num
          item.classList.add("show")
        }
        //没有显示过的,并且周围没有雷,不是本身
        if (num === '0' && it != index && !item.classList.contains('show')) {
          this.forShow(item)
        }
      }
    }
  }
  //如果是 0 则显示周围的格子
  showOff(e) {
    console.log(arguments, main, 'arguments');
    var num = e.target.getAttribute("data-boom")
    if (num === '0') {
      this.forShow(e.target)
    } else if (num != '0' && num != '9') {
      e.target.classList.add("show")
      e.target.innerHTML = num
    }
    if (num === '9') {
      this.gameOver()
    }
  }


}
