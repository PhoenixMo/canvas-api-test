
window.onload = () => {

    var canvas = document.getElementById("context") as HTMLCanvasElement;
    var context2d = canvas.getContext("2d");
    var Bg = new DisplayObjectContainer();
    var textTest = new TextField();

    

    textTest.scaleX = 4;
    textTest.scaleY = 4;
    textTest.alpha = 0.6;
    textTest.color = "#00FF00"
    textTest.fontSize = 20;
    textTest.fontName = "Arial";
    textTest.text = "6666";

    Bg.scaleX=2;
    Bg.rotation=30;

    var myPhoto = new Bitmap();
   
    myPhoto.alpha = 0.8;
    myPhoto.scaleX = 0.5;
    myPhoto.scaleY = 1;
    myPhoto.rotation=30;
    myPhoto.src = "myPhoto.jpg";
  
    Bg.addChild(textTest);
    Bg.addChild(myPhoto);
    
    Bg.draw(context2d);

     setInterval(() => {
        context2d.setTransform(1, 0, 0, 1, 0, 0);
         context2d.clearRect(0, 0, canvas.width, canvas.height);

      Bg.rotation++;

          Bg.draw( context2d);

    }, 60)


};



};


interface Drawable {
    draw(canvas: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {

    x = 0;
    y = 0;
   
    scaleX : number = 1;
    scaleY : number = 1;
    rotation : number = 0;

    matrix : math.Matrix ;
    globalMatrix : math.Matrix ;

    alpha  = 1;
    globalAlpha  = 1;//全局                             
    parent :  DisplayObjectContainer =null;

     constructor(){
       
        this.matrix = new math.Matrix();
        this.globalMatrix = new math.Matrix();
     }

    //每个子类都要这么干，final
    draw(canvas: CanvasRenderingContext2D) {
        this.matrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);//初始化矩阵
        console.log(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        //Alpha值
        if(this.parent){

            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.matrix, this.parent.globalMatrix);
        }else{
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.matrix;
        }
        canvas.globalAlpha = this.globalAlpha;
        canvas.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
        this.render(canvas);

        //模板方法模式
    }
       render(context2D: CanvasRenderingContext2D){


    }
}



class DisplayObjectContainer extends DisplayObject  {
    list: Drawable[] = [];

    

    addChild(child: DisplayObject) {
        if (this.list.indexOf(child) == -1) {
            this.list.push(child);
            child.parent = this;
        }
    }
    removeChild(child: DisplayObject) {
        for (var element of this.list) {
            if (element == child) {
                var index = this.list.indexOf(child);
                this.list.splice(index);
                return;
            }
        }
    }

     removeall() {

        this.list = [];

    }

    render(canvas: CanvasRenderingContext2D) {
        for (var child of this.list) {
            child.draw(canvas);
        }
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
         //   console.log(this.img.src);
            this.img.onload = () => {
                canvas.drawImage(this.img, this.x, this.y, this.img.width * this.scaleX, this.img.height * this.scaleY);
                this.isLoaded = true;
            }
        }
    }
}