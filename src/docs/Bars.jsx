import React, { Component } from "react";
import ThyboltChart from "../../lib";

class Bars extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<React.Fragment>
				<ThyboltChart
					id={"1"}
					updateAxis={() => {
						alert("edit props.updateAxis for customized lines");
					}}
					removeAxis={() => {
						alert("edit props.removeAxis for deleting lines");
					}}
					addAxis={() => {
						alert("edit props.addAxis for adding lines");
					}}
					meta={{
						title: "Test",
						source: {
							x: "return [...Array(90).keys()]",
							y: [
								"return [34,22,4,21,99,54,75,87,93,32,90,87,99,64,53,10,83,74,67,11,96,97,4,5,59,25,5,17,4,69,81,63,34,25,8,72,30,68,63,95,24,52,61,60,89,63,19,99,63,46,94,37,4,36,2,43,69,96,16,55,62,6,87,69,12,79,59,67,54,22,79,74,76,85,36,32,34,33,53,85,90,5,90,29,14,19,10,52,84,21]"
								,"return [67,9,60,55,69,82,80,8,73,76,99,100,5,53,18,51,21,59,73,91,12,70,5,61,70,50,85,80,89,27,42,79,26,26,61,26,12,40,23,48,68,89,32,63,73,37,60,14,15,63,91,15,7,20,68,1,82,16,67,60,92,77,25,79,4,40,24,74,73,36,82,66,80,39,44,23,7,98,37,59,56,53,68,53,9,8,90,78,21,28,]"
							]
						},
						label: ["random 1",'random 2'],
						color: ["",""],
						width: ["40",'2'],
						dash: ["0","0"],
						size: ["0","4"],
						scale: ["1","1"],
						offset: ["0","0"],
						type: ["bar","line"],
						visible: ["true","true"]
					}}
					data={{}}
				/>
			</React.Fragment>
		);
	}
}

export default Bars;
