import React from "react";
import { render } from "react-dom";
import Graph from "../../lib";
import "./styles.css";
import SimpleChart from "./SimpleChart";
import MultipleCharts from "./MultipleCharts";
import SineChart from "./SineChart";
import Bars from "./Bars";


function Demo() {
	return (
		<div classNameName="container-fluid">
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
				<a class="navbar-brand" href="#">
					Thybolt-Chart Demo
				</a>
			</nav>
			<div className="container">
				<br/>
				<h1>Read Only Examples</h1>
				<div className="demo-block">
					<h3>SimpleChart</h3>
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
					<div className="row">
						<div className="col-lg-12">
							<div className="demo">
								<Bars />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

render(<Demo />, document.getElementById("app"));
