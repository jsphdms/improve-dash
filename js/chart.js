var rawDates = ["2013-04-01", "2013-05-01", "2013-06-01", "2013-07-01",
    "2013-08-01", "2013-09-01", "2013-10-01", "2013-11-01", "2013-12-01",
    "2014-01-01", "2014-02-01", "2014-03-01", "2014-04-01", "2014-05-01",
    "2014-06-01", "2014-07-01", "2014-08-01", "2014-09-01", "2014-10-01",
    "2014-11-01", "2014-12-01", "2015-01-01", "2015-02-01", "2015-03-01",
    "2015-04-01", "2015-05-01", "2015-06-01", "2015-07-01", "2015-08-01",
    "2015-09-01", "2015-10-01", "2015-11-01", "2015-12-01", "2016-01-01",
    "2016-02-01", "2016-03-01", "2016-04-01", "2016-05-01", "2016-06-01",
    "2016-07-01", "2016-08-01", "2016-09-01", "2016-10-01", "2016-11-01",
    "2016-12-01", "2017-01-01", "2017-02-01", "2017-03-01", "2017-04-01",
    "2017-05-01"
]
var smallMultiplesContainer = document.getElementById(
    'divSmallMultiplesContainer');
var smallMultiples = smallMultiplesContainer.getElementsByClassName(
    'small-mult');
var i = 0
var topic = "a"
var targetn = 2

var target = [];
for (var j = 1; j <= rawDates.length; j++) {
    target.push(targetn);
}

// Flag for target
for (board in rawValues) {
    boardB = rawValues[board].b.runchart.values;
    boardA = rawValues[board].a.runchart.values;
    arrB = [];
    arrA = [];

    for (var ii = 0; ii < boardB.length; ii++) {
        arrB[ii] = boardB[ii] < targetn ? 'NA' : boardB[ii];
        arrA[ii] = boardA[ii] < targetn ? 'NA' : boardA[ii];
    }

    rawValues[board].b.runchart['target'] = arrB
    rawValues[board].a.runchart['target'] = arrA

}

// Small multiples ------------------------------------------------------------
function SmallMultiple(cnvsID, showXTicks, showYTicks, board) {
    this.js_chart = new Chart(cnvsID, {
        type: 'line',
        data: {
            labels: rawDates,
            datasets: [{
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,1)',
                pointRadius: 2.2,
                pointStyle: 'circle',
                data: rawValues[board].a.runchart.target,
                borderWidth: 2,
                borderColor: 'rgba(0,0,0,0)'
            }, {
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,0.4)',
                pointRadius: 0,
                pointStyle: 'circle',
                data: rawValues[board].a.runchart.values,
                borderWidth: 2.2,
                borderColor: 'rgba(0,0,0,0.5)'
            }]
        },
        options: {
            title: {
                display: true,
                text: rawValues[board].fullname[0],
                fontSize: 14
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        suggestedMin: -10,
                        suggestedMax: 10,
                        display: showYTicks
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: showXTicks
                    },
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YY'
                        }
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            animation: {}
        }
    })

}

// Run chart ------------------------------------------------------------------
function RunChart(cnvsID, board) {

    this.board = "Scot";

    this.js_chart = new Chart(cnvsID, {
        type: 'line',
        data: {
            labels: rawDates,
            datasets: [{
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,1)',
                pointBorderColor: 'rgba(0,0,0,1)',
                pointRadius: 2.5,
                data: rawValues[this.board].a.runchart.shift,
                borderWidth: 3,
                borderColor: 'rgba(0,0,0,0)',
            }, {
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,0.8)',
                pointRadius: 0,
                data: rawValues[this.board].a.runchart.values,
                borderWidth: 4,
                borderColor: 'rgba(43,156,188,0.7)'
            }, {
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,1)',
                pointRadius: 0,
                data: rawValues[this.board].a.runchart.base_small,
                borderWidth: 3,
                borderColor: 'rgba(0,0,0,1)'
            }, {
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,1)',
                pointRadius: 0,
                data: rawValues[this.board].a.runchart.base,
                borderWidth: 3,
                borderColor: 'rgba(0,0,0,0.3)'
            }, {
                tension: 0,
                fill: false,
                pointBackgroundColor: 'rgba(0,0,0,1)',
                pointRadius: 0,
                data: target,
                borderWidth: 3,
                borderColor: 'rgba(0,0,0,0.3)',
                borderDash: [10, 10]
            }, ]
        },
        options: {
            title: {
                display: true,
                text: rawValues[this.board].fullname[0],
                fontSize: 28
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        suggestedMin: -10,
                        suggestedMax: 10
                    },
                    gridLines: {
                        display: false
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'quarter',
                        displayFormats: {
                            quarter: 'MMM-YY'
                        }
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            animation: {}
        }
    })

    this.findCoord = function(dataset, point) {

        dataset = this.js_chart.chart.config.data.datasets[dataset]
        meta_variable = Object.keys(dataset._meta)[0]

        xCoord = dataset._meta[meta_variable].data[point]._model.x;
        yCoord = dataset._meta[meta_variable].data[point]._model.y;

        return([xCoord, yCoord])

    }

    this.chartDims = function() {
        height = this.js_chart.chart.canvas.attributes.getNamedItem('height').value;
        width = this.js_chart.chart.canvas.attributes.getNamedItem('width').value;
        return({height: height, width: width})
    }

    this.flagMedianChanges = function() {

        base = rawValues[this.board][topic].runchart.base
        arr = []

        // Index of first non-NA value in base
        for (var i = 0; i < base.length; i++) {
            if (base[i] != 'NA') {
                arr = [i];
                break;
            }
        }

        for (var i = arr[0] + 1; i < rawDates.length; i++) {
            if (base[i - 1] != base[i]) arr.push(i);
        }
        return arr;
    }

    this.addMedianLabels = function() {
        // This function uses a 'meta variable' to access xy coordinates of 
        // data points. It probably refers to the number of charts drawn (i.e. 
        // the 15th chart will have meta variable 14).

        $("span").remove(".medianLabel");
        newMedians = this.flagMedianChanges()
        baseSmall = this.js_chart.chart.config.data.datasets[2]

        meta_variable = Object.keys(baseSmall._meta)[0]

        for (var i = 0; i < newMedians.length; i++) {
            var median = baseSmall.data[newMedians[i]];
            var mLeft = baseSmall._meta[meta_variable].data[newMedians[i]]._model.x;
            var mtop = baseSmall._meta[meta_variable].data[newMedians[i]]._model.y;

            median = Math.round(median * 10) / 10;
            mLeft += 25;
            mtop += 10;
            $("#divRunChart").prepend(
                "<span class = 'medianLabel' style = \"position: absolute; top: " +
                mtop + "px; left: " + mLeft + "px\" ><b>" + median + "</b></span>");
        }
    }

    this.addNarrativeLabels = function() {
        
        $("div").remove(".narrativeLabel");

        chartDims = this.chartDims();
        labels = rawValues[this.board][topic].labels;

        for (var i = 0; i < labels.length; i++) {
            
            index = labels[i].index
            top_pos = chartDims.height*index.y[0]
            left_pos = chartDims.width*index.x[0]
            text = labels[i].text[0]

            $("#divRunChart").prepend(
            '<div class = "narrativeLabel label label-default" style = \
            "position: absolute; top: ' + top_pos + 'px; left: '
            + left_pos + 'px">' + text + '</div>'
            );
        }       
    }

    this.update = function(board) {

        this.board = board;

        datasets = this.js_chart.config.data.datasets
        runchart = rawValues[board][topic].runchart

        datasets[0].data = runchart.shift;
        datasets[1].data = runchart.values;
        datasets[2].data = runchart.base_small;
        datasets[3].data = runchart.base;

        this.js_chart.config.options.title.text = rawValues[board].fullname[0];
        this.js_chart.update();
        this.addMedianLabels();
        this.addNarrativeLabels();

        $("div#divNarrative").text(rawValues[board][topic].narrative[0]);

    }

    this.addMedianLabels();
    this.addNarrativeLabels();
    $("div#divNarrative").text(rawValues[this.board][topic].narrative[0]);

}


// Canvas for each small multiple ---------------------------------------------
for (board in rawValues) {
    $(smallMultiples[i]).append('<canvas height="120" id="cnvsSmallMultiple' + board + '" width="200" style="cursor:pointer"></canvas>');
    ctx = document.getElementById("cnvsSmallMultiple" + board);
    eval("var smallMultipleChart" + board + "= new SmallMultiple(ctx, false, false, board)");
    i += 1;
}
$("#cnvsSmallMultipleScot").parent().addClass("selected");
var runChart = new RunChart(cnvsRunChart, "Scot");




// Click events ---------------------------------------------------------------
$("canvas").click(function() {
    _b_ = this.id.slice(17);

    c = document.getElementById("cnvsSmallMultiple" + _b_);
    var cs = document.getElementsByTagName("canvas")

    var ctx = c.getContext("2d");

    ctx.fillStyle = "rgba(1, 0, 0, 0.4)";
    $("canvas").parent().removeClass("selected")
    $("#cnvsSmallMultiple" + _b_).parent().addClass("selected");

    runChart.update(_b_);

});


$('.btn').on('click', function() {

    topic = $(this).context.control.name;
    runChart.update(runChart.board);

    for (board in rawValues) {
        eval("smallMultipleChart" + board + ".js_chart.config.data.datasets[0].data = rawValues[board][topic].runchart.target;");
        eval("smallMultipleChart" + board + ".js_chart.config.data.datasets[1].data = rawValues[board][topic].runchart.values;");
        eval("smallMultipleChart" + board + ".js_chart.update();")
    }
})
