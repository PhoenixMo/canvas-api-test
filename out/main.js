var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("context");
    var context2d = canvas.getContext("2d");
    var Bg = new DisplayObjectContainer();
    var textTest = new TextField();
    textTest.scaleX = 4;
    textTest.scaleY = 4;
    textTest.alpha = 1;
    textTest.color = "#00FF00";
    textTest.fontSize = 50;
    textTest.fontName = "Arial";
    textTest.text = "6666";
    Bg.rotation = 30;
    var myPhoto = new Bitmap();
    myPhoto.alpha = 0.8;
    myPhoto.src = "myPhoto.jpg";
    Bg.addChild(textTest);
    Bg.addChild(myPhoto);
    Bg.draw(context2d);
    setInterval(function () {
        context2d.setTransform(1, 0, 0, 1, 0, 0);
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        myPhoto.rotation++;
        Bg.draw(context2d);
    }, 60);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.globalAlpha = 1; //全局                             
        this.parent = null;
        this.matrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
    }
    //每个子类都要这么干，final
    DisplayObject.prototype.draw = function (canvas) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation); //初始化矩阵
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.matrix, this.parent.globalMatrix);
        }
        else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;
        }
        canvas.globalAlpha = this.globalAlpha;
        canvas.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        this.render(canvas);
        //模板方法模式
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list = [];
        return _this;
    }
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this.list.indexOf(child) == -1) {
            this.list.push(child);
            child.parent = this;
        }
    };
    DisplayObjectContainer.prototype.removeChild = function (child) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element == child) {
                var index = this.list.indexOf(child);
                this.list.splice(index);
                return;
            }
        }
    };
    DisplayObjectContainer.prototype.removeall = function () {
        this.list = [];
    };
    DisplayObjectContainer.prototype.render = function (canvas) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var child = _a[_i];
            child.draw(canvas);
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = "";
        _this.color = "";
        _this.fontSize = 10;
        _this.fontName = "";
        return _this;
    }
    TextField.prototype.render = function (canvas) {
        canvas.fillStyle = this.color;
        canvas.globalAlpha = this.alpha;
        canvas.font = this.fontSize.toString() + "px " + this.fontName.toString();
        canvas.fillText(this.text, this.x, this.y + this.fontSize);
    };
    return TextField;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        var _this = _super.call(this) || this;
        _this.img = null;
        _this.isLoaded = false;
        _this._src = "";
        _this.img = document.createElement("img");
        return _this;
    }
    Object.defineProperty(Bitmap.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.isLoaded = false;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.render = function (canvas) {
        var _this = this;
        canvas.globalAlpha = this.alpha;
        if (this.isLoaded) {
            canvas.drawImage(this.img, this.x, this.y, this.img.width * this.scaleX, this.img.height * this.scaleY);
        }
        else {
            this.img.src = this._src;
            //   console.log(this.img.src);
            this.img.onload = function () {
                canvas.drawImage(_this.img, _this.x, _this.y, _this.img.width * _this.scaleX, _this.img.height * _this.scaleY);
                _this.isLoaded = true;
            };
        }
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map