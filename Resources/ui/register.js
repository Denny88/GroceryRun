function register(){
	var username, password, email;
	
	var wd_createUser = Ti.UI.createWindow({
		title: "Register",
		fullscreen: true,
		layout: "horizontal",
		backgroundColor: "#3ec2d6",
		navBar: true,
		navBarHidden: false
	});
	
	var vw_createUser = Ti.UI.createView({
		backgroundColor:"#ffffff",
		left: "10%",
		top: "15%",
		height: "70%",
		width: "80%",
		layout: "vertical",
		borderRadius:"3"
	});
	wd_createUser.add(vw_createUser);
	
	var vw_createUserTop = Ti.UI.createView({
		//backgroundColor:"#dff222",
		height: "75%",
		layout: "vertical"
	});
	vw_createUser.add(vw_createUserTop);
	
	var vw_createUserMid = Ti.UI.createView({
		//backgroundColor:"#ffddff",
		height: "50%",
		layout: "vertical"
	});

	var vw_createUserBot = Ti.UI.createView({
		//backgroundColor:"#ddffdd",
		height: "25%",
		layout: "vertical"
	});
	vw_createUser.add(vw_createUserBot);
	
	var txt_username = Ti.UI.createTextField({
		hintText: "Enter Username",
		color:"black",
		backgroundColor: "#dedede",
		color: "#3ec2d6",
		borderRadius:"3",
		width: "80%",
		top: "10%",
		left:"10%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_createUserTop.add(txt_username);
	
	var txt_email = Ti.UI.createTextField({
		hintText: "E-mail",
		backgroundColor: "#dedede",
		color: "#3ec2d6",
		borderRadius:"3",
		width: "80%",
		top: "5%",
		left:"10%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_createUserTop.add(txt_email);
	
	var txt_repeatEmail = Ti.UI.createTextField({
		hintText: "Repeat E-mail",
		backgroundColor: "#dedede",
		color: "#3ec2d6",
		borderRadius:"3",
		width: "80%",
		top: "5%",
		left:"10%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_createUserTop.add(txt_repeatEmail);
	
	var txt_password = Ti.UI.createTextField({
		hintText: "Password",
		backgroundColor: "#dedede",
		borderRadius:"3",
		color: "#3ec2d6",
		passwordMask: true,
		width: "80%",
		top: "5%",
		left:"10%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_createUserTop.add(txt_password);
	
	var txt_repeatPassword = Ti.UI.createTextField({
		hintText: "Repeat Password",
		backgroundColor: "#dedede",
		borderRadius:"3",
		color: "#3ec2d6",
		top: "5%",
		passwordMask: true,
		width: "80%",
		left:"10%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '18sp'}
	});
	vw_createUserTop.add(txt_repeatPassword);

	var btn_register = Ti.UI.createButton({
		title: "Register",
		borderRadius:"3",
		backgroundColor: "#e46600",
		left: "10%",
		top: "15%",
		width: "80%",
		font: {fontFamily: 'OpenSans-Bold', fontSize: '20sp'}
	});
	vw_createUserBot.add(btn_register);
	
btn_register.addEventListener("click", function(){
	username = txt_username.value;
	password = txt_password.value;
	var rp_pass = txt_repeatPassword.value;
	email = txt_email.value;
	var rp_email = txt_repeatEmail.value;
	if (password != rp_pass) {
			return alert("Passwords does not match");
		} else if (email != rp_email){
			return alert("Emails does not match");
		} else {
			createUser(username, password, email);
		};	
	});
	function createUser(username, password, email) {
	var json = JSON.stringify({
		"name": username,
		"pass": password,
		"mail": email,
		"status": "1",
		"roles": {
			"2": "authenticated user"
		}
	});
	var url = "http://dhqt88.mmd.eal.dk/app/api/user/register.json";
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e){
			console.log(this.responseText);
			console.log(this.statusText);
			if (xhr.statusText == "OK") {
				wd_createUser.close();
				alert("Account succefully registered!");
			}
		},
    	onerror: function(error){
    	alert(error["error"]);
    }
	});
	xhr.clearCookies(url);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.open("POST", url);
	xhr.send(json);
}
	return wd_createUser;
};
module.exports = register;