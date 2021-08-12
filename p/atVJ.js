$(function () {
	console.log("Init Success!!");

	let date = new Date();
	let day = date.getDay();
	let hr = date.getHours();
	let min = date.getMinutes();

	let disHR = "";
	let ampmF = "am";

	function getTime() {
		date = new Date();
		day = date.getDay();
		hr = date.getHours();
		min = date.getMinutes();
		ampmF = hr > 12 ? "pm" : "am";
		disHR = hr > 12 ? hr - 12 : hr;
		disHR = (disHR < 10 ? "0" : "") + disHR;
		disMIN = (min < 10 ? "0" : "") + min;
	}

	getTime();
	setInterval(getTime(), 100);

	$("#hr").html(disHR);
	$("#min").html(disMIN + ampmF);
	console.log(day);

	let classList = [
		{
			t: 14,
			c: "pbn-vfya-quq",
			f: 1,
		},
		{
			t: 14,
			c: "pkw-ucwa-mqo",
			f: 1,
		},
		{
			t: 14,
			c: "ing-kzir-xyt",
			f: 1,
		},
		{
			t: 14,
			c: "wcz-xpua-eyg",
			f: 1,
		},
	];

	let findDay = classList.find((o) => o.d == day);

	let classStartTimeTotal = findDay.t;

	if (!findDay) {
		msg = "You don't have Hindi Class Today";
	} else {
		cd = findDay.c;
		tm = findDay.t;
	}
});
