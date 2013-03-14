//parameters with convenience functions for dat.gui to understand
//everything is JSON. subobjects render to subfolders named by their key
var paramsGUI = {

    shape : {
        display : 'selector',
        value: 'square',
        choices : ['square', 'circle'],
        onChange : function(val){
            shape.changeShape(val);
        }
    },

    //set display to none to avoid rendering in GUI
    //remains in the returned stripped params
    hiddenAttribute : {
        display : 'none',
        value : 'waldo'
    },

    transforms : {

        scale : {

            all : {
                display : 'range',
                value: 1,
                min : 0,
                max : 5,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            },

            x : {
                display : 'range',
                value : 1,
                min : 0,
                max : 5,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            },
            y : {
                display : 'range',
                value : 1,
                min : 0,
                max : 5,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            }

        },

        rotate : {
            x : {
                display : 'range',
                value : 0,
                min : 0,
                max : 360,
                step : 1,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            },
            y : {
                display : 'range',
                value : 0,
                min : 0,
                max : 360,
                step : 1,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            },
            z : {
                display : 'range',
                value : 0,
                min : 0,
                max : 360,
                step : 1,
                onChange : function(val){
                    shape.render();
                },
                listen : true
            }
        },
    },

    colors : {
        background : {
            display : 'color',
            value : [255,255,255],
            onChange : function(val){
                for (var i = 0; i < 3; i++)
                    val[i] = Math.round(val[i])

                document.body.style.backgroundColor = 'rgb(' + val.join(',') + ')';
            },
            listen : true
        },
        foreground : {
            display : 'color',
            value : [ 255, 0, 255 ],
            onChange : function(val){
                shape.render();
            },
            listen : true
        }
    }
    
};