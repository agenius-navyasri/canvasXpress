HTMLWidgets.widget({
    name : "canvasXpress",
    type : "output",

    factory: function(el, width, height) {
        var c = document.createElement('canvas');
        c.id = el.id + '-cx';
        c.width = width;
        c.height = height;
console.log('creating canvas with dim: ' + width + ' x ' + height);
        el.appendChild(c);

        return {
            id:     c.id,
            width:  c.width,
            height: c.height,

            renderValue: function(x) {
                try{
                    for (var i = 0; i < CanvasXpress.instances.length; i++) {
                        if (CanvasXpress.instances[i].target.match(c.id)) {
                            CanvasXpress.destroy(CanvasXpress.instances[i].target);
                        }
                    }
                }
                catch(err) {console.log(err);}
                if (!(x instanceof Array)) {
                    x.renderTo = c.id;
                    x.config.width = width;
                    x.config.height = height;
                    console.log(x.config);
                    new CanvasXpress(x);
                } else {
                    console.log('x is an array: ');
                    console.log(x);
                }
            },
            resize: function(w, h) {
console.log('resizing ' + c.id + ' to ' + w + ' x ' + h);
                cx = CanvasXpress.getObject(c.id);
                if (cx) {
                    cx.setDimensions(w, h);
                }
                else {
                    cx = CanvasXpress.getObject(c.id + '-1');
                    if (cx) {
                        cx.setDimensions(w, h);
                    }
                }
            },
            getImage: function() {
                cx = CanvasXpress.getObject(c.id);
                if (cx && cx.meta && cx.meta.base64) {
                    return cx.meta.base64;
                } else {
                    return false;
                }
            }
        };
    }
});
