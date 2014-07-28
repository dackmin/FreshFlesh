FF.Filter = {};


FF.Filter.getImageData = function(){
  return FF.Render.getContext().getImageData(0, 0, FF.Render.getWidth(), FF.Render.getHeight());
};


FF.Filter.applyFilter = function(filter, options){
  FF.Render.getContext().putImageData(filter(options),0,0);
};


FF.Filter.GrayScale = function(){
  var pixels = FF.Filters.getImageData();
  var d = pixels.data;

  for (var i=0; i<d.length; i+=4) {
    var r = d[i], g = d[i+1], b = d[i+2];
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }

  pixels.data = d;
  return pixels;
};


FF.Filter.Brightness = function(options){
    var value = options.brightness || 0;
    var pixels = FF.Filters.getImageData();
    var d = pixels.data;

    for (var i=0; i<d.length; i+=4) {
        d[i] += value;
        d[i+1] += value;
        d[i+2] += value;
    }

    pixels.data = d;
    return pixels;
};


FF.Filter.Threshold = function(options){
    var value = options.threshold || 127;
    var pixels = FF.Filters.getImageData();
    var d = pixels.data;

    for (var i=0; i<d.length; i+=4) {
        var r = d[i], g = d[i+1], b = d[i+2];
        var v = (0.2126*r + 0.7152*g + 0.0722*b >= value) ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v
    }

    pixels.data = d;
    return pixels;
};


FF.Filter.convoluteMatrixes = {
    sharpen : [
        0, -1,  0
       -1,  5, -1,
        0, -1,  0
    ],

    blur : [
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9
    ]
};


FF.Filter.convolute = function(matrix){
    var
        pixels = FF.Filters.getImageData(),
        side = Math.round(Math.sqrt(weights.length)),
        halfSide = Math.floor(side/2),
        src = pixels.data,
        sw = pixels.width,
        sh = pixels.height,
        w = sw,
        h = sh,
        output = {}, //Filters.createImageData(w, h),
        dst = output.data,
        alphaFac = 1,

    for (var y=0; y<h; y++) {
        for (var x=0; x<w; x++) {
            var sy = y, sx = x, dstOff = (y*w+x)*4;

            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r=0, g=0, b=0, a=0;

            for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;

                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy*sw+scx)*4;
                        var wt = weights[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }
                }
            }

            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }

    return output;
};


FF.Filter.Sharpen = function(){
    return FF.Filter.convolute(FF.Filter.convoluteMatrixes.sharpen);
};

FF.Filter.Blur = function(){
    return FF.Filter.convolute(FF.Filter.convoluteMatrixes.blur);
};
