// Custom DropDown Creation from selects
function customDropdown() {
    if ($('.selectDropdown').length > 0 && $('.selectDropdown').not('.completed')) {
        // Duplicate the content inside Select into List style
        $('.selectDropdown').not('.completed').each(function () {
            $(this).find('select option').each(function () {
                var number = $(this).index() + 1;
                var select = $(this).parent().parent();
                var rating = select.find('.rating li');
                var val = $(this).text();
                select.find('ul').append($('<li></li>'));
                select.find('li:nth-child(' + number + ')').text(val);
                if ($(this).text() == 'Provider') {
                    select.find('li:nth-child(' + number + ')').addClass('provider');
                }
                if ($(this).attr('selected')) {
                    var text = $(this).text();
                    select.find('dt span').removeClass('placeholder').text(text);
                    select.find('li:nth-child(' + number + ')').addClass('active');
                    if ($(this).attr('disabled')) {
                        select.find('dt span').addClass('placeholder');
                        // console.log('placeholder added')
                    }
                }
                if ($(this).attr('disabled')) {
                    select.find('li:nth-child(' + number + ')').addClass('disabled');
                }
                select.find('.provider').nextAll().addClass('providerList');
            });
$(this).addClass('completed');
});
}
}
//Custom DropDown clear
function customDropdownClear(select) {
    $(select).parent().removeClass('completed');
    $(select).parent().find('dd ul').html('');
}
//Popup opening
$('.popupOpener').on('click', function (e) {
    e.preventDefault();
    // var link = $(this).data('anchor');
    var link = $(this).attr('href');
    var popup = window.open(link, '#popupBox', 'width=890px,height=660px');
});
//Function for slectbox filling in
function selectFill(el, start, end, counter) {
    $(el).find('option:gt(0)').remove();
    if (counter === 'inc') {
        for (var i = start; i <= end; ++i) {
            if (i < 10) {
                $(el).append('<option value="' + i + '">0' + i + '</option>');
            } else {
                $(el).append('<option value="' + i + '">' + i + '</option>');
            }
        }
    } else {
        for (var j = end; j > start; --j) {
            if (j < 10) {
                $(el).append('<option value="' + j + '">0' + j + '</option>');
            } else {
                $(el).append('<option value="' + j + '">' + j + '</option>');
            }
        }
    }
}
// Q-ty days in month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
// Detecting geolocation of username
function fillCountries() {
    console.log(navigator.geolocation);
    if (! navigator.geolocation) {
     selectCountries();
 } else {
    navigator.geolocation.getCurrentPosition(function (position) {
        $.getJSON('http://ws.geonames.org/countryCode', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            type: 'JSON',
            username: 'demo'
        },
        function (result) {
            selectCountries(result.countryCode);
        });
    });    
}
}
// get list of data from countries json conserning countries name and countries codes
function selectCountries(country) {
    console.log(country);
    var k = 0;
    $.getJSON("_/js/countries.json", function (data) {
        $.each(data.countries, function (key, value) {
            // console.log(key, value, k);
            // if (k === 0) {
                if (k === 75 && !country) {
                    $('#countries').append('<option selected="selected" value="'+ k +'">' + value.name + '</option>');
                    $('#countryCode').append('<option selected="selected" value="'+ k +'"> +' + value.phone + ' (' + key + ')</option>');
                } else if (country && key == country) {
                    $('#countries').append('<option selected="selected" value="'+ k +'">' + value.name + '</option>');
                    $('#countryCode').append('<option selected="selected" value="'+ k +'"> +' + value.phone + ' (' + key + ')</option>');
                } else {
                    $('#countries').append('<option value="'+ k +'">' + value.name + '</option>');
                    $('#countryCode').append('<option value="'+ k +'"> +' + value.phone + ' (' + key + ')</option>');
                }
                k++;
            });
});
}
//Selectboxes for birthday date   
function birthday() {
    $('.birthday').on('change', function () {
        var name = $(this).attr('name');
        var days = 31;
        var birthDay = $('#birthDay').val();
        var birthMonth = $('#birthMonth').val();
        var birthYear = $('#birthYear').val();
        switch (name) {
            case 'birthDay':
            birthDay = $(this).find('option:selected').val();
            break;
            case 'birthMonth':
            birthMonth = $(this).find('option:selected').val();
            break;
            default:
            birthYear = $(this).find('option:selected').val();
            break;
        }

        if (birthMonth !== 0 && birthMonth !== null) {
            if (birthYear == null) {
                birthYear = 0;
            }
            days = daysInMonth(birthMonth, birthYear);
            // console.log(days, birthDay, birthMonth, birthYear);
            if ($('#birthDay').find('option').length - 1 !== days) {
                if (birthDay > days) {
                    selectFill('#birthDay', 1, days, 'inc');
                    $('#birthDay option:disabled').attr('selected', '');
                    // console.log(50002500002, $('#birthDay option:disabled').val());
                    $('#birthDay').val(0);
                    // $('#birthDay').trigger('change');
                    // console.log( $('#birthDay').val());
                    $('#birthDay').closest('fieldset').find('dd ul, dt span').html('');
                } else {
                    var selected = $('#birthDay option:selected').index() + 1;
                    // console.log(selected);
                    selectFill('#birthDay', 1, days, 'inc');
                    $('#birthDay option:nth-child(' + selected + ')').attr('selected', '');
                }
            }
            customDropdownClear('#birthDay');
            customDropdown();
        }
        console.log($('#birthDay').val(), $('#birthMonth').val(), $('#birthYear').val(), birthDay, birthMonth, birthYear);
        // $('.birthday').valid();
    });
}
// Function for tooltips and error messages displaying in custom way
function messageBox() {
    var message = '';
    $('form .relative').each(function () {
        var $this = $(this);
        $this.find('input').bind('focus', function () {
            var message = '';
            $('.messageBox').removeClass('animate');
            var $this = $(this);
            // console.log($this.context);
            if (!$this.context.value) {
                if ($this.parent('.relative').find('.tooltip').length > 0 && $this.parent('.relative').find('label.error').text() === '') {
                    message = $this.parent('.relative').find('.tooltip').text();
                } else {
                    message = $this.parent('.relative').find('label.error').text();
                }
            } else {
                if ($this.parent('.relative').find('label.error').length > 0 && $this.parent('.relative').find('label.error').text() !== '') {
                    message = $this.parent('.relative').find('label.error').text();
                } else if ($this.parent('.relative').hasClass('success')) {
                    message = $this.parent('.relative').find('.tooltip').text();
                }
            }
            if (message !== '') {
                $this.parent('.relative').find('.messageBox').text(message).addClass('animate');
            }
        }).bind('blur', function () {
            $('.messageBox').removeClass('animate');
        });
        $('body').on('click', '.selectDropdown dt', function (e) {
            var $that = $(e.target);
            var $parent = $that.parents('fieldset');
            var message = '';
            $('.messageBox').removeClass('animate');
            message = $parent.find('select').next('label.error').text();
            if (!message && $parent.find('select').data('tooltip') !== undefined) {
                message = $parent.find('select').data('tooltip');
            }
            if (message !== '') {
                $parent.parent('.relative').find('.messageBox').text(message).addClass('animate');
            }
        });
        $('.row.checkboxes .relative').on('change', function () {
            message = "";
            $(this).find('.messageBox').removeClass('animate');
            message = $(this).find('label.error').text();
            if (message) {
                $(this).find('.messageBox').addClass('animate').text(message);
            } else {
                $(this).find('.messageBox').removeClass('animate');
            }
        });
    });
}

// Toggle FullScreen
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}



function getPageSize() {
    pageHeight = $('.wrap1').height();
    pageWidth = $('.wrap1').width();
}

function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
    scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = (scaleX > scaleY) ? scaleY : scaleX;
    // var controlsScale = basePage2 + basePage.scale;
    var newLeftPos = Math.abs(Math.floor(((basePage.width * basePage.scale) - maxWidth) / 2));
    // var newTopPos = Math.abs(Math.floor(((basePage.height * basePage.scale) - maxHeight)/3));

    page.attr('style', 'transform:scale(' + basePage.scale + ');left:' + newLeftPos + 'px');
    // $controls.attr('style', 'transform:scale(' + basePage.scaleX + ')');

    var mywidth = $('iframe')[0].getBoundingClientRect().width;
    var myheight = $('iframe')[0].getBoundingClientRect().height;
    $('.iframeWrap').css({
        'height': +myheight
    });
    $('.iframeWrap').css({
        'width': +mywidth
    });
    if (newLeftPos === 0) {
        $('.iframeWrap').css('left', '-7px');
    } else {
        var mywidth = $('iframe')[0].getBoundingClientRect().width;
        var myheight = $('iframe')[0].getBoundingClientRect().height;
        $('.iframeWrap').css({
            'height': +myheight
        });
        $('.iframeWrap').css({
            'width': +mywidth
        });
        if (newLeftPos > 0  && newLeftPos < 17) $('.iframeWrap').css('left', newLeftPos - 7);
        else $('.iframeWrap').css('left', '0');
        // var leftt = $(".wrap").css("left");
        // console.log(leftt);
    }
    // var leftt = $(".wrap").css("left");
    // console.log(leftt);
}


//  --  All Promotions Page -- //
var chekForMore = function () {
    if ($('.promotionsAll').length) {
        $('.thumbs').each(function () {
            if ($(this).find('.list li').length <= 3) {
                $(this).find('.showMore').hide();
            }
        });
        $('.showMore').click(function () {
            collapsExpend(this);
        });
    }
}();

function collapsExpend(elem) {
    var parentDiv = $(elem).prev('.thumbsFilter'),
    container = $(elem).parent(),
    imgHeight = $(parentDiv).find('img').height(),
    thisHeight = $(parentDiv)[0].scrollHeight;
    if (!$(parentDiv).hasClass('collapse')) {
        $(parentDiv).addClass('collapse');
        $(parentDiv).css('max-height', thisHeight);
        $(elem).html('Less');
        $(elem).addClass('less');
    } else {
        $(parentDiv).removeClass('collapse');
        $(parentDiv).css('max-height', imgHeight + 15 + 'px');
        $(elem).html('More');
        $(elem).removeClass('less');
    }

    $('html, body').animate({
        scrollTop: $(container).position().top - 55
    }, 'slow');
}

var makeResponsive = {
    coefficient: 285 / 430, // height/width in px
    spec_coefficient: 285 / 871.813, // height/width in px
    parent_width: 32.3551542513, // in %
    resize: function (className) {
        var obj = this;
        // console.log(obj);
        $('.' + className).each(function () {
            // console.log(this);
            obj.resize_containers(this);
        });
    },
    resize_containers: function (elem) {
        if ($(elem).hasClass('exception')) {
            var unique_width = $(elem).attr('data-width'),
            width_of_elements = unique_width * $(elem).parent().eq(0).outerWidth() / 100,
            coefficient_of_images_heighth = this.spec_coefficient;
        } else {
            var width_of_elements = this.parent_width * $(elem).parent().eq(0).outerWidth() / 100,
            coefficient_of_images_heighth = this.coefficient;
        }

        $(elem).width(width_of_elements); //set element width

        $(elem).height(width_of_elements * coefficient_of_images_heighth); //set element heigth
        this.resize_imgs(elem);
    },
    resize_imgs: function (elem) {
        var width_of_parent = $(elem).width(),
        heght_of_parent = $(elem).height(),
        coefficient_parent = heght_of_parent / width_of_parent;

        $(elem).find('img').each(function (index, element) {
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
                $(this).css('top', 0.5 * heght_of_parent - 0.5 * $(this).height());
            }

        });

    }
};
