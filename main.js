

var _game = new game()
var _marked = new marked()


var buttonEventEvent = function () {
    var buttonDOM = document.querySelector('.head_button')
    buttonDOM.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if (_game.begin) {
            var level = e.target.classList
            if (level == 'level_hight') {
                _game.boomNum = 40//雷数
                _game.lineNum = 20 //棋盘行数

            } else if (level == 'level_middle') {
                _game.boomNum = 18 //雷数
                _game.lineNum = 15 //棋盘行数
            } else if (level == 'level_primary') {
                _game.boomNum = 10 //雷数
                _game.lineNum = 9 //棋盘行数
            }
            _game.arr = _marked.randomSquare01(_game)
            _game.newLi()
        }
    })
}

var _main = function () {
    buttonEventEvent()
}
_main()