/**
 Merge the two different sources of same cart items.
 */

export const deDupeItems = Items => Items.reduce((totalArr, currentArr) => {
    console.log('totalArr', totalArr)
    console.log('currentArr', currentArr)
    const i = totalArr.findIndex(obj => obj.data.id === currentArr.data.id);

    if (i >= 0) {
        totalArr[i].qty += currentArr.qty;
    } else {
        totalArr.push(currentArr);

    }
    console.log('array definitivo', totalArr)
    return totalArr;
}, []);
