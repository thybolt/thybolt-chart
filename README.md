# Thybolt-Chart 

A wrapper around react-vis for rapid data visualization. [Demo](https://thybolt.github.io/thybolt-chart/)

![https://i.imgur.com/yxmS13F.png](https://i.imgur.com/yxmS13F.png)

## Overview

Plot any kind of numeric data from any source. Create Bar, Lines or Scatter plots. Write minimal javascript code in-browser to update charts on the go.

Features:

* Script Directly from browser, enabling quick development
* Full Customizability including color, dash, width, 
* Auto Generated Legends
* Responsive Scaling
* Fast Scrolling and Zooming
* Table View

## Usage

install thybolt-chart  via

    npm install --save thybolt/thybolt-chart

Add Font-Awesome 5 to your index.html headers to render icons

    
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" >

Also add react-table.css for proper rendering of tables

	import "react-table/react-table.css";

import to your react js file by

    import ThyboltChart from "thybolt-chart";

and add

    <ThyboltChart
	    readonly
		descriptor={{
		    x: {
			    source: "return [...Array(10).keys()]"
			},
			y: [
			    {
			        source:"return [79,16,8,78,87,57,83,13,62,48]",
		                label: "y1"
                        }
			]
		}}
	/>

to obtain a plot of 10 numbers. Notice that we're writing js code as a string.

![https://i.imgur.com/0mHCLPc.png](https://i.imgur.com/0mHCLPc.png)

## External Data

Simply use the `data` prop to load data to chart. The `data` object will be available for use in the js code used to generate data. 

## Props

* `readonly (optional)` - Disables edit menu
* `color (optional)` - Sets the accent color for the chart
* `descriptor` - The only required prop. descriptor expects an Object of the format 
  
    	{
		    x: {
				source: "return [...Array(10).keys()]",
				title:"Test Graph",
				horizontalGrid: false,
				verticalGrid: false,
				xAxisVisible:true,
				yAxisVisible:true
			},
			y: [
				{
					source:"return [...]",
					label: "Y1",
					color:'blue',
					width:2,
					dash: "0",
					size: 0,
					scale: 1,
					offset: 0,
					type: "line",
					visible: "true"
				},
				....
			]
		}
    
    This object describes the "view" of how out data should be presented. `title, horizontalGrid, verticalGrid, xAxisVisible and yAxisVisible` are supposed to be plot specific and should be kept as properties if the x key. everything else is an attribute of a specific line/bar chart and should be part of elements of the `y` array. 
    
    `title` - Title name given for the chart which will be visible in the graph settings. 

	`horizontalGrid, verticalGrid, xAxisVisible, yAxisVisible` - Booleans to display grids and axes respectively.
    
    `source (required)` - an object with two keys: `x`(single string) and `y`(An array of js code as strings). These JS code strings are run in a [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) similar to this: `new Function('data', <string-code>) (<data-prop>)` to generate a 1 Dimensional array. The 1D array from x and y axes are plotted to generate the chart. The only requirement for the js code strings are that they return a valid array. The source strings can be edited in browser and save if all the axis methods are implemented correctly, so that changes are preserved.

    `label (required)` - a name given to a specific plot(bar/line/scatter) the chart. This name is used in the hover view and legends.

    `color` - color of the plot - accepts any css color value.

    `width` - width of the line/bar plot

    `dash` - "0" if you dont need dash. Any other value if you need dashes in charts. equivalent to svg stroke-dasharray.

    `size` - Sizes of 'Marks' in react-vis LineMarkSeries. Basically adds a circle in every node with radius `size`.

    `scale` - Multiplies this value with the generated array(a * scale + offset ). Only affects view. Hover display will still show actual value.

    `offset` - Adds this value with the generated array after any scale (a * scale + offset ). Only affects view. Hover display will still show actual value.

    `type` - Sets plot type to either `bar` or `line`.

    `visible` - set visibility

* `onChange(descriptor)` - returns the updated copy of the descriptor once changes are made in the UI Editor. Descriptor object can then be saved to a persistent storage.

* `data` - Prop to load external data. This object will be available inside plot source and can be referred to as data. The keys within this object will be listed in settings page for reference. 
*  `noScrollBar` - Do not show scrollbars
*  `noTable` - Do not show table button
*  `noButtonControl` - Do not show control buttons. Keyboard controls will work however. 
*  `noLegends` - Do not show legends
*  `initalGraphWindow` - The fraction of chart to be shown when loaded first time

## Used By


![https://static.wixstatic.com/media/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.png/v1/fill/w_236,h_79,al_c,q_80,usm_0.66_1.00_0.01/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.webp](https://static.wixstatic.com/media/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.png/v1/fill/w_236,h_79,al_c,q_80,usm_0.66_1.00_0.01/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.webp)

