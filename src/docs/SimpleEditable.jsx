import React, { Component } from "react";
import ThyboltChart from "../../lib";

class SimpleEditable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meta: {
				x: {
					source: "return [...Array(90).keys()]"
				},
				y: [
					{
						source:
							"return [34,22,4,21,99,54,75,87,93,32,90,87,99,64,53,10,83,74,67,11,96,97,4,5,59,25,5,17,4,69,81,63,34,25,8,72,30,68,63,95,24,52,61,60,89,63,19,99,63,46,94,37,4,36,2,43,69,96,16,55,62,6,87,69,12,79,59,67,54,22,79,74,76,85,36,32,34,33,53,85,90,5,90,29,14,19,10,52,84,21]",
						label: "y1"
					},
					{
						source:
							"return [4,69,81,63,34,25,8,72,30,68,63,95,24,52,61,60,89,63,19,99,63,46,94,37,4,36,2,43,69,96,16,55,62,6,87,69,12,79,59,67,54,22,79,74,76,85,36,32,34,33,53,85,90,5,90,29,14,19,10,52,84,21,34,22,4,21,99,54,75,87,93,32,90,87,99,64,53,10,83,74,67,11,96,97,4,5,59,25,5,17]",
						label: "y2"
					}
				]
			}
		};
	}
	render() {
		return (
			<React.Fragment>
				<ThyboltChart
					onChange={meta => {
						this.setState({ meta: meta });
					}}
					descriptor={this.state.meta}
				/>
			</React.Fragment>
		);
	}
}

export default SimpleEditable;
