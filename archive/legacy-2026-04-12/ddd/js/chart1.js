try {
    //Sales chart

      var ctx = document.getElementById("sales-chart");
      if (ctx) {
        var t = [];
    var d = [];

    var request = new XMLHttpRequest();
    request.open('GET', './data/data.json', true);

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          var data = JSON.parse(this.responseText);
          // for (var i = 0; i < data.length; i++) {
          //   t.push(data[i]);
          //   d.push(data[i]);
          // }
          console.log(data);
          var dateObjects = Object.entries(data["heart_rate"]).map(function([key, value]) {
            return {time: new Date(key), temperature: value};
          });
          
          // Sort the Date objects
          dateObjects.sort(function(a, b) {
              return b.time - a.time;
          });
          var table = document.getElementById('heart-rate1');
          dateObjects.forEach(function(pair) {
            var formattedTime = formatDate(pair.time);
            console.log(formattedTime, pair.temperature);
            var newRow = table.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            cell1.innerHTML = formattedTime;
            cell2.innerHTML = pair.temperature;
            t.unshift(formattedTime);
            d.unshift(parseInt(pair.temperature));
          });
        }
      };
      d = [
        130,
        81,
        82,
        83,
        84,
        85,
        86,
        87
    ];
        ctx.height = 150;
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: t,
            type: 'line',
            defaultFontFamily: 'Poppins',
            datasets: [{
              label: "Foods",
              data: d,
              backgroundColor: 'transparent',
              borderColor: 'rgba(220,53,69,0.75)',
              borderWidth: 3,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBorderColor: 'transparent',
              pointBackgroundColor: 'rgba(220,53,69,0.75)',
            }]
          },
          options: {
            responsive: true,
            tooltips: {
              mode: 'index',
              titleFontSize: 12,
              titleFontColor: '#000',
              bodyFontColor: '#000',
              backgroundColor: '#fff',
              titleFontFamily: 'Poppins',
              bodyFontFamily: 'Poppins',
              cornerRadius: 3,
              intersect: false,
            },
            legend: {
              display: false,
              labels: {
                usePointStyle: true,
                fontFamily: 'Poppins',
              },
            },
            scales: {
              xAxes: [{
                display: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                scaleLabel: {
                  display: false,
                  labelString: 'Month'
                },
                ticks: {
                  fontFamily: "Poppins"
                }
              }],
              yAxes: [{
                display: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Value',
                  fontFamily: "Poppins"
  
                },
                ticks: {
                  fontFamily: "Poppins"
                }
              }]
            },
            title: {
              display: false,
              text: 'Normal Legend'
            }
          }
        });
      }
  
      request.send();


  } catch (error) {
    console.log(error);
  }



  function formatDate(date) {
    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1);
    var day = padZero(date.getDate());
    var hours = padZero(date.getHours());
    var minutes = padZero(date.getMinutes());
    var seconds = padZero(date.getSeconds());
    
    return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}