var Canvas = function(_elemID, _config) {
    var stage = null;
    var layerBG = null;
    var layerText = null;
    var arrTexts = [];
    var config = _config;
    /*
        Elements
    */
    var rectBG = null;
    var imgObj = null;

    function init() {
        stage = new Kinetic.Stage({
            container: _elemID,
            width: config.width,
            height: config.height
        });

        layerBG = new Kinetic.Layer();
        layerText = new Kinetic.Layer();
        stage.add(layerBG);
        stage.add(layerText);
        arrTexts = [];


        rectBG = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imgObj,
            width: config.width,
            height: config.height
        });
        rectBG.isfilter = false;
        rectBG.cache();
        layerBG.add(rectBG);


        stage.draw();
        rectBG.draw();
        // // handle resize?
    };

    function setupTextHandler(group, groupHover, btnDelete, simpleText, rectCB, groupChecked, redLine, lineFinished, underlined) {
        simpleText.on('click dbltap', function(evt) {
            var n = prompt('New Text:', this.text());
            if (n) {
                this.setText(n);
                if (underlined)
                    redLine.setPoints([0, simpleText.height() * 1.1, simpleText.width(), simpleText.height() * 1.1]);
                lineFinished.setPoints([-5, simpleText.height() * 0.5, simpleText.width() + 5, simpleText.height() * 0.5]);
                stage.draw();
            }
        });


        group.on('mouseover mouseout tap', function() {
            if (group.vis) {
                groupHover.hide();
            } else {
                groupHover.show();
            }
            group.vis = !group.vis;
            stage.draw();
        });

        btnDelete.on('click tap', function() {
            group.remove();
            stage.draw();
        });

        rectCB.on('click tap', function() {
            if (group.checked) {
                groupChecked.hide();
                lineFinished.hide();
            } else {
                groupChecked.show();
                lineFinished.show();
            }
            group.checked = !group.checked;
            stage.draw();
        });

        tri.on('click tap', function() {
            if (group.checked) {
                groupChecked.hide();
                lineFinished.hide();
            } else {
                groupChecked.show();
                lineFinished.show();
            }
            group.checked = !group.checked;
            stage.draw();
        });
    }


    function setupTriHandler(group, btnDelete, tri, groupChecked) {


        btnDelete.on('click tap', function() {
            group.remove();
            stage.draw();
        });

        tri.on('click tap', function() {
            console.log("------------CLICK-----------   " + group.checked);
            console.log(groupChecked);


            if (!group.checked) {
                groupChecked.hide();
            } else {
                groupChecked.show();
            }
            group.checked = !group.checked;
            stage.draw();
        });
    }


    function addTriangle() {
        var group = new Kinetic.Group({
            x: 100,
            y: 100,
            draggable: true,
            name: 'trigrp'
        });
        group.checked = true;

        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

        var tri = new Kinetic.Star({
            x: stage.width() / 4,
            y: stage.height() / 4,
            numPoints: 3,
            innerRadius: 180,
            outerRadius: 90,
            stroke: color,
            strokeWidth: 25,
            opacity: 0.4
        });
        tri.shadowColor(color);
        tri.shadowBlur(100);
        tri.shadowOpacity(1);
        tri.shadowOffsetX(0);
        tri.shadowEnabled(true);
        group.add(tri);
        layerText.add(group);

        var tSize = tri.height();
        var groupChecked = new Kinetic.Group({
            x: -tSize / 2,
            y: tSize / 4,
            name: 'cbCross',
            visible: true
        });
        var lineCB1 = new Kinetic.Line({
            points: [0, 0, (tSize / 2), tSize / 2],
            stroke: '#FF9800',
            strokeWidth: 1
        });
        var lineCB2 = new Kinetic.Line({
            points: [(tSize / 2), 0, 0, tSize / 2],
            stroke: '#FF9800',
            strokeWidth: 1
        });

        var btnDelete = new Kinetic.Text({
            x: -20,
            y: -20,
            text: 'X',
            fontSize: 40,
            fontFamily: 'Lato',
            fill: '#FF9800',
            name: 'btnDelete'
        });

        groupChecked.add(btnDelete);
        groupChecked.add(lineCB1);
        groupChecked.add(lineCB2);
        group.add(groupChecked);
        setupTriHandler(group, btnDelete, tri, groupChecked);

    }

    function addText(x, y, text, type) {
        var textColor = config.colors.text[type];
        var textSize = config.sizes.text[type];
        var lineColor = config.colors.line[type];
        var lineWidth = config.sizes.line[type];
        var underlined = lineWidth > 0;


        var group = new Kinetic.Group({
            x: x,
            y: y,
            draggable: true,
            name: 'textGrp'
        });

        var groupHover = new Kinetic.Group({
            name: 'hover',
            visible: false
        });

        var btnDelete = new Kinetic.Text({
            x: -20,
            y: -20,
            text: 'X',
            fontSize: 40,
            fontFamily: 'Lato',
            fill: '#FF9800',
            name: 'btnDelete'
        });

        var simpleText = new Kinetic.Text({
            x: 0,
            y: 0,
            text: text,
            fontSize: textSize,
            fontFamily: 'Lato',
            fill: textColor,
            name: 'txt'
        });

        var tSize = simpleText.height();
        var rectCB = new Kinetic.Rect({
            x: -tSize / 2,
            y: tSize / 4,
            width: tSize / 2,
            height: tSize / 2,
            stroke: '#FF9800',
            strokeWidth: 1,
            name: 'cb'
        });

        group.vis = false;
        group.checked = false;

        var groupChecked = new Kinetic.Group({
            x: -tSize / 2,
            y: tSize / 4,
            name: 'cbCross',
            visible: false
        });
        var lineCB1 = new Kinetic.Line({
            points: [0, 0, (tSize / 2), tSize / 2],
            stroke: '#FF9800',
            strokeWidth: 1
        });
        var lineCB2 = new Kinetic.Line({
            points: [(tSize / 2), 0, 0, tSize / 2],
            stroke: '#FF9800',
            strokeWidth: 1
        });

        groupChecked.add(lineCB1);
        groupChecked.add(lineCB2);

        if (underlined)
            var redLine = new Kinetic.Line({
                points: [0, simpleText.height() * 1.1, simpleText.width(), simpleText.height() * 1.1],
                stroke: lineColor,
                strokeWidth: lineWidth,
                name: 'line'
            });

        var lineFinished = new Kinetic.Line({
            points: [-5, simpleText.height() * 0.5, simpleText.width() + 5, simpleText.height() * 0.5],
            stroke: '#FF9800',
            strokeWidth: 5,
            name: 'lineFinished',
            visible: false
        });

        setupTextHandler(group, groupHover, btnDelete, simpleText, rectCB, groupChecked, redLine, lineFinished, underlined);

        groupHover.add(rectCB);
        groupHover.add(groupChecked);
        groupHover.add(btnDelete);

        group.add(groupHover);
        group.add(simpleText);
        group.add(lineFinished);
        if (underlined)
            group.add(redLine);

        layerText.add(group);
        arrTexts.push({
            type: type,
            node: group
        });

        return group;
    };



    function addFilter(n) {
        rectBG.cache();
        switch (n) {
            case 0:
                (rectBG.isfilter && Kinetic.Filters.Grayscale.toString() == rectBG.filters().toString()) ? (rectBG.isfilter = false, rectBG.filters([])) : (rectBG.isfilter = true, rectBG.filters([Kinetic.Filters.Grayscale]));
                stage.draw();
                break;
            case 1:

                (rectBG.isfilter && Kinetic.Filters.Sepia.toString() == rectBG.filters().toString()) ? (rectBG.isfilter = false, rectBG.filters([])) : (rectBG.isfilter = true, rectBG.filters([Kinetic.Filters.Sepia]));
                stage.draw();
                break;
            case 2:
                (rectBG.isfilter && Kinetic.Filters.Noise.toString() == rectBG.filters().toString()) ? (rectBG.isfilter = false, rectBG.filters([])) : (rectBG.isfilter = true, rectBG.filters([Kinetic.Filters.Noise]));
                stage.draw();
                break;
        }
    }


    function exportAsJSON() {
        return layerText.toJSON();
    };

    function importFromJSON(json) {
        var newLayer = Kinetic.Node.create(json);
        var texts = newLayer.find('.textGrp');
        texts.each(function(group) {
            (function(group) {
                var btnDelete = group.get('.btnDelete')[0];
                var groupHover = group.get('.hover')[0];
                var rectCB = group.get('.cb')[0];
                var groupChecked = group.get('.cbCross')[0];
                var lineFinished = group.get('.lineFinished')[0];
                var redLine = null
                var underlined = false;
                if (group.get('.line').length > 0) {
                    redLine = group.get('.line')[0];
                    underlined = true;
                }
                var simpleText = group.get('.txt')[0];

                group.vis = false;
                group.checked = false;

                setupTextHandler(group, groupHover, btnDelete, simpleText, rectCB, groupChecked, redLine, lineFinished, underlined);

                layerText.add(group);
                $('#download').hide();
            })(group);
        });
        stage.draw();
    };

    function redraw() {
        stage.draw();
    };

    function getDataURL(cb) {
        stage.toDataURL({
            mimeType: "image/jpeg",
            quality: 1,
            callback: cb
        });
    };

    function resize(w, h) {
        w = w || $(window).width();
        h = h || $(window).height();
        stage.setWidth(w);
        stage.setHeight(h);
        rectBG.setWidth(w);
        rectBG.setHeight(h);
        redraw();
    };

    function imgLoad(src, callback) {
        imgObj = new Image();
        imgObj.src = src;

        imgObj.onload = function() {
            callback();
        };

    }

    return {
        addFilter: addFilter,
        addTriangle: addTriangle,
        imgLoad: imgLoad,
        init: init,
        addText: addText,
        exportAsJSON: exportAsJSON,
        importFromJSON: importFromJSON,
        redraw: redraw,
        getDataURL: getDataURL,
        resize: resize
    }
};