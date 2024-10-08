class car {
    constructor(name, year){
        this.name = name;
        this.year = year;

    }
    age(){
        const date = new Date();
        return date.getFullYear() - this.year;

    }
}
const myCar = new car("Ford", 2001);
document.getElementById("demo").innerHTML = "my car is " + myCar.age() + "year of buying"