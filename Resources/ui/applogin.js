function applogin(){
	var token;
	var cookie;
	var username;
	var password;
	
var wd_login = Ti.UI.createWindow({
		fullscreen: true,
		backgroundColor: "#3ec2d6",
		layout: "vertical",
		title: "Login"
	});
	var vw_loginTop = Ti.UI.createView({
		height:"50%",
		layout:"vertical"
		//backgroundColor:"#ffffff"
	});
	wd_login.add(vw_loginTop);
	
	var vw_loginBot = Ti.UI.createView({
		height:"50%",
		//backgroundColor:"#000000"
	});
	wd_login.add(vw_loginBot);
	
	var lbl_sloganTop = Ti.UI.createLabel({
		top:"30%",
		left:"5%",
		text: '"Run the',
		color: "white",
		font: {fontFamily: 'Lovelo Line Bold', fontSize: '50sp'}
	});
	vw_loginTop.add(lbl_sloganTop);
	
		var lbl_sloganBot = Ti.UI.createLabel({
		top:"0%",
		left:"25%",
		text: 'Course"',
		color: "white",
		font: {fontFamily: 'Lovelo Line Bold', fontSize: '60sp'}
	});
	vw_loginTop.add(lbl_sloganBot);
	
	var vw_login = Ti.UI.createView({
		backgroundColor:"#ffffff",
		left: "10%",
		top: "10%",
		height: "70%",
		width: "80%",
		layout: "vertical",
		borderRadius:"3"
	});
	vw_loginBot.add(vw_login);
	
	var vw_buttons = Ti.UI.createView({
		//backgroundColor:"#dff222",
		layout: "horizontal",
		height:"40%"

	});
	
	var vw_textfields = Ti.UI.createView({
		//backgroundColor:"#ffddff",
		layout: "vertical",
		height: "60%"
	});

	vw_login.add(vw_textfields);
	vw_login.add(vw_buttons);
	
	var txt_username = Ti.UI.createTextField({
		hintText: "Username",
		top: "20%",
		backgroundColor: "#dedede",
		color: "#3ec2d6",
		height: "30%", 
		width: "80%",
		left: "10%",
		borderRadius:"3",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_textfields.add(txt_username);
	
	var txt_password = Ti.UI.createTextField({
		hintText: "Password",
		backgroundColor: "#dedede",
		color: "#3ec2d6",
		height: "30%", 
		width: "80%",
		left: "10%",
		top: "20%",
		passwordMask: true,
		borderRadius:"3",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_textfields.add(txt_password);	
	
	var btn_login = Ti.UI.createButton({
		width: "37.5%",
		color: "white",
		backgroundColor: "#e46600",
		title: "Login",
		left: "10%",
		borderRadius:"3",
		height: "40%",
		top: "30%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '20sp'}
	});
	vw_buttons.add(btn_login);
	
	var btn_register = Ti.UI.createButton({
		title: "Register",
		color: "white",
		backgroundColor: "#e46600",
		left:"5%",
		width: "37.5%",
		borderRadius:"3",
		height: "40%",
		top: "30%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '20sp'}
	});
	vw_buttons.add(btn_register);
//-----------------------------------------[   Events   ]-------------------------------------------------------------------------
	
	btn_register.addEventListener("click", function(){
		var register = require("ui/register");
		var _register = register();
		_register.open();
	});
	
	btn_login.addEventListener("click", function(e){
		username = txt_username.value;
		password = txt_password.value;
		btn_login.hide();
		requestToken();
	});

//-----------------------------------------[   LOGICAL CODE   ]---------------------------------------------------------------------

function requestToken(){
	var getTokenUrl = "www.dhqt88.mmd.eal.dk/app/api/user/token.json";
	var xhr = Ti.Network.createHTTPClient({
		onload: function(a){
			token = JSON.parse(this.responseText).token;
			console.log("token " + token);
			console.log("responseText " + this.responseText);
			connect(token);
		},
		onerror: function(e){
			console.log(e["error"]);
		}
	});
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.open("POST", getTokenUrl);
	xhr.send();
};

function connect(arg) {
	var temp_token = arg;
	var url_connect = "www.dhqt88.mmd.eal.dk/app/api/system/connect.json";
	var xhr = Ti.Network.createHTTPClient({
		onload:function(a){
			var temp = JSON.parse(this.responseText);
			console.log("connect " + this.responseText);
			var temp_cookie = JSON.parse(this.responseText).session_name + "=" + JSON.parse(this.responseText).sessid;
			console.log("uid: "+temp.user["uid"]);
			if	(temp.user["uid"] > 1) {
				console.log(this.responseText);
				// this is pretty useless
			} else {
				console.log("calling log in");
				login(temp_cookie, temp_token);
			}
		},
		onerror:function(e){
			console.log(e["error"]);
		}
	});
	xhr.setRequestHeader('x-csrf-token', temp_token);
	xhr.open('POST', url_connect);
	xhr.send();
};

	function login(temp_cookie, temp_token){
		var url_login = "www.dhqt88.mmd.eal.dk/app/api/user/login.json";
		var user = JSON.stringify({"username": username, "password": password});
		
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				var resp = JSON.parse(this.responseText);
				cookie = resp.session_name + "=" + resp.sessid;
				token = resp.token;
				console.log(this.responseText); 
				var recipees = require('ui/recipees');
				var _recipees = recipees(cookie, token);
				_recipees.open();
				wd_login.close();
			},
			onerror: function(e){
				btn_login.show();
				alert(e["error"]);
			}
		});
		xhr.setRequestHeader('X-CSRF-Token',temp_token);
		xhr.setRequestHeader('Cookie', temp_cookie);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.open('POST', url_login);
		xhr.send(user);
	};
	wd_login.open();
};
module.exports = applogin;