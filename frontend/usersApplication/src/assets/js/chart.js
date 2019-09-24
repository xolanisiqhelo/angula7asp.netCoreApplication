function convertData(value) {
  var val = value;
  var suffix;
  for (var n = 0, formattedVal = val; formattedVal >= 1024; n++) {
    formattedVal /= 1024;
  }
  switch (n) {
    case 0:
      suffix = 'B';
      break;
    case 1:
      suffix = 'KB';
      break;
    case 2:
      suffix = 'MB';
      break;
    case 3:
      suffix = 'GB';
      break;
    default:
      // format to GB
      while (n > 3) {
        formattedVal *= 1024;
        n--;
      }
      suffix = 'GB';
  }
  // round to nearest decimal
  formattedVal = (Math.round(formattedVal * 10) / 10) + suffix;
  return formattedVal;
}

function createCustomHTMLContent(Used) {
  return convertData(Used) + '<br>Used';
}

 // Load the Visualization API and the corechart package.
//  google.charts.load('current', {
//    'packages': ['corechart', 'bar']
//  });

//  google.charts.load('visualization', '1');

 // Set a callback to run when the Google Visualization API is loaded.
//  google.charts.setOnLoadCallback(drawChart);

 // Callback that creates and populates a data table,
 // instantiates the pie chart, passes in the data and
 // draws it.
 function drawChart() {

   // Create the data table.
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Usage');
   data.addRows([
     ['Jan', 3],
     ['Feb', 1],
     ['Mar', 5],
     ['Apr', 2],
     ['May', 2],
     ['Jun', 4],
     ['Jul', 5],
     ['Aug', 1],
     ['Sep', 10],
     ['Oct', 2],
     ['Nov', 3],
     ['Dec', 4],
   ]);

   // Set chart options
   var options = {
     'legend': {
       position: 'none'
     },
     'width': '1200',
     'fontName': 'Roboto',
     'height': '300',
     vAxis: {
       gridlines: {
         count: 6,
         color: '#e7ebef'
       },
       'title': 'Total Amount spent (ZAR)',
       titleTextStyle: {
         fontSize: 14,
         italic: false,
         bold: true
       }
     },
     hAxis: {
       gridlines: {
         count: 6,

       },
       'title': 'Months',
       titleTextStyle: {
         fontSize: 14,
         italic: false,
         bold: true
       }
     },

     bar: {
       groupWidth: 20,
     },
     series: {
       0: {
         color: '#0083c2'
       }
     },

   };

   // Instantiate and draw our chart, passing in some options.
   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
   chart.draw(data, options);
   var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div_split'));
   chart2.draw(data, options);
 }

//  google.charts.setOnLoadCallback(drawMonthlyUsageChart);

 function drawMonthlyUsageChart() {

   var usageChartArea = document.getElementById('usageMonthlyChart_voice');

   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Month');
   data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
   data.addColumn('number', 'Used');
   data.addRows([
     ['Jan', createCustomHTMLContent(1887436800), 1887436800],
     ['Feb', createCustomHTMLContent(524288000), 524288000],
     ['Mar', createCustomHTMLContent(624288000), 624288000],
     ['Apr', createCustomHTMLContent(524288000), 524288000],
     ['May', createCustomHTMLContent(424288000), 424288000],
     ['Jun', createCustomHTMLContent(524288000), 524288000],
     ['Jul', createCustomHTMLContent(824288000), 824288000],
     ['Aug', createCustomHTMLContent(524288000), 524288000],
     ['Sep', createCustomHTMLContent(524288000), 524288000],
     ['Oct', createCustomHTMLContent(924288000), 924288000],
     ['Nov', createCustomHTMLContent(524288000), 524288000],
     ['Dec', createCustomHTMLContent(724288000), 724288000]
   ]);

   // custom format data values
   function convertDataToBytes(dataSet) {
    for (var i = 0; i < data.getNumberOfRows(); i++) {
      var val = data.getValue(i, dataSet);
      var suffix;
      for (var n = 0, formattedVal = val; formattedVal >= 1024; n++) {
        formattedVal /= 1024;
      }
      switch (n) {
        case 0:
          suffix = 'B';
          break;
        case 1:
          suffix = 'KB';
          break;
        case 2:
          suffix = 'MB';
          break;
        case 3:
          suffix = 'GB';
          break;
        default:
          // format to GB
          while (n > 3) {
            formattedVal *= 1024;
            n--;
          }
          suffix = 'GB';
      }
      // round to nearest decimal
      formattedVal = (Math.round(formattedVal * 10) / 10) + suffix;
      data.setFormattedValue(i, dataSet, formattedVal);
    }
   }

   convertDataToBytes(2);

   var usageChart = new google.visualization.ColumnChart(usageChartArea);

   var usageOptions = {
     width: '100%',
     chartArea: {
       width: '90%',
       left: 60
     },
     height: 300,
     fontName: 'Roboto',
     legend: {
       position: 'none'
     },
     series: {
       0: {
         color: '#0083c2'
       }
     },
     vAxis: {
       gridlines: {
         count: 5,
         color: '#f5f7f8'
       },
       textStyle: {
         fontSize: 11
       }
     },
     hAxis: {
       textStyle: {
         fontSize: 11
       }
     },
     bar: {
       groupWidth: '60%'
     },
     focusTarget: 'category',
     tooltip: {
       isHtml: true,
       ignoreBounds: true
     }
   };

   // get the axis values and reformat them
   var runOnce = google.visualization.events.addListener(usageChart, 'ready', function () {
     google.visualization.events.removeListener(runOnce);
     var bb, val, formattedVal, suffix, ticks = [], cli = usageChart.getChartLayoutInterface();
     for (var i = 0; bb = cli.getBoundingBox('vAxis#0#gridline#' + i); i++) {
       val = cli.getVAxisValue(bb.top);
       // sometimes, the axis value falls 1/2 way though the pixel height of the gridline,
       // so we need to add in 1/2 the height
       // this assumes that all axis values will be integers
       if (val != parseInt(val)) {
         val = cli.getVAxisValue(bb.top + bb.height / 2);
       }

       // convert from base-10 counting to 2^10 counting
       for (var n = 0; val >= 1000; n++) {
         val /= 1000;
       }
       formattedVal = val;
       val *= Math.pow(1024, n);

       switch (n) {
         case 0:
           suffix = 'B';
           break;
         case 1:
           suffix = 'KB';
           break;
         case 2:
           suffix = 'MB';
           break;
         case 3:
           suffix = 'GB';
           break;
         default:
           // format to GB
           while (n > 3) {
             formattedVal *= 1024;
             n--;
           }
           suffix = 'GB';
       }

       ticks.push({ v: val, f: Math.round(formattedVal) + suffix });
     }
     usageOptions.vAxis = usageOptions.vAxis || {};
     usageOptions.vAxis.ticks = ticks;
     usageChart.draw(data, usageOptions);
   });

   usageChart.draw(data, usageOptions);
 }

//  google.charts.setOnLoadCallback(drawDailyUsageChart);

 function drawDailyUsageChart() {
  var usageDailyChartArea = document.getElementById('usageDailyChart_voice');

  // Define the chart to be drawn.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Day');
  data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
  data.addColumn('number', 'Usage');
  data.addColumn({'type': 'string', 'role': 'style'});
  data.addRows([
    ['1', createCustomHTMLContent(1887436800), 1887436800, 'point { size: 3; fill-color: #01548a; }'],
    ['2', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['3', createCustomHTMLContent(624288000), 624288000, 'point { size: 3; fill-color: #01548a; }'],
    ['4', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['5', createCustomHTMLContent(424288000), 424288000, 'point { size: 3; fill-color: #01548a; }'],
    ['6', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['7', createCustomHTMLContent(824288000), 824288000, 'point { size: 3; fill-color: #01548a; }'],
    ['8', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['9', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['10', createCustomHTMLContent(924288000), 924288000, 'point { size: 3; fill-color: #01548a; }'],
    ['11', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['12', createCustomHTMLContent(724288000), 724288000, 'point { size: 3; fill-color: #01548a; }'],
    ['13', createCustomHTMLContent(1887436800), 1887436800, 'point { size: 3; fill-color: #01548a; }'],
    ['14', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['15', createCustomHTMLContent(624288000), 624288000, 'point { size: 3; fill-color: #01548a; }'],
    ['16', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['17', createCustomHTMLContent(424288000), 424288000, 'point { size: 3; fill-color: #01548a; }'],
    ['18', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['19', createCustomHTMLContent(824288000), 824288000, 'point { size: 3; fill-color: #01548a; }'],
    ['20', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['21', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['22', createCustomHTMLContent(924288000), 924288000, 'point { size: 3; fill-color: #01548a; }'],
    ['23', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['24', createCustomHTMLContent(724288000), 724288000, 'point { size: 3; fill-color: #01548a; }'],
    ['25', createCustomHTMLContent(1887436800), 1887436800, 'point { size: 3; fill-color: #01548a; }'],
    ['26', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['27', createCustomHTMLContent(624288000), 624288000, 'point { size: 3; fill-color: #01548a; }'],
    ['28', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['29', createCustomHTMLContent(424288000), 424288000, 'point { size: 3; fill-color: #01548a; }'],
    ['30', createCustomHTMLContent(524288000), 524288000, 'point { size: 3; fill-color: #01548a; }'],
    ['31', createCustomHTMLContent(824288000), 824288000, 'point { size: 3; fill-color: #01548a; }']
  ]);

  var usageDailyChart = new google.visualization.LineChart(usageDailyChartArea);

  // custom format data values
  function convertDataToBytes(dataSet) {
    for (var i = 0; i < data.getNumberOfRows(); i++) {
      var val = data.getValue(i, dataSet);
      var suffix;
      for (var n = 0, formattedVal = val; formattedVal >= 1024; n++) {
        formattedVal /= 1024;
      }
      switch (n) {
        case 0:
          suffix = 'B';
          break;
        case 1:
          suffix = 'KB';
          break;
        case 2:
          suffix = 'MB';
          break;
        case 3:
          suffix = 'GB';
          break;
        default:
          // format to GB
          while (n > 3) {
            formattedVal *= 1024;
            n--;
          }
          suffix = 'GB';
      }
      // round to nearest decimal
      formattedVal = (Math.round(formattedVal * 10) / 10) + suffix;
      data.setFormattedValue(i, dataSet, formattedVal);
    }
   }

  convertDataToBytes(2);
     
  // Set chart options
  var usageDailyOptions = {  
    pointsVisible: true,
    width: '100%',
    chartArea: {
      width: '90%',
      left: 60
    },
    height: 300,
    fontName: 'Roboto',
    legend: {
      position: 'none'
    },
    series: {
      0: {
        color: '#d7d7d7'
      }
    },
    vAxis: {
      gridlines: {
        count: 5,
        color: '#f5f7f8'
      },
      textStyle: {
        fontSize: 11
      }
    },
    hAxis: {
      textStyle: {
        fontSize: 11
      }
    },
    focusTarget: 'category',
    tooltip: {
      isHtml: true,
      ignoreBounds: true
    }
  };

  // get the axis values and reformat them
  var runOnce = google.visualization.events.addListener(usageDailyChart, 'ready', function () {
    google.visualization.events.removeListener(runOnce);
    var bb, val, formattedVal, suffix, ticks = [], cli = usageDailyChart.getChartLayoutInterface();
    for (var i = 0; bb = cli.getBoundingBox('vAxis#0#gridline#' + i); i++) {
      val = cli.getVAxisValue(bb.top);
      // sometimes, the axis value falls 1/2 way though the pixel height of the gridline,
      // so we need to add in 1/2 the height
      // this assumes that all axis values will be integers
      if (val != parseInt(val)) {
        val = cli.getVAxisValue(bb.top + bb.height / 2);
      }

      // convert from base-10 counting to 2^10 counting
      for (var n = 0; val >= 1000; n++) {
        val /= 1000;
      }
      formattedVal = val;
      val *= Math.pow(1024, n);

      switch (n) {
        case 0:
          suffix = 'B';
          break;
        case 1:
          suffix = 'KB';
          break;
        case 2:
          suffix = 'MB';
          break;
        case 3:
          suffix = 'GB';
          break;
        default:
          // format to GB
          while (n > 3) {
            formattedVal *= 1024;
            n--;
          }
          suffix = 'GB';
      }

      ticks.push({ v: val, f: Math.round(formattedVal) + suffix });
    }
    usageDailyOptions.vAxis = usageDailyOptions.vAxis || {};
    usageDailyOptions.vAxis.ticks = ticks;
    usageDailyChart.draw(data, usageDailyOptions);
  });

  usageDailyChart.draw(data, usageDailyOptions);
}

//  google.charts.setOnLoadCallback(drawVoiceChart);

 function drawVoiceChart() {
   var data = google.visualization.arrayToDataTable([
     ['Content', 'Size'],
     ['Remaining', 70],
     ['Used', 30]
   ]);

   var options = {
     width: '100%',
     height: '100%',
     title: "",
     pieHole: 0.88,
     pieSliceBorderColor: "none",
     colors: ['#71B55D', '#eaeaea'],
     chartArea: {
       width: '85%',
       height: '85%'
     },
     legend: {
       position: "none"
     },
     pieSliceText: "none",
     tooltip: {
       trigger: "none"
     },
     animation: {
       duration: 1000,
       startup: true
     }
   };

   var voiceChart = new google.visualization
     .PieChart(document.getElementById('voiceChart'));

   voiceChart.draw(data, options);
 }

//  google.charts.setOnLoadCallback(drawDataChart);

 function drawDataChart() {
   var data = google.visualization.arrayToDataTable([
     ['Content', 'Size'],
     ['Remaining', 40],
     ['Used', 60]
   ]);

   var options = {
     width: '100%',
     height: '100%',
     title: "",
     pieHole: 0.88,
     pieSliceBorderColor: "none",
     colors: ['#DC4405', '#eaeaea'],
     chartArea: {
       width: '85%',
       height: '85%'
     },
     legend: {
       position: "none"
     },
     pieSliceText: "none",
     tooltip: {
       trigger: "none"
     },
     animation: {
       duration: 1000,
       startup: true
     }
   };

   var dataChart = new google.visualization
     .PieChart(document.getElementById('dataChart'));

   dataChart.draw(data, options);
 }

//  google.charts.setOnLoadCallback(drawSMSChart);

 function drawSMSChart() {
   var data = google.visualization.arrayToDataTable([
     ['Content', 'Size'],
     ['Remaining', 20],
     ['Used', 80]
   ]);

   var options = {
     width: '100%',
     height: '100%',
     title: "",
     pieHole: 0.88,
     pieSliceBorderColor: "none",
     colors: ['#CB333B', '#eaeaea'],
     chartArea: {
       width: '85%',
       height: '85%'
     },
     legend: {
       position: "none"
     },
     pieSliceText: "none",
     tooltip: {
       trigger: "none"
     },
     animation: {
       duration: 1000,
       startup: true
     }
   };

   var smsChart = new google.visualization
     .PieChart(document.getElementById('smsChart'));

   smsChart.draw(data, options);
 }