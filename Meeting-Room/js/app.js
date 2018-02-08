"use strict";
var app = angular.module('myApp', ["ngRoute"]);
app.controller('MainController', ['$scope', function($scope) {
    
    $scope.time = function () {
        $('input.timepicker').timepicker({});
    }
    
    $scope.tooltip = function () {
        var tool = document.getElementById("tool-hide");
        if(tool.style.opacity === "")
        {
            tool.style.opacity = "1";
        }
        else if(tool.style.opacity === "0")
        {
            tool.style.opacity = "1";
        }
        else
        {
            tool.style.opacity = "0";
        }
    }
    
	$scope.list = [];
    $scope.meeting = {
		name: ""
	};
    

    
    $scope.addMeeting = function() {
        
        var validTitle = document.getElementById("title");
        var validStart = document.getElementById("start");
        var validEnd = document.getElementById("end");
        
        if(validTitle.value === "" || validStart.value === "" || validEnd.value === "")
        {
            if(validTitle.value === "")
            {
                validTitle.style.borderColor = "#FF0000";
            }
            else
            {
                validTitle.style.borderColor = "#EEE";
            }
            if(validStart.value === "")
            {
                if(validTitle.value !== "")
                {
                    validStart.style.borderTop = "1.25px solid"; 
                }
                else
                {
                    validStart.style.borderTop = "0px";
                }
                validStart.style.borderColor = "#FF0000";
            }
            else
            {
                validStart.style.borderTop = "0px";
                validStart.style.borderColor = "#EEE";
            }
            if(validEnd.value === "")
            {
                if(validStart.value !== "")
                {
                    validEnd.style.borderTop = "1.25px solid"; 
                }
                else
                {
                    validEnd.style.borderTop = "0px";
                }
                validEnd.style.borderBottom = "1.25px solid"; 
                validEnd.style.borderColor = "#FF0000";    
            }
            else
            {
                validEnd.style.borderTop = "0px";
                validEnd.style.borderBottom = "0px";
                validEnd.style.borderColor = "#EEE";
            }
        }
        
        else
        {
            validStart.style.borderTop = "0px";
            validEnd.style.borderTop = "0px";
            validEnd.style.borderBottom = "0px";
            validTitle.style.borderColor = "#EEE";
            validStart.style.borderColor = "#EEE";
            validEnd.style.borderColor = "#EEE";
            
            var start = document.getElementById('start').value;
            var end = document.getElementById('end').value;
            var curr = moment().format("LT");
            if(start[1] === ':')
            {
                var startHour = Number(start[0]);
                var startMin = Number(start[2] + start[3]);
                var startDiff = start[5] + start[6];
            }
            else
            {
                var startHour = Number(start[0] + start[1]);
                var startMin = Number(start[3] + start[4]);
                var startDiff = start[6] + start[7];
            }   
            if(end[1] === ':')
            {
                var endHour = Number(end[0]);
                var endMin = Number(end[2] + end[3]);
                var endDiff = end[5] + end[6];
            }
            else
            {
                var endHour = Number(end[0] + end[1]);
                var endMin = Number(end[3] + end[4]);
                var endDiff = end[6] + end[7];
            }        
            if(curr[1] === ':')
            {
                var currHour = Number(curr[0]);
                var currMin = Number(curr[2] + curr[3]);
                var currDiff = curr[5] + curr[6];
            }
            else
            {
                var currHour = Number(curr[0] + curr[1]);
                var currMin = Number(curr[3] + curr[4]);
                var currDiff = curr[6] + curr[7];
            }          
        
            if(startDiff === "PM" && startHour !== 12)
            {
                startHour = startHour + 12; 
            }
            if(endDiff === "PM" && endHour !== 12)
            {
                endHour = endHour + 12;
            }
            if(currDiff === "PM" && currHour !== 12)
            {
                currHour = currHour + 12;
            }     
        
            var timeStart = ((((startHour - currHour) * 60) * 60) + ((startMin - currMin) * 60)) * 1000;
            var timeEnd = ((((endHour - currHour) * 60) * 60) + ((endMin - currMin) * 60)) * 1000;
            var arr = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM"]
            var food;
            
            if(arr.includes(document.getElementById('end').value))
            {
                food = true;
            }
            else
            {
                food = false;
            }
            
            var meeting = {name: $scope.meeting.name, start: document.getElementById('start').value, end: document.getElementById('end').value, food: food};
            $scope.list.push(meeting);

            setTimeout(function() {
                var id = document.getElementById($scope.meeting.name);
                id.style.background = "#98FB98";
            }, timeStart)
            setTimeout(function() {
                var id = document.getElementById($scope.meeting.name);
                id.style.background = "#87CEFA";
            }, timeEnd)
            
            console.log($scope.list);
        }
    };
}]);
    
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "mainCtrl"
    })
    .when("/add", {
        templateUrl : "add.html",
        controller : "addCtrl"
        
    })
});

app.controller("mainCtrl", function ($scope, $timeout) {
    var main = document.getElementById("main");
    main.style.height = "145px"
    $timeout(function() {
        main.style.height = "0px"
    }, 0);
});

app.controller("addCtrl", function ($scope, $timeout) {
    var form = document.getElementById("form");
    $timeout(function() {
        form.style.height = "130px"
        form.style.opacity = "1"
    }, 0);
});
