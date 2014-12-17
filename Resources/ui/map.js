function map(title, arg_route){
	var recipe_title = title;
	var points = JSON.parse(arg_route);
	var GoogleMaps = require('ti.map');
	var annoArray= [];
	
	var rc = GoogleMaps.isGooglePlayServicesAvailable();	
	switch (rc) {
	 case GoogleMaps.SUCCESS:
	        Ti.API.info('Google Play services is installed.');
	 break;
	 case GoogleMaps.SERVICE_MISSING:
	        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
	 break;
	 case GoogleMaps.SERVICE_VERSION_UPDATE_REQUIRED:
	        alert('Google Play services is out of date. Please update Google Play services.');
	 break;
	 case GoogleMaps.SERVICE_DISABLED:
	        alert('Google Play services is disabled. Please enable Google Play services.');
	 break;
	 case GoogleMaps.SERVICE_INVALID:
	        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
	 break;
	 default:
	        alert('Unknown error.');
	}
	
	var fotex = "http://www.foetex.dk/_layouts/1033/images/foetex/FotexLogo.png";
	var fakta = "https://om.coop.dk/image.axd?id=6388371";
	var bilka = "http://a1957.phobos.apple.com/us/r30/Purple6/v4/2e/23/bf/2e23bf18-9576-3875-aa18-40c0d086f0e1/mzl.gekczzcw.128x128-75.jpg";
	var brugsen = "http://a3.mzstatic.com/us/r30/Purple6/v4/b6/2e/a1/b62ea19a-d5c4-1e7c-e1bf-6987089c6c43/icon_128.png";
	var lidl = "https://pbs.twimg.com/profile_images/531749928771407875/HKIHqQ1i_reasonably_small.png"; // change
	var kvickly = "https://irs3.4sqi.net/img/user/128x128/WLV4YWST0HDJEX2K.png";
	
	var array =[];
	
function anno(name, lat, longi, image){
	this.name = name;
	this.latitude = lat;
	this.longitude = longi;
	this.image = image;
};
 var foetex = new anno("Føtex", 55.393862, 10.348193, fotex);
 var foetex2 = new anno("Føtex", 55.384021, 10.424971, fotex);
 var foetex3 = new anno("Føtex", 55.393930, 10.376262, fotex);
 var fakta1 = new anno("Fakta", 55.406071, 10.393254,fakta);
 var fakta2 = new anno("Fakta",55.417667, 10.358750,fakta);
 var fakta3 = new anno("Fakta",55.407825, 10.333001,fakta);
 var fakta4 = new anno("Fakta",55.394861, 10.377805,fakta);
 var fakta5 = new anno("Fakta",55.391936, 10.397717,fakta);
 var fakta6 = new anno("Fakta",55.379357, 10.397202,fakta);
 var fakta7 = new anno("Fakta",55.405681, 10.392224,fakta);
 var fakta8 = new anno("Fakta", 55.382740, 10.425741, fakta);
 var lidl1 = new anno("Lidl", 55.396464, 10.383212, lidl);
 var brugs = new anno("Super Brugsen", 55.410622, 10.409110, brugsen);
 var brugs1 = new anno("Super Brugsen", 55.394417, 10.382932, brugsen);
 var kvickly1 = new anno("Kvickly", 55.406638, 10.392760, kvickly);
 var bilka1 = new anno("Bilka", 55.377303, 10.431256, bilka);
 array.push(foetex);
 array.push(foetex2);
 array.push(foetex3);
 array.push(fakta1);
 array.push(fakta2);
 array.push(fakta3);
 array.push(fakta4);
 array.push(fakta5);
 array.push(fakta6);
 array.push(fakta7);
 array.push(fakta8);
 array.push(lidl1);
 array.push(brugs);
 array.push(brugs1);
 array.push(kvickly1);
 array.push(bilka1);
 
	var wd_map = Ti.UI.createWindow({
		backgroundColor: "white",
		fullscreen: true,
		title: recipe_title
	});
	
	var mapview = GoogleMaps.createView({
		mapType: GoogleMaps.NORMAL_TYPE,
		anime:true,
		userLocation: true,
		userLocationButton: true,
		height: '100%', width: '100%',
		region: {latitude: 55.381339, longitude: 10.408878, latitudeDelta: 0.005, longitudeDelta: 0.005},
	});

 for (var i=0; i < array.length; i++) {
   add_anno(array[i]);
 };

	var route = GoogleMaps.createRoute({
		width: 20,
		color: '#e46600',
		points: points
	});	
	function add_anno(obj){
 	var annotation = GoogleMaps.createAnnotation({
		latitude: obj.latitude, longitude: obj.longitude,
		image: obj.image,
		title: obj.name, subtitle: "køb Oksekød get ingredient!!"
	});
	mapview.addAnnotation(annotation);
 };
	mapview.addRoute(route);
	wd_map.add(mapview);
	return wd_map;
}
module.exports = map;