import React, { Component } from "react";
import ThyboltChart from "../../lib";

class DataProp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meta: {
				x: {
					source: "return data.numbers.map(num=>(new Date(num[0]).toDateString()))",
					tickAngle: -45
				},
				y: [
					{
						source: "return data.numbers.map(num=>num[1])",
						label: "numbers"
					},
					{
						source: "return data.numbers.map(num=>(new Date(num[0]).toDateString()))",
						label: "date",
						visible: false
					}
				]
			}
		};
	}
	render() {
		return (
			<React.Fragment>
				<ThyboltChart
					onChange={meta => {
						this.setState({ meta: meta });
					}}
					descriptor={this.state.meta}
					data={{
						numbers: [
							[1147651200000, 67.79],
							[1147737600000, 64.98],
							[1147824000000, 65.26],
							[1147910400000, 63.18],
							[1147996800000, 64.51],
							[1148256000000, 63.38],
							[1148342400000, 63.15],
							[1148428800000, 63.34],
							[1148515200000, 64.33],
							[1148601600000, 63.55],
							[1148947200000, 61.22],
							[1149033600000, 59.77],
							[1149120000000, 62.17],
							[1149206400000, 61.66],
							[1149465600000, 60.0],
							[1149552000000, 59.72],
							[1149638400000, 58.56],
							[1149724800000, 60.76],
							[1149811200000, 59.24],
							[1150070400000, 57.0],
							[1150156800000, 58.33],
							[1150243200000, 57.61],
							[1150329600000, 59.38],
							[1150416000000, 57.56],
							[1150675200000, 57.2],
							[1150761600000, 57.47],
							[1150848000000, 57.86],
							[1150934400000, 59.58],
							[1151020800000, 58.83],
							[1151280000000, 58.99],
							[1151366400000, 57.43],
							[1151452800000, 56.02],
							[1151539200000, 58.97],
							[1151625600000, 57.27],
							[1151884800000, 57.95],
							[1152057600000, 57.0],
							[1152144000000, 55.77],
							[1152230400000, 55.4],
							[1152489600000, 55.0],
							[1152576000000, 55.65],
							[1152662400000, 52.96],
							[1152748800000, 52.25],
							[1152835200000, 50.67],
							[1153094400000, 52.37],
							[1153180800000, 52.9],
							[1153267200000, 54.1],
							[1153353600000, 60.5],
							[1153440000000, 60.72],
							[1153699200000, 61.42],
							[1153785600000, 61.93],
							[1153872000000, 63.87],
							[1153958400000, 63.4],
							[1154044800000, 65.59],
							[1154304000000, 67.96],
							[1154390400000, 67.18],
							[1154476800000, 68.16],
							[1154563200000, 69.59],
							[1154649600000, 68.3],
							[1154908800000, 67.21],
							[1154995200000, 64.78],
							[1155081600000, 63.59],
							[1155168000000, 64.07],
							[1155254400000, 63.65],
							[1155513600000, 63.94],
							[1155600000000, 66.45],
							[1155686400000, 67.98],
							[1155772800000, 67.59],
							[1155859200000, 67.91],
							[1156118400000, 66.56],
							[1156204800000, 67.62],
							[1156291200000, 67.31],
							[1156377600000, 67.81],
							[1156464000000, 68.75],
							[1156723200000, 66.98],
							[1156809600000, 66.48],
							[1156896000000, 66.96],
							[1156982400000, 67.85],
							[1157068800000, 68.38],
							[1157414400000, 71.48],
							[1157500800000, 70.03],
							[1157587200000, 72.8],
							[1157673600000, 72.52],
							[1157932800000, 72.5],
							[1158019200000, 72.63],
							[1158105600000, 74.2],
							[1158192000000, 74.17],
							[1158278400000, 74.1],
							[1158537600000, 73.89],
							[1158624000000, 73.77],
							[1158710400000, 75.26],
							[1158796800000, 74.65],
							[1158883200000, 73.0],
							[1159142400000, 75.75],
							[1159228800000, 77.61],
							[1159315200000, 76.41],
							[1159401600000, 77.01],
							[1159488000000, 76.98],
							[1159747200000, 74.86],
							[1159833600000, 74.08],
							[1159920000000, 75.38],
							[1160006400000, 74.83],
							[1160092800000, 74.22],
							[1160352000000, 74.63],
							[1160438400000, 73.81],
							[1160524800000, 73.23],
							[1160611200000, 75.26],
							[1160697600000, 75.02],
							[1160956800000, 75.4],
							[1161043200000, 74.29],
							[1161129600000, 74.53],
							[1161216000000, 78.99],
							[1161302400000, 79.95],
							[1161561600000, 81.46],
							[1161648000000, 81.05],
							[1161734400000, 81.68],
							[1161820800000, 82.19],
							[1161907200000, 80.41],
							[1162166400000, 80.42],
							[1162252800000, 81.08],
							[1162339200000, 79.16],
							[1162425600000, 78.98],
							[1162512000000, 78.29],
							[1162771200000, 79.71],
							[1162857600000, 80.51],
							[1162944000000, 82.45],
							[1163030400000, 83.34],
							[1163116800000, 83.12],
							[1163376000000, 84.35],
							[1163462400000, 85.0],
							[1163548800000, 84.05],
							[1163635200000, 85.61],
							[1163721600000, 85.85],
							[1163980800000, 86.47],
							[1164067200000, 88.6],
							[1164153600000, 90.31],
							[1164326400000, 91.63],
							[1164585600000, 89.54],
							[1164672000000, 91.81],
							[1164758400000, 91.8],
							[1164844800000, 91.66],
							[1164931200000, 91.32],
							[1165190400000, 91.12],
							[1165276800000, 91.27],
							[1165363200000, 89.83],
							[1165449600000, 87.04],
							[1165536000000, 88.26],
							[1165795200000, 88.75],
							[1165881600000, 86.14],
							[1165968000000, 89.05],
							[1166054400000, 88.55],
							[1166140800000, 87.72],
							[1166400000000, 85.47],
							[1166486400000, 86.31],
							[1166572800000, 84.76],
							[1166659200000, 82.9],
							[1166745600000, 82.2],
							[1167091200000, 81.51],
							[1167177600000, 81.52],
							[1167264000000, 80.87],
							[1167350400000, 84.84]
						]
					}}
				/>
			</React.Fragment>
		);
	}
}

export default DataProp;