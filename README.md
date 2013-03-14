guiGlue.js
================================

Google's [dat.gui] (http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) is a great tool for exposing parameters in a web experiment, however I found the syntax cumbersome. I wanted a simple way to abstract all the parameters needed, with all the neat options dat.gui supports, like min/max for range values, and options for selectors, and onChange events and listeners and stepping etc etc, but I wanted to define them all in one place.

How it works
-------------------------------

*Insead of*

	params = {
	  var1 : 0.8,
	  var2 : 10
	};

	window.onload = function() {
	  var gui = new dat.GUI();
	  gui.add(params, 'var1', -5, 5);
	  gui.add(params, 'var2').onChange(function(){ ... });
	};

*We do...*

	params = {
		var1 : {
			type : 'range',
			value : 0.8,
			min : -5,
			max : 5
		},
		var2 : {
			type : 'range',
			value : 0.8,
			onChange : function(){ ... }
		}
	}

No more magic variables defined in the GUI as opposed to in your parameter folder!

Subfolders
-------------------------------------

Best of all... automatic subfolders! Just make nested JSON objects.

	params = {
		folder1 : {
			var1 : {
				type : 'range',
				value : 0.8,
				min : -5,
				max : 5
			},
			var2 : {
				type : 'range',
				value : 0.8,
				onChange : function(){ ... }
			},
			subFolder : {
				var1 : {
					type : 'selector',
					value : 'a',
					options : ['a', 'b', 'c']
				},
				subsubFolder : {
					var1 : {
						type : 'color',
						value : '#bada55',
						listen : true
					}
				}			
			}
		},
		folder2 : {
			var1 : {
				type : 'range',
				value : 1,
				min: 0,
				max: 1,
				step: .1
			}
		}	
	}

Stripped Parameter File
-----------------------------------

