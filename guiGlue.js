//returns params, a stripped version of paramsGUI, without all the GUI fluff
function guiGlue(paramsGUI, optionsGUI){

    //pass options to GUI e.g., { autoPlace: false }
    optionsGUI = optionsGUI || {};

    //extra parameter whether you want folders open or closed
    optionsGUI.folded = optionsGUI.folded || false;

    // params is a stripped version of paramsGUI, where everything
    // but its default attributes have been removed
    var params = {};
    var gui = renderParameters(paramsGUI, optionsGUI, params);

    //return stripped parameter object
    return params;

    function renderParameters(paramsGUI, optionsGUI, params){
    
        //initial creation    
        var gui = new dat.GUI(optionsGUI);

        //walk the parameter tree
        unfurl(paramsGUI, gui, params);

        function unfurl(obj, folder, params){

            for (var key in obj){

                var subObj = obj[key];
                var leaf = isLeaf(subObj);
                
                if (leaf){
                    addToFolder(key, obj, subObj, folder, params);
                }
                else{ 
                    //is folder
                    var subfolder = folder.addFolder(key);
                    if (!optionsGUI.folded)
                        subfolder.open();

                    params[key] = {};
                    unfurl(obj[key], subfolder, params[key]);
                }

            }

            //a leaf object is one that contains no other objects
            //it is critical that none of the tracked parameters is itself an object
            function isLeaf(obj){

                var Leaf = true;
                for (var key in obj){

                    if (key === 'choices' && obj.display === 'selector') continue;

                    if (Leaf){
                        var isObj = (Object.prototype.toString.call( obj[key] ) != '[object Object]');
                        Leaf = Leaf && isObj;
                    }
                    else
                        continue;
                }

                return Leaf;

            }

        }

        function addToFolder(key, obj, options, folder, params){

            var handle;
            params[key] = options.value;

            var display = options.display || '';

            switch (display){
                case 'range':
                    if (options.step)
                        handle = folder.add(params, key, options.min, options.max).step(options.step);
                    else
                        handle = folder.add(params, key, options.min, options.max);
                    break;
                case 'selector':
                    handle = folder.add(params, key, options.choices);
                    break;
                case 'color':
                    handle = folder.addColor(params, key);
                    break;
                case 'none':
                    break;
                default:
                    handle = folder.add(params, key);
                    break;
            }

            if (handle && options.onChange)
                handle.onChange(options.onChange);

            if (handle && options.onFinishChange)
                handle.onChange(options.onFinishChange);

            if (handle && options.listen)
                handle.listen();

        }

        return gui;

    }

}