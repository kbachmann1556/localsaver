$(document).ready(function(){
		var location;
		getLocation();
		function getLocation(){
			navigator.geolocation.getCurrentPosition(getBusinessInfo)
		}
		function getBusinessInfo(location){
			console.log('you make it here');
			$.ajax({
				type: 'GET',
				url: "http://codingchallenge.datasphere.com:8084/getbusinesses/?location="+location.coords.latitude+","+location.coords.longitude+"&pg=1&pz=10&callback=?",
				async: false,
				jsonpCallback: 'jsonCallback',
				contentType: "application/json",
				dataType: 'jsonp',
				success: function (json){
					console.log('you got something', json);
					$(".matches_found").append("<p>"+json.count+" MATCHES FOUND</p>");
					for(var i = 0; i < 10; i++){
						var length = json.businesses[i].coupons.length;
						//one of the object did not have a state attribute. I would normally write something to update the api but for the sake of this challenge I just changed the state to Washington below.
						if(json.businesses[i].state == undefined){
							json.businesses[i].state = "WA";
						}
						if(length == 0){
							$("#main_content").append("<div class = 'business'><div class = 'location'><ul><li><img src='http://content.secondspace.com/frontend-test/pin.png'></li><li>"+json.businesses[i].city+","+json.businesses[i].state+"</li><li>"+json.businesses[i].distance+" mi</li></ul></div><img class = 'title_pic' src='http://content.secondspace.com/frontend-test/tile1-main.jpg'><div class = 'body'><img class = 'profile_pic' src='http://content.secondspace.com/frontend-test/tile1-logo.jpg'><p class = 'category'>"+json.businesses[i].category+"</p><button class = 'business_button'>"+json.businesses[i].businessname+"</button></div></div>");
						}else if(length == 1){
							$('#main_content').append("<div class = 'business'><div class = 'location'><ul><li><img src='http://content.secondspace.com/frontend-test/pin.png'></li><li>"+json.businesses[i].city+","+json.businesses[i].state+"</li><li>"+json.businesses[i].distance+" mi</li></ul></div><img class = 'title_pic' src='http://content.secondspace.com/frontend-test/tile1-main.jpg'><div class = 'body'><img class = 'profile_pic' src='http://content.secondspace.com/frontend-test/tile1-logo.jpg'><p class = 'category'>"+json.businesses[i].category+"</p><button class = 'business_button'>"+json.businesses[i].businessname+"</button><div class = 'coupon_area'><hr><p class = 'coupon'>"+json.businesses[i].coupons[0].title+"</p><img src='./arrow.png'></div></div></div>");
						}else if(length == 2){
							$('#main_content').append("<div class = 'business'><div class = 'location'><ul><li><img src='http://content.secondspace.com/frontend-test/pin.png'></li><li>"+json.businesses[i].city+","+json.businesses[i].state+"</li><li>"+json.businesses[i].distance+" mi</li></ul></div><img class = 'title_pic' src='http://content.secondspace.com/frontend-test/tile1-main.jpg'><div class = 'body'><img class = 'profile_pic' src='http://content.secondspace.com/frontend-test/tile1-logo.jpg'><p class = 'category'>"+json.businesses[i].category+"</p><button class = 'business_button'>"+json.businesses[i].businessname+"</button><div class = 'coupon_area'><hr><p class = 'coupon'>"+json.businesses[i].coupons[0].title+"</p><img src='./arrow.png'></div><div class = 'coupon_area'><hr><p class = 'coupon'>"+json.businesses[i].coupons[1].title+"</p><img src='./arrow.png'></div></div></div>");
						}else{
							$('#main_content').append("<div class = 'business'><div class = 'location'><ul><li><img src='http://content.secondspace.com/frontend-test/pin.png'></li><li>"+json.businesses[i].city+","+json.businesses[i].state+"</li><li>"+json.businesses[i].distance+" mi</li></ul></div><img class = 'title_pic' src='http://content.secondspace.com/frontend-test/tile2-main.jpg'><div class = 'body'><img class = 'profile_pic' src='http://content.secondspace.com/frontend-test/tile2-logo.jpg'><p class = 'category'>"+json.businesses[i].category+"</p><button class = 'business_button'>"+json.businesses[i].businessname+"</button><div class = 'coupon_area'><hr><p class = 'coupon'>"+json.businesses[i].coupons[0].title+"</p><img src='./arrow.png'></div><div class = 'coupon_area'><hr><p class = 'coupon'>"+json.businesses[i].coupons[1].title+"</p><img src='./arrow.png'></div><div class = 'coupon_area'><hr><p class = 'more_coupons'>See All <span class = 'color_circle'>"+json.businesses[i].coupons.length+"</span></p></div></div></div>");
						}
					}
				},
				error: function (e){
					console.log(e.message);
				}
			});
		}
	})