//  --------🌠----------- //
//  🌟     Gayane      🌟 //
//  ----------🌠--------- //

//  --  All Promotions Page -- //
function changeMaxHeight(slidesAmount) {
	var Height = $('.image_list_item:first-child').outerHeight(true),
		maxHeight = slidesAmount * Height - 10; // 10 is margin of the bottom
	$('.slider_list').css('max-height', maxHeight);
}

var makeResponsive = {
	coefficient: 285 / 430, // height/width in px
	spec_coefficient: 285 / 870, // height/width in px
	parent_width: 32.3551542513, // in %
	resize: function(className) {
		var obj = this;
		$('.' + className).each(function() {
			obj.resize_containers(this);
		});
	},
  	resize_containers: function(elem) {
		if ($(elem).hasClass('exception')) {
			var unique_width = $(elem).attr('data-width'),
				width_of_elements = unique_width * $(elem).parent().eq(0).width() / 100,
				coefficient_of_images_heighth = this.spec_coefficient;
		} else {
			var width_of_elements = this.parent_width * $(elem).parent().eq(0).width() / 100,
				coefficient_of_images_heighth = this.coefficient;
		}

		$(elem).width(width_of_elements); //set element width
		$(elem).height(width_of_elements * coefficient_of_images_heighth); //set element heigth
		this.resize_imgs(elem);
  	},
  	resize_imgs: function(elem) {
      	var width_of_parent = $(elem).width(),
          	heght_of_parent = $(elem).height(),
          	coefficient_parent = heght_of_parent / width_of_parent;

  		$(elem).find('img').each(function(index, element) {
			var img_width = $(this).get(0).naturalWidth > 0 ? $(this).get(0).naturalWidth : 100,
				img_height = $(this).get(0).naturalHeight > 0 ? $(this).get(0).naturalHeight : 100,
				img_ratio = img_height / img_width;

			if (img_ratio < coefficient_parent) {
				$(this).css('height', heght_of_parent);
				$(this).css('width', img_width * heght_of_parent / img_height);
				$(this).css('left', 0.5 * width_of_parent - 0.5 * $(this).width());
				$(this).css('top', 0);
			} else {
				$(this).css('width', width_of_parent);
				$(this).css('height', img_height * width_of_parent / img_width);
				$(this).css('left', 0);
				// $(this).css('top', 0.5_rules * heght_of_parent - 0.5_rules * $(this).height());
				$(this).css('top', 0);
			}

      	});
  	}

};

if ($('.promotionsPage').length) {
	$(window).resize(function() {
		makeResponsive.resize('image_list_item');
	});
	$(window).load(function() {
		makeResponsive.resize('image_list_item');
		$('#container_mixup').css('opacity', '1');
	});
}

if ($('.promotionsPage').length) {
	$('#container_mixup').mixItUp({
		animation: {
			enable: false
		},
		callbacks: {
			onMixLoad: function(state) {
				$(this).mixItUp('setOptions', {
					animation: {
						enable: true
					},
				});
				var category = $('.sort.active').attr('data-category');
				if (category === undefined) {
					$('.sorting ol li:first-child').addClass('active');
				}
			}
		}
	});
}

//  --  Casino Promotions View Page -- //
$('.promotionsCasinoSinglePage').find('.show').click(function() {
	var target = $(this).parent();
	$(target).hasClass('opened') ? $(target).removeClass('opened') : $(target).addClass('opened');
});

if ($('.promotionsCasinoSinglePage').length) {
  	var slidesAmount = 0;
  	$('.image_list_item').not('.exception').each(function() {
  		slidesAmount++;
  	});
  	slidesAmount = slidesAmount - 1;

  	$('.slider_list').slick({
		infinite: true,
		speed: 300,
		slidesToShow: slidesAmount,
		variableWidth: false,
		arrows: false,
		draggable: false,
		vertical: true
	});

  	$('.readmore').each(function() {
      	$(this).click(function(e) {
          	var index = $(this).parent().parent('li').attr('data-slick-index');
          	$('.slider_list').slick('slickGoTo', parseInt(index));
          	ShowActivePromoData('.image_list_item.slick-slide.slick-current.slick-active');
          	e.preventDefault();
      	});
  	});

  	$('.arrow_right').click(function() {
		$('.slider_list').slick('slickNext');
		ShowActivePromoData('.image_list_item.slick-slide.slick-current.slick-active');
  	});

  	$('.arrow_left').click(function() {
      	$('.slider_list').slick('slickPrev');
      	ShowActivePromoData('.image_list_item.slick-slide.slick-current.slick-active');
  	});

  	$(window).resize(function() {
		changeMaxHeight(slidesAmount);
		makeResponsive.parent_width = 100;
		makeResponsive.resize('image_list_item');
	});
	$(window).load(function() {
		changeMaxHeight(slidesAmount);
		makeResponsive.parent_width = 100;
		makeResponsive.resize('image_list_item');
		$('.thumbs.rightside, .promoContent').css('opacity', '1');
	});
}

function ShowActivePromoData(className) {
	if ($('.terms').hasClass('opened'))
		$('.terms').removeClass('opened');
	var terms = $(className).find('.terms_hidden').html(),
		img = $(className).find('.img_hidden').html(),
		dscrpt = $(className).find('.hover p').html(),
		title = $(className).find('.bottom p').html(),
		target_img = $('.topCoverImg').find('figure'),
		target_terms = $('.terms').find('div'),
		target_dscrpt = $('article'),
		target_title = $('h2');
	$(target_img).hide().html(img).fadeIn("slow");
	$(target_terms).html(terms);
	$(target_dscrpt).html(dscrpt);
	$(target_title).html(title);

	makeResponsive.resize('image_list_item');
}
function heightEquality(main, aside) {
	var mainHeight = $(main).innerHeight();
	var asideHeight = $(aside).innerHeight();
	var accHeight;
	if (mainHeight > asideHeight) {
		accHeight = mainHeight;
	} else {
		accHeight = asideHeight;
	}
	$(main).innerHeight(accHeight);
	$(aside).innerHeight(accHeight);
}
if ($('.myAccount.messages').length) {
	heightEquality('.aside', '.content');
}
if ($('#messageScrollbar').length) {
	$('#messageScrollbar').niceScroll({
		cursorcolor: "#C2C2C2",
		cursorwidth: "8px"
	});
}

// messages
/*$('.btn.reply').on('click', function(e) {
    e.preventDefault();
    $('body').find('.replyMessage').css('display', 'block');
    $('body').find('.content').css('height', '1000px');
    heightEquality('.aside', '.content');
});*/

$('.datepicker').datepicker({
    buttonImageOnly: false,
    buttonText: '',
    showOn: 'both'
}).change(function(){
    if(this.id == 'from'){
        var rangeDate = $('#from').datepicker('getDate');
        $('#to').datepicker('setDate', rangeDate );
        $('#to').datepicker( 'option', 'minDate', rangeDate );
    }
});
function DisableDateRange(checkbox, inputs_and_buttons, label){
    if($(checkbox).prop('checked') == false){
        $(inputs_and_buttons).each(function(){
            $(this).attr('disabled', true);
        });
        if(!$(label).hasClass('disabled')) {
            $(label).addClass('disabled');
        }
    }
    else{
        $(inputs_and_buttons).each(function(){
            $(this).attr('disabled', false);
        });
        if($(label).hasClass('disabled')){
            $(label).removeClass('disabled');
        }
    }
}

if($('body.history').length && $('#range').length){

    DisableDateRange('#range', '.datepicker, .ui-datepicker-trigger', '.radio');

    $('#range, #24_hours, #48_hours, #72_hours').on('change', function(){
        DisableDateRange('#range', '.datepicker, .ui-datepicker-trigger', '.radio');
    });
}

