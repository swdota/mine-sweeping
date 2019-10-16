class main {
  constructor() {
    this.boomNum = 16 //雷数
    this.lineNum = 10 //棋盘行数
    // this.arr = this.randomSquare01(this.lineNum)
    this.arr = []
    // this.newLi()
  }
  //生成棋盘
  newLi() {
    var contentDom = document.querySelector('.main_ul')
    var htmlText = ''
    var arr = this.arr
    for (let i = 0; i < arr.length; i++) {
      htmlText += `
        <li data-Y=${i}>         
        ${this.newSpan(i, arr[i])}
        </li>
      `
      contentDom.innerHTML = htmlText
      this.addClick()
    }
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
    var contentDom = document.querySelectorAll('.one_ray')
    contentDom.forEach((item) => {
      item.addEventListener('click', (e) => {
        // console.log(e.target.getAttribute("data-X"), 'eee');
        var X = e.target.getAttribute("data-X")
        var Y = e.target.getAttribute("data-Y")
        var boom = e.target.getAttribute("data-boom")

        console.log(X, Y, 'eee');
      })
    })
  }
  random01() {
    var n = Math.random() * 10
    var z = Math.round(n) % 2
    // if (z != 0) {
    //   return 9
    // } else {
    //   return z
    // }
    return z != 0 ? 9 : 0
  }
  randomLine01(n) {
    var arr = []
    for (let i = 0; i < n; i++) {
      // const num = this.random01()
      const num = 0
      arr.push(num)
    }
    return arr
  }
  //随机下标
  randomIndex(n) {
    var allNum = n * n
    var index = Math.random() * allNum
    var x = parseInt(index % n)
    var y = parseInt(index / n)
    return [x, y]
  }
  randomSquare01(n) {
    var arr = []
    for (let i = 0; i < n; i++) {
      const num = this.randomLine01(n)
      // const numList = this.markedLine(num)
      arr.push(num)
    }
    for (let i = 0; i < this.boomNum; i++) {
      var XY = this.randomIndex(n)
      arr[XY[1]][XY[0]] = 9
    }
    var re = this.markedSquare(arr)
    return re
  }
  //统计周围雷数
  markedLine(re) {
    var num = 0
    re.forEach((it) => {
      if (it == 9) {
        num += 1
      }
    })
    return num
  }
  // 返回标记后的数组棋盘
  markedSquare(array) {
    var arrCope = JSON.parse(JSON.stringify(array))
    var arrCope1 = JSON.parse(JSON.stringify(array))
    for (let i = 0; i < arrCope1.length; i++) {
      var arr = arrCope1[i];
      var beforArr = arrCope1[i - 1];
      var afterArr = arrCope1[i + 1];
      var re
      arr.forEach((it, j) => {
        var index = arr[j]
        var index1 = arr[j - 1]
        var index2 = arr[j + 1]
        if (beforArr) {
          var befor1 = beforArr[j - 1]
          var befor2 = beforArr[j]
          var befor3 = beforArr[j + 1]
        }
        if (afterArr) {
          var after1 = afterArr[j - 1]
          var after2 = afterArr[j]
          var after3 = afterArr[j + 1]
        }
        //数字周围的 8 个数
        re = [index1, index2, befor1, befor2, befor3, after1, after2, after3]
        //如果不是雷则返回周围的雷数
        if (index != 9) {
          arrCope[i][j] = this.markedLine(re)
        }
      })
    }
    console.log(arrCope, 'arrCope');

    return arrCope
  }
  //如果是 0 则显示周围的格子
  showOff(num) {
    // if(num == 0){

    // }

  }
}
var _main = new main()
var _marked = new marked()
_main.arr = _marked.randomSquare01()
_main.newLi()