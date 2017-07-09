/**
 *水波图
 * @author lifei
 * @param {Object} id
 */
function Wave(id) {
    var oWave = new Object;
    oWave.ctx = null;
    oWave.waveImage = null;
    oWave.canvasWidth = 0;
    oWave.canvasHeight = 0;
    oWave.needAnimate = true;
    oWave.id = id;
    oWave.progress = 0;

    var wave = document.getElementById(id);
    var canvas = document.createElement('canvas');
    if (!canvas.getContext)
        return;
    oWave.ctx = canvas.getContext('2d');
    canvasWidth = wave.offsetWidth;
    canvasHeight = wave.offsetWidth;
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    wave.appendChild(canvas);
    waveImage = new Image();
    waveImage.onload = function() {
        waveImage.onload = null;
        //callback();
    }
    waveImage.src = '../../image/wave.png';

    oWave.animate = function(prog) {
        oWave.progress = prog;
        var waveX = 0;
        var waveY = 0;
        var waveX_min = -203;
        var waveY_max = canvasHeight * oWave.progress;
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        function loop() {
            oWave.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            if (!oWave.needAnimate)
                return;
            if (waveY < waveY_max)
                waveY += 1.5;
            if (waveX < waveX_min)
                waveX = 0;
            else
                waveX -= 3;

            oWave.ctx.globalCompositeOperation = 'source-over';
            oWave.ctx.beginPath();
            oWave.ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight / 2, 0, Math.PI * 2, true);
            oWave.ctx.closePath();
            oWave.ctx.fill();

            oWave.ctx.globalCompositeOperation = 'source-in';
            oWave.ctx.drawImage(waveImage, waveX, canvasHeight - waveY);

            requestAnimationFrame(loop);
        }

        loop();
    }

    oWave.start = function(prog) {
        oWave.needAnimate = true;
        setTimeout(function() {
            if (oWave.needAnimate)
                oWave.animate(prog);
        }, 500);
    }
    oWave.stop = function() {
        oWave.needAnimate = false;
    }

    return oWave;
};

