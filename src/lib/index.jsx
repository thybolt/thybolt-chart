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
	SCROLL_FACTOR = 0.3;
	stale = true;
	_xydata = [];
	_xydataUnscaled = [];
	refreshInterval = null;

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
	componentDidMount = () => {
		this.setState({ data: this.props.data });
		this.graphUpdated();
		this.refreshInterval = setInterval(() => {
			if ((this.props.data?Object.keys(this.props.data).length:-1) > 0) this.graphUpdated();
		}, 2000);
	};

	componentWillReceiveProps = nextprops => {
		this.setState({ data: nextprops.data });
	};

	componentWillUnmount() {
		clearInterval(this.refreshInterval);
	}

	seededRandom = id => Math.floor(Math.abs(Math.sin(4 + id) * 10000));

	graphUpdated = () => {
		if (this.props.descriptor) {
			try {
				let _tempx = new Function("data", this.props.descriptor.x.source)(this.state.data); //eval(`var data=${JSON.stringify(this.props.data)};${this.props.meta.source.x}`);
				let _tempy = [];

				for (let i = 0; i < this.props.descriptor.y.length; i++) {
					_tempy.push(new Function("data", this.props.descriptor.y[i].source)(this.state.data));
				}

				this._xydata = [];
				this._xydataUnscaled = [];
				for (let i = 0; i < this.props.descriptor.y.length; i++) {
					this._xydata.push([]);
					this._xydataUnscaled.push([]);
					let scale = parseFloat(this.props.descriptor.y[i].scale);
					scale = scale ? scale : 1.0;
					let offset = parseFloat(this.props.descriptor.y[i].offset);
					offset = offset ? offset : 0.0;
					for (let j = 0; j < _tempx.length; j++) {
						// Y = a * X + B
						let value = _tempy[i][j] * scale + offset;
						let valueUnscaled = _tempy[i][j];

						if (!value) value = _tempy[i][j];
						// this._xydata[i].unshift({
						// 	index:j,
						// 	x0: _tempx[j] + parseFloat(this.props.descriptor.y[i].width) * 0.01,
						// 	x: _tempx[j],
						// 	y: value
						// });
						// this._xydataUnscaled[i].unshift({
						// 	index:j,
						// 	x: _tempx[j],
						// 	y: valueUnscaled
						// });
						//We're going to use the index as a pseudo X
						//The actual x will only be used for tickvalues
						this._xydata[i].unshift({
							xv: _tempx[j],
							x0: j + parseFloat(this.props.descriptor.y[i].width) * 0.01,
							x: j,
							y: value
						});
						this._xydataUnscaled[i].unshift({
							xv: _tempx[j],
							x: j,
							y: valueUnscaled
						});
					}
				}

				this.setState({ xydata: this._xydata, xydataUnscaled: this._xydataUnscaled });
			} catch (error) {
				console.log(error);
			}
		} else {
			this.setState({ xydata: this.props.xydata });
		}
		this.stale = true;
	};

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

	closeEditor = () => {
		this.setState({ settingsVisible: false });
		this.forceUpdate();
		this.stale = true;
	}

	data = [];
	charts = [];
	labels = [];
	tableCols = [];
	tableData = [];
	render() {
		if (this.stale) {
			this.data = [];
			this.tableCols = this.props.descriptor.y.map(y => {
				return { Header: y.label, accessor: y.label };
			});
			this.tableData = Array(this.state.xydata[0].length);
			this.charts = [];
			this.labels = [];
			if (this.state.xydata) {
				for (let ch = 0; ch < this.state.xydata.length; ch++) {
					let i = 0;
					this.state.xydataUnscaled[ch].forEach(point => {
						if (this.tableData[i]) this.tableData[i][this.props.descriptor.y[ch].label] = point.y;
						else this.tableData[i] = { [this.props.descriptor.y[ch].label]: point.y };
						i += 1;
					});
					this.labels.push(
						<div key={this.props.descriptor.y[ch].label}>
							<b style={{ whiteSpace: "nowrap" }}>
								{this.props.descriptor.y[ch].label}
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
					var color = this.props.descriptor.y[ch].color ? this.props.descriptor.y[ch].color : undefined;
					if (this.state.legendHover != -1) {
						if (this.state.legendHover != ch) color = "rgba(200,200,200,0.2)";
					}

					if (this.props.descriptor.y[ch].visible !== false && this.data[ch].length != 0) {
						if (!this.props.descriptor.y[ch].type || this.props.descriptor.y[ch].type === "line")
							this.charts.push(
								<LineMarkSeries
									key={this.props.descriptor.y[ch].label}
									strokeDasharray={this.props.descriptor.y[ch].dash}
									strokeWidth={
										(!isNaN(parseFloat(this.props.descriptor.y[ch].width)))
											? parseFloat(this.props.descriptor.y[ch].width)
											: 2.0
									}
									size={
										(this.props.descriptor.y[ch].size)
											? (this.props.descriptor.y[ch].size)
											: 0.0
									}
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
									key={this.props.descriptor.y[ch].label}
									strokeDasharray={this.props.descriptor.y[ch].dash}
									strokeWidth={
										(!isNaN(parseFloat(this.props.descriptor.y[ch].width)))
											? parseFloat(this.props.descriptor.y[ch].width)
											: 2.0
									}
									size={
										parseFloat(this.props.descriptor.y[ch].size)
											? parseFloat(this.props.descriptor.y[ch].size)
											: 0.0
									}
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
							
							closeEditor={this.closeEditor}
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
						{!this.props.readonly && (
							<span onClick={this.showSettings} className="graphControlButtons">
								{<i className="fas fa-wrench" />}
							</span>
						)}
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
								<FlexibleXYPlot onClick={this.closeEditor} onWheel={this.handleWheel} onMouseLeave={this.onMouseLeave}>
									{this.props.descriptor.x.horizontalGrid !== false && <HorizontalGridLines />}
									{this.props.descriptor.x.verticalGrid !== false && <VerticalGridLines />}
									{this.props.descriptor.x.yAxisVisible !== false && <YAxis />}
									{this.props.descriptor.x.xAxisVisible !== false && (
										<XAxis
											//TODO: make custom ticks work
											//This kinda works. but there is a large divergence in distance
											//between real values and ticks.
											// tickFormat={(value, index) =>
											// 	this.data[0][this.data[0].length - index ]
											// 		? this.data[0][this.data[0].length - index].xv
											// 		: ""
											// }
											tickLabelAngle={
												this.props.descriptor.x.tickAngle
													? this.props.descriptor.x.tickAngle
													: 0.0
											}
										/>
									)}
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
									items={this.props.descriptor.y.filter(y => y.visible !== false).map(y => {
										if (!y.color) return { title: y.label };
										else return { title: y.label, color: y.color };
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

export default ThyboltChart;
