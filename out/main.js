var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("context");
    var context2d = canvas.getContext("2d");
    var container = new DisplayObjectContainer();
    var textfield = new TextField();
    textfield.x = 0;
    textfield.scaleX = 5;
    // textfield.scaleY = 5;
    textfield.alpha = 0.5;
    textfield.y = 0;
    textfield.color = "#FF0000";
    textfield.fontSize = 40;
    textfield.fontName = "Arial";
    textfield.text = "Hello,world";
    var bitmap1 = new Bitmap();
    bitmap1.x = 0;
    bitmap1.y = 0;
    bitmap1.alpha = 0.8;
    bitmap1.scaleX = 2;
    bitmap1.scaleY = 2;
    bitmap1.src = "weapan001.png";
    container.addChild(bitmap1);
    container.addChild(textfield);
    container.draw(context2d);
    setInterval(function () {
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        textfield.y++;
        bitmap1.x++;
        container.draw(context2d);
    }, 30);
};
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.list = [];
    }
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this.list.indexOf(child) == -1) {
            this.list.push(child);
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
    DisplayObjectContainer.prototype.draw = function (canvas) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var child = _a[_i];
            child.draw(canvas);
        }
    };
    return DisplayObjectContainer;
}());
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.alpha = 1;
    }
    DisplayObject.prototype.draw = function (canvas) { };
    return DisplayObject;
}());
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.color = "";
        this.fontSize = 10;
        this.fontName = "";
    }
    TextField.prototype.draw = function (canvas) {
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
        _super.call(this);
        this.img = null;
        this.isLoaded = false;
        this._src = "";
        this.img = document.createElement("img");
    }
    Object.defineProperty(Bitmap.prototype, "src", {
        set: function (value) {
            this._src = value;
            this.isLoaded = false;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.draw = function (canvas) {
        var _this = this;
        canvas.globalAlpha = this.alpha;
        if (this.isLoaded) {
            canvas.drawImage(this.img, this.x, this.y, this.img.width * this.scaleX, this.img.height * this.scaleY);
        }
        else {
            this.img.src = this._src;
            this.img.onload = function () {
                canvas.drawImage(_this.img, _this.x, _this.y, _this.img.width * _this.scaleX, _this.img.height * _this.scaleY);
                _this.isLoaded = true;
            };
        }
    };
    return Bitmap;
}(DisplayObject));
//# sourceMappingURL=main.js.map