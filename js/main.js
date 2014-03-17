/*
    requires:
    config.js
    DnDFileController.js
    fullscreen.js
    canvas.js
*/

var canvas = Canvas('container', config);
canvas.init();
/* 
    Click handler
*/
$('#fullscreen').click(function() {
    toggleFullScreen();
    // toggleFullScreen(document.querySelector('#container'));
});

$('#tier1').click(function() {
    canvas.addText(100, 100, 'Edit me!', 0);
    canvas.redraw();
    $('#download').hide();
});

$('#tier2').click(function() {
    canvas.addText(100, 100, 'Edit me!', 1);
    canvas.redraw();
    $('#download').hide();
});

$('#tier3').click(function() {
    canvas.addText(100, 100, 'Edit me!', 2);
    canvas.redraw();
    $('#download').hide();
});

$('#jpg').click(function() {
    canvas.redraw();
    canvas.getDataURL(function(dataUrl) {
        $('#download').attr('href', dataUrl)[0];
        $('#download').show();
    });
});

$('#ex').on('click', function() {
    var data = "text/json;charset=utf-8," + encodeURIComponent(canvas.exportAsJSON());
    $('#ex').attr('href', 'data:' + data);
    return true;
});

$('#im').click(function() {
    var json = prompt('Exported JSON:');
    if (json)
        canvas.importFromJSON(json);
});

$(window).resize(function() {
    canvas.resize();
});

var dnd = new DnDFileController('#container', function(files) {
    var f = files[0];

    if (!f.type.match('application/json')) {
        alert('Not a JSON file!');
    }

    var reader = new FileReader();
    reader.onloadend = function(e) {
        canvas.importFromJSON(this.result);
    };
    reader.readAsText(f);
});