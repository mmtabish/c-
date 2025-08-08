
function palindrome(data){

    let start = 0; 
    let end = data.length-1;
    let result = true;
    
    while(start<=end){
        if(data[start] != data[end]){
            result = false;
        }
        start++;
        end--;
    }
    return result;
    //comment\
    // new update comment
    // new commentnjjn
    //ocns
    //ukuh
    mkmk
}


console.log(palindrome("levvel"));