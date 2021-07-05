// var showBlocks = new Array();
// showBlocks[0] = "introduction";
// showBlocks[1] = "svo_desp";
// showBlocks[2] = "svo_test";
// showBlocks[3] = "experiment_back";
// showBlocks[4] = "experiment_desp";
// showBlocks[5] = "score_desp";
// showBlocks[6] = "practice_desp";
// showBlocks[7] = "practice_exp";
// showBlocks[8] = "matching";
// showBlocks[9] = "formal_exp";
// showBlocks[10] = "selection_form";
// showBlocks[11] = "animation";
// showBlocks[12] = "game_result";
// showBlocks[13] = "exp_over";

//点击事件
var checkClick = false;
var stopMainClick = false;
function clickMain() {
    if (!stopMainClick){
        if (!checkClick){
            nextShow();
        }
        
        checkClick = true;
        setTimeout(function() {  
            checkClick = false;  
        }, 500);
    }
}
function clickBtn(btnId) {
    if (!checkClick){
        if (btnId==1)
        {
            if (saveQuestionnaire()==-1){
                return;
            }
        }
        if (btnId==2)
        {
            saveSVO();
        }
        if (btnId==3)
        {
            if (saveExp()==-1){
                return;
            }
        }
        nextShow();
    }

    checkClick = true;
    setTimeout(function() {  
        checkClick = false;  
    }, 500);
}


// 页面控制
var show_cur = 0;
var move_cur = 0;
function nextShow() {
    switch (show_cur) {
        case 0:
            //初始
            //检查浏览器
            if(typeof(Storage)=="undefined")
            {
                document.write("抱歉! 您的浏览器不支持 web 存储，请更换浏览器重试。");
                return;
            }
            sessionStorage.clear();

            // for (var i = 0; i < showBlocks.length; i++) {
            //     document.getElementById(showBlocks[i]).className = "hidden";
            // }
            document.getElementById("introduction").className = "unset";

            show_cur = 1;
            move_cur = 0;
            stopMainClick = true;
            break;
        case 1:
            //0.介绍
            // for (var i = 0; i < showBlocks.length; i++) {
            //     document.getElementById(showBlocks[i]).className = "hidden";
            // }
            // document.getElementById("svo_desp").className = "unset";
            document.getElementById("introduction").className = "hidden";
            document.getElementById("svo_test").className = "unset";

            show_cur = 2;
            move_cur = 0;
            // stopMainClick = false;
            stopMainClick = true;
            break;
        case 2:
            //1.SVO测试
            document.getElementById("svo_test").className = "hidden";
            document.getElementById("experiment_back").className = "unset";

            show_cur = 3;
            move_cur = 0;

            //锁定屏幕倒计时10s
            stopMainClick = true;
            cd10 = 10;
            cdtext10 = document.getElementById("countdown10");
            cdtext10.innerHTML = cd10;;
            countDown10 = setInterval(function () {
                cd10 = cd10 - 1;
                cdtext10.innerHTML = cd10;
                if (cd10 <= 0 || show_cur != 3 || move_cur != 0) {
                    if (move_cur == 0 && show_cur == 3)
                        stopMainClick = false;
                    clearInterval(countDown10);
                    return;
                }
            }, 1000);
            break;
        case 3:
            //2.行为决策实验
            switch (move_cur) {
                case 0:
                    document.getElementById("experiment_back").className = "hidden";
                    document.getElementById("experiment_desp").className = "unset";

                    move_cur = 1;
                    stopMainClick = false;
                    break;
                case 1:
                    document.getElementById("experiment_desp").className = "hidden";
                    document.getElementById("score_desp").className = "unset";

                    move_cur = 2;
                    stopMainClick = false;
                    break;
                case 2:
                    document.getElementById("score_desp").className = "hidden";
                    document.getElementById("practice_desp").className = "unset";

                    show_cur = 4;
                    move_cur = 0;
                    stopMainClick = false;
                    break;
                default:
                    move_cur = 0;
            }
            break;
        case 4:
            //2-0.行为决策实验 练习
            switch (move_cur) {
                case 0:
                    document.getElementById("practice_desp").className = "hidden";
                    document.getElementById("practice_exp").className = "unset";
                    document.getElementById("selection_form").className = "unset";

                    setSystem();

                    move_cur = 1;
                    stopMainClick = true;
                    break;
                case 1:
                    document.getElementById("practice_exp").className = "hidden";
                    document.getElementById("selection_form").className = "hidden";
                    document.getElementById("animation").className = "unset";

                    //倒计时5s
                    cd5 = 5;
                    cdtext5 = document.getElementById("countdown5");
                    cdtext5.innerHTML = cd5;
                    countDown5 = setInterval(function() {
                        cd5 = cd5-1;
                        cdtext5.innerHTML = cd5;
                        if (cd5<=0 || move_cur!=2 || show_cur!=4){
                            if (move_cur==2 && show_cur==4){
                                nextShow();
                            }
                            clearInterval(countDown5); 
                        }
                    }, 1000);

                    move_cur = 2;
                    stopMainClick = false;
                    break;
                case 2:
                    document.getElementById("animation").className = "hidden";
                    document.getElementById("game_result").className = "unset";

                    move_cur = 3;
                    stopMainClick = false;
                    break;
                case 3:
                    document.getElementById("game_result").className = "hidden";
                    document.getElementById("matching").className = "unset";

                    //1~3s匹配时间
                    var partiTime = new Array();
                    partiTime[0] = 1+2*Math.random();
                    partiTime[1] = 1+2*Math.random();
                    partiTime[2] = 1+2*Math.random();
                    partiTime.sort(function(a,b){return a-b});
                    parti1 = setTimeout(function() {
                        document.getElementById("participant1").innerHTML = "参与者1";
                    }, partiTime[0]*1000);
                    parti2 = setTimeout(function() {
                        document.getElementById("participant2").innerHTML = "参与者2";
                    }, partiTime[1]*1000);
                    parti3 = setTimeout(function() {
                        document.getElementById("participant3").innerHTML = "参与者3";
                    }, partiTime[2]*1000);
                    check = setTimeout(function() {
                        if (show_cur==4)
                            nextShow();
                    }, (0.5+partiTime[2])*1000);

                    move_cur = 4;
                    stopMainClick = true;
                    break;
                case 4:
                    document.getElementById("matching").className = "hidden";
                    document.getElementById("formal_exp").className = "unset";
                    document.getElementById("selection_form").className = "unset";

                    show_cur = 5;
                    move_cur = 0;
                    stopMainClick = true;
                    setSystem();
                    break;
                default:
                    move_cur = 0;
            }
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            //2-1.行为决策实验 第一至十一组
            switch (move_cur) {
                case 0:
                    document.getElementById("formal_exp").className = "hidden";
                    document.getElementById("selection_form").className = "hidden";
                    document.getElementById("game_result").className = "unset";

                    move_cur = 1;
                    stopMainClick = false;
                    break;
                case 1:
                    document.getElementById("game_result").className = "hidden";
                    document.getElementById("formal_exp").className = "unset";
                    document.getElementById("selection_form").className = "unset";

                    show_cur++;
                    move_cur = 0;
                    stopMainClick = true;
                    setSystem();
                    if (show_cur==16) {
                        document.getElementById("exp_tip").innerHTML = "本页面系统不再自动做出决策，请您手动为系统编辑十轮开关空调的决策<br>完成决策后点击确定继续";
                    }
                    break;
                default:
                    move_cur = 0;
            }
            break;
        case 16:
            //2-1.行为决策实验 第十二组
            switch (move_cur) {
                case 0:
                    document.getElementById("formal_exp").className = "hidden";
                    document.getElementById("selection_form").className = "hidden";
                    document.getElementById("game_result").className = "unset";

                    move_cur = 1;
                    stopMainClick = false;
                    break;
                case 1:
                    document.getElementById("game_result").className = "hidden";
                    document.getElementById("exp_over").className = "unset";

                    //实验结束，发送数据
                    sendStorage();

                    show_cur++;
                    move_cur = 0;
                    stopMainClick = true;
                    break;
                default:
                    move_cur = 0;
            }
            break;
        default:
            show_cur = 0;
            move_cur = 0;
    }

    // 进度条控制
    if (show_cur - 1 >= 1) {
        dot = document.getElementById("dot" + (show_cur-1));
        dot.className = "dot past";
    }
    if (show_cur <= 16) {
        dot = document.getElementById("dot" + show_cur);
        dot.className = "dot current";
    }
}