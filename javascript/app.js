'use strict';
var hours = [`6:00am`, `7:00am`, `8:00am`, `9:00am`, `10:00am`, `11:00am`, `12:00am`,
    `1:00pm`, `2:00pm`, `3:00pm`, `4:00pm`, `5:00pm`, `6:00pm`, `7:00pm`];

//BRANCHES DATA MODEL 
function Branch(location, min, max, avgCookie) {
    this.location = location;
    this.minCustomers = min;
    this.maxCustomers = max;
    this.avgCookie = avgCookie;
    this.customPerhour = customPerhour;
    this.cookiePerHour = cookiePerHour;
}

// prototype methods
Branch.prototype.randCustomerPerHour = function () {
    var avgCustomers = Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
    return Math.floor(avgCustomers);
}

// created branches objects using the object model
var seattle = new Branch('Seattle', 23, 65, 6.3);
var tokyo = new Branch('Tokyo', 3, 24, 1.2);
var dubai = new Branch('Dubai', 11, 38, 3.7);
var paris = new Branch('Paris', 20, 38, 2.3);
var lima = new Branch('Lima', 2, 16, 4.6);
var amman = new Branch('amman', 5, 15, 2.2)


// function declerations 
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


function tableHeader(table, totalHours) {   // generate table header
    var theader = document.createElement('tr');
    var th = document.createElement('th');

    table.append(theader)

    th.textContent = ' ';
    theader.append(th);

    for (var i = 0; i < totalHours; i++) { // add opened hours into table
        th = document.createElement('th');
        th.textContent = hours[i];
        theader.append(th);
    }

    th = document.createElement('th');
    th.textContent = `TOTAL`;
    theader.append(th);
}
function tableRow(table, totalHours, branch) {   // create a row for branch
    var total = 0;
    var tr = document.createElement('tr');
    var td = document.createElement('td');

    table.append(tr) // add branch to table

    td.textContent = branch.location;  // add branch name
    tr.append(td);

    for (var i = 0; i < totalHours; i++) {  // create row data
        td = document.createElement('td');
        td.textContent = branch.cookiePerHour[i];
        tr.append(td);
        total += branch.cookiePerHour[i];
    }
    td = document.createElement('td');
    td.textContent = total;
    tr.append(td);
}

function tableFooter(table, totalHours, branchArray) {
    var total = 0;
    var salesTotal = 0;
    var tFooter = document.createElement('tr');
    var th = document.createElement('th');

    table.append(tFooter); // append footer to table

    th.textContent = 'total'; // add total keyword for each hour
    tFooter.append(th);

    for (var i = 0; i < totalHours; i++) {    // generate total sales for each hour
        total = 0;
        for (var cell = 0; cell < branchArray.length; cell++) {
            total += branchArray[cell].cookiePerHour[i];
        }
        th = document.createElement('th');  // create total sales for all branches per day
        th.textContent = total;
        tFooter.append(th);
        salesTotal += total
    }

    th = document.createElement('th');
    th.textContent = salesTotal;
    tFooter.append(th);

}

// Generate and inject table into HTML
function branch(branchArray) {
    var totalHours = hours.length; // total number of hours branches opened
    var branchContainer = document.querySelector('#cookie-branches')

    var table = document.createElement('table'); // create and inject table element
    branchContainer.append(table)

    tableHeader(table, totalHours)   // generate header for table

    for (var row = 0; row < branchArray.length; row++) {   // add branches to table
        tableRow(table, totalHours, branchArray[row])
    }

    tableFooter(table, totalHours, branchArray) // generate footer
}

// main function  that execute code
function main() {
    var branchArray = [seattle, tokyo, dubai, paris, lima];
    var totalBranch = branchArray.length;
    for (var i = 0; i < totalBranch; i++) { // create customer per hour for each branch
        branchArray[i].customPerhour = customPerhour(branchArray[i]);
    }
    for (var i = 0; i < totalBranch; i++) { // create cookie per hour for each branch
        branchArray[i].cookiePerHour = cookiePerHour(branchArray[i]);
    }

    branch(branchArray)
}
main()
