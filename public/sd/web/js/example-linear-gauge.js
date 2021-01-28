function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  setInterval(function(){updateChart()}, 2000);
  var xmlhttp = new XMLHttpRequest();
  var gauge1 = new LinearGauge({
      renderTo: 'chartContainer',
      width: 160,
      height: 600,
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
      minorTicks: 10,
      strokeTicks: true,
      highlights: [
          {
              "from": 90,
              "to": 100,
              "color": "rgba(200, 50, 50, .75)"
          }
      ],
      colorPlate: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 2,
      animationDuration: 1500,
      animationRule: "linear",
      tickSide: "left",
      numberSide: "left",
      needleSide: "left",
      barStrokeWidth: 7,
      barBeginCircle: false,
      colorValueBoxShadow: false
  });
  gauge1.draw();
  var gauge2 = new LinearGauge({
      renderTo: 'chartContainer1',
      width: 160,
      height: 600,
      borderRadius: 20,
      borders: 0,
      barStrokeWidth: 20,
      minorTicks: 10,
      minValue: -100,
      maxValue: 100,
      majorTicks: [-100,-75,-50,-25,0,25,50,75,100],
  minorTicks: 5,
      strokeTicks: true,
      ticksWidth: 15,
      ticksWidthMinor: 7.5,
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
      colorMajorTicks: "#ffe66a",
      colorMinorTicks: "#ffe66a",
      colorTitle: "#eee",
      colorUnits: "#ccc",
      colorNumbers: "#eee",
      colorPlate: "#2465c0",
      colorPlateEnd: "#327ac0",
      borderShadowWidth: 0,
      borders: false,
      borderRadius: 10,
      needleType: "arrow",
      needleWidth: 3,
      animationDuration: 1500,
      animationRule: "linear",
      colorNeedle: "#222",
      colorNeedleEnd: "",
      colorBarProgress: "#327ac0",
      colorBar: "#f5f5f5",
      barStroke: 0,
      barWidth: 8,
      barBeginCircle: false,
      colorValueBoxShadow: false
  });
  gauge2.draw();
  var gauge3 = new LinearGauge({
      renderTo: 'chartContainer2',
      width: 160,
      height: 600
  
  });
  gauge3.draw();
  var gauge4 = new LinearGauge({
      renderTo: 'chartContainer3',
      width: 160,
      height: 600,
      borderRadius: 20,
      borders: 0,
      barStrokeWidth: 20,
      minorTicks: 10,
      majorTicks: [0,10,20,30,40,50,60,70,80,90,100],
      value: 0.0,
      units: "",
      colorValueBoxShadow: false
  });
  gauge4.draw();
  
  var url = "../../data/json?damon=$main";
  updateChart()
  function updateChart() {
  
      xmlhttp.open("GET", "../../data/json?Linear=R200&Cosine=R201&Random=R202&SineRandom=R203", true);
  
      xmlhttp.send();
  
  
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("id01").innerHTML= this.responseText;
    var values = JSON.parse(this.responseText)
    //var man = document.getElementById('g1')
      //var myArr = JSON.parse(this.responseText);
      //myFunction(myArr);
      gauge1.update({value:values.Linear})
      gauge2.update({value:values.Cosine})
      gauge3.update({value:values.Random})
      gauge4.update({value:values.SineRandom})
    }
  };