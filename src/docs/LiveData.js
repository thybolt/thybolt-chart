import React, { Component } from "react";
import ThyboltChart from "../../lib";

class LiveData extends Component {
	constructor(props) {
		super(props);
		this.state = { data: {} };
	}

	componentDidMount() {
		fetch("https://blockchain.info/charts/market-price?timespan=100days&format=json&cors=true")
			.then(response => {
				return response.json();
			})
			.then(myJson => {
				console.log(myJson);
				this.setState({ data: myJson });
			});
	}
	render() {
		return (
			<React.Fragment>
				<ThyboltChart
                    color="#007bff"
					data={{ bitcoin: this.state.data }}
					descriptor={{
						x: {
							source: "return data.bitcoin.values.map(x=>x.x)"
						},
						y: [
							{
								source: "return data.bitcoin.values.map(x=>x.y)",
                                label: "1 BTC in $",
                                color:"#007bff",
                                size:"1.0"
							},
							{
								source: "return data.bitcoin.values.map(x=>((new Date(x.x*1000)).toLocaleDateString()))",
								label: "date",
								visible: false
							}
						]
					}}
				/>
			</React.Fragment>
		);
	}
}

export default LiveData;
