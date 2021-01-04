'use strict';
var branches = document.getElementById('cookie-branches');
var hours = [`06:00 AM`, `07:00 AM`, `08:00 AM`, `09:00 AM`, `10:00 AM`, `11:00 AM`, `12:00 AM`,
    `01:00 PM`, `02:00 PM`, `03:00 PM`, `04:00 PM`, `05:00 PM`, `06:00 PM`, `07:00 PM`, `08:00 Pm`];


// created branches objects using the object model
var seattle = new Branch('Seattle', 23, 65, 6.3);
var tokyo = new Branch('Tokyo', 3, 24, 1.2);
var dubai = new Branch('Dubai', 11, 38, 3.7);
var paris = new Branch('Paris', 20, 38, 2.3);
var lima = new Branch('Lima', 2, 16, 4.6);

// main function where all branches generated
function main() {
    var branchArray = [seattle, tokyo, dubai, paris, lima];
    var totalBranch = branchArray.length;

    // loop through branches and calc numbers of cookiez needed then create branch list
    for (var i = 0; i < totalBranch; i++) {
        branchArray[i].customPerhour = cookiePerCustomer(branchArray[i]);
        branch(branchArray[i]);
    }
}
main();

//Create data model
function Branch(location, min, max, avgCookie) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.avgCookie = avgCookie;
    this.customPerhour = [];
    this.randCustomerPerHour = function () {
        var avgCustomers = (this.max + this.min) / 2;
        return Math.floor(Math.random() * avgCustomers);
    }
}

// average number of cookies purchased per customer.
function cookiePerCustomer(branch) {
    var average;
    var result = [];
    for (var i = 0; i < hours.length; i++) {
        average = branch.randCustomerPerHour();
        result.push(Math.floor(branch.avgCookie) * average);
    }
    return result;
}

// generate branch list
function branch(city) {
    // create branch container
    var branch = document.createElement('article');
    branch.setAttribute('id', city.location)
    branches.append(branch);

    // create heading for branch
    var title = document.createElement('h3');
    title.innerText = city.location;
    branch.append(title);

    // inject hours into html page
    var list = document.createElement('ul');
    branch.append(list);
    var listItem;
    for (var i = 0; i < city.customPerhour.length; i++) {
        listItem = document.createElement('li');
        listItem.innerText = `${hours[i]} : ${city.customPerhour[i]}  cookies`;
        list.append(listItem);
    }

    // create total number of cookiez item
    var sum = 0;
    for (var i = 0; i < city.customPerhour.length; i++) {
        sum += city.customPerhour[i];
    }
    listItem = document.createElement('li');
    listItem.innerText = `TOTAL : ${sum} cookies`;
    list.append(listItem);
}
