const promisesOne = new promises(function(resolve, reject) {

    setTimeout(function(){
        console.log('Async task is complete');
        resolve()
    },1000)

})

console.log("hii")