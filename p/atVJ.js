$(function(){
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
		ampmF = (hr>12?'pm':'am');
		disHR = (hr>12?(hr-12):hr);
		disHR = (disHR<10?'0':'') + disHR;
		disMIN = (min<10?'0':'') + min;
	}

	getTime();
	setInterval(getTime(), 100);

	$("#hr").html(disHR);
	$("#min").html(disMIN+ampmF);
	console.log(day);

	let classList = [
		{
			t:14,
			c:"pbn-vfya-quq",
			d:1
		},{
			t:14,
			c:"pkw-ucwa-mqo",
			d:2
		},{
			t:14,
			c:"ing-kzir-xyt",
			d:4,
		},{
			t:14,
			c:"wcz-xpua-eyg",
			d:5,
		}
	]
/*

	let msg = "";
	let cd = "";
	let tm = "";

	function displayLateMSG() {
		
	}

	let findDay = classList.find(o => o.d == day);


	if(!findDay){
		msg = "You don't have Hindi Class Today";
	}
	else{
		cd = findDay.c;
		tm = findDay.t;
	}
	if( ( (hr == (tm - 1)) && (min>49) ) || ( (hr == tm) && (min<=40) ) ){
		displayJoinMSG();
	}
	else if ( ( (hr == (tm - 1)) && (min < 49) ) || (hr < (tm - 1)) ){
		displayEarlyMSG();
	}
	else if ( ( (hr == tm) && (min > 40) ) || (hr > tm) ){
		displayLateMSG();
	}

	const scriptURL = 'https://script.google.com/macros/s/AKfycbxX_5ul6yVffkcXd6KafDy-v59HWaTZcOrBzpWOFNVn4tD11MMNHrrLHnlMmhz1Ix7epw/exec'
	const form = document.forms['myenq'];

	form.addEventListener('submit', e => {
		e.preventDefault()
		$("#msg").html("Please Wait...");
		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then(response => alert("Data Submitted Successfully!!"))
			.catch(error => console.error('Error!', error.message))
	});*/
});
