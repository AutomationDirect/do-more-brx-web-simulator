function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

var tags = [];
var xmlhttp = new XMLHttpRequest();
var csvhttp = new XMLHttpRequest();
  
update();

function update() {
    xmlhttp.open("GET", "../../data/json?SDFileNames=SDFileNames0,25", true);
    xmlhttp.send();
};
      
function parseCSV() {
    var selValue = document.getElementById("logfiles").value;
    var Parent = document.getElementById("tLegend");
    var pBar = document.getElementById("brxBar");      
    pBar.innerHTML= "Downloading";
    while ( Parent.rows.length > 1 ) {
        Parent.deleteRow(-1);
    }
    trdData = JSON.parse('{"series": []}');
    if ( selValue.includes(".csv") ) {
        csvhttp.onprogress = updateProgress;
        csvhttp.open("GET", "../../sd/logs/" + selValue, true);
        csvhttp.send();
    }
};
  
csvhttp.onreadystatechange = function() {
    var pBar = document.getElementById("brxBar");
    if ( this.readyState == 4 && this.status == 200 ) {
        var lines=this.responseText.split("\n");
        var headers=lines[0].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        var tbl = document.getElementById("tLegend");
        var colors = [
            "DarkRed", "Salmon", "Gold", "GoldenRod", "Black", "Green", "Blue", "RebeccaPurple", "LightPink",
            "SandyBrown", "PaleGoldenRod", "Grey", "YellowGreen", "CornflowerBlue", "MediumPurple"
        ];
        tags = []; 
        pBar.innerHTML= "Loading";

        for ( var i=1; i < headers.length && i < 15; i++ ) {
            tags.push({
                tag: headers[i].replaceAll('"',''), 
                avg: 0, 
                min: null, 
                max: null,
                total: 0,
                count: 0,
                pos: i
            });
            var table = document.getElementById("tLegend");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            cell2.innerHTML = headers[i].replaceAll('"','');
            cell2.style.color = colors[i - 1];
            cell2.style.fontWeight = 'bold';
            cell7.innerHTML = '<form id= "interp-' + headers[i].replaceAll('"','')+ '" onchange="updateInterp(\''+ headers[i].replaceAll('"','') + '\')">  <input type="radio" name = "ans" > None <input type="radio" name = "ans" checked> Simple <input type="radio" name = "ans" > Step </form>';
            trdData.series.push({
                name: headers[i].replaceAll('"',''),
                data: []
            });
        }

        for ( var i=1; i < lines.length - 1; i++ ) {
            for (tag of tags) {
                lValues = lines[i].split(",");
                trdData.series[tag.pos-1].data.push({
                    x: Date.parse(lValues[0]), 
                    y: lValues[tag.pos]
                });
                tag.count = tag.count + 1;
                tag.total = tag.total + Number(lValues[tag.pos]);
                tbl.rows[tag.pos].cells[2].innerHTML = lValues[tag.pos];
                tbl.rows[tag.pos].cells[3].innerHTML = ( tag.total / tag.count ).toFixed(4);
                if ( Number(lValues[tag.pos]) < tag.min || tag.count == 1 ) {
                    tag.min = Number(lValues[tag.pos])
                }
                tbl.rows[tag.pos].cells[4].innerHTML = tag.min;
                if ( Number(lValues[tag.pos]) > tag.max  || tag.count == 1) {
                    tag.max =  Number(lValues[tag.pos]);
                }
                tbl.rows[tag.pos].cells[5].innerHTML=tag.max
            }
        }
        chart.update(trdData);
        pBar.style.width = 0 + "%";
        pBar.innerHTML= "";
    } 
    if ( this.readyState == 4 && this.status != 200 ) {          
        pBar.innerHTML= "Load Fail"
    }
};

function updateInterp(seriesN) {
    var interp = document.getElementById("interp-" + seriesN.replaceAll('"',''));
    var option;
    var obj;	
    if ( interp[0].checked == true ) {
        option = {
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 6,
                labelInterpolationFnc: function(value) {
                    return moment(value).format('MMM D yyyy hh:mm:ss');
                }
            },
            series: {
                [seriesN]: { lineSmooth: Chartist.Interpolation.none({fillHoles: false}) }
            }
        }
        chart.update(trdData, option, true);
    }
    if ( interp[1].checked == true ) {
        option = {
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 6,
                labelInterpolationFnc: function(value) {
                    return moment(value).format('MMM D yyyy hh:mm:ss');
                }
            },
            series: {
                [seriesN]: { lineSmooth: Chartist.Interpolation.simple({fillHoles: false}) }
            }
        }
        chart.update(trdData, option, true);	
    }
    if ( interp[2].checked == true ) {
        option = {
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 6,
                labelInterpolationFnc: function(value) {
                    return moment(value).format('MMM D yyyy hh:mm:ss');
                }
            },
            series: {
                [seriesN] :{ lineSmooth: Chartist.Interpolation.step({fillHoles: false}) }
            }
        }
        chart.update(trdData, option, true);
    }
}    
  
xmlhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
        //document.getElementById("id02").innerHTML= this.responseText;
        var values = JSON.parse(this.responseText);
        var x = document.getElementById("logfiles");
        var option = document.createElement("option");

        for ( filN of values.SDFileNames ) {
            if (filN != "" && filN.includes(".csv") ) {
                var option = document.createElement("option");
                option.text = filN;
                option.value = filN;
                x.add(option);
            }
        }
        //chart.update(trdData)
    }
};

function updateProgress(evt) {
    if (evt.lengthComputable)  {
        // evt.loaded the bytes the browser received
        // evt.total the total bytes set by the header
        // jQuery UI progress bar to show the progress on screen
        var percentComplete = (evt.loaded / evt.total) * 100;  
        var elem = document.getElementById("brxBar");
        elem.style.width = percentComplete + "%"
    } 
}

var n = new Date();
var responsiveOptions = [
    [
        'screen and (min-width:701px) and (max-width: 1900px)',
        { 
            axisX: {
                labelInterpolationFnc: function(value) {
                    // Will return Mon, Tue, Wed etc. on medium screens
                    return moment(value).format('MMM D yyyy hh:mm:ss');
                }
            }
        }
    ],
    [
        'screen and (max-width: 700px)', 
        {  
            showPoint: false,
            axisX: {
                labelInterpolationFnc: function(value) {
                    // Will return M, T, W etc. on small screens
                    return moment(value).format('mm:ss');
                }
            }
        }
    ]
];
  
var msSinceEpoch = n.getTime() 
var trdData = JSON.parse('{"series": []}')
  
//trdData["series"].push(data)
var chart = new Chartist.Line('.ct-chart', trdData, {
    axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 6,
        labelInterpolationFnc: function(value) {
            return moment(value).format('MMM D yyyy hh:mm:ss');
        }
    },
    axisY: {
      type: Chartist.AutoScaleAxis
    },
    plugins: [
      Chartist.plugins.zoom({ onZoom: onZoom })
    ],
    fullWidth: true,
    chartPadding: {
      right: 20
    }
}, responsiveOptions);
  
var resetFnc;

function onZoom(chart, reset) {
    resetFnc = reset;
}

var btn = document.getElementById("resetZ");
btn.id = 'reset-zoom-btn';
btn.innerHTML = 'Reset Zoom';
btn.style.float = 'right';
btn.addEventListener('click', function() {
    console.log(resetFnc);
    resetFnc && resetFnc();
});