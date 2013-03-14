function Shape(params){
    this.params = params;
    this.el = document.getElementById('shape');
    this.render();
    this.shape = 'square';
};

Shape.prototype = {

    changeShape : function(val){
        switch (val){
            case 'circle':
                this.el.style.borderRadius = this.el.clientWidth/2 + 'px';
                break;
            case 'square':
                this.el.style.borderRadius = 0;
                break;
        }
    },
    render : function(){
        this.clear();
        this.rotate();
        this.scale();
        this.fill();
    },

    clear : function(){
        this.el.style.webkitTransform = '';
        this.el.style.MozTransform = '';
    },

    rotate : function(){
        var rotate3 = this.params.transforms.rotate;
        var rotateX = Math.round(rotate3.x);
        var rotateY = Math.round(rotate3.y);
        var rotateZ = Math.round(rotate3.z);

        this.el.style.webkitTransform += '' + 
            'rotateX(' + rotateX + 'deg)' + 
            'rotateY(' + rotateY + 'deg)' +
            'rotateZ(' + rotateZ + 'deg)';

        this.el.style.MozTransform += '' + 
        'rotateX(' + rotateX + 'deg)' + 
        'rotateY(' + rotateY + 'deg)' +
        'rotateZ(' + rotateZ + 'deg)';
    },

    scale : function(){
        var scale3   = this.params.transforms.scale;
        var scaleAll = scale3.all;
        var scaleX   = scaleAll * scale3.x;
        var scaleY   = scaleAll * scale3.y;

        this.el.style.webkitTransform += 'scale(' + scaleX + ',' + scaleY + ')';
        this.el.style.MozTransform += 'scale(' + scaleX + ',' + scaleY + ')';
    },

    fill : function(){
        var color = this.params.colors.foreground;
        for (var i = 0; i < 3; i++)
            color[i] = Math.round(color[i])
        this.el.style.backgroundColor = 'rgb(' + color.join(',') + ')';
    },

    dance : function(){
        var rotate3 = this.params.transforms.rotate;
        var scale3 = this.params.transforms.scale;
        var fg = this.params.colors.foreground;

        function danceBaby(){
            rotate3.z = 100*Math.random();
            for (var i in gui.__controllers) {
                gui.__controllers[i].updateDisplay();
              }
        }
        window.setInterval(danceBaby,00);
    }
}