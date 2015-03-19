guiGlue.js - a dat.gui wrapper
================================

Google's [dat.gui](http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) is a great tool for exposing parameters in a web experiment, however I found the syntax cumbersome. I wanted a simple way to abstract all the parameters needed, with all the neat options dat.gui supports, like min/max for range values, and options for selectors, and onChange events and listeners and stepping etc etc, but I wanted to define them all in one place.

How it works
--------------------------------

*Insead of...*

	var params = {
	  var1 : 'a',
	  var2 : 1
	};

	window.onload = function() {
	  var gui = new dat.GUI();
	  gui.add(params, 'var1', {'a', 'b', 'c'});
	  gui.add(params, 'var2', 0, 1).step(0.01).onChange(function(){ ... });
	};

*We do...*

	var params = {
		var1 : {
			display : 'selector',
			value : 'a',
			options : {'choice 1':'value 1', 'choice 2':'value 2', 'choice 3':'value 3'}
		},
		var2 : {
			display : 'range',
			value : 1,
			min : 0,
			max : 1,
			step : 0.01,
			onChange : function(){ ... }
		}
	};

	window.onload = function(){
		guiGlue(paramsGUI);
	};

Looks like more lines of code! Well, yes it is, but there are no more magic variables defined in the GUI as opposed to in your parameter file!... You'll thank me later.

Subfolders
-------------------------------------

Best of all... automatic subfolders! Just make nested JSON objects.

	var params = {
		folder1 : {
			var1 : {
				display : 'range',
				value : 0.8,
				min : -5,
				max : 5
			},
			var2 : {
				display : 'range',
				value : 1,
				min : 0,
				max : 1,
				step : .01,
				onChange : function(){ ... }
			},
			subFolder : {
				var1 : {
					display : 'selector',
					value : 'a',
					options : ['a', 'b', 'c'],
					listen : true
				},
				subsubFolder : {
					var1 : {
						display : 'color',
						value : '#bada55',
						listen : true
					}
				}			
			}
		},
		folder2 : {
			var1 : {
				display : 'range',
				value : 1,
				min: 0,
				max: 1
			}
		}	
	};

Stripped Parameter File
-----------------------------------

The parameter object can get pretty bloated. Though dat.gui may need all the min/max stuff, your code likely doesn't. Because of this, a call to guiGlue returns a stripped version of the parameter file, where all that remains are the value keys. For example

	var params = {
		var1 : {
			display : 'selector',
			value : 'a',
			options : {'choice 1':'value 1', 'choice 2':'value 2', 'choice 3':'value 3'},
			onChange : function(value) {}
		},
		var2 : {
			display : 'range',
			value : 1,
			min : 0,
			max : 1,
			step : 0.01,
			onChange : function(){ ... }
		}
	};

	var params = guiGlue(paramsGUI);	//params = {var1 : 'a', var2 : 1}

This works as you'd expect for nested objects. The most important part is that these stripped parameters are still synced with the GUI. Changes in the GUI change the value of the parameter, and if <code>{listen : true}</code> is set, then changes in the parameter are mirrored in the GUI.

Options
-----------------------------------

Pass any options defined for dat.gui into guiGlue via an optional (no pun intended) second parameter.

	guiGlue(paramsGUI, options);

We add one extra options currently, which is whether you want your folders auto-expanded or not. To collapse all folders pass in <code>{folded : true}</code>, otherwise it defaults to <code>{folded : false}</code>.

