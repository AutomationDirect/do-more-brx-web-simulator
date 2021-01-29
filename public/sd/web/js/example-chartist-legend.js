function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
};

var tags = [];
var xmlhttp = new XMLHttpRequest();
var myUpdate, tagRequest = "";
var toggleV = 0;

function add() {
    if ( tags.length < 16 ) {
        var tagName = document.getElementById("inp").value;
        if ( tagName != "" && tags.indexOf(tagName) < 0 ) {
            tags.push({
                tag: tagName, 
                avg: 0, 
                min: null, 
                max: null,
                total: 0,
                count: 0
            });
            const colors =[
                "DarkRed", "Salmon", "Gold", "GoldenRod", "Black", "Green", "Blue", "RebeccaPurple", "LightPink",
                "SandyBrown", "PaleGoldenRod", "Grey","YellowGreen","CornflowerBlue","MediumPurple"
            ];
            tagRequest = "";
            tags.forEach(buildRest);
            var table = document.getElementById("tLegend");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            cell1.innerHTML = `
                <button type="button"
                    style="background-color:transparent;color:black;height:15px;border: none;text-align: center;" 
                    onclick="deleteR(` + tags.length + `)">
                    x
                </button>
            `;
            cell2.innerHTML = tagName;
            cell2.style.color = colors[tags.length - 1];
            cell2.style.fontWeight = 'bold';
            cell7.innerHTML =  `
                <form id= "interp-` + tagName + `" onchange="updateInterp(\'`+ tagName + `\')">
                    <input type="radio" name = "ans" > None
                    <input type="radio" name = "ans" checked> Simple 
                    <input type="radio" name = "ans" > Step 
                </form>
            `;
            //window.alert(JSON.stringify(trdData))
            //document.getElementById("id02").innerHTML= tagRequest.slice(1,tagRequest.length)
        }
    
    }
};
      
function updateInterp(seriesN) {
    var interp = document.getElementById("interp-" + seriesN.replaceAll('"',''));
    var option;	
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
                [seriesN]: {lineSmooth: Chartist.Interpolation.none({fillHoles: false})}
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
                [seriesN]: {lineSmooth: Chartist.Interpolation.simple({fillHoles: false})}
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
                [seriesN]: {lineSmooth: Chartist.Interpolation.step({fillHoles: false})}
            }
        }
        chart.update(trdData, option, true);
    }
}

function deleteR(row) {
    document.getElementById("tLegend").deleteRow(row);
    tags.splice(row - 1, 1);
    if ( xmlhttp.readyState != 4 ) {
        setTimeout(function() {
            trdData.series.splice(row - 1, 1);
        }, 2000);
    } else { 
        trdData.series.splice(row - 1, 1);
    }
    tagRequest = "";
    tags.forEach(buildRest);
}

function Start() {
    var btn = document.getElementById("trd");
    //btn.classList.toggle("fa-stop");
    if ( toggleV == 0 ) {
        //document.getElementById("id02").innerHTML = document.getElementById("refreshWs").value
        myUpdate = setInterval(update, document.getElementById("refreshWs").value);
        document.getElementById("playB").innerHTML="Stop";
        toggleV = 1;
    } else {
        clearInterval(myUpdate)
        document.getElementById("playB").innerHTML="Play"
        var series
        var ts = new Date()
        for ( series of trdData.series ) {    
            series.data.push({
                x: new Date(ts.getTime()), 
                y: null
            });
        }
        toggleV = 0;
    }
};

function update() {  
    xmlhttp.open("GET", "../../data/json?" + tagRequest.slice(1,tagRequest.length), true);
    xmlhttp.send();
};

function updateRefresh () {
    if ( toggleV == 1 ) {
        clearInterval(myUpdate);
        myUpdate = setInterval(update, document.getElementById("refreshWs").value);
    }
};
      
function buildRest(item) {
    tagRequest += "&" + item.tag + "=" + item.tag;
    var index = trdData.series.findIndex(function(tagArr) {
        return tagArr.name == item.tag
    });
    if ( index == -1 ) {
        trdData.series.push({
            name: item.tag,
            data: []
        });
    }
};
  
      
xmlhttp.onreadystatechange = function() {
    if ( this.readyState == 4 && this.status == 200 ) {
        //document.getElementById("id02").innerHTML= this.responseText;
        var values = JSON.parse(this.responseText);
        var keys = Object.keys(values);
        var ts = new Date();
        var x, idx = 0;
        var tbl = document.getElementById("tLegend");
                  
        for (x of keys) {
            trdData.series[idx].data.push({
                x: new Date(ts.getTime()), 
                y: values[x]
            });
            tags[idx].count = tags[idx].count + 1;
            tags[idx].total = tags[idx].total + values[x];
            tbl.rows[idx + 1].cells[2].innerHTML = values[x];
            tbl.rows[idx + 1].cells[3].innerHTML = ( tags[idx].total / tags[idx].count ).toFixed(4);
            if ( values[x] < tags[idx].min || tags[idx].count == 1) {
                tags[idx].min = values[x]
            }
            tbl.rows[idx + 1].cells[4].innerHTML = tags[idx].min;
            if ( values[x] > tags[idx].max || tags[idx].count == 1) {
                tags[idx].max = values[x];
            }
            tbl.rows[idx+1].cells[5].innerHTML=tags[idx].max;
            idx += 1;
        }
        chart.update(trdData);
    }
};

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
//trdData["series"].push('{"name":"series-2, "data": [{"x": new Date(msSinceEpoch -document.getElementById("timeWs").value), y: 123},{"x": new Date(msSinceEpoch), y:}')
var data = {
    name: 'series-1',
    data: [
        {
            x: new Date(msSinceEpoch -60000), 
            y: null
        },
        {
            x: new Date(msSinceEpoch), 
            y: null
        }
    ]
};
   
//trdData["series"].push(data)
var chart = new Chartist.Line('.ct-chart', trdData, {
    axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 6,
        labelInterpolationFnc: function(value) {
            return moment(value).format('MMM D yyyy hh:mm:ss');
        }
    },
    fullWidth: true,
    chartPadding: {
      right: 20
    }
}, responsiveOptions);

trdData = JSON.parse('{"series": []}');