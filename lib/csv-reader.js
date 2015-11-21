var fs = require("fs");
var csv = require("csv");

function convertDate(date){
    if(!date){ return ""; }
    else {
        return new Date(date.split("/").reverse().join("-"));
    }
}

function convertHours(input){
    if(typeof input === "string"){
        var hours = {
            times: []
        };

        // Check for special occasions
        ["Vacances", "Off"].forEach(function(special){
            var location = input.toUpperCase().indexOf(special.toUpperCase());
            if(location > -1){
                hours.special = special;
                hours.times = ["00:00","23:59"];
            }
        });
        if(hours.special){ return hours; }

        // Check for terminal
        ["T1", "T2A"].forEach(function(terminal){
            var location = input.indexOf(terminal);
            if(location > -1){
                hours.location = terminal;
                input = input.slice(0,location) + input.slice(location + terminal.length, input.length);
                input = input.split(" ").join("");
            }
        });

        // Parse Hours
        var times = input.split("-").forEach(function(time){
            hours.times.push(time);
        });

        return hours;
    }
}



module.exports = {
    read: function(fileName){
        var file = fs.readFileSync("./csv/test.csv");
        csv.parse(file, function(err, data){
            var days = [];
            for(var i = 0; i < data.length/6; i++){
                var rowIndex = i * 6;

                for(var j = 0; j < 7; j++){
                    if(data[rowIndex + 2]){ convertHours(data[rowIndex + 2][j]); }
                    var day = {
                        name: data[rowIndex][j],
                        date: (data[rowIndex + 1] ? convertDate(data[rowIndex + 1][j]) : ""),//new Date(data[rowIndex + 1])[j],
                        thuy: convertHours(data[rowIndex + 2] ? data[rowIndex + 2][j] : ""),
                        mj: convertHours(data[rowIndex + 3] ? data[rowIndex + 3][j] : ""),
                        yasmina: convertHours(data[rowIndex + 4] ? data[rowIndex + 4][j] : "")
                    };

                    days.push(day);    
                }

                
            }

            console.log(days);
        });
    }
};
