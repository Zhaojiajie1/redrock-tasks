Array.prototype.myReduce = function (cb, initialValue) {
    let acc = initialValue || 0;
    const arr = this
    for (let i = 0; i < arr.length; i++) {
        acc = cb.call(this, acc, arr[i]);
    }
    return acc;
}

//测试
arr = [1, 2, 3, 4, 1, 2, 3]
console.log(arr.myReduce((prev, cur) => {
    if (prev.indexOf(cur) === -1) {
        prev.push(cur);
    }
    return prev;
}, []))