function shuffle(arr) {
    //乱序
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * (i + 1));
        let temp = arr[rIndex];
        arr[rIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function numToChinese(num) {
    if (!/^\d*(\.\d*)?$/.test(num)) {
        alert("Number is wrong!");
        return "Number is wrong!";
    }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }
    if (re[0] == "一"&&re[1] == "十"){
        if (re.length==3)
            re = re[1]+re[2];
        else if(re.length==2)
            re = re[1];
    }
    if (a.length > 1) //加上小数部分(如果有小数部分) 
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
};

function setDataCollect(key,value){
    if (dataCollect.hasOwnProperty(key)){
        dataCollect[key] = value;
    }
}

function calcScore(userDeci,otherDeci1,otherDeci2,otherDeci3){
    let userRoundScore = [];
    let score = 0;
    let coopNum = 0;
    for (let i = 0; i < userDeci.length; i++) {
        coopNum = userDeci[i]+otherDeci1[i]+otherDeci2[i]+otherDeci3[i];
        switch(coopNum){
            case 0:
                score = 8;
                break;
            case 1:
                score = userDeci[i]==1 ? 4 : 12;
                break;
            case 2:
                score = userDeci[i]==1 ? 8 : 16;
                break;
            case 3:
                score = userDeci[i]==1 ? 12 : 20;
                break;
            case 4:
                score = 16;
                break;
        }
        userRoundScore.push(score);
    }
    return userRoundScore;
}

function randIntNoRepeat(num,min,max){
    let pool = [];
    let res = [];
    let ind = 0;
    for(let i = min;i <= max;i++){
        pool.push(i);
    }
    for (let i = 0; i < num; i++) {
        ind = parseInt(Math.random()*(pool.length));
        res.push(pool[ind]);
        pool.splice(ind,1);
    }
    return res;
}
