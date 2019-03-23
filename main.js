


$(document).ready(function () {

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
    var tesi = $('#tesi')
    var body = $('body')
    var element = ''

    var cont = 0;

    tesi.hover(
        () => element = 'tesi',
        () => element = '')

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


    var cloned = false;
    // AL CLICK
    tesi.click(() => {

        var yposition = tesi.offset().top - $(window).scrollTop()
        var xposition = tesi.offset().left - $(window).scrollLeft()
        var projectheight = tesi.outerHeight()
        var projectwidth = tesi.outerWidth()

        body.css('overflow', 'hidden')

        cloned = $('#tesi')
            .clone()

        cloned
            .attr('id', 'cloned')
            .css('position', 'fixed')
            .css('top', yposition)
            .css('left', xposition)
            .css('height', projectheight)
            .css('width', projectwidth)

        cloned.appendTo('body');

        tesi.css('opacity', '0')

        tour()

        cloned.addClass('fullscreen');

        cloned.click(() => {
            cloned.toggleClass('fullscreen');
            untour();

            setTimeout(() => {
                cloned.remove()
                cloned = false;
                tesi.css('opacity', '1')
                body.css('overflow', 'auto')

            }, 1000);
        })

    })


})