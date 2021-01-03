'use strict';
var branches = document.getElementById('cookie-branches');
var hours = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
//Create branches
var seattle = {
    location: 'Seattle',
    min: 23,
    max: 65,
    avgCookie: 6.3,
    hours: [],
    randCustomerPerHour: function () {
        var avgCustomer = Math.floor(Math.random() * ((this.max + this.min) / 2));
        return avgCustomer;
    }
}
var tokyo = {
    location: 'Tokyo',
    min: 3,
    max: 24,
    avgCookie: 1.2,
    hours: [],
    randCustomerPerHour: function () {
        var avgCustomer = Math.floor(Math.random() * ((this.max + this.min) / 2));
        return avgCustomer;
    }
}
var dubai = {
    location: 'Dubai',
    min: 11,
    max: 38,
    avgCookie: 3.7,
    hours: [],
    randCustomerPerHour: function () {
        var avgCustomer = Math.floor(Math.random() * ((this.max + this.min) / 2));
        return avgCustomer;
    }
}
var paris = {
    location: 'Paris',
    min: 20,
    max: 38,
    avgCookie: 2.3,
    hours: [],
    randCustomerPerHour: function () {
        var avgCustomer = Math.floor(Math.random() * ((this.max + this.min) / 2));
        return avgCustomer;
    }
}
var lima = {
    location: 'Lima',
    min: 2,
    max: 16,
    avgCookie: 4.6,
    hours: [],
    randCustomerPerHour: function () {
        var avgCustomer = Math.floor(Math.random() * ((this.max + this.min) / 2));
        return avgCustomer;
    }
}


main()

// main function where all branches generated
function main() {
    seattle.hours = cookiePerCustomer(seattle);
    branch(seattle);

    tokyo.hours = cookiePerCustomer(tokyo);
    branch(tokyo);

    dubai.hours = cookiePerCustomer(dubai);
    branch(dubai);

    paris.hours = cookiePerCustomer(paris);
    branch(paris);

    lima.hours = cookiePerCustomer(lima);
    branch(lima);
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

// generate branch report
function branch(city) {
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
    for (var i = 0; i < city.hours.length; i++) {
        listItem = document.createElement('li');
        listItem.innerText = 'Hour ' + hours[i] + ': ' + city.hours[i] + ' cookies';
        list.append(listItem);
    }

    // create total number of cookiez item
    var sum = 0;
    for (var i = 0; i < city.hours.length; i++) {
        sum += city.hours[i];
    }
    listItem = document.createElement('li');
    listItem.innerText = 'TOTAL :' + sum + ' cookies';
    list.append(listItem);
}
