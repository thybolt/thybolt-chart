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
							x: "return [...Array(1000).keys()]",
							y: [
								"return [...Array(1000).keys()].map(x=>100*Math.sin(parseFloat(x)/10))",
								"return [...Array(1000).keys()].map(x=>100*Math.cos(parseFloat(x)/10))"
							]
						},
						label: ["sin","cos"],
						color: ["",""],
						width: ["2","2"],
						dash: ["0","0"],
						size: ["0","0"],
						scale: ["1","1"],
						offset: ["0","0"],
						type: ["line","line"],
						visible: ["true","true"]
					}}
					data={{}}
				/>
			</React.Fragment>
		);
	}
}

export default SineChart;
