function Person(){
    this.age = 30;
    this.name = 'Max';
    this.greet = function () {
        console.log(
            'hi, i am' + this.name + ' and i am md'
        );
    };
}

const p = new Person();
p.greet();