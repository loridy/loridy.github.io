
// HEART RATE

// try {
//     var table = document.getElementById('heart-rate');
//     for (var i = 0; i < 5; i++) {
//         var newRow = table.insertRow();
//         var cell1 = newRow.insertCell(0);
//         var cell2 = newRow.insertCell(1);
//         cell1.innerHTML = "2024/07/06 12:00:00";
//         cell2.innerHTML = '73';
//     }


// } catch (error) {
//     console.log(error);
// }


// // TEMPERATURE

// try {
//     var table = document.getElementById('temperature');
//     var newRow = table.insertRow();
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     cell1.innerHTML = "2024/07/06 12:00:00";
//     cell2.innerHTML = '37.8\u00B0';

// } catch (error) {
//     console.log(error);
// }

// // LOCATIONS

// try {
//     var table = document.getElementById('locations');
//     var newRow = table.insertRow();
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     cell1.innerHTML = "2024/07/06 12:00:00";
//     cell2.innerHTML = '成都市xxx';

// } catch (error) {
//     console.log(error);
// }


// // blood

// try {
//     var table = document.getElementById('blood');
//     var newRow = table.insertRow();
//     var cell1 = newRow.insertCell(0);
//     var cell2 = newRow.insertCell(1);
//     cell1.innerHTML = "2024/07/06 12:00:00";
//     cell2.innerHTML = 'high heart rate';

// } catch (error) {
//     console.log(error);
// }



var request = new XMLHttpRequest();
request.open('GET', './data/data1.json', true);

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
    
            var heartRate_data = data['heart_rate'];
            var temperature_data = data.temperature;
            var locations_data = data.locations;
            var blood_data = data.blood;
            var w_data = data.w;
            var t_data = data.t;
    
            // Convert the strings to Date objects
            var dateObjects = Object.entries(heartRate_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('heart-rate');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });

            var dateObjects = Object.entries(t_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('temperature');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });

            var dateObjects = Object.entries(w_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('weight');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });
            
    
    
            var dateObjects = Object.entries(temperature_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('body_temperature');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });
    
            var dateObjects = Object.entries(locations_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('locations');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });
    
            var dateObjects = Object.entries(blood_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('blood');
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
            });
        }
    };

    request.send();


var latest = "2024/07/25 8:10:20";


setTimeout(function(){
    var request = new XMLHttpRequest();
    request.open('GET', './data/data.json', true);

    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
    
            var heartRate_data = data['heart_rate'];
            var temperature_data = data.temperature;
            var locations_data = data.locations;
            var blood_data = data.blood;
            var w_data = data.w;
            var t_data = data.t;
    

            var dateObjects = Object.entries(t_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('temperature');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
            });

            var dateObjects = Object.entries(w_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('weight');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
            });
            // Convert the strings to Date objects
            var dateObjects = Object.entries(heartRate_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('heart-rate');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
                setTimeout(function() {
                    newRow.classList.add('fade-in');
                  }, 1000);
            });
    
    
            var dateObjects = Object.entries(temperature_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('body_temperature');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
            });
    
            var dateObjects = Object.entries(locations_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('locations');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                console.log(formattedTime, pair.temperature);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
            });
    
            var dateObjects = Object.entries(blood_data).map(function([key, value]) {
                return {time: new Date(key), temperature: value};
            });
            
            // Sort the Date objects
            dateObjects.sort(function(a, b) {
                return b.time - a.time;
            });
    
            var latestPairs = dateObjects.slice(0, 5);
            var table = document.getElementById('blood');
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
            latestPairs.forEach(function(pair) {
                var formattedTime = formatDate(pair.time);
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                cell1.innerHTML = formattedTime;
                cell2.innerHTML = pair.temperature;
                if (pair.time > new Date(latest)) {
                    cell1.style.color = "red";
                    cell2.style.color = "red";
                    cell1.style.fontWeight = "bold";
                    cell2.style.fontWeight = "bold";
                }
            });
        }
    };

    request.send();
    setTimeout(function(){
        var request = new XMLHttpRequest();
        var latest = "2024/07/25 8:20:20";
        request.open('GET', './data/data2.json', true);

        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var data = JSON.parse(this.responseText);
        
                var heartRate_data = data['heart_rate'];
                var temperature_data = data.temperature;
                var locations_data = data.locations;
                var blood_data = data.blood;
                var w_data = data.w;
                var t_data = data.t;
        
                var dateObjects = Object.entries(t_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('temperature');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    console.log(formattedTime, pair.temperature);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                });
    
                var dateObjects = Object.entries(w_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('weight');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    console.log(formattedTime, pair.temperature);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                });
                // Convert the strings to Date objects
                var dateObjects = Object.entries(heartRate_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('heart-rate');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    console.log(formattedTime, pair.temperature);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                    setTimeout(function() {
                        newRow.classList.add('fade-in');
                    }, 1000);
                });
        
        
                var dateObjects = Object.entries(temperature_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('body_temperature');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    console.log(formattedTime, pair.temperature);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                });
        
                var dateObjects = Object.entries(locations_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('locations');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    console.log(formattedTime, pair.temperature);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                });
        
                var dateObjects = Object.entries(blood_data).map(function([key, value]) {
                    return {time: new Date(key), temperature: value};
                });
                
                // Sort the Date objects
                dateObjects.sort(function(a, b) {
                    return b.time - a.time;
                });
        
                var latestPairs = dateObjects.slice(0, 5);
                var table = document.getElementById('blood');
                while (table.rows.length > 0) {
                    table.deleteRow(0);
                }
                latestPairs.forEach(function(pair) {
                    var formattedTime = formatDate(pair.time);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = pair.temperature;
                    if (pair.time > new Date(latest)) {
                        cell1.style.color = "red";
                        cell2.style.color = "red";
                        cell1.style.fontWeight = "bold";
                        cell2.style.fontWeight = "bold";
                    }
                });
            }
        };
        request.send();
    }, 10000)
}, 10000)



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


var myElement = document.getElementById('show-heart-rate');

// Add an event listener to listen for a specific event
myElement.addEventListener('click', function(event) {
  // Handle the event here
  console.log('Click event occurred!');
  console.log('Event details:', event);
});
