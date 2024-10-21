const promisesOne = new Promise(function(resolve, reject) {

    setTimeout(function(){
        console.log('Async task is complete');
        resolve()
    },1000)

})

promisesOne.then(function(){
    console.log("promises consumed");
})

const promisesThree = new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("three number")
        resolve({username:"codeN", email:"tym@gmail.com"})
    },1000)
})

promisesThree.then(function(user){
    console.log(user)
    console.log(user.email)
})

const promisesFour = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = false
        if(!error){
            resolve({username: "tabish", password: "123"})
        }else{
            reject('ERROR: something went wrong')
        }
    },1000)
})

promisesFour.then(function(user){
    console.log(user);
    return user.username
}).then((username) =>{
    console.log(username);
} ).catch(function(error){
    console.log(error);
}).finally(() => console.log("The promise is either resolve or rejected"))


const promisesFive = new Promise(function(resolve, reject){
    setTimeout(function(){
        let error = true
        if(!error){
            resolve({username: "nadeer", password: "123"})
        }else{
            reject('ERROR: js went wrong')
        }
    },1000)
});

async function consumePromiseFive(){
    try {
        const response = await promisesFive
    console.log(response);
        
    } catch (error) {
        console.log(error);
    }
 }

consumePromiseFive()

async function getAllusers(){
   try{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // console.log(response);
    const data =await response.json()
   console.log(data);
   }catch(error){
    console.log("E:", error);
   }
   

}

getAllusers()




console.log("hii")