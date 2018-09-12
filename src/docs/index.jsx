import React from "react";
import { render } from "react-dom";
import Graph from "../../lib";
import "./styles.css";
import SimpleChart from "./SimpleChart";
import SimpleEditable from "./SimpleEditable";
import MultipleCharts from "./MultipleCharts";
import Scatter from "./Scatter";
import SineChart from "./SineChart";
import Bars from "./Bars";
import AllProperties from "./AllProperties";
import DataProp from "./DataProp";
import LiveData from "./LiveData";

function Demo() {
	return (
		<div>
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a className="navbar-brand" href="#">
					Thybolt-Chart Demo
				</a>
			</nav>
			<div className="container">
				<br />
				<h1>Read Only Examples</h1>
				<div className="demo-block">
					<h3>SimpleChart</h3>
					<p>A Simple chart with one Y Axis. 30 Valued array is passed in the descriptor prop.</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<SimpleChart />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>MultipleCharts</h3>
					<p>Similar to a Simple Chart, but with 3 Y descriptors</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<MultipleCharts />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>SineChart</h3>
					<p>Demonstration of how Math functions can be plotted</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<SineChart />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>Bars</h3>
					<p>Similar to SimpleCharts, but bars instead of lines</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<Bars />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>Scatter</h3>
					<p>Sample plot of Linear Regression</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<Scatter />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>AllProperties</h3>
					<p>Demo of all customizable parameters</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<AllProperties />
							</div>
						</div>
					</div>
				</div>
				<br />
				<h1>Editable Examples</h1>
				<div className="demo-block">
					<h3>SimpleEditable</h3>
					<p>Click the Spanner Icon to update chart parameters. Descriptors are stored as state for this example.</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<SimpleEditable />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>DataProp</h3>
					<p>Demonstrates loading external data by props. Available keys of data will be shown in the settings header.</p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<DataProp />
							</div>
						</div>
					</div>
				</div>
				<div className="demo-block">
					<h3>LiveData</h3>
					<p>Data from blockchain.info of BTC prices using <tt>fetch()</tt></p>
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<LiveData />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

render(<Demo />, document.getElementById("app"));
