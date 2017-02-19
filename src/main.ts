
window.onload = () => {

    var canvas = document.getElementById("context") as HTMLCanvasElement;
    var context2d = canvas.getContext("2d");
    var container = new DisplayObjectContainer();
    var textfield = new TextField();
    textfield.x = 0;
    textfield.scaleX = 5;
    textfield.scaleY = 5;
    textfield.alpha = 0.5;
    textfield.y = 0;
    textfield.color = "#FF0000"
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
    container.render(context2d);
    setInterval(() => {
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        textfield.y++;
        bitmap1.x++;
        container.render(context2d);
    },30)
};


interface Drawable {
    draw(canvas: CanvasRenderingContext2D);
}

class DisplayObjectContainer implements Drawable {
    list: Drawable[] = [];

    addChild(child: Drawable) {
        if (this.list.indexOf(child) == -1) {
            this.list.push(child);
        }
    }
    removeChild(child: Drawable) {
        for (var element of this.list) {
            if (element == child) {
                var index = this.list.indexOf(child);
                this.list.splice(index);
                return;
            }
        }
    }
    draw(canvas: CanvasRenderingContext2D) {
        for (var child of this.list) {
            child.draw(canvas);
        }
    }
}

class DisplayObject implements Drawable {
    x = 0;
    y = 0;
   
    scaleX : number = 1;
    scaleY : number = 1;
    rotation : number = 0;

    matrix : math.Matrix = null;
    globalMatrix : math.Matrix = null;

    alpha : number = 1;//相对
    globalAlpha : number = 1;//全局                             
    parent : DisplayObject = null;

     constructor(){
      
        this.matrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
     }

    //每个子类都要这么干，final
    draw(canvas: CanvasRenderingContext2D) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);//初始化矩阵

        //Alpha值
        if(this.parent){

            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.matrix, this.parent.globalMatrix);
            //console.log("has");

        }else{

            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;
        }

        canvas.globalAlpha = this.globalAlpha;
        //变换
    
        canvas.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        this.render(canvas);

        //模板方法模式
    }
       render(context2D: CanvasRenderingContext2D){


    }
}

class TextField extends DisplayObject {
    text = "";
    color = "";
    fontSize = 10;
    fontName = "";
    render(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = this.color;
        canvas.globalAlpha = this.alpha;
        canvas.font = this.fontSize.toString() + "px " + this.fontName.toString();
        canvas.fillText(this.text, this.x, this.y + this.fontSize);
    }
}

class Bitmap extends DisplayObject {
    private img: HTMLImageElement = null;
    private isLoaded = false;
    constructor() {
        super();
        this.img = document.createElement("img");
    }
    private _src = "";
    set src(value: string) {
        this._src = value;
        this.isLoaded = false;
    }

    render(canvas: CanvasRenderingContext2D) {
        canvas.globalAlpha = this.alpha;
        if (this.isLoaded) {
            canvas.drawImage(this.img, this.x, this.y, this.img.width * this.scaleX, this.img.height * this.scaleY);
        }
        else {
            this.img.src = this._src;
            this.img.onload = () => {
                canvas.drawImage(this.img, this.x, this.y, this.img.width * this.scaleX, this.img.height * this.scaleY);
                this.isLoaded = true;
            }
        }
    }
}