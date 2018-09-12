import React, { Component } from 'react'

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
							return <option key={x} value={x}>{JSON.stringify(x)}</option>;
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

export default LabeledEditText;