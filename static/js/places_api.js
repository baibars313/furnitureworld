$(document).ready($.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQke2iRU_GaKA2RQDl72NfqdEjYILHOsA&libraries=places")
.done(function( script, textStatus ) {
    google.maps.event.addDomListener(window, "load", initAutoComplete)
}));


let autocomplete;

function initAutoComplete(){
   autocomplete = new google.maps.places.Autocomplete(
       document.getElementById('id-google-address'),
       {
           types: ['address'],
           //default in this app is "UK"
           componentRestrictions: {'country': ['BH']},
       })

   autocomplete.addListener('place_changed', onPlaceChanged);
}


function onPlaceChanged (){

    var place = autocomplete.getPlace();

    var geocoder = new google.maps.Geocoder()
    var address = document.getElementById('id-google-address').value

    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            let adress=results[0].formatted_address;
            $('#id_longitude').val(longitude)
            $('#id_latitude').val(latitude)
            $('#id_address').val(adress)
        }
    });
    let search =document.getElementById('id-google-address')
    if (!place.geometry){
        document.serach.placeholder = "*Begin typing address";
    }
    else{

        for (var i = 0; i < place.address_components.length; i++) {
            for (var j = 0; j < place.address_components[i].types.length; j++) {

                if (place.address_components[i].types[j] == "street_number") {
                    var num = place.address_components[i].long_name
                }
                if (place.address_components[i].types[j] == "route") {
                    var addy = place.address_components[i].long_name
                }
                // if (place.address_components[i].types[j] == "postal_town") {
                //      $('#id_town').val(place.address_components[i].long_name)
                // }
                // if (place.address_components[i].types[j] == "administrative_area_level_2") {
                //     $('#id_county').val(place.address_components[i].long_name)
                // }
                // if (place.address_components[i].types[j] == "country") {
                //     $('#id_country').val(place.address_components[i].long_name)
                // }
                //
                // if (place.address_components[i].types[j] == "postal_code") {
                //     $('#id_post_code').val(place.address_components[i].long_name)
                //}
            }
        }


        //find all hidden inputs & ignore csrf token

        //fade in the completed form
    }
}
