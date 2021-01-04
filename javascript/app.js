'use strict';
var tableContainer = document.getElementById('cookie-branches');
var hours = [`6:00am`, `7:00am`, `8:00am`, `9:00am`, `10:00am`, `11:00am`, `12:00am`,
    `1:00pm`, `2:00pm`, `3:00pm`, `4:00pm`, `5:00pm`, `6:00pm`, `7:00pm`, `8:00pm`];

//BRANCHES DATA MODEL 
function Branch(location, min, max, avgCookie, customPerhour, cookiePerHour) {
    this.location = location;
    this.minCustomers = min;
    this.maxCustomers = max;
    this.avgCookie = avgCookie;
    this.customPerhour = customPerhour;
    this.cookiePerHour = cookiePerHour;
}
// prototype methods
Branch.prototype.randCustomerPerHour = function () {
    var avgCustomers = (this.maxCustomers + this.minCustomers) - this.minCustomers;
    return Math.floor(Math.random() * avgCustomers);
}

// created branches objects using the object model
var seattle = new Branch('Seattle', 23, 65, 6.3);
var tokyo = new Branch('Tokyo', 3, 24, 1.2);
var dubai = new Branch('Dubai', 11, 38, 3.7);
var paris = new Branch('Paris', 20, 38, 2.3);
var lima = new Branch('Lima', 2, 16, 4.6);

main()

function main() { // main function where all branches generated
    var branchArray = [seattle, tokyo, dubai, paris, lima];
    var totalBranch = branchArray.length;
    // create customer per hour for each branch
    for (var i = 0; i < totalBranch; i++) {
        branchArray[i].customPerhour = customPerhour(branchArray[i])
    }
    for (var i = 0; i < totalBranch; i++) {
        branchArray[i].cookiePerHour = cookiePerHour(branchArray[i]);
    }
    branch(branchArray)
}

function customPerhour(branch) { // generate array of expected customers each hour
    var averageCustomers = [];
    for (var i = 0; i < hours.length; i++) {
        averageCustomers.push(branch.randCustomerPerHour());
    }
    return averageCustomers;
}

function cookiePerHour(branch) { // generate array of expected cookie sold per hour
    var result = [];
    for (var i = 0; i < hours.length; i++) {
        result.push(Math.floor(branch.avgCookie) * branch.customPerhour[i]);
    }
    return result;
}

// Generate and inject table into HTML
function branch(branchArray) {
    var totalHours = hours.length; // total number of hours
    var th, td, tr;
    var table = document.createElement('table'); // create and inject table element
    tableContainer.append(table);

    var tableHeader = document.createElement('tr');   // create and inject table header
    table.append(tableHeader)
    th = document.createElement('th');
    th.textContent = '';
    tableHeader.append(th);
    for (var i = 0; i < totalHours; i++) {
        th = document.createElement('th');
        th.textContent = hours[i];
        tableHeader.append(th);
    }

    for (var row = 0; row < branchArray.length; row++) { // create table row for each branch
        tr = document.createElement('tr');
        table.append(tr)
        td = document.createElement('td');
        td.textContent = branchArray[row].location;
        tr.append(td);
        for (var i = 0; i < totalHours; i++) {  // create row data
            td = document.createElement('td');
            td.textContent = branchArray[row].cookiePerHour[i];
            tr.append(td);
        }
    }

    var tableFooter = document.createElement('tr');    // create and inject table footer
    table.append(tableFooter)
    th = document.createElement('th');
    th.textContent = 'Total :';
    tableFooter.append(th);
    for (var i = 0; i < totalHours; i++) {
        th = document.createElement('th');
        th.textContent = ' ';
        tableFooter.append(th);
    }

}