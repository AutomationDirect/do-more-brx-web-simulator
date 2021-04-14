const LiveTrend = Vue.component('LiveTrend', {
    data: () => {
        return {
            tags: [],
            trdData: {
                series: []
            },
            colors: [
                "DarkRed", "Salmon", "Gold", "GoldenRod", "Black", "Green", "Blue", "RebeccaPurple", "LightPink",
                "SandyBrown", "PaleGoldenRod", "Grey","YellowGreen","CornflowerBlue","MediumPurple"
            ],
            userEnteredTag: "",
            tagsTableData: [],
            graphActive: false,
            refreshRate: 1000,
            chart: null
        }
    },
    computed: {
        tagRequest: function() {
            let url = "/data/json?";
            let firstTag = true;
            for ( tag of this.tags ) {
                if ( !firstTag ) {
                    url += "&";
                }
                url += tag.tag + "=" + tag.tag;
                firstTag = false;
            }
            return url;
        }
    },
    methods: {
        addTag: function() {
            if ( this.tags.length < 16 ) {
                if ( this.userEnteredTag != "" && this.tags.indexOf(this.userEnteredTag) < 0 ) {
                    this.tags.push({
                        tag: this.userEnteredTag, 
                        avg: 0, 
                        min: null, 
                        max: null,
                        total: 0,
                        count: 0,
                        interp: "Simple"
                    });
                }
            }
        },
        updateInterp: function(i) {
            var option;	
            if ( this.tags[i].interp === "None" ) {
                option = {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 6,
                        labelInterpolationFnc: function(value) {
                            return moment(value).format('MMM D yyyy hh:mm:ss');
                        }
                    },
                    series: {
                        [this.tags[i].tag]: {lineSmooth: Chartist.Interpolation.none({fillHoles: false})}
                    }
                }
                chart.update(trdData, option, true);
            } else if ( this.tags[i].interp === "Simple" ) {
                option = {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 6,
                        labelInterpolationFnc: function(value) {
                            return moment(value).format('MMM D yyyy hh:mm:ss');
                        }
                    },
                    series: {
                        [this.tags[i].tag]: {lineSmooth: Chartist.Interpolation.simple({fillHoles: false})}
                    }
                }
                chart.update(trdData, option, true);	
            } else if ( this.tags[i].interp === "Step" ) {
                option = {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 6,
                        labelInterpolationFnc: function(value) {
                            return moment(value).format('MMM D yyyy hh:mm:ss');
                        }
                    },
                    series: {
                        [this.tags[i].tag]: {lineSmooth: Chartist.Interpolation.step({fillHoles: false})}
                    }
                }
                chart.update(trdData, option, true);
            }
        },
        deleteRow: function(i) {
            this.tags.splice(i, 1);
        },
        startGraph: function() {
            this.graphActive = true;
            var btn = document.getElementById("trd");
            //document.getElementById("id02").innerHTML = document.getElementById("refreshWs").value
            myUpdate = setInterval(this.update, this.refreshRate);
        },
        stopGraph: function() {
            clearInterval(myUpdate);
            this.graphActive = false;
        },
        updatedTrdData: function() {
            let trdData = {
                series: []
            };
            for ( tag of this.tags ) {
                trdData.series.push({
                    name: tag.tag,
                    data: [
                        {
                            x: new Date(),
                            y: null
                        }
                    ]
                });
            }
            return trdData;
        },
        update: function() {
            console.log(this.tagRequest)
            $.get(this.tagRequest)
                .done(response => {
                    this.error = false;
                    console.log("response")
                    console.log(response)
                    const keys = Object.keys(response);
                    const ts = new Date();
                    console.log('keys')
                    console.log(keys)
                    let i = 0;
                    for (x of keys) {
                        this.trdData.series[i].data.push({
                            x: new Date(ts.getTime()), 
                            y: response[x]
                        });
                        this.tags[i].count = this.tags[i].count + 1;
                        this.tags[i].total = this.tags[i].total + response[x];
                        if ( response[x] < this.tags[i].min || this.tags[i].count == 1) {
                            this.tags[i].min = response[x]
                        }
                        if ( response[x] > this.tags[i].max || this.tags[i].count == 1) {
                            this.tags[i].max = response[x];
                        }
                        i++;
                    }
                    console.log(this.trdData)
                    this.chart.update(this.trdData);
                })
                .fail( err => {
                    console.log(err);
                    this.error = true;
                })
        }
    },
    watch: {
        tags: function() {
            this.trdData = this.updatedTrdData();
        }
    },
    template: `
        <div class="main-container">
            <div class="row" id="id01"> 
                <div class="col-sm-4">
                    <label>Enter Tag:  </label>
                    <input type="text"
                        v-model="userEnteredTag"
                        class="input-default" /> 
                    <button type="button" @click="addTag()" class="btn btn-primary btn-sm">Add</button>
                </div>
                <div class="col-sm-4">
                    <label for="refreshWs">Select Refresh Rate:</label>
                    <select v-model="refreshRate">
                        <option value="1000">1 Second</option>
                        <option value="5000">5 Seconds</option>
                        <option value="10000">10 Seconds</option>
                        <option value="30000">30 Seconds</option>
                        <option value="60000">1 Minute</option>
                    </select>
                    <template v-if="!graphActive">
                        <button type="button" @click="startGraph()" class="btn btn-success btn-sm">
                            Play
                        </button>	
                    </template>
                    <template v-else>
                        <button type="button" @click="stopGraph()" class="btn btn-warning btn-sm">
                            Stop
                        </button>	
                    </template>
                </div>
            </div>

            <div class="row" id="id02"></div>

            <div class="row"> 
                <div class="ct-chart ct-major-tenth"></div>
            </div>
            <div class="row"> 
                <table id="tLegend">
                    <tr>
                        <th width=21px></th>
                        <th width=250px>Element</th>
                        <th width=120px>Current Value</th>
                        <th>Avg</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th width=250px>Interpolation</th>
                    </tr>
                    <template v-for="(tag, i) in tags">
                        <tr>
                            <td>
                                <button type="button"
                                    class="delete-btn btn-danger btn btn-sm"
                                    @click="deleteRow(i)">
                                    x
                                </button>
                            </td>
                            <td :style="{color: colors[i]}">{{ tag.tag }}</td>
                            <td></td>
                            <td>{{ tag.avg }}</td>
                            <td>{{ tag.min }}</td>
                            <td>{{ tag.max }}</td>
                            <td>
                                <form @change="updateInterp(i)">
                                    <input type="radio" value="None" v-model="tags[i].interp"> None
                                    <input type="radio" value="Simple" v-model="tags[i].interp"> Simple 
                                    <input type="radio" value="Step" v-model="tags[i].interp"> Step 
                                </form>
                            </td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    `,
    mounted: function() {
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
        this.trdData = JSON.parse('{"series": []}')
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
        this.chart = new Chartist.Line('.ct-chart', this.trdData, {
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
        
        this.trdData = JSON.parse('{"series": []}');
    }
});