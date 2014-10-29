var day, hour, min, sec
function displayTime(){
	day = new Date();
	hour = day.getHours();
	min = day.getMinutes();
	sec = day.getSeconds();

	if (hour <= 9) hour = '0' + hour;
	if (min <= 9) min = '0' + min;
	if (sec <= 9) sec = '0' + sec;

	color = '#' + hour + min + sec;

	document.body.style.backgroundColor = color;

	document.getElementById("hex").innerHTML = color

	setTimeout(displayTime,1000);

}

displayTime();