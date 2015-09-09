

jQuery(function($){
	var socket = io.connect();

	var go = $('#go');
	var msg = $('#msg');
	var messages = $('#messages');
	var lat = $('#lat');
	var long = $('#long');

	$('#map').locationpicker({
    	location: {latitude: 34.155332, longitude: -118.255612},
	    locationName: "",
	    radius: 0,
	    zoom: 14,
	    scrollwheel: true,
	    inputBinding: {
	        latitudeInput: lat,
	        longitudeInput: long,
	        radiusInput: null,
	        locationNameInput: null
	    },
	    enableAutocomplete: false,
	    enableReverseGeocode: true,
	    onchanged: function(currentLocation, radius, isMarkerDropped) {
	    	socket.emit('ping', {lat: currentLocation.latitude, long: currentLocation.longitude});
		},
		oninitialized: function(component) {
			console.log('init');
			socket.emit('ping', {lat:lat.val(), long:long.val()});
		}
    });

	go.click(function(evt){
		var val = msg.val();
		console.log("val:"+val);

		if (val=='') return;

		socket.emit('msg', {lat:lat.val(), long:long.val(), msg:val});
	});

	socket.on('msg', function(msg){
		messages.append('<div>' + msg.msg + '</div>');
	})
});