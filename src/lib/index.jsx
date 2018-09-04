import React, { Component } from "react";
import {
	FlexibleXYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	VerticalGridLines,
	LineMarkSeries,
	Crosshair,
	DiscreteColorLegend,
	VerticalRectSeries
} from "react-vis";
import ReactTable from "react-table";
import GraphScroll from "./GraphScroll";
import { BarLoader } from "react-spinners";
import "react-table/react-table.css";
import "./Graph.css";
import "react-vis/dist/style.css";
import GraphSource from "./GraphSource";
import PropTypes from "prop-types";

class ThyboltChart extends Component {
	DEFAULT_NVALUES = 0.1;
	DEFAULT_ZOOM_FACTOR = 0.05;
	DEFAULT_OFFSET = 0;
	SCROLL_FACTOR = 0.2;
	stale = true;
	_xydata = [];
	_xydataUnscaled = [];

	typeToChart = {
		line: LineMarkSeries,
		bar: VerticalRectSeries
	};

	constructor(props) {
		super(props);
		this.state = {
			graphMode: true,
			xydata: [[]],
			xydataUnscaled: [[]],
			crosshairValues: [],
			settingsVisible: false,
			nvalues: this.DEFAULT_NVALUES, // only display 10% of all values
			translationOffset: this.DEFAULT_OFFSET,
			hoverValue: null,
			legendHover: -1
		};
	}

	componentDidMount() {
		if (this.props.meta) {
			// setInterval(() => {
			try {
				let _tempx = new Function("data", this.props.meta.source.x)(this.props.data); //eval(`var data=${JSON.stringify(this.props.data)};${this.props.meta.source.x}`);
				let _tempy = [];

				for (let i = 0; i < this.props.meta.source.y.length; i++) {
					_tempy.push(new Function("data", this.props.meta.source.y[i])(this.props.data));
					//_tempy.push(eval(`var data=${JSON.stringify(this.props.data)};${this.props.meta.source.y[i]}`));
				}

				this._xydata = [];
				this._xydataUnscaled = [];
				for (let i = 0; i < this.props.meta.source.y.length; i++) {
					this._xydata.push([]);
					this._xydataUnscaled.push([]);
					for (let j = 0; j < _tempx.length; j++) {
						let value =
							_tempy[i][j] * parseFloat(this.props.meta.scale[i]) + parseFloat(this.props.meta.offset[i]);
						let valueUnscaled = _tempy[i][j];

						if (!value) value = _tempy[i][j];
						this._xydata[i].unshift({
							x0: _tempx[j] + parseFloat(this.props.meta.width[i]) * 0.01,
							x: _tempx[j],
							y: value
						});
						this._xydataUnscaled[i].unshift({
							x: _tempx[j],
							y: valueUnscaled
						});
					}
				}

				this.setState({ xydata: this._xydata, xydataUnscaled: this._xydataUnscaled });
			} catch (error) {
				console.log(error);
			}
			// }, 100000);
		} else {
			this.setState({ xydata: this.props.xydata });
		}
		this.stale = true;
	}

	toggleChart = () => {
		this.setState({ graphMode: !this.state.graphMode });
		this.stale = true;
	};

	resetScales = () => {
		this.setState({
			translationOffset: this.DEFAULT_OFFSET,
			nvalues: this.DEFAULT_NVALUES,
			hoverValue: null
		});
		this.stale = true;
	};

	showSettings = () => {
		this.setState({
			settingsVisible: true
		});
		this.stale = true;
	};

	zoomIn = () => {
		let nvalues = this.state.nvalues - this.DEFAULT_ZOOM_FACTOR;
		let totalSize = Math.floor(nvalues * this.state.xydata[0].length);
		if (totalSize > 2 && nvalues < 1.0) {
			this.setState({ nvalues });
			this.stale = true;
		}
	};

	zoomOut = () => {
		let nvalues = this.state.nvalues + this.DEFAULT_ZOOM_FACTOR;
		let totalSize = Math.floor(nvalues * this.state.xydata[0].length);
		if (totalSize > 2 && nvalues < 1.0) {
			this.setState({ nvalues });
			this.stale = true;
		}
	};

	seekLeft = () => {
		let windowSize = Math.floor(this.state.nvalues * this.state.xydata[0].length);
		let translationOffset =
			this.state.translationOffset +
			Math.floor(this.state.nvalues * this.state.xydata[0].length * this.SCROLL_FACTOR);

		if (translationOffset + windowSize > this.state.xydata[0].length) {
			translationOffset = this.state.xydata[0].length - windowSize;
		}
		this.setState({ translationOffset });
		this.stale = true;
	};

	seekRight = () => {
		let windowSize = Math.floor(this.state.nvalues * this.state.xydata[0].length);
		let translationOffset =
			this.state.translationOffset -
			Math.floor(this.state.nvalues * this.state.xydata[0].length * this.SCROLL_FACTOR);

		if (translationOffset + windowSize < windowSize) {
			translationOffset = 0;
		}
		this.setState({ translationOffset });
		this.stale = true;
	};

	handleWheel = e => {
		this.setState({ crosshairValues: [] });
		if (!e.altKey) {
			if (e.deltaY > 0) {
				this.seekRight();
			} else {
				this.seekLeft();
			}
		} else {
			if (e.deltaY > 0) {
				this.zoomIn();
			} else {
				this.zoomOut();
			}
		}
		console.log('wheeeel')
		e.preventDefault();
		return false;
	};

	onNearestX = (value, { index }) => {
		this.setState({
			crosshairValues: this.state.xydataUnscaled.map(d => {
				return {
					x: this.state.xydataUnscaled[0].length - (this.state.translationOffset + index + 1),
					y: d[this.state.translationOffset + index].y
				};
			})
		});
		this.stale = true;
	};
	onMouseLeave = () => {
		this.setState({ crosshairValues: [] });
		this.stale = true;
	};

	data = [];
	charts = [];
	labels = [];
	tableCols = [];
	tableData = [];
	render() {
		if (this.stale) {
			this.data = [];
			this.tableCols = this.props.meta.label.map(label => {
				return { Header: label, accessor: label };
			});
			this.tableData = Array(this.state.xydata[0].length);
			this.charts = [];
			this.labels = [];
			if (this.state.xydata) {
				for (let ch = 0; ch < this.state.xydata.length; ch++) {
					let i = 0;
					this.state.xydataUnscaled[ch].forEach(point => {
						if (this.tableData[i]) this.tableData[i][this.props.meta.label[ch]] = point.y;
						else this.tableData[i] = { [this.props.meta.label[ch]]: point.y };
						i += 1;
					});
					this.labels.push(
						<div key={this.props.meta.label[ch]}>
							<b style={{ whiteSpace: "nowrap" }}>
								{this.props.meta.label[ch]}
								:&nbsp;
							</b>
							{this.state.crosshairValues[ch] ? this.state.crosshairValues[ch].y : ""}
						</div>
					);
					if (this.state.xydata[ch].length < 300 * this.DEFAULT_NVALUES) {
						this.data.push(this.state.xydata[ch]);
					} else {
						this.data.push(
							this.state.xydata[ch].slice(
								this.state.translationOffset,
								this.state.translationOffset +
									Math.floor(this.state.nvalues * this.state.xydata[ch].length)
							)
						);
					}
					var color = this.props.meta.color[ch] ? this.props.meta.color[ch] : undefined;
					if (this.state.legendHover != -1) {
						if (this.state.legendHover != ch) color = "rgba(200,200,200,0.2)";
					}
					if (this.props.meta.visible[ch] === "true") {
						if (this.props.meta.type[ch] === "line")
							this.charts.push(
								<LineMarkSeries
									key={this.props.meta.label[ch]}
									strokeDasharray={this.props.meta.dash[ch]}
									strokeWidth={parseFloat(this.props.meta.width[ch])}
									size={this.props.meta.size[ch] ? this.props.meta.size[ch] : 0}
									color={color}
									animation={false}
									getNull={d => d.y}
									onNearestX={this.onNearestX}
									data={this.data[ch]}
								/>
							);
						else
							this.charts.push(
								<VerticalRectSeries
									key={this.props.meta.label[ch]}
									strokeDasharray={this.props.meta.dash[ch]}
									strokeWidth={this.props.meta.width[ch]}
									size={this.props.meta.size[ch] ? this.props.meta.size[ch] : 0}
									color={color}
									animation={false}
									onNearestX={this.onNearestX}
									data={this.data[ch]}
								/>
							);
					}
				}
				this.stale = false;
			}
		}

		try {
			return (
				<React.Fragment>
					{this.state.settingsVisible && (
						<GraphSource
							{...this.props}
							closeEditor={() => {
								this.setState({ settingsVisible: false });
								this.forceUpdate();
								this.stale = true;
							}}
						/>
					)}
					<div className="graphControl">
						{this.state.graphMode && (
							<span>
								<span style={{ opacity: this.data[0].length === 0 ? 0.0 : 1.0 }}>
									<GraphScroll
										max={this.state.xydata[0].length}
										seek={this.state.translationOffset}
										window={this.data[0].length}
										color={this.props.color ? this.props.color : "#13949B"}
									/>
								</span>

								{/* <span style={{ display: data.length === 0 ? "none" : "inline" }} className="graphDays">{`${daySpan + 1} Days`}</span> */}
							</span>
						)}
						<span onClick={this.toggleChart} className="graphControlButtons">
							{this.state.graphMode ? (
								<i className="fas fa-table" />
							) : (
								<i className="fas fa-chart-area" />
							)}
						</span>
						<span onClick={this.showSettings} className="graphControlButtons">
							{<i className="fas fa-wrench" />}
						</span>
						<span onClick={this.resetScales} className="graphControlButtons">
							{this.state.graphMode ? <i className="fas fa-redo" /> : ""}
						</span>
						&nbsp;
						<span
							style={{ display: this.data[0].length === 0 ? "none" : "inline" }}
							onClick={this.seekRight}
							className="graphControlButtons"
						>
							{this.state.graphMode ? <i className="fas fa-chevron-right" /> : ""}
						</span>
						<span
							style={{ display: this.data[0].length === 0 ? "none" : "inline" }}
							onClick={this.zoomIn}
							className="graphControlButtons"
						>
							{this.state.graphMode ? <i className="fas fa-search-plus" /> : ""}
						</span>
						<span
							style={{ display: this.data[0].length === 0 ? "none" : "inline" }}
							onClick={this.zoomOut}
							className="graphControlButtons"
						>
							{this.state.graphMode ? <i className="fas fa-search-minus" /> : ""}
						</span>
						<span
							style={{ display: this.data[0].length === 0 ? "none" : "inline" }}
							onClick={this.seekLeft}
							className="graphControlButtons"
						>
							{this.state.graphMode ? <i className="fas fa-chevron-left" /> : ""}
						</span>
					</div>
					<div className="graph">
						<span className="graphSpinner">
							<BarLoader
								loading={this.data[0].length === 0 && this.state.graphMode}
								color={this.props.color ? this.props.color : "#13949B"}
							/>
						</span>

						{this.state.graphMode ? (
							<div
								style={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									height: "inherit"
								}}
							>
								<FlexibleXYPlot onWheel={this.handleWheel} onMouseLeave={this.onMouseLeave}>
									<HorizontalGridLines />
									{this.props.meta.xAxisVisibility && <VerticalGridLines />}
									{this.props.meta.xAxisVisibility && <YAxis />}
									{this.props.meta.xAxisVisibility && <XAxis />}
									{this.charts}
									<Crosshair
										style={{ line: { width: "1px", background: "#2c3e50" } }}
										values={this.state.crosshairValues}
									>
										<div className="crosshair">
											<tt style={{ whiteSpace: "nowrap" }}>{this.labels}</tt>
										</div>
									</Crosshair>
								</FlexibleXYPlot>

								<DiscreteColorLegend
									height={60}
									orientation="horizontal"
									onItemMouseEnter={(item, index, event) => {
										this.setState({ legendHover: index });
										this.stale = true;
									}}
									onItemMouseLeave={(item, index, event) => {
										this.setState({ legendHover: -1 });
										this.stale = true;
									}}
									items={Object.keys(this.props.meta.label).map(x => {
										if (!this.props.meta.color[x]) return { title: this.props.meta.label[x] };
										else
											return { title: this.props.meta.label[x], color: this.props.meta.color[x] };
									})}
								/>
							</div>
						) : (
							<ReactTable
								data={this.tableData}
								columns={this.tableCols}
								defaultPageSize={50}
								style={{
									width: "calc(100% - 10px)",
									height: "calc(100% - 30px)",
									zoom: 0.7
								}}
								className="-striped -highlight dash-chart"
							/>
						)}
					</div>
				</React.Fragment>
			);
		} catch (error) {
			return <div>ThyboltChart: {JSON.stringify(error)}</div>;
		}
	}
}

ThyboltChart.propTypes = {
	id: PropTypes.string,
	updateAxis: PropTypes.func,
	removeAxis: PropTypes.func,
	addAxis: PropTypes.func,
	meta: PropTypes.shape({
		color: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		dash: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		offset: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		scale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		size: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		source: PropTypes.shape({
			x: PropTypes.string.isRequired,
			y: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
		}).isRequired,
		title: PropTypes.string.isRequired,
		type: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		visible: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
		width: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
	}).isRequired,
	data: PropTypes.object,
	color:PropTypes.string
};

export default ThyboltChart;
