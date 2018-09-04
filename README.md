# Thybolt-Chart 

Version 0.1.0

A wrapper around react-vis for rapid data visualization. 

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

import to your react js file by

    import ThyboltChart from "thybolt-chart";

add the following code to your render 

    <ThyboltChart
	    meta={{
		title: "Sample",
		source: {
			x: "return [...Array(10).keys()]",
			y: ["return [34,22,4,21,99,54,75,87,93,32]"]
		},
		label: ["y 1"],
		color: [""],
		width: ["2"],
		dash: ["0"],
		size: ["0"],
		scale: ["1"],
		offset: ["0"],
		type: ["line"],
		visible: ["true"]
	    }}
    />

to obtain a plot of 10 numbers. Notice that we're writing js code as a string.

![https://i.imgur.com/vxibr8k.png](https://i.imgur.com/vxibr8k.png)

## External Data

Simply use the `data` prop to load data to chart. The `data` object will be available for use in the js code used to generate data. 

## Props

* `meta` - The only required prop. meta expects an Object of the format 
  
    `{
		title: "Sample",
		source: {
			x: "return [...Array(10).keys()]",
			y: ["return [34,22,4,21,99,54,75,87,93,32]"]
		},
		label: ["y 1"],
		color: [""],
		width: ["2"],
		dash: ["0"],
		size: ["0"],
		scale: ["1"],
		offset: ["0"],
		type: ["line"],
		visible: ["true"]
	    }`
    
    This object describes the "view" of how out data should be presented. All parameters below are expected to be array of strings.
    
    `title` - Title name given for the chart which will be visible in the graph settings. 
    
    `source` - an object with two keys: `x`(single string) and `y`(An array of js code as strings). These JS code strings are run in a [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) similar to this: `new Function('data', <string-code>) (<data-prop>)` to generate a 1 Dimensional array. The 1D array from x and y axes are plotted to generate the chart. The only requirement for the js code strings are that they return a valid array. The source strings can be edited in browser and save if all the axis methods are implemented correctly, so that changes are preserved.

    `label` - a name given to a specific plot(bar/line/scatter) the chart. This name is used in the hover view and legends.

    `color` - color of the plot - accepts any css color value.

    `width` - width of the line/bar plot

    `dash` - "0" if you dont need dash. Any other value if you need dashes in charts. equivalent to svg stroke-dasharray.

    `size` - Sizes of 'Marks' in react-vis LineMarkSeries. Basically adds a circle in every node with radius `size`.

    `scale` - Multiplies this value with the generated array(a * scale + offset ). Only affects view. Hover display will still show actual value.

    `offset` - Adds this value with the generated array after any scale (a * scale + offset ). Only affects view. Hover display will still show actual value.

    `type` - Sets plot type to either `bar` or `line`.

    `visible` - set visibility

* `updateAxis(id,axis,source,axisVisibility,label,color,width,dash,size,scale,offset,type,visible)` - A function which modifies a specific plot. This function is called when a user modifies the plot code in the settings. The function should update the meta object, so that the plot is reloaded with updated settings. It takes these parameters (All Strings unless type specified):
    
    `id` - Optional id argument to identify current chart object if multiple charts are present. should be same as the main `id` prop.

    `axis`(int) - Index of the axis/plot we're currently updating. -1 indicates we're updating the X axis's source. any other value updates the plot(Y axis) of that index.

    `source` - The js code of the plot we're updating.

    `axisVisibility`(Boolean) - Sets visibility of Axes. 

    `label` - A name given to a specific plot(bar/line/scatter) the chart. This name is used in the hover view and legends.

    `color` - Color of the plot - accepts any css color value.

    `width` - Width of the line/bar plot

    `dash` - "0" if you dont need dash. Any other value if you need dashes in charts. equivalent to svg stroke-dasharray.

    `size` - Sizes of 'Marks' in react-vis LineMarkSeries. Basically adds a circle in every node with radius `size`.

    `scale` - Multiplies this value with the generated array(a * scale + offset ). Only affects view. Hover display will still show actual value.

    `offset` - Adds this value with the generated array after any scale (a * scale + offset ). Only affects view. Hover display will still show actual value.

    `type` - Sets plot type to either `bar` or `line`.

    `visible` - Set visibility

    example :
    `updateAxis("fa006260-ac15-11e8-9ce0-e11ebb4e2c6f",2,'return [1,2,3,4]',true,'label','red','3','4','5','6','7','line','true')`

* `addAxis(id)` - Adds a new axis to the plot with `id`. a random array of 90 digits is set by default. Executed on clicking the ADD button in settings. 
* `removeAxis(id, axis)` - Removes the plot with index `axis`. Executed on clicking the delete button in settings.
* `data` - Prop to load external data. This object will be available inside plot source and can be referred to as data. The keys within this object will be listed in settings page for reference. 
* `color` - Color theme of the chart. Set the color of the loading slider and scrollbar. Defaults to Teal if not set.
* `id` - uniquely identify the chart in case multiple charts exists. Passed as an argument in add,update and delete.

## Used By


![https://static.wixstatic.com/media/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.png/v1/fill/w_236,h_79,al_c,q_80,usm_0.66_1.00_0.01/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.webp](https://static.wixstatic.com/media/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.png/v1/fill/w_236,h_79,al_c,q_80,usm_0.66_1.00_0.01/1e305a_48bc38272aea4c4dbb475ab0dfbf7ca5~mv2.webp)

