var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TestField = (function (_super) {
    __extends(TestField, _super);
    function TestField() {
        _super.apply(this, arguments);
        this.text = "";
        this.textColor = "#000000";
        this.x = 0;
        this.y = 8;
        this.size = 18;
        this.typeFace = "Arial";
        this.textType = "18px Arial";
    }
    TestField.prototype.draw = function (context2D) {
        context2D.fillStyle = this.textColor;
        context2D.font = this.textType;
        context2D.fillText(this.text, this.x, this.y + this.size);
        //console.log("233");
    };
    TestField.prototype.setText = function (text) {
        this.text = text;
    };
    TestField.prototype.setX = function (x) {
        this.x = x;
    };
    TestField.prototype.setY = function (y) {
        this.y = y;
    };
    TestField.prototype.setTextColor = function (color) {
        this.textColor = color;
    };
    TestField.prototype.setSize = function (size) {
        this.size = size;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    TestField.prototype.setTypeFace = function (typeFace) {
        this.typeFace = typeFace;
        this.textType = this.size.toString() + "px " + this.typeFace;
        console.log(this.textType);
    };
    return TestField;
}(DisplayObjectContainer));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.imageID = "";
        this.x = 0;
        this.y = 0;
    }
    Bitmap.prototype.draw = function (context2D) {
        var _this = this;
        var image = new Image();
        image.src = this.imageID;
        image.onload = function () {
            context2D.drawImage(image, _this.x, _this.y);
        };
        //console.log("2333");
    };
    Bitmap.prototype.setImage = function (text) {
        this.imageID = text;
    };
    Bitmap.prototype.setX = function (x) {
        this.x = x;
    };
    Bitmap.prototype.setY = function (y) {
        this.y = y;
    };
    return Bitmap;
}(DisplayObjectContainer));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
        this.graphics = new Graphics();
    }
    return Shape;
}(DisplayObjectContainer));
var Graphics = (function (_super) {
    __extends(Graphics, _super);
    function Graphics() {
        _super.apply(this, arguments);
        this.fillColor = "#000000";
        this.alpha = 1;
        this.strokeColor = "#000000";
        this.lineWidth = 1;
        this.lineColor = "#000000";
    }
    Graphics.prototype.beginFill = function (color, alpha) {
        this.fillColor = color;
        this.alpha = alpha;
    };
    Graphics.prototype.endFill = function () {
        this.fillColor = "#000000";
        this.alpha = 1;
    };
    Graphics.prototype.drawRect = function (x1, y1, x2, y2, context2D) {
        context2D.fillStyle = this.fillColor;
        context2D.fillRect(x1, y1, x2, y2);
        context2D.fill();
    };
    Graphics.prototype.drawCircle = function (x, y, rad, context2D) {
        context2D.fillStyle = this.fillColor;
        context2D.beginPath();
        context2D.arc(x, y, rad, 0, Math.PI * 2, true);
        context2D.closePath();
        context2D.fill();
    };
    Graphics.prototype.drawArc = function (x, y, rad, beginAngle, endAngle, context2D) {
        context2D.strokeStyle = this.strokeColor;
        context2D.beginPath();
        context2D.arc(x, y, rad, beginAngle, endAngle, true);
        context2D.closePath();
        context2D.stroke();
    };
    return Graphics;
}(DisplayObjectContainer));
//# sourceMappingURL=drawing-api.js.map