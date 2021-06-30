function saveQuestionnaire() {
    var gender = document.getElementsByName("gender");
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked == true) {
            sessionStorage.setItem("gender", gender[i].value);
            break;
        }
        if (i == gender.length - 1) {
            alert("请先完成问卷");
            return -1;
        }
    }

    var age = document.getElementById("age");
    sessionStorage.setItem("age", age.value);

    var occup = document.getElementsByName("occupation");
    for (var i = 0; i < occup.length; i++) {
        if (occup[i].checked == true) {
            textSpan = getNextNode(occup[i]);
            if (i == occup.length - 1) {
                textSpanInput = getNextNode(textSpan);
                sessionStorage.setItem("occupation", textSpan.innerHTML + textSpanInput.value);
            } else {
                sessionStorage.setItem("occupation", textSpan.innerHTML);
            }
            break;
        }
        if (i == occup.length - 1) {
            alert("请先完成问卷");
            return -1;
        }
    }

    var alipay = document.getElementById("alipay");
    sessionStorage.setItem("alipay", alipay.value);
}
function getNextNode(ele) {
    if (ele.nextElementSibling !== undefined) {
        //IE9+,Chrome,firefox..
        return ele.nextElementSibling;
    } else {
        var item = ele.nextSibling;
        //IE8-
        while (item && item.nodeType != 1) {
            item = item.nextSibling;
        }
        return item;
    }
}

svoGains = [[85, 85, 85, 85, 85, 85, 85, 85, 85], [85, 76, 68, 59, 50, 41, 33, 24, 15],
[85, 87, 89, 91, 93, 94, 96, 98, 100], [15, 19, 24, 28, 33, 37, 41, 46, 50],
[50, 54, 59, 63, 68, 72, 76, 81, 85], [100, 98, 96, 94, 93, 91, 89, 87, 85],
[50, 54, 59, 63, 68, 72, 76, 81, 85], [100, 89, 79, 68, 58, 47, 36, 26, 15,],
[100, 94, 88, 81, 75, 69, 63, 56, 50], [50, 56, 63, 69, 75, 81, 88, 94, 100],
[100, 98, 96, 94, 93, 91, 89, 87, 85], [50, 54, 59, 63, 68, 72, 76, 81, 85]];
function receiveChange(ele, num) {
    document.getElementById("gain-" + num + "-1").innerHTML = svoGains[2 * num - 2][ele.value - 1];
    document.getElementById("gain-" + num + "-2").innerHTML = svoGains[2 * num - 1][ele.value - 1];
}
function saveSVO() {
    selfGain = 0;
    otherGain = 0;
    for (var i = 1; i < 7; i++) {
        selfGain += Number(document.getElementById("gain-" + i + "-1").innerHTML);
        otherGain += Number(document.getElementById("gain-" + i + "-2").innerHTML);
    }
    svoResult = Math.atan((otherGain - 50 * 6) / (selfGain - 50 * 6)) * 180 / Math.PI;
    sessionStorage.setItem("SVO", svoResult);
}

var timer = null;
var visibleRound = 0;
var coopNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var sysDecision = new Array();
var userDecision = new Array();
var parDecision = new Array();
var totalScore = 0;

for (var i = 0; i < 3; i++) {
    parDecision[i] = new Array();
}
function radioChange(ele) {
    document.getElementById(ele.name + "-1").disabled = true;
    document.getElementById(ele.name + "-0").disabled = true;
    if (show_cur == 16) {
        for (var i = 0; i < 10; i++) {
            round = i + 1;
            if (ele.name == "sel-" + round) {
                if (visibleRound == round && visibleRound < 10) {
                    round = i + 2;
                    document.getElementById("sel_round-" + round).style.visibility = "visible";
                    visibleRound = round;
                }
                break;
            }
        }
    }
}
function setSystem() {
    //初始化单选框
    for (var i = 0; i < 10; i++) {
        round = i + 1;
        document.getElementById("sel-" + round + "-1").checked = false;
        document.getElementById("sel-" + round + "-0").checked = false;
        document.getElementById("sel-" + round + "-1").disabled = false;
        document.getElementById("sel-" + round + "-0").disabled = false;
    }

    if (show_cur < 16) {
        //1-11组
        //随机选择系统合作率
        var indSel = Math.floor(Math.random() * coopNums.length);
        if (indSel == coopNums.length)
            indSel = 0;
        var coopNum = coopNums[indSel];
        if (show_cur != 4)
            coopNums.splice(indSel, 1);

        //启动计时器
        decisionTime = 0;
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(function () {
            decisionTime++;
            if (decisionTime > 10000) {
                //超时，停止计时
                clearInterval(timer);
                timer = null;
            }
        }, 100);

        //填充系统决策
        var rounds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        for (var i = 0; i < rounds.length; i++) {
            if (coopNum <= 0) {
                document.getElementById("sel-" + rounds[i] + "-0").checked = true;
            } else {
                document.getElementById("sel-" + rounds[i] + "-1").checked = true;
                coopNum--;
            }
        }

        //当前组别
        set = show_cur - 4;
        //记录系统决策
        sysDecision = [];
        for (var i = 0; i < 10; i++) {
            round = i + 1;
            if (document.getElementById("sel-" + round + "-1").checked) {
                decision = 1;
            }
            else {
                decision = 0;
            }
            sysDecision[i] = decision;
        }
    }
    else {
        for (var i = 1; i < 10; i++) {
            round = i + 1;
            document.getElementById("sel_round-" + round).style.visibility = "hidden";
        }
        visibleRound = 1;
    }
}
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
function saveExp() {
    if (show_cur == 16 && visibleRound < 10) {
        alert("尚未完成决策！");
        return -1;
    }
    //当前组别
    set = show_cur - 4;

    //记录每轮用户决策
    userDecision = [];
    for (var i = 0; i < 10; i++) {
        round = i + 1;
        if (document.getElementById("sel-" + round + "-1").checked) {
            decision = 1;
        }
        else {
            decision = 0;
        }
        userDecision[i] = decision;
    }

    //生成得分
    var setScore = calcScore();
    totalScore += totalScore;

    if (set > 0) {
        //保存每组决策
        for (var i = 0; i < 10; i++) {
            round = i + 1;
            sessionStorage.setItem("system_" + set + "-" + round, sysDecision[i]);
            sessionStorage.setItem("user_" + set + "-" + round, userDecision[i]);
        }
        //保存每组得分
        sessionStorage.setItem("score_" + set, setScore);
        //保存每组决策页面停留时间
        sessionStorage.setItem("decision_time_" + set, (decisionTime * 0.1).toFixed(1));
    }

    if (show_cur == 16) {
        document.getElementById("sys_result").className = "hidden";
        //保存总得分
        sessionStorage.setItem("total_score", totalScore);
    }
}
function calcScore() {
    var out_score = 0;
    var score = new Array();

    //生成得分
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            parDecision[i][j] = Math.round(Math.random());
        }
    }

    //系统决策结果
    var sysRes = document.getElementById("sys_result");
    for (var i = 0; i < 10; i++) {
        openNum = sysDecision[i] + parDecision[0][i] + parDecision[1][i] + parDecision[2][i];
        if (openNum == 4)
            score[i] = (sysDecision[i] == 0) ? 0 : 8;
        else if (openNum == 3)
            score[i] = (sysDecision[i] == 0) ? 4 : 12;
        else if (openNum == 2)
            score[i] = (sysDecision[i] == 0) ? 8 : 16;
        else if (openNum == 1)
            score[i] = (sysDecision[i] == 0) ? 12 : 20;
        else if (openNum == 0)
            score[i] = (sysDecision[i] == 0) ? 16 : 0;

        sysRes.rows[2].cells[i + 1].innerHTML = parDecision[0][i];
        sysRes.rows[3].cells[i + 1].innerHTML = parDecision[1][i];
        sysRes.rows[4].cells[i + 1].innerHTML = parDecision[2][i];
        sysRes.rows[5].cells[i + 1].innerHTML = sysDecision[i];
        sysRes.rows[6].cells[i + 1].innerHTML = score[i];
    }

    //用户决策结果
    var userRes = document.getElementById("user_result");
    for (var i = 0; i < 10; i++) {
        openNum = userDecision[i] + parDecision[0][i] + parDecision[1][i] + parDecision[2][i];
        if (openNum == 4)
            score[i] = (userDecision[i] == 0) ? 0 : 8;
        else if (openNum == 3)
            score[i] = (userDecision[i] == 0) ? 4 : 12;
        else if (openNum == 2)
            score[i] = (userDecision[i] == 0) ? 8 : 16;
        else if (openNum == 1)
            score[i] = (userDecision[i] == 0) ? 12 : 20;
        else if (openNum == 0)
            score[i] = (userDecision[i] == 0) ? 16 : 0;
        out_score += score[i];

        userRes.rows[2].cells[i + 1].innerHTML = parDecision[0][i];
        userRes.rows[3].cells[i + 1].innerHTML = parDecision[1][i];
        userRes.rows[4].cells[i + 1].innerHTML = parDecision[2][i];
        userRes.rows[5].cells[i + 1].innerHTML = userDecision[i];
        userRes.rows[6].cells[i + 1].innerHTML = score[i];
    }

    return out_score;
}


// var keys = ["alipay","age","occupation","SVO"];
function sendStorage() {
    var dataObj = new Object();
    //storage内数据转为Object对象
    dataObj["alipay"] = sessionStorage["alipay"];
    dataObj["age"] = sessionStorage["age"];
    dataObj["occupation"] = sessionStorage["occupation"];
    dataObj["SVO"] = sessionStorage["SVO"];
    for (var i = 0; i < 11; i++) {
        let set = i + 1;
        for (var j = 0; j < 10; j++) {
            let round = j + 1;
            dataObj["system_" + set + "-" + round] = sessionStorage["system_" + set + "-" + round];
        }
        for (var j = 0; j < 10; j++) {
            let round = j + 1;
            dataObj["user_" + set + "-" + round] = sessionStorage["user_" + set + "-" + round];
        }
        dataObj["decision_time_" + set] = sessionStorage["decision_time_" + set];
        dataObj["score_" + set] = sessionStorage["score_" + set];
    }
    for (var j = 0; j < 10; j++) {
        let round = j + 1;
        dataObj["user_12-" + round] = sessionStorage["user_12-" + round];
    }
    dataObj["total_score"] = sessionStorage["total_score"];
    dataObj["finish_time"] = Date();

    //转换为json对象
    // console.log(JSON.stringify(dataObj));
    // debugText.innerHTML = JSON.stringify(dataObj);
    ///调试代码
    // dataObj["debug"] = "false";
    // dataObj["delete"] = "false";
    ///调试代码

    document.getElementById("wait_post_text").innerHTML = "正在发送数据到服务器，请勿关闭网页";
    document.getElementById("resend").className = "hidden";
    countDown4 = setInterval(function () {
        document.getElementById("wait_post_text").innerHTML += ".";
    }, 1000);

    //ajax发送到服务器
    jQuery.support.cors = true;
    var ajaxUpload = $.ajax({
        url: "https://559f0faa-50ee-4605-869c-eb432c954171.bspapp.com/http/upload", //请求的URL
        timeout: 4000, //超时时间设置，单位毫秒
        type: 'post', //请求方式，get或post
        data: JSON.stringify(dataObj), //请求所传参数，json格式
        // success:function(data){ //请求成功的回调函数
        //     alert(data);
        // },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'success') {//超时,status还有success,error等值的情况
                document.getElementById("wait_post_text").innerHTML = XMLHttpRequest.responseText;
                document.getElementById("resend").className = "hidden";
            }
            else if (status == 'timeout') {
                document.getElementById("wait_post_text").innerHTML = "数据发送超时，请点击按钮重新发送";
                document.getElementById("resend").className = "unset";
            }
            else {
                debugText.innerHTML = status+" request : "+XMLHttpRequest.responseText;
                document.getElementById("wait_post_text").innerHTML = "数据发送失败，请点击按钮重新发送";
                document.getElementById("resend").className = "unset";
            }
            clearInterval(countDown4);
            ajaxUpload.abort();
        }
    });

    // $.post("/php/upload.php", JSON.stringify(dataObj),
    //     function (data, status) {
    //         debugText.innerHTML = data;
    //         if (status == "success") {
    //             //发送成功
    //             document.getElementById("wait_post_text").innerHTML = "发送成功！";
    //             document.getElementById("resend").className = "hidden";
    //             exp_over_flag = true;
    //         } else {
    //             //发送失败
    //             document.getElementById("wait_post_text").innerHTML = "发送失败，请点击按钮重新发送";
    //             document.getElementById("resend").className = "unset";
    //         }
    //     });
}