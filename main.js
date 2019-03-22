


$(document).ready(function () {

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
    $(document).mousemove(function (event) {

        // MODIFICO VARIABILI MOUSE
        xmouse = event.pageX
        ymouse = event.pageY

        // FACCIA
        var xposition = face.offset().left - $(window).scrollLeft()
        var yposition = face.offset().top - $(window).scrollTop()
        var projectheight = face.outerHeight()
        var projectwidth = face.outerWidth()
        var xdelta = xmouse - xposition - (projectwidth/2)
        var ydelta = ymouse - yposition - (projectheight/2)
        var distance = Math.sqrt( (xdelta*xdelta) + (ydelta*ydelta) )

        // CALCOLO ANGOLO
        var coseno = xdelta / distance
        var angolo
        if (ydelta < 0) {
            angolo = Math.acos( coseno )
        } else {
            angolo = Math.PI*2 - Math.acos( coseno )
        }
        angolo = angolo / (Math.PI*2) * 360

        // CALCOLO IN QUADRATINO
        if (distance < $(window).height()) {
            quadratino
            .css('visibility', 'visible')
            .css('width', distance)
            .css('top', yposition + projectheight/2)
            .css('left', xposition + projectwidth/2)
            .css('transform', 'rotate('+angolo*-1+'deg)')

            if (xdelta > 0) {
                face
                .css('transform', 'scaleX(-1) rotate('+angolo+'deg)')
            } else {
                face
                .css('transform', 'scaleX(-1) scaleY(-1) rotate('+angolo*-1+'deg)')
            }
        } else {
            quadratino
            .css('visibility', 'hidden')

            face
            .css('transform', 'rotate(0deg)')
        }

        // DISPLAY DELLE INFORMAZIONI
        xxx.html(`
            x mouse: ${xmouse} <br>
            y mouse: ${ymouse} <br>
            x face: ${xposition} <br>
            y face: ${yposition} <br>
            x delta: ${ xdelta } <br>
            y delta: ${ ydelta } <br>
            distance: ${ distance } <br>
            angolo: ${ angolo } <br>
                `
        )
    })


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
            .attr('id', 'cloned')
            .css('position', 'fixed')
            .css('top', yposition)
            .css('left', xposition)
            .css('height', projectheight)
            .css('width', projectwidth)

        //$('#mesection, #workssection').toggleClass('noshadow')

        cloned.prependTo('body');

        tesi.css('opacity', '0')

        setTimeout(() => {
            cloned.addClass('fullscreen');
        }, 100);

        cloned.click(() => {
            cloned.toggleClass('fullscreen');
            //$('#mesection, #workssection').toggleClass('noshadow')
            
            setTimeout(() => {
                cloned.remove()
                cloned = false;
                tesi.css('opacity', '1')
                body.css('overflow', 'auto')
            }, 1000);
        })
    })

})