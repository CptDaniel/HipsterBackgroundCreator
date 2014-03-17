function toggleFullScreen(elem) {
    elem = elem || document.documentElement;
    if (!elem.fullscreenElement && // alternative standard method
        !elem.mozFullScreenElement && !elem.webkitFullscreenElement && !elem.msFullscreenElement) { // current working methods
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (elem.exitFullscreen) {
            elem.exitFullscreen();
        } else if (elem.msExitFullscreen) {
            elem.msExitFullscreen();
        } else if (elem.mozCancelFullScreen) {
            elem.mozCancelFullScreen();
        } else if (elem.webkitExitFullscreen) {
            elem.webkitExitFullscreen();
        }
    }
};