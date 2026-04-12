const courseName = ["信号与系统", "通信网络", "工程职业技能英语", "啦啦操", "嵌入式处理器"];
const courses = {
    "信号与系统": [
        {"location": "立人楼B105", "weekday": "Mon", "noCourse": [1], "session": 3},
        {"location": "品学楼A409", "weekday": "Wed", "noCourse": [1], "session": 2}
    ], 
    "通信网络": [
        {"location": "品学楼A111", "weekday": "Tue", "noCourse": [1, 16, 17], "session": 2},
        {"location": "品学楼A305", "weekday": "Thur", "noCourse": [1, 16, 17], "session": 2}
    ], 
    "工程职业技能英语": [
        {"location": "品学楼A111", "weekday": "Tue", "noCourse": [12], "session": 3},
        {"location": "品学楼A111", "weekday": "Thur", "noCourse": [12], "session": 1}
    ], 
    "啦啦操": [
        {"location": "", "weekday": "Tue", "noCourse": [17], "session": 4}
    ], 
    "嵌入式处理器": [
        {"location": "品学楼A111", "weekday": "Thur", "noCourse": [1, 7, 11, 13, 16, 17], "session": 4}
    ]};

const semesterRange = [1, 17];
const firstDay = new Date("02/20/2023");
var currentDate = new Date();
// 02/27/2023
var week;
var difference = (currentDate.getTime() - firstDay.getTime())/(1000*3600*24);

if (difference < 0){
    week = 1;
} else{
    week = Math.floor(difference/7)+1
}


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


var currentMon = firstDay.addDays((week-1)*7);
var currentFri = currentMon.addDays(4);


