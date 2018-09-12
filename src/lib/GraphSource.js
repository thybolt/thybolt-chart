import React, { Component } from "react";
import ArraySource from "./ArraySource";

class GraphSource extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	//https://stackoverflow.com/a/16348977/1970053
	stringToColour = str => {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = "#";
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	};

	render() {
		let arraySources = this.props.descriptor.y
			? [...Array(this.props.descriptor.y.length).keys()].map(axis => {
					return (
						<ArraySource
							axis={this.props.descriptor.y[axis]}
							key={axis}
							data={this.props.data}
							index={axis}
							noDelete={this.props.descriptor.y.length <= 1}
							onDelete={index => {
								let meta = this.props.descriptor;
								meta.y.splice(index, 1);
								this.props.onChange(meta);
							}}
							onChange={(axis, index) => {
								let meta = this.props.descriptor;
								meta.y[index] = axis;
								this.props.onChange(meta);
							}}
						/>
					);
			  })
			: [];
		return (
			<div
				className="graphSource"
				style={{
					borderLeft: `6px solid ${this.props.color ? this.props.color : "#13949B"}`
				}}
			>
				<div>
					{this.props.data && (
						<span>
							<small>Prop Data</small>
							<br />
							{Object.keys(this.props.data).map(key => (
								<span
									style={{ padding: "3px 5px", background: this.stringToColour(key) }}
									className="graphSourceButtons"
								>
									{key}
								</span>
							))}
						</span>
					)}

					<span className="graphControlButtons">
						<i onClick={this.props.closeEditor} className="fas fa-times" />
					</span>
				</div>
				<br />
				<div>
					<h2>X Axis</h2>
					<ArraySource
						Xaxis
						data={this.props.data}
						axis={this.props.descriptor.x}
						onChange={(axis, _) => {
							let meta = this.props.descriptor;
							meta.x = axis;
							this.props.onChange(meta);
						}}
					/>
					<hr />
					<h2>Y Axes ({arraySources.length})</h2>
					{arraySources}
				</div>
				<div style={{ textAlign: "center" }}>
					<span
						onClick={() => {
							let newAxis = {
								source: `return [${[...Array(90).keys()].map(_ => Math.floor(Math.random() * 100))}];`,
								label: `Y${new Date().getTime() % 10000}`,
								color: "",
								width: "2",
								dash: "0",
								size: "0",
								scale: "1",
								offset: "0",
								type: "line",
								visible: true
							};
							let meta = this.props.descriptor;
							meta.y.push(newAxis);
							this.props.onChange(meta);
						}}
						className="graphSourceButtons"
						style={{
							background: "skyblue",
							padding: "5px 21px"
						}}
					>
						ADD
					</span>
				</div>
			</div>
		);
	}
}

export default GraphSource;
