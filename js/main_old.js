var stage = new Kinetic.Stage({
    container: 'container',
    width: $(window).width(),
    height: $(window).height()
});


var bg = new Kinetic.Rect({
    x: 0,
    y: 0,
    fill: '#272822',
    width: stage.width(),
    height: stage.height(),
});

var layer = new Kinetic.Layer();
var bglayer = new Kinetic.Layer();
bglayer.add(bg);
stage.add(bglayer);
stage.add(layer);

function DnDFileController(selector, onDropCallback) {
    var el_ = document.querySelector(selector);

    this.dragenter = function(e) {
        e.stopPropagation();
        e.preventDefault();
        el_.classList.add('dropping');
    };

    this.dragover = function(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    this.dragleave = function(e) {
        e.stopPropagation();
        e.preventDefault();
        //el_.classList.remove('dropping');
    };

    this.drop = function(e) {
        e.stopPropagation();
        e.preventDefault();

        el_.classList.remove('dropping');

        onDropCallback(e.dataTransfer.files, e);
    };

    el_.addEventListener('dragenter', this.dragenter, false);
    el_.addEventListener('dragover', this.dragover, false);
    el_.addEventListener('dragleave', this.dragleave, false);
    el_.addEventListener('drop', this.drop, false);
};

function toggleFullScreen() {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

$('#fullscreen').click(function() {
    toggleFullScreen();
});

function createText(x, y, text, size, underlined) {
    var group = new Kinetic.Group({
        x: x,
        y: y,
        draggable: true,
        name: 'textGrp'
    });

    var btnDelete = new Kinetic.Text({
        x: -20,
        y: -20,
        text: 'X',
        fontSize: 40,
        fontFamily: 'Lato',
        fill: '#FF9800',
        visible: false,
        name: 'btnDelete'
    });

    group.on('mouseover', function() {
        btnDelete.show();
        stage.draw();
    });

    group.on('mouseout', function() {
        btnDelete.hide();
        stage.draw();
    });

    btnDelete.on('click tap', function() {
        group.remove();
        stage.draw();
    });

    var simpleText = new Kinetic.Text({
        x: 0,
        y: 0,
        text: text,
        fontSize: size,
        fontFamily: 'Lato',
        fill: '#A4E402',
        name: 'txt'
    });

    if (underlined)
        var redLine = new Kinetic.Line({
            points: [0, simpleText.height() * 1.1, simpleText.width(), simpleText.height() * 1.1],
            stroke: '#FA1F6F',
            strokeWidth: 2,
            name: 'line'
        });

    simpleText.on('click tap', function(evt) {
        var n = prompt('New Text:', this.text());
        if (n) {
            this.setText(n);
            if (underlined)
                redLine.setPoints([0, simpleText.height() * 1.1, simpleText.width(), simpleText.height() * 1.1]);
            stage.draw();
        }
    });

    group.add(btnDelete);
    group.add(simpleText);
    if (underlined)
        group.add(redLine);

    return group;
}

function createTier1text(x, y, text) {
    return createText(x, y, text, 140, true);
};

function createTier2text(x, y, text) {
    return createText(x, y, text, 100, false);
};

function createTier3text(x, y, text) {
    return createText(x, y, text, 60, false);
};

function importJSON(json) {
    if (json) {
        var newLayer = Kinetic.Node.create(json);
        var texts = newLayer.find('.textGrp');
        texts.each(function(group) {
            (function(group) {
                var btnDelete = group.get('.btnDelete')[0];
                var redLine = null
                if (group.get('.line').length > 0)
                    redLine = group.get('.line')[0];
                var simpleText = group.get('.txt')[0];

                group.on('mouseover', function() {
                    btnDelete.show();
                    stage.draw();
                });

                group.on('mouseout', function() {
                    btnDelete.hide();
                    stage.draw();
                });

                btnDelete.on('click tap', function() {
                    group.remove();
                    stage.draw();
                });

                simpleText.on('click tap', function(evt) {
                    var n = prompt('New Text:', this.text());
                    if (n) {
                        this.setText(n);
                        if (redLine)
                            redLine.setPoints([0, simpleText.height() * 1.1, simpleText.width(), simpleText.height() * 1.1]);
                        stage.draw();
                    }
                });
                layer.add(group);
                $('#download').hide();
            })(group);
        });
        stage.draw();
    }
}

$('#tier1').click(function() {
    layer.add(createTier1text(100, 100, 'Edit me!'));
    stage.draw();
    $('#download').hide();
});

$('#tier2').click(function() {
    layer.add(createTier2text(100, 100, 'Edit me!'));
    stage.draw();
    $('#download').hide();
});

$('#tier3').click(function() {
    layer.add(createTier3text(100, 100, 'Edit me!'));
    stage.draw();
    $('#download').hide();
});

$('#jpg').click(function() {
    stage.draw();
    stage.toDataURL({
        mimeType: "image/jpeg",
        quality: 1,
        callback: function(dataUrl) {
            $('#download').attr('href', dataUrl)[0];
            $('#download').show();
        }
    });
});

$('#ex').on('click', function() {
    var data = "text/json;charset=utf-8," + encodeURIComponent(layer.toJSON());
    $('#ex').attr('href', 'data:' + data);
    return true;
});

$('#im').click(function() {
    var json = prompt('Exported JSON:');
    console.log(json);
    importJSON(json);
});

$(window).resize(function() {
    stage.setWidth($(window).width());
    stage.setHeight($(window).height());
    bg.setWidth($(window).width());
    bg.setHeight($(window).height());
    stage.draw();
});

var dnd = new DnDFileController('#container', function(files) {
    var f = files[0];

    if (!f.type.match('application/json')) {
        alert('Not a JSON file!');
    }

    var reader = new FileReader();
    reader.onloadend = function(e) {
        console.log(this.result);
        importJSON(this.result);
    };
    reader.readAsText(f);
});

var scale = 1;
var zoomFactor = 1.1;
var origin = {
    x: 0,
    y: 0
};

$(stage.content).on('mousewheel', function(event) {
    event.preventDefault();
    var evt = event.originalEvent,
        mx = evt.clientX /* - canvas.offsetLeft */ ,
        my = evt.clientY /* - canvas.offsetTop */ ,
        wheel = evt.wheelDelta / 120; //n or -n
    var zoom = (zoomFactor - (evt.wheelDelta < 0 ? 0.2 : 0));
    var newscale = scale * zoom;
    origin.x = mx / scale + origin.x - mx / newscale;
    origin.y = my / scale + origin.y - my / newscale;

    layer.scale({
        x: newscale,
        y: newscale
    });
    stage.draw();

    scale *= zoom;
});