window.onload = function () {
    var canvas = document.getElementById("test");
    var context2D = canvas.getContext("2d");
    // context2D.fillStyle = "#FF0000";
    // context2D.rect(0,0,100,100);
    // context2D.fill();
    // context2D.stroke();
    //var image = new Image();
    //image.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487731042&di=12ec67a86c85dfebde95dc3104ce8974&imgtype=jpg&er=1&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Fface%2F280f1ffb730da4a954c2a5d1d928e1497148ac9e.jpg";
    // image.src = "src/timg.jpg";
    // context2D.drawImage(image,0,0);
    // image.onload = () =>{
    // context2D.clearRect(0,0,canvas.width,canvas.height);
    // context2D.drawImage(image,0,0);
    // }
    var stage = new DisplayObjectContainer();
    var textField01 = new TestField();
    textField01.setText("Hello world");
    textField01.setTextColor("#00FF00");
    textField01.setX(0);
    textField01.setSize(30);
    var image01 = new Bitmap();
    image01.setImage("src/timg.jpg");
    //stage.addChild(image01);
    //stage.addChild(textField01);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
        var rect = new Shape();
        rect.graphics.beginFill("#FF0000", 1);
        rect.graphics.drawRect(0, 300, 100, 100, context2D);
        rect.graphics.endFill();
        var circle = new Shape();
        circle.graphics.beginFill("#00FF00", 1);
        circle.graphics.drawCircle(100, 100, 30, context2D);
        circle.graphics.endFill();
        var arc = new Shape();
        arc.graphics.beginFill("#0000FF", 1);
        arc.graphics.drawArc(100, 200, 20, 0, Math.PI, context2D);
        arc.graphics.endFill();
    }, 100);
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.childArray = [];
    }
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.childArray.push(child);
    };
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.childArray; _i < _a.length; _i++) {
            var drawble = _a[_i];
            drawble.draw(context2D);
        }
    };
    return DisplayObjectContainer;
}());
//# sourceMappingURL=main.js.map