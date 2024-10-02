function fetchData(callback) {
    setTimeout(() => {
        console.log('data fetched');
        callback();
    }, 2000);
}