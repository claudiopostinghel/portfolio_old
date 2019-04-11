


$(document).ready(function () {

    // ANDROID BAR ISSUE
    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    function goToProject(whichproject) {
        if (whichproject) {
            $('html').animate({
                scrollTop: $('#' + whichproject).offset().top + $('#' + whichproject).outerHeight() / 2 - $(window).outerHeight() / 2
            }, 700, () => {
                makeFullscreen($('#' + whichproject))
            });
        }
    }
    // function goToProjectSamePage(projectName) {
    //     if (closeCurrent) {
    //         closeCurrent()
    //         setTimeout(() => {
    //             goToProject( projectName )
    //         }, 700);
    //     }
    // }
    goToProject( $(location).attr("href").split('#')[1] )

    function x() {
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
    }


    // QUADRATINO
    var xxx = $('#xxx')
    var face = $('#face')
    var quadratino = $('#quadratino')
    var body = $('body')
    var html = $('html')
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
    var closeCurrent = false
    function makeFullscreen(el) {
        // 1) PREVENT BODY SCROLL
        body.css('overflow', 'hidden');
        html.css('overflow', 'hidden');

        // 2) CLONING THE PROJECT
        var cloned = el
            .clone()

        // 4) STYLING
        cloned
            .attr('id', 'cloned')
            .css('left', el.offset().left)
            .css('top', el.offset().top - $(window).scrollTop())
            .css('width', el.outerWidth())
            .css('height', el.outerHeight()) // JUST IN CASE

        // 6) APPEND AND APPLY FULLSCREEN
        cloned.appendTo('body')
        setTimeout(() => {
            cloned.addClass('fullscreen');
            setTimeout(() => {
                $('#xbutton').css('opacity', '1')
                $('#xbutton').css('top', '30px')
            }, 200);
        }, 100);

        // 7) LOADING CONTENT
        var linkToImport = cloned.attr("import");
        console.log(linkToImport);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", linkToImport);
        xhr.onload = function () {
            cloned.append(xhr.responseText)
        }
        xhr.send();


        // $('#somemagic').show(100, () => {
        //     console.log(5);
        //     $('#somemagic').css('opacity', '1')
        //     // $('#fakebody').css('filter', 'blur(15px)')
        //     // $('#fakebody').css('transform', 'scaleX(0.95)')
        //     // 
        // })

        // REVERSE
        function reverse() {
            cloned.animate({
                scrollTop: 0
            }, 300);
            cloned.css('overflow', 'hidden')
            cloned.removeClass('fullscreen')
            $('#xbutton').css('opacity', '0')
            $('#xbutton').css('top', '-50px')
            // $('#fakebody').css('filter', 'blur(0px)')
            // $('#fakebody').css('transform', 'scaleX(1)')
            // untour();

            setTimeout(() => {
                cloned.remove()
                cloned = false;
                el.css('opacity', '1')
                body.css('overflow', 'auto')
                html.css('overflow', 'auto')

            }, 1000);

            $('#xbutton').unbind()
            $(document).unbind()
        }
        closeCurrent = function () {
            reverse()
        }

        // BINDING XBUTTON
        $('#xbutton').click(reverse)
        // BINDING ESC KEY
        $(document).keyup(function (e) { if (e.key === "Escape") { reverse() } });
    }

    $('.project:not(.disabled)').each(function () {
        var project = $(this)
        project.click(() => { makeFullscreen(project) })
    });

})