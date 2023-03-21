toLocalString() - The toLocaleString() method returns a Date object as a string, using locale settings.

-> if you pass the the timezone in toUTCString() method parameter it will return the curren date and time of that country from that you can get the hours, minutes and seconds as well as years and many more.

FOR EXAMPLE:-
const xmas95 = new Date("December 25, 1995 23:15:30");
const weekday = xmas95.getDay();

console.log(weekday);

---> It will return 1
rather than number if you want to get the full name of the day you have to follow the below mentioned code for that.
---> const options = { weekday: "long" };
console.log(new Intl.DateTimeFormat("en-US", options).format(Xmas95));
// Monday

for example :-
const date1 = new Date('December 31, 1975, 23:15:30 GMT+11:00');
const date2 = new Date('December 31, 1975, 23:15:30 GMT-11:00');

// December
console.log(date1.getUTCMonth());
// Expected output: 11

// January
console.log(date2.getUTCMonth());
// Expected output: 0

full form of UTC:- Universal Time Coordinated

approach 2:- (get the time from timezone offsets)
moment().utcOffset("UTC+02:00").format("YYYY-MM-DD HH:mm");

-> apply the approach rather than moment package use Date Object.

Topic:- How to execute setInterval function without delay for the first time in JavaScript ?

----------------------------------------------------------------------------------------------
The setInterval() method always invokes the function after the delay for the first time using two approaches:

Method 1: Calling the function once before executing setInterval: The function can simply be invoked once before using the setInterval function. This will execute the function once immediately and then the setInterval() function can be set with the required callback.
A new function is created which encloses the invoking of the function first and then calls the setInterval() function next. This will help to simulate the setInterval() function without a delay for the first time.

-> https://www.geeksforgeeks.org/how-to-execute-setinterval-function-without-delay-for-the-first-time-in-javascript/

2nd way to immediately trigger setInterval
function gfg() {
    document.write("Hello! world"+ " for the animals.<br>");
    return setInterval(gfg, 3000);
}
// Function call
gfg();

3rd way - The simplest way is calling the gfg() first and then starting the setInterval’s cycle of execution.

function gfg() {
    document.write("Hello! world"+ " for the animals.<br>");
    return setInterval(gfg, 3000);
}
   
gfg();
setInterval(gfg, 3000);
