
let data = [22,66,55,25,65,76,95,26,95];
let evenNum = [];
let count = 0;

for(i = 0; i<data.length; i++){
    if(data[i]%2===0){
        // console.log(data[i]);
        count++;
        evenNum.push(data[i]*2)
        // evenNum[i] *=2;
    }
}

// for(i = 0;i<evenNum.length; i++){
//     evenNum[i] *=2;
//     // console.log(evenNum[i]);
// }

console.log(count);
console.log(evenNum);
