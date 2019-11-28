// 用于报表内容全屏显示
function handleFullScreen(de, isFullScreen) {
    const element = de;
    let isFull = isFullScreen;
    if (isFull) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
    }

    isFull = !isFull;
    return isFull;
}

// 检测是否是全屏
function isFullscreenForNoScroll(de) {
    const element = de;
    let isFulls = element.fullscreenEnabled || element.fullScreen || element.webkitIsFullScreen || element.msFullscreenEnabled;
    // eslint-disable-next-line no-debugger
    // debugger;
    if (isFulls === undefined) isFulls = false;
    return isFulls;
}

export default {
    handleFullScreen,
    isFullscreenForNoScroll,
};
