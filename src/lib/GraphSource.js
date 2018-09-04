import React, { Component } from "react";

class LabeledEditText extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div style={{ marginRight: "20px" }}>
				<div
					style={{
						fontSize: "10px",
						opacity: 0.7
					}}
				>
					{this.props.title}
				</div>
				{this.props.options ? (
					<select
						value={this.props.value}
						onChange={e => {
							this.props.onChange(e.target.value);
						}}
					>
						{this.props.options.map(x => {
							return <option value={x}>{x}</option>;
						})}
					</select>
				) : (
					<input
						type={this.props.number ? "number" : "text"}
						onChange={e => {
							this.props.onChange(e.target.value);
						}}
						style={{ fontSize: "11px", border: "none", borderBottom: "1px solid #aaa", width: "62px" }}
						defaultValue={this.props.value}
					/>
				)}
			</div>
		);
	}
}

class ArraySource extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: this.props.Xaxis ? this.props.meta.source.x : this.props.meta.source.y[this.props.axis],
			xAxisVisibility: Boolean(this.props.meta.xAxisVisibility),
			label: this.props.meta.label[this.props.axis],
			color: this.props.meta.color[this.props.axis],
			width: this.props.meta.width[this.props.axis],
			dash: this.props.meta.dash[this.props.axis],
			size: this.props.meta.size[this.props.axis],
			scale: this.props.meta.scale[this.props.axis],
			offset: this.props.meta.offset[this.props.axis],
			type: this.props.meta.type[this.props.axis],
			visible: this.props.meta.visible[this.props.axis]
		};
	}
	render() {
		return (
			<div>
				<tt>
					{this.props.Xaxis ? (
						<span></span>
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
								options={["bar", "line"]}
								onChange={value => {
									this.setState({ type: value });
								}}
								value={this.state.type}
								title={"type"}
								number
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
								options={["true", "false"]}
								onChange={value => {
									this.setState({ visible: value });
								}}
								value={this.state.visible}
								title={"visiblity"}
								
							/>
							
						</div>
					)}
					{this.props.Xaxis && (
						<span>
							<input
								type="checkbox"
								checked={this.state.xAxisVisibility}
								onChange={e => {
									this.setState({ xAxisVisibility: e.target.checked });
								}}
							/>
							X Axis Visibility
						</span>
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
								alert(JSON.stringify(new Function('data',this.state.source)(this.props.data)))
								//alert(JSON.stringify(eval( `var data=${JSON.stringify(this.props.data)};${this.state.source}`)));
								//console.log(eval( `var data=${JSON.stringify(this.props.data)};${this.state.source}`))
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
							this.props.updateAxis(
								this.props.id,
								this.props.Xaxis ? -1 : this.props.axis,
								this.state.source,
								this.state.xAxisVisibility,
								this.state.label,
								this.state.color,
								this.state.width,
								this.state.dash,
								this.state.size,
								this.state.scale,
								this.state.offset,
								this.state.type,
								this.state.visible
							);
						}}
						className="graphSourceButtons"
						style={{
							background: "lightgreen"
						}}
					>
						SAVE
					</span>
					{(!this.props.Xaxis && this.props.meta.label.length>1) && (
						<span
							onClick={() => {
								this.props.removeAxis(this.props.id, this.props.axis);
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

class GraphSource extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		let arraySources = [...Array(this.props.meta.source.y.length).keys()].map(axis => {
			return <ArraySource {...this.props} axis={axis} />;
		});
		return (
			<div className="graphSource">
				<div>
				<div ><b>Data available:</b> {Object.keys(this.props.data).join(" ,")}</div>

					<span className="graphControlButtons">
						<i onClick={this.props.closeEditor} className="fas fa-times" />
					</span>
				</div>
				<br />
				<div>
					<ArraySource {...this.props} Xaxis meta={this.props.meta} />
					
					{arraySources}
				</div>
				<div style={{ textAlign: "center" }}>
					<span
						onClick={() => {
							this.props.addAxis(this.props.id);
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
