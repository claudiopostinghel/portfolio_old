


$(document).ready(function () {

    var link = $(location).attr("href")
    var whichproject = link.split('#')[1]
    // alert(whichproject)
    document.getElementById("citybikes").scrollIntoView();

    

    // $('body,html').animate({
    //     'scrollTop': 0
    // }, 200);

    $('body,html').animate({
        'scrollTop': $( '#'+"citybikes" ).offset().top - ( $(window).height()/2 + $( '#'+"citybikes" ).outerHeight72 )
    }, 200);



    var isTour = false;

    //open interest point description
    $('.cd-single-point').children('a').on('click', function () {
        var selectedPoint = $(this).parent('li');
        if (selectedPoint.hasClass('is-open')) {
            selectedPoint.removeClass('is-open').addClass('visited');
        } else {
            selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
        }
    });



    //close interest point description
    $('.cd-close-info').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
    });

    //on desktop, switch from product intro div to product mockup div
    // $('#cd-start').on('click', 
    function tour() {
        // event.preventDefault();
        //detect the CSS media query using .cd-product-intro::before content value
        var mq = window.getComputedStyle(document.querySelector('.cd-product-mockup'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
        if (mq == 'mobile') {
            $('body,html').animate({ 'scrollTop': $($(this).attr('href')).offset().top }, 200);
        } else {
            $('.cd-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('.cd-close-product-tour').addClass('is-visible');
                $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
                    $(this).addClass('points-pulsing');
                });
            });
        }
        isTour = true;
    };

    //on desktop, switch from product mockup div to product intro div
    // $('.cd-close-product-tour').on('click',
    function untour() {
        $('.cd-product').removeClass('is-product-tour');
        $('.cd-close-product-tour').removeClass('is-visible');
        $('.cd-points-container').removeClass('points-enlarged points-pulsing');
        isTour = false;
    };


    // QUADRATINO
    var xxx = $('#xxx')
    var face = $('#face')
    var quadratino = $('#quadratino')
    var body = $('body')
    var element = ''

    var cont = 0;

    // VARIABILI DI POSIZIONE
    var xmouse = 0
    var ymouse = 0

    // MOUSEMOVE
    // $(document).mousemove(function (event) {

    //     // MODIFICO VARIABILI MOUSE
    //     xmouse = event.pageX
    //     ymouse = event.pageY

    //     // FACCIA
    //     var xposition = face.offset().left - $(window).scrollLeft()
    //     var yposition = face.offset().top - $(window).scrollTop()
    //     var projectheight = face.outerHeight()
    //     var projectwidth = face.outerWidth()
    //     var xdelta = xmouse - xposition - (projectwidth / 2)
    //     var ydelta = ymouse - yposition - (projectheight / 2)
    //     var distance = Math.sqrt((xdelta * xdelta) + (ydelta * ydelta))

    //     // CALCOLO ANGOLO
    //     var coseno = xdelta / distance
    //     var angolo
    //     if (ydelta < 0) {
    //         angolo = Math.acos(coseno)
    //     } else {
    //         angolo = Math.PI * 2 - Math.acos(coseno)
    //     }
    //     angolo = angolo / (Math.PI * 2) * 360

    //     // DISPLAY DELLE INFORMAZIONI
    //     xxx.html(`
    //             projectwidth: ${projectwidth} <br>
    //             angolo: ${angolo} <br>
    //                 `
    //     )

    //     // CALCOLO IN QUADRATINO
    //     if (distance < $(window).height()) {
    //         quadratino
    //             .css('visibility', 'visible')
    //             .css('width', distance)
    //             .css('top', yposition + projectheight / 2)
    //             .css('left', xposition + projectwidth / 2)
    //             .css('transform', 'rotate(' + angolo * -1 + 'deg)')

    //         if (xdelta > 0) {
    //             face
    //                 .css('transform', 'scaleX(-1) rotate(' + angolo + 'deg)')
    //         } else {
    //             face
    //                 .css('transform', 'scaleX(-1) scaleY(-1) rotate(' + angolo * -1 + 'deg)')
    //         }
    //     } else {
    //         quadratino
    //             .css('visibility', 'hidden')

    //         face
    //             .css('transform', 'rotate(0deg)')
    //     }

    // })


    // AL CLICK
    $('.project:not(.disabled)').each(function(project) {
        var cloned
        
        $( this ).click(() => {
    
            // VARIABLES
            var yposition = $( this ).offset().top - $(window).scrollTop()
            var xposition = $( this ).offset().left - $(window).scrollLeft()
            var projectheight = $( this ).outerHeight()
            var projectwidth = $( this ).outerWidth()
    
            // PREVENT BODY SCROLL
            body.css('overflow', 'hidden')
    
            // CLONING THE PROJECT
            cloned = $( this )
                .clone()
    
            // ATTRIBUTES
            cloned
                .attr('id', 'cloned')
                .css('position', 'fixed')
                .css('top', yposition)
                .css('left', xposition)
                .css('height', projectheight)
                .css('width', projectwidth)
    
            // BINDING ONCLICK EVENT
            cloned.click(() => {
                cloned.animate({
                    scrollTop: 0
                }, 300);
                    cloned.removeClass('fullscreen');
                    $('#fakebody').css('filter', 'blur(0px)')
                    $('#fakebody').css('transform', 'scaleX(1)')
                    // untour();
    
                    setTimeout(() => {
                        cloned.remove()
                        cloned = false;
                        $( this ).css('opacity', '1')
                        body.css('overflow', 'auto')
    
                    }, 1000);
                })

            // BINDING ESC KEY
            $('body').keyup(function(e) {
                if (e.key === "Escape") { // escape key maps to keycode `27`
                   // <DO YOUR WORK HERE>
                   untour();
               }
           });
    
            // FINALLY APPEND TO BODY
            cloned.appendTo('body');
    
            $( this ).css('opacity', '0')
            $('#fakebody').css('filter', 'blur(15px)')
            $('#fakebody').css('transform', 'scaleX(0.95)')
    
            // tour()
    
            setTimeout(() => {
                cloned.addClass('fullscreen');
            }, 1);
    
        })
        
      });



})