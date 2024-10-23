class User{
    constructor(password, email){
        this.password = 'password';
        this.email = "email";
    }
    get password(){
        return this.password.toUpperCase()
    }
}

const tabish = new User("tabish@qw", "123")
console.log(tabish.password);