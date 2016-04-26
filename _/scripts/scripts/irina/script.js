//  --------🌠----------- //
//  🌟     Irina       🌟 //
//  ----------🌠--------- //
var domainsList = jQuery.getJSON('_/js/disposable-email-provider-domains.json', {}, function (result) {
    return result;
});
//rangeSlider initialization
if ( $('.rangeSlider').length > 0) {
    $('.rangeSlider').slider({
     min: 0,
     max: 24,
     step: 1,
     value: 0,
     range: "min",
     slide: function( event, ui ) {
         $('.ui-slider-handle').text(ui.value + ' Hours');
     },
     create: function( event, ui ) {
         $('.ui-slider-handle').text('0 Hours');
     },
     animate: 300

 });
}
//Custom DropDown open
$('body').on('click', '.selectDropdown dt', function (e) {
    var select = $(this).parent();
    var openedDD = $('.selectDropdown dd').not(select.find('dd'));
    openedDD.removeClass('animate');
    var activeDT = $('.selectDropdown dt').not(select.find('dt'));
    var empty = $('.selectDropdown dt').find('span:empty');
    var valDefault = $(empty).parent().parent().find('select').find('option:selected').html();
    $(empty).html(valDefault);
    select.parent().find('dd').toggleClass('animate');
    if (select.parent().find('dd').hasClass('animate')) {
        activeDT.removeClass('active');
        $(this).addClass('active');
        select.find('.searchFilter').css({
            'z-index': 1
        }).focus();
    } else {
        $(this).removeClass('active');
        $(this).parents('.relative').find('.messageBox').removeClass('animate');
        select.find('.searchFilter').css({
            'z-index': -1
        });
    }
    e.stopPropagation();
});
// Replaced not allowed symbols during input
function rePlace(element) {
    if (element.data('antipattern').length) {
        var pattern = element.data('antipattern');
        pattern = new RegExp(pattern, 'g');
        var val = element.val();
        val = val.replace(pattern, '');
        element.val(val);
        return val;
    }
}
// SearchFilter on custom dropDowns
$('body').on('input keyup', '.searchFilter', function (e) {
    $(element).css({
        'z-index': 1
    });
    var element = e.target;
    var spanDefVal = $(element).parent().parent().find('option:selected').html();
    // $(element).parent().parent().find('option:selected').removeAttr('selected');    
    var searchItem = $(element).val();
    $(element).next('span').text('');
    searchItem = rePlace($(element));
    $(element).next('span').text(searchItem);
    if ($(element).hasClass('digits')) {
        var searchItem2 = parseInt(searchItem, 10);
        console.log(searchItem, searchItem2);
    }

    // Filtering dropdown elements concerning to search result
    $(element).parent().parent().find('ul li').each(function () {
        var comparedListItem = $(this).html();
        var comparedText = searchItem2;
        var comparedTextRegexp = new RegExp(comparedText, 'ig');
        if (comparedListItem.match(comparedTextRegexp)) {
            if (comparedListItem === comparedText) {
                $(this).addClass('selected');
            }
            $(this).show();
        } else {
            $(this).hide();
            if (! $(this).parent().find('li:visible').length > 0) {
                $(this).parent().parent().find('li').show();
                $(element).val('').next('span').html(spanDefVal);
            }
        }
    });
});
//empting Searchfilter input and reset previuos state on blur
$('body').on('blur', '.searchFilter', function (e) {
    var element = e.target;
    var spanDefVal = $(element).parent().parent().find('option:selected').html();
    $(element).css({'z-index': -1}).val('').next('span').text(spanDefVal);
    $(element).parent().parent().find('ul li').show();
});
//Choose option form Custom DropDown
$('body').on('click', 'dd.animate ul li', function (e) {


    if ($(this).is('.provider,.disabled')) {
        return false;
    }

    var number = $(this).index()+1;
    var select = $(this).parent().parent().parent().find('select');
    // console.log($(this).html());
    select.find('option').removeAttr('selected');
    select.find('option:nth-child(' + number + ')').attr('selected', '');
    select.trigger('change');
    var text = $(this).html();
    var selectValue = text;
    select.trigger('change');
    if (select.hasClass('birthday')) {
        selectValue = parseInt(text);
    }
    if (select.data('country')) {
        var bindedSelect = select.data('country');
        $('#' + bindedSelect).parent().find('dt').removeClass('active');
        $('#' + bindedSelect).parent().find('dt span').html($('#' + bindedSelect).find('option:nth-child(' + number + ')').html());
    }

    select.parent().find('dt').removeClass('active').find('.searchFilter').css({
        'z-index': -1
    }).val('');
    select.parent().find('dt span').removeClass('placeholder').html(text);
    select.parent().find('dd').removeClass('animate').find('ul li').show();
});
// Toggling blocks
$('body').on('click', '.toggledBlock', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $('.toggledBlock').removeClass('active');
        $(this).addClass('active');
    }
});

//Open header dropdown menus
$('body').on('click', '.title', function (e) {
    e.preventDefault();
    var $thisDropDown = $(this).parent().find('.dropdown');
    // var title = $('.balance .title');
    if ($thisDropDown.hasClass('animate')) {
        $thisDropDown.removeClass('animate');
    } else {
        $('.dropdown').not($thisDropDown).removeClass('animate');
        $thisDropDown.addClass('animate');
    }
    e.stopPropagation();
});
$('body').on('click', 'header .balance .title', function () {
    var title = $('.balance .title');
    if (title.is('.hide')) {
        title.removeClass('hide');
        $('.dropdown').removeClass('animate');
    }
});

// Close the dropdowns if clicked elsewhere
$(document).on('click', function (e) {
    var $clicked = $(e.target);
    if ($clicked.parent().parent().not('.dropdown.animate, .selectDropdown')) {
        $('.selectDropdown dd').removeClass('animate');
        $('.selectDropdown dt.active input').css({'z-index': -1}).val(' ');
        // var empty = $('.selectDropdown dt.active').find('input:empty');
        // var valDefault = $(empty).parent().parent().find('select').find('option:selected').html();
        // $(empty).parent().find('span').html(valDefault);
        $('.selectDropdown dt').removeClass('active');
        $('.selectDropdown').parents('.relative').find('.messageBox').removeClass('animate').html('');
        $('.dropdown').removeClass('animate');
    }
    if (!$clicked.is('.info')) {
        $('.floatContext').removeClass('animate');
    } else {
        e.preventDefault();
    }
});
// Lightbox open
$('a.lightbox').fancybox({
    openEffect: 'fade',
    padding: 0,
    autoHeight: true,
    autoWidth: true,
    autoCenter: true,
    scrollOutside: false,
    type: 'ajax',
    ajax: {
        dataType: 'html',
        headers: {
            'X-fancyBox': true,
            overlay: {
                locked: true
            }
        }
    },
    afterLoad: function () {
        selectCountries();
        $('html').addClass('noOverflow');

    },
    afterClose: function () {
        $('html').removeClass('noOverflow');
        // fillCountries();
        // customDropdown();
    },
    beforeShow: function () {
            //slick carousel initialisation for myAccount avatars carousel
            $('.avatarsGallery').slick({
                centerMode: true,
                centerPadding: '60px',
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 5,
                variableWidth: true,
                prevArrow: '<a href="#" class="btn next"></a>',
                nextArrow: '<a href="#" class="btn prev"></a>'
            });
        },
    afterShow: function () {
        $('.avatarsGallery').on('afterChange', function(slick, currentSlide){
            console.log(slick, currentSlide);

            // $('.slick-slide').css({'margin':0});
            // $('.slick-current').css({'margin-left':'10px','margin-right':'10px'});
        });
        //  Temporary //
        $('.lang a').click(function (e) {
            e.preventDefault();
        });
        // fillCountries();
        //birthday selects filling
        var nowDate = new Date();
        var start = nowDate.getFullYear() - 100;
        var end = nowDate.getFullYear() - 18;
        selectFill('#birthDay', 1, 31, 'inc');
        selectFill('#birthMonth', 1, 12, 'inc');
        selectFill('#birthYear', start, end, 'dec');

        //form fileds tooltips and error messages displaying in custom way
        messageBox();
        // customDropdown function init inside lightbox
        customDropdown();
        //function for correct date of birth pickup
        birthday();
        // $('.birthday').valid();
        // Destroy lightbox on closebutton click
        $('.closeBtn').on('click', function () {
            $.fancybox.close();
        });
        // Detection of Caps Lock 'on' state // ! -- AWESOME CODE BELOW -- !
        $('.capslock').keypress(function (e) {
            var s = String.fromCharCode(e.which);
            if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        });
        // Password strength plugin init
        $('#password').pwstrength();
        //Removing special charakters and spaces in username field
        $('#username').on('input keyup', function (e) {
            var code = (e.keyCode || e.which);
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }
            var val = $(this).val();
            val = val.replace(/[\s\-\+\!\,\@,\#,\$,\%,\^,\(,\),\=,\\,\|,\{,\},\[,\],\",\',\`,\;,\:,\/,>,<,\,,\&,\*,\?,\~]/g, '');
            $(this).val(val);
        });
        $('.trimmed').on('input keyup', function (e) {
            var code = (e.keyCode || e.which);
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }
            var val = $(this).val();
            val = val.trim();
            $(this).val(val);
        });

        $('#mobile').on('input keyup', function (e) {
            var code = (e.keyCode || e.which);
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }

            var val = $(this).val();
            val = val.replace(/\D+/g, '');
            $(this).val(val);
        });
        // Forms validation
        var form = $('form.registration');
        var login = $('form.login');

        $('.btn.submit').on('click', function (e) {
            e.preventDefault();
            var submitedForm = $(this).parents('form');
            // console.log($(this).parents(form).validate);
            submitedForm.validate();
            if ( submitedForm.valid() ) {
                submitedForm.submit();                
                // parent.$.fancybox.close();
                $.fancybox.open({
                    href: 'registration-congratulations-lightbox.html'
                });
            }
        });
                $.validator.addMethod("domain", function (value, element) {
                    var valueArr = value.split('@');
                    var jsonArr = domainsList.responseJSON;
                    return ($.inArray(valueArr[1], jsonArr) === -1) ? element : false;
                });
                form.validate({
                    onfocusout: function (element) {
                        $(element).valid();
                    },
                    onclick: function (element) {
                        $(element).valid();
                    },
                    validClass: 'success',
                    rules: {
                        username: {
                    // remote: "users.php",
                    minlength: 4,
                    required: true,
                    pattern: /^[a-zA-Z0-9\.\_]+$/i
                },
                email: {
                    // remote: "users.php",
                    domain: true,
                    //with opportunity to write 3 letters after last dot
                    pattern: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|coop|info|museum|name|travel|mobi|[a-z][a-z]|[a-z][a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                    /*with opportunity to write 2 letters after last dot
                    pattern: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5_rules})?$/i,*/
                    required: true
                },
                password: {
                    // pattern: /[\s\S]*/,
                    minlength: 6,
                    required: true
                },
                confirm: {
                    required: true,
                    equalTo: '#password'
                },
                firstname: {
                    pattern: /^[a-zA-Z\.\_\']+$/i,
                    minlength: 2,
                    required: true
                },
                lastname: {
                    pattern: /^[a-zA-Z\.\_\']+$/i,
                    minlength: 2,
                    required: true
                },
                postcode: {
                    pattern: /^[a-zA-Z0-9-]+$/i,
                    minlength: 3,
                    required: true
                },
                city: {
                    minlength: 2,
                    pattern: /^[a-zA-Z\.\_\']+$/i,
                    required: true
                },
                address: {
                    minlength: 2,
                    required: true
                },
                mobile: {
                    minlength: 6,
                    required: true
                },
                terms: 'required',
                birthDay: {
                    required: true
                },
                birthMonth: {
                    required: true
                },
                birthYear: {
                    required: true
                }
            },
            messages: {
                username: {
                    // remote: "Oops! The username has already been registered. Use your imagination and enter another awesome username.",
                    minlength: "The username must consist of min 4 and max 15 English letters and/or numbers.",
                    required: "Oops! You forgot to enter your username",
                    pattern: "The username must consist of min 4 and max 15 English letters and/or numbers."
                },
                email: {
                    // remote: "Ouch! the e-mail is already registered. Click here to retrieve your password or click on Login to enter your account. Otherwise try another e-mail address.",
                    domain: "The e-mail domain that you filled in isn’t accepted. Please enter the normal e-mail provider.",
                    required: "Oops! You forgot to enter your e-mail. ",
                    pattern: "It doesn't look like an e-mail address, please check."
                },
                password: {
                    minlength: "The password must consist of min 6 and max 20 characters.",
                    required: "Oops! You forgot to enter your password."
                },
                confirm: {
                    required: "Oops! You forgot to repeat your password.",
                    equalTo: "The passwords don't match. Please check both fields."
                },
                firstname: {
                    minlength: "The first name can contain only some special characters (- and '). Please try again.",
                    pattern: "The first name can contain only some special characters (- and '). Please try again.",
                    required: "Oops! You forgot to enter your first name."
                },
                lastname: {
                    minlength: "The last name must consist of min 2 and max 50 characters. Please try again.",
                    pattern: "The last name can contain only some special characters (- and '). Please try again.",
                    required: "Oops! You forgot to enter your last name."
                },
                postcode: {
                    required: "Oops! You forgot to enter your postcode.",
                    pattern: "The postcode must consist of min 3 and max 10 characters. Please try again.",
                    minlength: "The postcode must consist of min 3 and max 10 characters. Please try again."
                },
                city: {
                    minlength: "The city must consist of min 2 and max 30 characters (numbers aren’t accepted). Please try again.",
                    pattern: "The city must consist of min 2 and max 30 characters (numbers aren’t accepted). Please try again.",
                    required: "Oops! You forgot to enter the city of your residence."
                },
                address: {
                    minlength: "The address must consist of min 2 and max 30 characters. Please try again.",
                    required: "Oops! You forgot to enter your address."
                },
                mobile: {
                    minlength: "The mobile number must consist of min 6 and max 15 numbers. Please try again.",
                    required: "Oops! You forgot to enter your mobile number."
                },
                terms: {
                    required: "For registration you have to be 18 years or older, accept our Terms and Conditions, Cookie Policy and Privacy Policy."
                },
                birthDay: {
                    required: "Oops! You forgot to select the day of your birth."
                },
                birthMonth: {
                    required: "Oops! You forgot to select the month of your birth."
                },
                birthYear: {
                    required: "Oops! You forgot to select the year of your birth."
                }
            },
            highlight: function (element, errorClass, validClass) {
                var choosed = 0;
                if ($(element).attr('type') == 'checkbox' && $(element).attr('required') == 'required') {
                    $(element).removeClass(validClass).addClass(errorClass);                    
                    $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                }else if($(element).is('.searchFilter') && $(element).not('.birthday')){
                    element = $(element).parent().parent().find('select'); 
                    $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                }else if ($(element).is('.searchFilter.birthday') || $(element).is('select.birthday')) {
                    element = $(element).parent().parent().find('select.birthday');
                    // console.log($(element), element.val(), 'error');
                    // $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                    var choosed = 0;
                    $(element).parents('.datePicker').find('fieldset select').each(function () {
                      if ($(this).val() == null || $(this).val() ==0) {
                        return;
                    } else {
                        return choosed++;
                    }
                    console.log(choosed);
                });
                    // if (choosed !== 0 && choosed < 3){
                    // } else
                    if(choosed !== 3){
                        $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                    }
                    $(element).on('change', function () {
                     birthday();
                     choosed = 0;
                     $(element).parents('.datePicker').find('fieldset select').each(function () {
                        if ($(this).val() == null || $(this).val() ==0) {
                            return;
                        } else {
                            return choosed++;
                        }
                    }); 
                     if(choosed < 3){
                        $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                            // }else if (choosed !== 0 && choosed < 3){
                            //$(element).parents('.relative').removeClass(validClass).removeClass(errorClass);
                        } 
                    });
                    $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                }else if ($(element).attr('id') == 'password' && $(element).val().length > 5 && $(element).val().trim().length > 0) {
                    $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                }else {
                    $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if ($(element).attr('type') == 'checkbox' && $(element).attr('required') == 'required') {
                    if ($(element).is(':checked')) {
                        $(element).removeClass(errorClass).addClass(validClass);
                        $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                    } else {
                        $(element).addClass(errorClass).removeClass(validClass);
                        $(element).parents('.relative').addClass(errorClass).removeClass(validClass);
                    }
                }else if( $(element).is('.searchFilter') && ! $(element).hasClass('birthday')){
                   element = $(element).parent().parent().find('select');
                   $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
               }else if ($(element).is('.searchFilter.birthday') || $(element).is('select.birthday')) {
                element = $(element).parent().parent().find('select.birthday');
                // console.log(element, $(element), element.value, 'success');
                var choosed = 0;
                $(element).parents('.datePicker').find('fieldset select').each(function () {
                    if ($(this).val() == null || $(this).val() ==0) {
                        return;
                    } else {
                        return choosed++;
                    }

                });
                $(element).on('change', function () {
                    birthday();
                    // console.log('chnage');
                    choosed = 0;
                    $(element).parents('.datePicker').find('fieldset select').each(function () {
                      if ($(this).val() == null || $(this).val() ==0) {
                        return;
                    } else {
                        return choosed++;
                    }

                });
                    if(choosed === 3){
                        $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                    }else{
                        $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                    }
                });
                if(choosed === 3){
                    $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                    // }else if (choosed < 3 && choosed !== 0) {
                    //$(element).parents('.relative').removeClass(validClass).removeClass(errorClass);
                }else{
                    $(element).parents('.relative').removeClass(validClass).addClass(errorClass);
                }

            }else if ($(element).attr('required') == 'required' || $(element).hasClass('required')) {
                $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
            }

        },
        ignore: ':hidden:not(:checkbox,:radio,select)',
        errorPlacement: function (error, element) {
            if (element.is(':checkbox')) {
                element.siblings('.messageBox').before(error);
            } else if (element.is('.searchFilter')) {
                error.hide();
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label) {
            if (label.attr('for') == 'confirm') {
                var element = '#' + label.attr('for');
                label.addClass('valid').text("Great! The passwords match.");
            } else {
                label.addClass('hide');
            }
        }
    });

login.validate({
    onfocusout: function (element) {
        $(element).valid();
    },
    onclick: function (element) {
        $(element).valid();
    },
    validClass: 'success',
    rules: {
        field: {
            maxlength: 20
        },
        usernameEmail: {
                    // remote: 'users.php',
                    required: true
                },
                userPassword: {
                    // remote: 'users.php',
                    minlength: 6,
                    required: true
                },
                validationCode: {
                    // remote: 'remote.php',
                    required: true
                },
                confirm: {
                    required: true,
                    equalTo: '#password'
                },
                captcha: {
                    required: true
                },
                emailForPassword: {
                    // remote: 'remote.php',
                    // provider: dfgf,
                    email: true,
                    required: true
                },
                newPassword: {
                    required: true,
                    minlength: 6
                },
                firstname: {
                    required: true,
                    minlength: 2
                },
                mobile: {
                    required: true,
                    pattern: /^[0-9]+$/
                },
                lastname: {
                    required: true,
                    minlength: 2
                },
                birthDay: {
                    required: true
                },
                birthMonth: {
                    required: true
                },
                birthYear: {
                    required: true
                }
            },
            messages: {
                usernameEmail: {
                    // remote: "Wrong username/e-mail address and/or password, please try again. Be aware that after 3 failed logins you’ll not be able to enter your account until you connect our Customer Service.",
                    required: "Oops! You forgot to enter your username/e-mail address. "
                },
                userPassword: {
                    required: "Oops! You forgot to enter your password.",
                    minlength: "The password must consist of min 6 and max 20 characters."
                },
                validationCode: {
                    // remote: "Invalid validation code, please try again.",
                    required: "Oops! You forgot to enter your validation code."
                },
                captcha: {
                    required: "Invalid captcha"
                },
                emailForPassword: {
                    // remote: "Ouch! the e-mail isn’t registered, please check.",
                    // provider: "The e-mail domain that you filled in isn’t accepted. Please enter the normal e-mail provider.",
                    email: "Oh! It doesn't look like an e-mail address, please check.",
                    required: "Oops! You forgot to enter your e-mail."
                },
                confirm: {
                    required: "Oops! You forgot to repeat your password. ",
                    equalTo: "The passwords don't match. Please check both fields."
                },
                newPassword: {
                    required: "Oops! You forgot to enter your password. ",
                    minlength: "The password must consist of min 6 and max 20 characters."
                },
                firstname: {
                    required: "Oops! You forgot to enter your first name.",
                    minlength: "The first name must consist of min 2 and max 50 characters. Please try again."
                },
                lastname: {
                    required: "Oops! You forgot to enter your last name.",
                    minlength: "The last name must consist of min 2 and max 50 characters. Please try again."
                },
                mobile: {
                    required: "Oops! You forgot to enter your mobile number.",
                    pattern: "The mobile number must consist of min 6 and max 15 numbers. Please try again."
                },
                birthDay: {
                    required: "Oops! You forgot to select the day of your birth."
                },
                birthMonth: {
                    required: "Oops! You forgot to select the month of your birth."
                },
                birthYear: {
                    required: "Oops! You forgot to select the year of your birth."
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).parents(".relative").removeClass(validClass).addClass(errorClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                if ($(element).is('select') && $(element).hasClass('required')) {
                    $(element).on('change', function () {
                        if ($(element).parents('.relative').find('select').find('option:selected').val() > 0) {
                            $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                        } else {
                            $(element).parents(".relative").removeClass(validClass).addClass(errorClass);
                        }
                    });
                } else {
                    if ($(element).attr('required') == 'required') {
                        $(element).parents('.relative').removeClass(errorClass).addClass(validClass);
                    }
                }

            },
            ignore: ':hidden:not(select)',
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },
            success: function (label) {
                if (label.attr('for') == 'confirm') {
                    var element = '#' + label.attr('for');
                    label.addClass('valid').text("Great! The passwords match.");
                } else {
                    label.addClass('hide');
                }
            }
        });
        // added by gayane
        if ($('#scrollbar1').length) {
            $('#scrollbar1').niceScroll({
                cursorcolor: "#C2C2C2",
                cursorwidth: "8px",
                cursorborder: "0"
            });
        }
        //Lina
        $('.footerLightbox').closest('.fancybox-outer').next().css({'right':'12px', 'top':'17px'});
    }
});
