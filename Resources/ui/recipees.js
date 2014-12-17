function recipees(argcookie, argtoken){
	var cookie = argcookie;
	var token = argtoken;

	var wd_recipees = Ti.UI.createWindow({
		fullscreen: true,
		backgroundColor: "#3ec2d6",
		layout: "horizontal",
		title: "Opskrifter"
	});
	wd_recipees.scrollView = Ti.UI.createScrollView({
		contentHeight: "100%", height: "80%",
		contentWidth: "100%", width:"80%",
		scrollType: 'vertical', left: '40dp',
		layout: 'horizontal', top: 0,
		backgroundColor: '#ffffff',
		top: "10%",
		borderRadius:"3"
	});
	
	function createRecipeLeft(title,image,calories,servings, distance,route){
			var vw_element = Ti.UI.createView({
				top: "10dp", left: "5%", bottom:"10dp",
				height: "100dp", width: "90%",
				layout: "horizontal",
				backgroundColor: "#e46600",
				borderRadius:"3"
			});
			
			var vw_picture = Ti.UI.createView({
				height: "100dp", width: "50%",
				backgroundImage: image
			});
			var vw_description = Ti.UI.createView({
				layout: "vertical",
				width:"50%",
				height: "100%",
				right: "0",
				//backgroundColor:"white"
			});
			var lbl_title = Ti.UI.createLabel({
				text: title,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '14sp'},
				color:"white"
			});
			var lbl_servings = Ti.UI.createLabel({
				text: servings,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '11sp'},
				color:"white"
			});
			var lbl_distance = Ti.UI.createLabel({
				text: distance,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '12sp'},
				color:"white"
			});
			var lbl_calories = Ti.UI.createLabel({
				text: calories,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '11sp'},
				color:"white"
			});
		
		
		vw_element.add(vw_picture);
		vw_element.add(vw_description);
		vw_description.add(lbl_title);
		vw_description.add(lbl_servings);
		vw_description.add(lbl_distance);
		vw_description.add(lbl_calories);
		//vw_element.add(lbl_calories);
		vw_element.addEventListener('click', function(e){
			var map = require('ui/map');
			var _map = map(title, route);
			_map.open();
		});
		return vw_element;
	}
	function createRecipeRight(title,image,calories,servings, distance, route){
				var vw_element = Ti.UI.createView({
				top: "10dp", left: "5%", bottom:"10dp",
				height: "100dp", width: "90%",
				layout: "horizontal",
				backgroundColor: "#e46600",
				borderRadius:"3"
			});
			
			var vw_picture = Ti.UI.createView({
				height: "100dp", width: "50%",
				backgroundImage: image
			});
			var vw_description = Ti.UI.createView({
				layout: "vertical",
				width:"50%",
				height: "100%",
				right: "0",
				//backgroundColor:"white"
			});
			var lbl_title = Ti.UI.createLabel({
				text: title,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '16sp'},
				color:"white"
			});
			var lbl_servings = Ti.UI.createLabel({
				text: servings,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '13sp'},
				color:"white"
			});
			var lbl_distance = Ti.UI.createLabel({
				text: distance,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '12sp'},
				color:"white"
			});
			var lbl_calories = Ti.UI.createLabel({
				text: calories,
				font: {fontFamily: 'OpenSans-Bold', fontSize: '13sp'},
				color:"white"
			});
		vw_description.add(lbl_title);
		vw_description.add(lbl_servings);
		vw_description.add(lbl_distance);
		vw_description.add(lbl_calories);
		vw_element.add(vw_description);
		vw_element.add(vw_picture);
		
		vw_element.addEventListener('click', function(e){
			var map = require('ui/map');
			var _map = map(title,route);
			_map.open();
		});
		return vw_element;
	}
	function getdata(){
		var url_recipees = "www.dhqt88.mmd.eal.dk/app/api/recipees.json";
		var recipees;
		var xhr = Ti.Network.createHTTPClient({
			onload: function(e){
				recipees = JSON.parse(this.responseText);
				for (var i = 0; i < recipees.length; i++) {
					if (i % 2 == 0) {
						wd_recipees.scrollView.add(createRecipeLeft(recipees[i].node_title, recipees[i].field_recipe_image, recipees[i].field_recipe_calories, recipees[i].field_recipe_servings, recipees[i].field_recipe_distance , recipees[i].field_recipe_route));
					} else {
						wd_recipees.scrollView.add(createRecipeRight(recipees[i].node_title, recipees[i].field_recipe_image, recipees[i].field_recipe_calories, recipees[i].field_recipe_servings, recipees[i].field_recipe_distance ,recipees[i].field_recipe_route));
					};
					
				}
			},
			onerror: function(e){
				console.log(this.responseText["error"]);
			}
		});
		xhr.clearCookies(url_recipees);
		xhr.setRequestHeader('X-CSRF-Token', token);
		xhr.setRequestHeader('Cookie', cookie);
		xhr.open('GET', url_recipees);
		xhr.send();
	};
	getdata();
	wd_recipees.add(wd_recipees.scrollView);
	return wd_recipees;
};
module.exports = recipees;