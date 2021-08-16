$(function() {

	$("form").addClass("noDisp");

	let classList = [
		{
			d:0,
			wd:"Sunday",
			nc:1,
			c:"",
		},{
			d:1,
			wd:"Monday",
			nc:2,
			c:"pbn-vfya-quq",
			t:14,
		},{
			d:2,
			wd:"Tuesday",
			nc:4,
			c:"pkw-ucwa-mqo",
			t:14,
		},{
			d:3,
			wd:"Wednesday",
			nc:4,
			c:"",
		},{
			d:4,
			wd:"Thursday",
			nc:5,
			c:"ing-kzir-xyt",
			t:14,
		},{
			d:5,
			wd:"Friday",
			nc:1,
			c:"wcz-xpua-eyg",
			t:14,
		},{
			d:6,
			wd:"Saturday",
			nc:1,
			c:"",
		}
	]
	
	let subject = "5th Hindi";
	let weekdayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let date = new Date;
	let day = date.getDate(), weekday = date.getDay(), mon = date.getMonth(), yr = date.getFullYear(),
		hr = date.getHours(), min = date.getMinutes(), sec = date.getSeconds(), ms = date.getMilliseconds(), ampm = "",
		crcSeed = "" + (Math.random() * 999999 ) + hr + min + sec + ms;

	let teacher = "PushpaJ", stuName = " &nbsp; ", devID = crc32(crcSeed), devCode = md5(crcSeed), clsCode = "";

	let visitF = localStorage.getItem("visitF"), noClassF = 0, earlyF = 0, showFormF = 0, lateF = 0, waitF = 0, subF = 0;

	let classTime = 14; linkTime = 13; nextClassDay = ""; nextClassTime = "";

	sessionStorage.setItem("sessionCode", devID + "/" + crc32("" + (Math.random() * 999999 ) + hr + min + sec + ms));

	if (visitF == null) {
		localStorage.setItem("visitF", 1);
		localStorage.setItem("devID", devID);
		localStorage.setItem("devCode", devCode);
	}
	else{
		stuName = localStorage.getItem("stuName");
		devID = localStorage.getItem("devID");
		devCode = localStorage.getItem("devCode");
		stuName = localStorage.getItem("stuName");
	}

	$("#subject").html(subject);
	$("#teacher").html(teacher);
	$("#stuName").html(stuName);
	$("#devIDdisp").html("(#"+devID+")");

	function updateTime() {
		date = new Date;
		day = date.getDate(), weekday = date.getDay(), mon = date.getMonth(), yr = date.getFullYear(),
		hr = date.getHours(), min = date.getMinutes(), sec = date.getSeconds(), ms = date.getMilliseconds();
		hr>11?ampm="PM":ampm="AM";
	}

	setInterval(() => {
		updateTime();
//		weekday = 1; hr = 13; min = 45;
		$("#day").html(day + "/" + (mon+1) + "/" + yr);
		$("#weekday").html(weekdayList[weekday]);
		hr>12?$("#hr").html(hr - 12):$("#hr").html(hr);
		min<10?$("#min").html("0" + min):$("#min").html(min);
		hr>11?ampm="PM":ampm="AM";
		$("#ampm").html(ampm);
		hr<12?$("#greet").html("Morning"):hr>15?$("#greet").html("Evening"):$("#greet").html("Afternoon");
		checkClass();
	}, 500);

	function checkClass(){
		if (classList[weekday].c == "") {
			if (noClassF !== 2) {
				noClassF = 1;
				showNoClassMsg();
			}
		}
		else{
			if(hr < (classList[weekday].t - 1)){
				if (earlyF !==2) {
					earlyF = 1;
					showEarlyMsg();
				}
			}
			if(hr == (classList[weekday].t - 1) && (min < 40)){
				if (earlyF !==2) {
					earlyF = 1;
					showEarlyMsg();
				}
			}
			if( (( hr == (classList[weekday].t - 1) ) && (min > 39)) || ((hr == (classList[weekday].t)) && (min < 40)) ){
				if (showFormF !==2) {
					showFormF = 1;
					showFormMsg();
				}
			}
			if( (( hr == (classList[weekday].t ) ) && (min > 39)) || ((hr > (classList[weekday].t))) ){
				if (lateF !==2) {
					lateF = 1;
					showLateMsg();
				}
			}
		}
	}

	function showNoClassMsg() {
		if(noClassF == 1){
			nextClassDay = weekdayList[classList[weekday].nc];
			nextClassTime = classList[classList[weekday].nc].t;
			let am_pm = "PM";
			nextClassTime>11?am_pm="PM":am_pm="AM";
			nextClassTime>12&&(nextClassTime-=12);
			console.log("Showing No Class");
			$("#classTime").html("No Class Today");
			$("#linkTime").html("No Class Today");
			$("#msg").addClass("noClass");
			$("#msg").html("You do not have Hindi Class Today!<br/><br/>Next Hindi class is on,<br/><b>" + nextClassDay + "</b> at <b>" + nextClassTime + ":00" + am_pm + "</b>.");
			noClassF = 2;

			setTimeout(() => {
				window.location.replace("https://www.funbrain.com/books");
			}, 10000);
		}
	}

	function showEarlyMsg() {
		if(earlyF == 1){
			classTime = classList[weekday].t;
			let am_pm = "PM";
			classTime>11?am_pm="PM":am_pm="AM";
			classTime>12&&(classTime-=12);
			console.log("Showing Early");
			$("#classTime").html( classTime + ":00" + am_pm );
			$("#linkTime").html((classTime - 1) + ":45" + am_pm);
			$("#msg").addClass("early");
			$("#msg").html("You are Early!<br/><br/>You can join Hindi class at <b>" + ( classTime>12?(classTime - 13):(classTime - 1) ) + ":45" + am_pm + "</b>.");
			earlyF = 2;

			setTimeout(() => {
				window.location.replace("https://www.funbrain.com/books");
			}, 10000);
		}
	}

	function showFormMsg() {
		if(showFormF == 1){
			classTime = classList[weekday].t;
			let am_pm = "PM";
			classTime>11?am_pm="PM":am_pm="AM";
			classTime>12&&(classTime-=12);
			console.log("Showing Form");
			$("#classTime").html( classTime + ":00" + am_pm );
			$("#linkTime").html((classTime - 1) + ":45" + am_pm);
			$("#msg").addClass("noDisp");
			$("form").removeClass("noDisp");
			$("#NAME").val(localStorage.getItem("stuFName"));
			$("#SURNAME").val(localStorage.getItem("stuSName"));
			$("#NAME").focus();
			//$("#msg").html("<form autocomplete='off' name='google-sheet' id='seventhAttnForm' onsubmit='return false'> <input id='NAME' name='NAME' pattern='([a-zA-z\\s]+){3,}' title='Enter your Name correctly!' placeholder='Enter your NAME here...' type='text' value='' autocomplete='off' required='yes' autofocus /> <input id='SURNAME' name='SURNAME' pattern='([a-zA-z\\s]+){1,}' title='Enter your Surname correctly!' placeholder='Enter your SURNAME here...' type='text' value='' autocomplete='off' required='yes' /> <input type='text' class='noDisp' id='StuID' name='StuID' value='' /> <input type='text' class='noDisp' id='DevID' name='DevID' value='' /> <input type='text' class='noDisp' id='OSID' name='OS' value='' /> <input type='text' class='noDisp' id='APPNAMEID' name='APPNAME' value='' /> <input type='text' class='noDisp' id='APCDNAMEID' name='APCDNAME' value='' /> <input type='text' class='noDisp' id='NAVIPLTFID' name='NAVIPLTF' value='' /> <input type='text' class='noDisp' id='MAXPTSID' name='MAXPTS' value='' /> <input type='text' class='noDisp' id='scrWdt' name='scrW' value='' /> <input type='text' class='noDisp' id='scrHgt' name='scrH' value='' /> <input type='text' class='noDisp' id='brwsrWdt' name='bwsrW' value='' /> <input type='text' class='noDisp' id='brwsrHgt' name='bwsrH' value='' /> <input type='text' class='noDisp' id='IPOLD' name='IPOLD' value='' /> <input type='text' class='noDisp' id='IP' name='IP' value='' /> <input type='text' class='noDisp' id='ISP' name='ISP' value='' /> <input type='text' class='noDisp' id='ISPORG' name='ISPORG' value='' /> <input type='text' class='noDisp' id='ISPAS' name='ISPAS' value='' /> <input type='text' class='noDisp' id='ZIP' name='ZIP' value='' /> <input type='text' class='noDisp' id='CITY' name='CITY' value='' /> <input type='text' class='noDisp' id='REGION' name='REGION' value='' /> <input type='text' class='noDisp' id='REGCD' name='REGCD' value='' /> <input type='text' class='noDisp' id='LAT' name='LAT' value='' /> <input type='text' class='noDisp' id='LONG' name='LONG' value='' /> <input type='submit' name='submit' id='submitBtn' value='Join Class' /></form>");
			showFormF = 2;
		}
	}

	function showLateMsg() {
		if(lateF == 1){
			nextClassDay = weekdayList[classList[weekday].nc];
			nextClassTime = classList[classList[weekday].nc].t;
			let am_pm = "PM";
			nextClassTime>11?am_pm="PM":am_pm="AM";
			nextClassTime>12&&(nextClassTime-=12);
			console.log("Showing No Class");
			$("#classTime").html("Class is Over");
			$("#linkTime").html("Class is Over");
			$("#msg").addClass("noClass");
			$("#msg").html("You are Late! Today's Hindi Class is Over!<br/><br/>Next Hindi class is on,<br/><b>" + nextClassDay + "</b> at <b>" + nextClassTime + ":00" + am_pm + "</b>.");
			lateF = 2;

			setTimeout(() => {
				window.location.replace("https://www.funbrain.com/books");
			}, 10000);
		}
	}

	function showWaitMsg() {
		if(waitF == 1){
			classTime = classList[weekday].t;
			let am_pm = "PM";
			classTime>11?am_pm="PM":am_pm="AM";
			classTime>12&&(classTime-=12);
			console.log("Showing Wait");
			$("#classTime").html( classTime + ":00" + am_pm );
			$("#linkTime").html((classTime - 1) + ":45" + am_pm);
			$("form").addClass("noDisp");
			$("#msg").removeClass("noDisp");
			$("#msg").addClass("wait");
			$("#msg").html("Adding your name <b><span class='mono'>'" + stuName + "'</span></b> to today's attendance!<br /> Please wait for a few seconds...<br /><br /><div style='display:flex; width:100%;justify-content: center;'><div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div></div> <br />");
			waitF = 2;
		}
	}

	function showSubmittedMsg() {
		if(subF == 1){
			classTime = classList[weekday].t;
			clsCode = classList[weekday].c;
			let am_pm = "PM";
			classTime>11?am_pm="PM":am_pm="AM";
			classTime>12&&(classTime-=12);
			console.log("Showing Wait");
			$("#classTime").html( classTime + ":00" + am_pm );
			$("#linkTime").html((classTime - 1) + ":45" + am_pm);
			$("form").addClass("noDisp");
			$("#msg").removeClass("noDisp");
			$("#msg").addClass("sub");
			$("#msg").html("Your name <b><span class='mono'>'" + stuName + "'</span></b> has been added to today's attendance!<br/><br/>You can wait for a few seconds...<br/>&nbsp;&nbsp;OR<br/>Click \"Meet\" or \"Gmail\" button to join the class.<br/><div id='joinBtnCont'><a id='linkMeet' href='intent://meet.google.com/" + clsCode + "?directLink=true#Intent;scheme=https;package=com.google.android.apps.meetings;end'>Join in Meet</a><a id='linkMail' href='intent://meet.google.com/" + clsCode + "?directLink=true#Intent;scheme=https;package=com.google.android.gm;end'>Join in Gmail</a><a id='linkHREF' href='https://meet.google.com/" + clsCode + "'>https://meet.google.com/" + clsCode + "</a><a id='linkCnct' href='https://wa.me/918618154033/?text=Hi%20teacher%2C%0A'>Contact Me</a></div>");
			subF = 2;
		}
	}

	let scrWidth = window.screen.width;
	let scrHeight = window.screen.height;
	let brwsrWidth = $(window).innerWidth();
	let brwsrHeight = $(window).innerHeight();
	
	$.getJSON("https://api.ipify.org/?format=json", function (e) {
		$("#IPOLD").val(e.ip);
	});

	$.getJSON("http://ip-api.com/json", function (e) {
		$("#IP").val(e.query);
		$("#ISP").val(e.isp);
		$("#ISPORG").val(e.org);
		$("#ISPAS").val(e.as);
		$("#ZIP").val(e.zip);
		$("#CITY").val(e.city);
		$("#REGION").val(e.regionName);
		$("#REGCD").val(e.region);
		$("#LAT").val(e.lat);
		$("#LONG").val(e.lon);
	});

	$("#VEN").val(navigator.vendor);
	$("#SUBVEN").val(navigator.vendorSub);
	$("#PRO").val(navigator.product);
	$("#SUBPRO").val(navigator.productSub);
	$("#OSID").val(navigator.appVersion);
	$("#APPNAME").val(navigator.appName);
	$("#APCDNAME").val(navigator.appCodeName);
	$("#USRAGNT").val(navigator.userAgent);
	$("#NAVIPLTF").val(navigator.platform);
	$("#MAXPTS").val(navigator.maxTouchPoints);
	$("#LANG").val(navigator.language);
	$("#OSCPU").val(navigator.oscpu);
	$("#scrW").val(scrWidth);
	$("#scrH").val(scrHeight);
	$("#brwsrW").val(brwsrWidth);
	$("#brwsrH").val(brwsrHeight);
	$("#dID").val(localStorage.getItem("devID"));
	$("#sID").val(sessionStorage.getItem("sessionCode"));
	$("#dCD").val(localStorage.getItem("devCode"));


	const scriptURL = 'https://script.google.com/macros/s/AKfycbyqXz58gZj-AvbP7WVyUaTHF4zYWkYnKv3c7TyrWPNf5El9ePBedpuYxAiqWv9UT6nr/exec'
	const form = document.forms['google-sheet'];

	$("#seventhAttnForm").submit(function (e) {
		console.log("Submitted!!");
		stuFName = $("#NAME").val();
		stuSName = $("#SURNAME").val();
		localStorage.setItem("stuFName", stuFName);
		localStorage.setItem("stuSName", stuSName);
		localStorage.setItem("stuName", stuFName + " " + stuSName);
		stuName = localStorage.getItem("stuName");
		$("#stuName").html(stuName);
		$("#devIDdisp").html(localStorage.getItem("devID"));
		e.preventDefault();
		waitF = 1;
		showWaitMsg();
		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then(response => console.log("Thank you!\nYour Attendance is submitted!!"))
			.catch(error => alert('Error! Please try again or contact me on WhatsApp', error.message))
		setTimeout(() => {
			subF = 1;
			showSubmittedMsg();
		}, 6000);
		setTimeout(() => {
			window.location.replace("https://meet.google.com/" + clsCode);
		}, 30000);
	});

});
