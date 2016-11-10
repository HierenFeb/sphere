$(document).ready(function() {
  var $spheresControl = $('.js-spheres-control'),
  $item = $('.item');

  sphereMotion = function (classOut, classIn, $getSphere, $activeSphere, previous, maxRowIndex) {
		var markUp;

  	$activeSphere.find('.row').each(function(indexTo) {
	 		if(previous) {
				var $getImage = $getSphere.find('.row'+ (indexTo + 1) +' .item:not(.getted)').first();
	 			var currentImage = $getImage.children('img').attr('src');
	 			$getImage.addClass('getted');

	 			for (i = maxRowIndex; i >= 0 ; i--) {
	 				var indexItem = i,
	 						indexItemGet = i + 1;
		 			if(indexItem != maxRowIndex) {
			 			currentImage = $(this).find('.item:eq('+ indexItemGet +')').children('img').last().attr('src');
		 			}
					markUp = '<img class="'+ classIn +'" src="'+ currentImage +'">';
		 			$(this).find('.item:eq('+ indexItem +')').children('img').addClass(classOut);
		 			$(this).find('.item:eq('+ indexItem +')').prepend(markUp);
				};
			}
			else {
				var $getImage = $getSphere.find('.row'+ (indexTo + 1) +' .item:not(.getted)').last();
	 			var currentImage = $getImage.children('img').attr('src');
	 			$getImage.addClass('getted');

	 			for (i = 0; i <= maxRowIndex ; i++) {
	 				var indexItem = i,
	 						indexItemGet = i - 1;
		 			if(indexItem != 0) {
			 			currentImage = $(this).find('.item:eq('+ indexItemGet +')').children('img').last().attr('src');
		 			}
					markUp = '<img class="'+ classIn +'" src="'+ currentImage +'">';
		 			$(this).find('.item:eq('+ indexItem +')').children('img').addClass(classOut);
		 			$(this).find('.item:eq('+ indexItem +')').prepend(markUp);
				};
			}
  	});

  	setTimeout(function() {
		  $('.'+classOut).remove();
		  $('.'+classIn).removeClass(classIn);
		}, 20);
  };

  $spheresControl.click(function(){

		var $activeSphere = $('.spheres--active');
	  var classOut = 'item-next--out',
	  		previous = false;
	  		classIn = 'item-next--in';
		var dataActive = parseInt($activeSphere.attr('data-active'));
		var sphereLength = $('.spheres--item').length - 1;
		//Get max Row index
		var rowLength = $activeSphere.find('.row').length;
		var maxRowIndex = rowLength - 1;

		// Next/Prev button with loop
		// Click previous button
  	if($(this).hasClass('spheres--prev')) {
  		previous = true,
		  classOut = 'item-prev--out',
		  classIn = 'item-prev--in';
		  // If the first sphere is active;
		  if(dataActive == 1) {
		  	// Get data from the last sphere
		  	dataActive = sphereLength;
		  }
		  else {
		  	// Get data from previous sphere
		  	dataActive = dataActive - 1;
		  }
  	}
  	else {
		  if(dataActive == sphereLength) {
		  	// Get data from the first sphere
		  	dataActive = 1;
		  }
		  else {
		  	// Get data from next sphere
		  	dataActive = dataActive + 1;
		  }
  	}

		var $getSphere = $('.spheres--item-'+ dataActive);
		//Reset data active for active Sphere
		$activeSphere.attr('data-active',dataActive)

		var times = rowLength;
		var loop = setInterval(anim, 100);
		function anim(){
	    times--;
	    if(times === 0){clearInterval(loop);}
	    sphereMotion(classOut, classIn, $getSphere, $activeSphere, previous, maxRowIndex);
		}
		anim();

  	setTimeout(function() {
		  $('.getted').removeClass('getted');
		}, 100 * rowLength);
  })
});
