var APIKEY = 'c47fcccc044971a629f121690939b'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(data) {
	console.log(data);
	var content = $('#results');
	data.results.forEach(function(element, index){
		var $newDiv = $('<div>');		
		var $newP = $('<p>');
		$newP.text(element.name);
		$newDiv.append($newP);
		content.append($newDiv);
	});
}

$(document).ready(function() {
	$('#go').on('click', function(e){
		var query = $('#search').val();
		console.log('Searching: ', query);
		search(query);
	})
});

function search(query){
	console.log('In search: ', query);
	// Start the search here!
// Example 1 - Cross Site Error
	// $.ajax ({
	//     type: 'GET',
	//     dataType: 'json',
	//     crossDomain: true,
	//     url: 'api.worldweatheronline.com/free/v2/marine.ashx?q' + query + '&format=json&includelocation=yes&key=' + APIKEY + encodeURI(query),
	//     complete: function() {
	//         console.log('ajax complete');
	//     },
	//     success: function(data) {
	//         searchCallback(data.results);
	//     },
	//     error: function(){
	//     	console.log('error!');
	//     }
	// });

// Example 2: Using JSONP
/*$.ajax ({
	type: 'GET',
	dataType: 'jsonp',
	crossDomain: true,
	jsonp: 'json_callback',
	url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	complete: function() {
		console.log('ajax complete');
	},
	success: function(data) {
		searchCallback(data);
	}
});*/

// Example 3, using CORS
	// $.ajax({
	// 	type: 'GET',
 //        url: 'api.worldweatheronline.com/free/v2/marine.ashx?q' + query + '&format=json&includelocation=yes&key=' + APIKEY + encodeURI(query),
 //        crossDomain: true,
 //        dataType: 'html',
 //        success: function (response) {
 //            console.log(response);
 //        },
 //        error: function (xhr, status) {
 //            alert('Error: ' + status);
 //        }
 //    });


// Example 4: Using JSONP, combined with new callback functions
    var jqxhr = $.ajax ({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        // jsonp: 'json_callback',
        url: 'api.worldweatheronline.com/free/v2/marine.ashx?q' + query + '&format=json&includelocation=yes&key=' + APIKEY + encodeURI(query),
    }).always(function() {
            console.log('Ajax attempt complete.');
        }).done(function(data, textStatus, jqXHR) {
            console.log(data);
            searchCallback(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Ajax failed: ', textStatus);
        });

		// Set another completion function for the request above
		// You can set multiple always, done and fail functions like this
	jqxhr.always(function(){
		console.log('Still complete!');
	});
	
}