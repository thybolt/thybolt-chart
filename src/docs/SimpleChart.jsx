import React, { Component } from "react";
import ThyboltChart from "../../lib";

class SimpleChart extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
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
			</React.Fragment>
		);
	}
}

export default SimpleChart;
