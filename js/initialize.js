const debugFlag = true;

//系统决策表
var systemDecisionMap = genSysDeciMap();

function genSysDeciMap(){
    let sysDeciMap = [];
    let sysDeciSet = [];
    let systemCoopNum = [];
    //前11轮决策
    for (let i = 0; i < 11; i++) {
        systemCoopNum.push(i);
    }
    systemCoopNum = shuffle(systemCoopNum);
    for (let i = 0; i < 11; i++) {
        sysDeciSet = [];
        for (let j = 0; j < 10; j++) {
            if (j<systemCoopNum[i])
                sysDeciSet.push(1);
            else
                sysDeciSet.push(0);
        }
        sysDeciSet = shuffle(sysDeciSet);
        sysDeciMap.push(sysDeciSet);
    }
    //第12轮决策
    sysDeciSet = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
    sysDeciMap.push(sysDeciSet);
    
    // //65轮决策
    // for (let M = 1; M <= 10; M++) {
    //     for (let N = 0; N <= M; N++) {
    //         sysDeciSet = [];
    //         for (let i = 1; i <= M; i++) {
    //             if (i<=N)
    //                 sysDeciSet.push(1);
    //             else
    //                 sysDeciSet.push(0);
    //         }
    //         sysDeciSet = shuffle(sysDeciSet);
    //         sysDeciMap.push(sysDeciSet);
    //     }
    // }
    // sysDeciMap = shuffle(sysDeciMap);
    return sysDeciMap;
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

// 页面控制
const stageList = genStageList();
function genStageList() {
    let stageList = [
        {
            tipText: "0. 介绍",
            moveList: [
                "intro"
            ]
        },
        {
            tipText: "1. SVO测试",
            moveList: [
                "svo-test"
            ]
        },
        {
            tipText: "2. 行为决策实验",
            moveList: [
                "exp-back",
                "exp-desp",
                "score-desp",
                "under-test"
            ]
        },
        {
            tipText: "2-0. 行为决策实验 练习",
            moveList: [
                "prac-desp",
                "prac-exp",
                "game-result",
                "branch",
                "matching"
            ]
        }
    ];
    for (let i=1;i<=systemDecisionMap.length;i++) {
        stageList.push({
            tipText: "2-"+i+". 行为决策实验 第"+NoToChinese(i)+"组",
            moveList: [
                "formal-exp",
                "waiting",
                "game-result"
            ]
        });
    }
    stageList.push({
        tipText: "",
        moveList: [
            "exp-over"
        ]
    });
    return stageList;
}

// 问卷职业表
const occupationList = [
    "在校学生",
    "政府/机关干部/公务员",
    "企业管理者（包括基层及中高层管理者）",
    "普通职员（办公室/写字楼工作人员）",
    "专业人员（如医生/律师/文体/记者/老师等）",
    "普通工人（如工厂工人/体力劳动者等）",
    "商业服务业职工（如销售人员/商店职员/服务员等）",
    "个体经营者/承包商",
    "自由职业者",
    "农林牧渔劳动者",
    "退休",
    "暂无职业"
]

// 数据收集对象
const dataCollect = genDataCollect();
function genDataCollect() {
    let dataCollect = {
        alipay: undefined,
        age: undefined,
        occupation: undefined,
        SVO: undefined
    };
    for (let set = 1; set <= 12; set++) {
        if (set!=12){
            for (let round = 1; round <= 10; round++) {
                dataCollect["system_" + set + "-" + round] = undefined;
            }
        }
        for (let round = 1; round <= 10; round++) {
            dataCollect["user_" + set + "-" + round] = undefined;
        }
        for (let round = 1; round <= 10; round++) {
            dataCollect["other1_" + set + "-" + round] = undefined;
        }
        for (let round = 1; round <= 10; round++) {
            dataCollect["other2_" + set + "-" + round] = undefined;
        }
        for (let round = 1; round <= 10; round++) {
            dataCollect["other3_" + set + "-" + round] = undefined;
        }
        dataCollect["coop_rate_" + set] = undefined;
        dataCollect["decision_time_" + set] = undefined;
        dataCollect["score_" + set] = undefined;
    }

    dataCollect["total_score"] = undefined;
    dataCollect["finish_time"] = undefined;
    
    return dataCollect;
}
function setDataCollect(key,value){
    if (dataCollect.hasOwnProperty(key)){
        dataCollect[key] = value;
    }
}
dataCollect.targetCollection = "dataCollect1";


const svoGains = [
    // self
    [85,85,85,85,85,85,85,85,85],
    [85,87,89,91,93,94,96,98,100],
    [50,54,59,63,68,72,76,81,85],
    [50,54,59,63,68,72,76,81,85],
    [100,94,88,81,75,69,63,56,50],
    [100,98,96,94,93,91,89,87,85],
    // other
    [85,76,68,59,50,41,33,24,15],
    [15,19,24,28,33,37,41,46,50],
    [100,98,96,94,93,91,89,87,85],
    [100,89,79,68,58,47,36,26,15],
    [50,56,63,69,75,81,88,94,100],
    [50,54,59,63,68,72,76,81,85]
];

//每组决策
systemDecision = [];
userDecision = [];
otherDecision1 = [];
otherDecision2 = [];
otherDecision3 = [];
userRoundScore = [];
// Debug
for (let i = 0; i < 10; i++) {
    systemDecision.push(Math.round(Math.random()));
    userDecision.push(Math.round(Math.random()));
    otherDecision1.push(Math.round(Math.random()));
    otherDecision2.push(Math.round(Math.random()));
    otherDecision3.push(Math.round(Math.random()));
    userRoundScore.push(Math.round(Math.random()));
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

// 匹配者号码
var partiNum = ['X','Y','Z'];

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
