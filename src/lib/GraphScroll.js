import React, { Component } from "react";

import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = props => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
};

class GraphScroll extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<span>
				<span
					style={{
						width: "calc(100% - 190px)",
						display: "inline-flex",
						transform: "rotate(180deg)",
						margin: "0px 10px",
						paddingTop: "2px"
					}}
				>
					<Range
						min={0}
						max={this.props.max}
						handleStyle={[{ display: "none" }]}
						trackStyle={[{ background: this.props.color ? this.props.color : "#008081" }]}
						value={[this.props.seek, this.props.seek + this.props.window]}
						tipFormatter={value => `${value}`}
					/>
				</span>
			</span>
		);
	}
}

export default GraphScroll;
