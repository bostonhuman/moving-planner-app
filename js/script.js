function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    //create variable to hold textbox value and address
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    //change text for $greeting
    $greeting.text('So, you want to live at ' + address + '?');

    // YOUR CODE GOES HERE!
    //create variable for full address
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    //append streetview image to the body
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //Make ajax request to get json data from new york time api
    var nytimeUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=373c813ae10640a7aa125757e6e3dae7';
    $.getJSON(nytimeUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
		
		
        articles = data.response.docs;
        console.log(data);
        for (var i = 0; i < articles.length; i++) {
	        var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        }
    });



    return false;
};
//loadData();

$('#form-container').submit(loadData);