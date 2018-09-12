import React, { Component } from "react";
import ThyboltChart from "../../lib";

class SineChart extends Component {
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
							source: "return [...Array(1000).keys()]"
						},
						y: [
							{
								source: "return [...Array(1000).keys()].map(x=>100*Math.sin(parseFloat(x)/10))",
								label: "sin"
							},
							{
								source: "return [...Array(1000).keys()].map(x=>100*Math.cos(parseFloat(x)/10))",
								label: "cos"
							}
						]
					}}
					data={{}}
				/>
			</React.Fragment>
		);
	}
}

export default SineChart;
