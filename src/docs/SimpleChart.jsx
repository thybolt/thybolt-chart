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
							source: "return [...Array(40).keys()]"
						},
						y: [
							{
								source:
									"return [79,16,8,78,87,57,83,13,62,48,64,71,46,31,94,56,71,21,21,72,62,26,9,34,88,15,25,26,98,91,50,80,62,26,0,25,24,8,21,39]",
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
