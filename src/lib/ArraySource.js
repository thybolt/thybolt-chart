import React, { Component } from "react";
import LabeledEditText from "./LabeledEditText";

class ArraySource extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.axis
		};
	}

	render() {
		return (
			<div>
				<tt>
					{this.props.Xaxis ? (
						<div style={{ display: "flex", flexDirection: "row" }}>
							<LabeledEditText
                                options={[true, false]}
								onChange={value => {
									this.setState({ xAxisVisible: JSON.parse(value) });
								}}
								value={this.state.xAxisVisible}
								title={"xAxisVisible"}
							/>
                            <LabeledEditText
                                options={[true, false]}
								onChange={value => {
									this.setState({ yAxisVisible: JSON.parse(value) });
								}}
								value={this.state.yAxisVisible}
								title={"yAxisVisible"}
							/>
                            <LabeledEditText
                                options={[true, false]}
								onChange={value => {
									this.setState({ horizontalGrid: JSON.parse(value) });
								}}
								value={this.state.horizontalGrid}
								title={"horizontalGrid"}
							/>
                            <LabeledEditText
                                options={[true, false]}
								onChange={value => {
									this.setState({ verticalGrid: JSON.parse(value) });
								}}
								value={this.state.verticalGrid}
								title={"verticalGrid"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ tickAngle: value });
								}}
								value={this.state.tickAngle}
								title={"tickAngle"}
								number
							/>
						</div>
					) : (
						<div style={{ display: "flex", flexDirection: "row" }}>
							<LabeledEditText
								onChange={value => {
									this.setState({ label: value });
								}}
								value={this.state.label}
								title={"label"}
							/>
							<LabeledEditText
								options={[ "line","bar"]}
								onChange={value => {
									this.setState({ type: value });
								}}
								value={this.state.type}
								title={"type"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ color: value });
								}}
								value={this.state.color}
								title={"color"}
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ width: value });
								}}
								value={this.state.width}
								title={"width"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ dash: value });
								}}
								value={this.state.dash}
								title={"dash"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ size: value });
								}}
								value={this.state.size}
								title={"size"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ scale: value });
								}}
								value={this.state.scale}
								title={"scale"}
								number
							/>
							<LabeledEditText
								onChange={value => {
									this.setState({ offset: value });
								}}
								value={this.state.offset}
								title={"offset"}
								number
							/>
							<LabeledEditText
								options={[true, false]}
								onChange={value => {
									this.setState({ visible: JSON.parse(value) });
								}}
								value={this.state.visible}
								title={"visible"}
							/>
						</div>
					)}
				</tt>
				<textarea
					defaultValue={this.state.source}
					onChange={e => {
						this.setState({ source: e.currentTarget.value });
					}}
					className="graphSourceEditor"
				/>
				<br />
				<tt>
					<span
						onClick={() => {
							try {
								alert(JSON.stringify(new Function("data", this.state.source)(this.props.data)));
							} catch (error) {
								alert("Error: " + error.message);
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
							this.props.onChange(this.state, this.props.index);
						}}
						className="graphSourceButtons"
						style={{
							background: "lightgreen"
						}}
					>
						SAVE
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
