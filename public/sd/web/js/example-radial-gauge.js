function myFunction() {
    var x = document.getElementById("myTopnav");
    if ( x.className === "topnav" ) {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

setInterval(function() {
    updateChart()
}, 2000);

var xmlhttp = new XMLHttpRequest();

var gauge1 = new RadialGauge({
    renderTo: 'chartContainer',
    width: 300,
    height: 300,
    minValue: 0,
    maxValue: 100,
    majorTicks: [
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 80,
            "to": 100,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
});

gauge1.draw();

var gauge2 = new RadialGauge({
    renderTo: 'chartContainer1',
    width: 300,
    height: 300,
    title: "Temperature",
    minValue: -100,
    maxValue: 100,
    majorTicks: [-100,-75,-50,-25,0,25,50,75,100],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": -50,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 50,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    ticksAngle: 225,
    startAngle: 67.5,
    colorMajorTicks: "#ddd",
    colorMinorTicks: "#ddd",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#222",
    borderShadowWidth: 0,
    borders: true,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    colorBorderOuter: "#333",
    colorBorderOuterEnd: "#111",
    colorBorderMiddle: "#222",
    colorBorderMiddleEnd: "#111",
    colorBorderInner: "#111",
    colorBorderInnerEnd: "#333",
    colorNeedleShadowDown: "#333",
    colorNeedleCircleOuter: "#333",
    colorNeedleCircleOuterEnd: "#111",
    colorNeedleCircleInner: "#111",
    colorNeedleCircleInnerEnd: "#222",
    valueBoxBorderRadius: 0,
    colorValueBoxRect: "#222",
    colorValueBoxRectEnd: "#333"
});

gauge2.draw();

var gauge3 = new RadialGauge({
    renderTo: 'chartContainer2',
    width: 300,
    height: 300
});

gauge3.draw();

var gauge4 = new RadialGauge({
    renderTo: 'chartContainer3',
    width: 300,
    height: 300,
    startAngle: 0,
    ticksAngle: 180,
    valueBox: false,
    majorTicks: [0,10,20,30,40,50,60,70,80,90,100],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 70,
            "to": 100,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    animationTarget: "plate"
});

gauge4.draw();

var url = "../../data/json?damon=$main";
updateChart()

function updateChart() {
    xmlhttp.open("GET", "../../data/json?Linear=R200&Cosine=R201&Random=R202&SineRandom=R203", true);
    xmlhttp.send();
};

xmlhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
        document.getElementById("id01").innerHTML = this.responseText;
        var values = JSON.parse(this.responseText);
        //var man = document.getElementById('g1')
        //var myArr = JSON.parse(this.responseText);
        //myFunction(myArr);
        gauge1.update({value: values.Linear});
        gauge2.update({value: values.Cosine});
        gauge3.update({value: values.Random});
        gauge4.update({value: values.SineRandom});
    }
};