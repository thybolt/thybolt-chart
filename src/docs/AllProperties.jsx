import React, { Component } from "react";
import ThyboltChart from "../../lib";

class AllProperties extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<ThyboltChart
					readonly
					color={'#f39c12'}
					descriptor={{
						x: {
							//Set Grids to false for better clarity
							source: "return [...Array(90).keys()]",
							horizontalGrid: false,
							verticalGrid: false
						},
						y: [
							{
								//Scatterplot is simply line plot with size > 0 and width = 0
								source:
									"return [34,22,4,21,99,54,75,87,93,32,90,87,99,64,53,10,83,74,67,11,96,97,4,5,59,25,5,17,4,69,81,63,34,25,8,72,30,68,63,95,24,52,61,60,89,63,19,99,63,46,94,37,4,36,2,43,69,96,16,55,62,6,87,69,12,79,59,67,54,22,79,74,76,85,36,32,34,33,53,85,90,5,90,29,14,19,10,52,84,21]",
								label: "y1",
								size: "4",
								width: "40",
								color:'#d35400',
								type: "bar"
							},
							{
								source:
									"return [4,69,81,63,34,25,8,72,30,68,63,95,24,52,61,60,89,63,19,99,63,46,94,37,4,36,2,43,69,96,16,55,62,6,87,69,12,79,59,67,54,22,79,74,76,85,36,32,34,33,53,85,90,5,90,29,14,19,10,52,84,21,34,22,4,21,99,54,75,87,93,32,90,87,99,64,53,10,83,74,67,11,96,97,4,5,59,25,5,17]",
								label: "y2",
								size: "4",
								width: "2",
								color:'#f39c12',
								type: "line"
							},
							{
								source:
									"return [8,23,7,49,82,72,70,72,76,27,27,40,75,33,12,62,57,75,35,90,82,7,4,95,48,77,13,14,85,45,22,14,23,17,36,20,25,97,1,3,91,38,14,22,6,83,89,94,72,73,28,64,45,37,35,19,30,81,13,78,95,9,45,87,23,65,80,0,37,81,93,10,76,29,70,41,14,17,38,21,91,62,70,81,39,94,20,71,75,21]",
								label: "y3",
								dash:"10",
								width:'2',
								color:'#f1c40f',
								type: "line"
							}
						]
					}}
					data={{}}
				/>
			</React.Fragment>
		);
	}
}

export default AllProperties;
