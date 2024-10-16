
const rectangle = class{
    constructor(height, width){
        this.height= height;
        this.width=width;
    }
    area(){
        return this.height*this.width;
    }
}
console.log(new rectangle(3,4).area());