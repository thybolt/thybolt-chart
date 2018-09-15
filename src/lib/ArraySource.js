import React, { Component } from "react";
import LabeledEditText from "./LabeledEditText";

class ArraySource extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.axis,
			unsaved: false
		};
	}

	render() {
		return (
			<div style={{ background: this.state.visible === false ? "#ddd" : "transparent" }}>
				<tt>
					{this.props.Xaxis ? (
						<div style={{ display: "flex", flexDirection: "row" }}>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ xAxisVisible: JSON.parse(value), unsaved: true });
								}}
								value={this.state.xAxisVisible}
								key={"xAxisVisible"}
								title={"xAxisVisible"}
							/>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ yAxisVisible: JSON.parse(value), unsaved: true });
								}}
								value={this.state.yAxisVisible}
								key={"yAxisVisible"}
								title={"yAxisVisible"}
							/>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ horizontalGrid: JSON.parse(value), unsaved: true });
								}}
								value={this.state.horizontalGrid}
								key={"horizontalGrid"}
								title={"horizontalGrid"}
							/>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ verticalGrid: JSON.parse(value), unsaved: true });
								}}
								value={this.state.verticalGrid}
								key={"verticalGrid"}
								title={"verticalGrid"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ tickAngle: value, unsaved: true });
								}}
								value={this.state.tickAngle}
								key={"tickAngle"}
								title={"tickAngle"}
								number
							/>
						</div>
					) : (
						<div style={{ display: "flex", flexDirection: "row",width:`25%` }}>
							<LabeledEditText
								onChange={value => {
									this.setState({ label: value, unsaved: true });
								}}
								value={this.state.label}
								key={"label"}
								title={"label"}
							/>
							<LabeledEditText
								options={["line", "bar"]}
								onChange={value => {
									this.setState({ type: value, unsaved: true });
								}}
								value={this.state.type}
								key={"type"}
								title={"type"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ color: value, unsaved: true });
								}}
								value={this.state.color}
								key={"color"}
								title={"color"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ width: value, unsaved: true });
								}}
								value={this.state.width}
								key={"width"}
								title={"width"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ dash: value, unsaved: true });
								}}
								value={this.state.dash}
								key={"dash"}
								title={"dash"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ size: value, unsaved: true });
								}}
								value={this.state.size}
								key={"size"}
								title={"size"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ scale: value, unsaved: true });
								}}
								value={this.state.scale}
								key={"scale"}
								title={"scale"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ offset: value, unsaved: true });
								}}
								value={this.state.offset}
								key={"offset"}
								title={"offset"}
								number
							/>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ visible: JSON.parse(value), unsaved: true });
								}}
								value={this.state.visible}
								key={"visible"}
								title={"visible"}
							/>
						</div>
					)}
				</tt>
				<textarea
					style={{ background: "transparent" }}
					defaultValue={this.state.source}
					onChange={e => {
						this.setState({ source: e.currentTarget.value, unsaved: true });
					}}
					className="graphSourceEditor"
				/>
				<br />
				<tt>
					<span
						onClick={() => {
							try {
								let clout = new Function("data", this.state.source)(this.props.data);
								alert(JSON.stringify(clout));
								console.log(clout);
							} catch (error) {
								alert("Error: " + error.message);
								console.log(error);
							}
						}}
						className="graphSourceButtons"
						style={{
							background: "lightgray"
						}}
					>
						TEST
					</span>
					<span
						onClick={() => {
							this.setState({ unsaved: false });
							this.props.onChange(this.state, this.props.index);
							
						}}
						className="graphSourceButtons"
						style={{
							background: "lightgreen"
						}}
					>
						SAVE
						{this.state.unsaved ? "*" : ""}
					</span>
					{!this.props.Xaxis &&
						!this.props.noDelete && (
							<span
								onClick={() => {
									this.props.onDelete(this.props.index);
								}}
								className="graphSourceButtons"
								style={{
									background: "orange",
									float: "right"
								}}
							>
								DELETE
							</span>
						)}
				</tt>
				<br />
				<br />
			</div>
		);
	}
}

export default ArraySource;
