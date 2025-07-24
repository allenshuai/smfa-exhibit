import { motion } from 'framer-motion';

interface SMFA_Level2Props {
  renderSpot: (
    id: string,
    d: string,
    latestSpot: string | undefined
  ) => JSX.Element;
  latestSpot: string | undefined;
}

export default function SMFA_Level2({
  renderSpot,
  latestSpot,
}: SMFA_Level2Props) {
  const dMap: Record<string, string> = {
	CorridorA200C4: 'M241.38,215.95h30.71v94.88h-30.71Z',
    CorridorA200C3: 'M241.37,177.89h58.09v30.71h-58.09Z',
    CorridorA200C2: 'M306.87,177.89h124.27v30.71h-124.27Z',
    CorridorB200C1: 'M379.97,522.33h164.44v30.71h-164.44Z',
    CorridorB200C2: 'M554.29,522.33h205.63v30.71h-205.63Z',
    CorridorA200C5: 'M437.45,177.89h281.54v30.71h-281.54Z',
    M200C1: 'M1035.57,177.89h21.92v72.08h-21.92Z',

  };

  const nonSelectedSpots = Object.keys(dMap).filter(
    (id) => id !== latestSpot
  );

  return (
    <>
      {/* Base boundary */}
      <g id="SMFA_F2_Base" fill="#f0ead2">
				<path
					d="M719,69.09v6.6H240.93v-6.6h-120.54v252.71h120.54v-6.01h116.42v197.73H120.39v217.39h718.82v-217.39h-459.24v-67.73l15.72,15.73h0s.2.2.2.2h0c10.18,9.96,26.5,9.91,36.6-.19h0c10.1-10.09,10.17-26.42.21-36.6h0s-.2-.21-.2-.21l-7.5-7.51-45.04-45.08v-56.35h339.02v63.65h49.79v-57.64h70.75V69.09h-120.54Z"
					stroke="#6c584c"
					strokeWidth={1}
				/>
				<polyline
					points="904.42 74.87 1031.95 74.87 1031.95 69.15 1149.67 69.15 1149.67 320.05 1032.34 320.05 1032.34 310.17 904.42 310.17"
					fill="none"
					stroke="#6c584c"
					strokeWidth={1}
				/>
			</g>


      {/* Gray rooms */}
			<motion.g
        id="GrayRooms"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Insert your gray room paths or rects here */}
        <g id="SMFA_F2_Gray" fill="#c2c1c0">
        <rect id="A204" x="241.37" y="79.99" width="189.77" height="93.14"><title>A204</title></rect>
        <rect id="A206" x="437.45" y="79.99" width="90.63" height="93.14"><title>A206</title></rect>
        <rect id="A208" x="532.57" y="79.99" width="89.59" height="93.14"><title>A208</title></rect>
        <rect id="A210" x="626.38" y="79.99" width="92.62" height="93.14"><title>A210</title></rect>
        <rect id="B2055" x="379.97" y="557.77" width="210.2" height="29.47"><title>B2055</title></rect>
        <rect id="B209" x="595.96" y="557.65" width="123.03" height="166.07"><title>B209</title></rect>
        <rect id="B211" x="723.82" y="557.65" width="111.25" height="166.07"><title>B211</title></rect>
        <polygon id="A201" points="343.46 215.14 276.44 215.14 276.44 309.89 357.31 309.89 343.46 215.14"><title>A201</title></polygon>
        <polygon id="A203" points="365.66 215.14 379.48 309.89 528.08 309.89 528.08 215.14 365.66 215.14"><title>A203</title></polygon>
        <rect id="A200S1" x="141.27" y="281.13" width="94.68" height="36.47"><title>A200S1</title></rect>
        <polygon id="A202" points="235.95 73.55 125.07 73.55 125.07 269.19 125.07 277.3 125.07 317.6 137.86 317.6 137.86 277.3 235.95 277.3 235.95 73.55"><title>A202</title></polygon>
        <rect id="A200S22" x="749.36" y="177.89" width="85.7" height="34.51"><title>A200S22</title></rect>
        <rect id="A200E" x="749.36" y="216.91" width="40.01" height="33.07"><title>A200E</title></rect>
        <rect id="B200S1" x="764.72" y="522.33" width="70.34" height="30.71"><title>B200S1</title></rect>
        <rect id="None" x="379.97" y="592.25" width="210.2" height="131.47"><title>None</title></rect>
        <polygon id="B203" points="327.39 557.65 327.39 572.5 358.15 572.5 358.15 603.26 327.39 603.26 327.39 723.71 375.12 723.71 375.12 557.65 327.39 557.65"><title>B203</title></polygon>
        <g id="B201">
            <polygon points="230.66 723.71 252 723.71 262.26 723.71 304.64 723.71 304.64 636.29 304.64 612.51 304.64 603.26 230.66 603.26 230.66 723.71"><title>B201-top</title></polygon>
            <polygon points="262.26 522.33 248.81 522.33 128.28 522.33 128.28 723.71 203.58 723.71 203.58 603.26 203.58 572.5 304.64 572.5 304.64 557.69 304.64 522.33 262.26 522.33"><title>B201-bottom</title></polygon>
        </g>
        <polygon id="A212" points="723.82 73.55 723.82 173.13 729.44 173.13 765.3 137.27 781.35 153.31 761.52 173.13 835.06 173.13 835.06 73.55 723.82 73.55"><title>A212</title></polygon>
        <polygon id="A200S2" points="758.3 173.13 778.08 153.36 764.94 140.22 732.04 173.13 758.3 173.13"><title>A200S2</title></polygon>
        <rect id="none" x="938.13" y="79.99" width="92.62" height="93.14"><title>none</title></rect>
        <rect id="none-2" x="938.13" y="211.95" width="92.62" height="93.14"><title>none</title></rect>
        <rect id="M200S1" x="1061.12" y="177.89" width="85.7" height="34.51"><title>M200S1</title></rect>
        <rect id="M200E" x="1061.12" y="216.91" width="40.01" height="33.07"><title>M200E</title></rect>
        <polygon id="A207" points="1108.1 216.84 1108.1 216.91 1103.97 216.91 1103.97 252.1 1064.25 252.1 1058.97 252.1 1035.57 252.1 1035.57 317.6 1146.82 317.6 1146.82 261.19 1146.82 216.84 1108.1 216.84"><title>A207</title></polygon>
        <polygon id="none-3" points="1035.57 73.55 1035.57 173.13 1041.19 173.13 1077.06 137.27 1093.1 153.31 1073.28 173.13 1146.82 173.13 1146.82 73.55 1035.57 73.55"><title>none</title></polygon>
        <polygon points="1070.06 173.13 1089.83 153.36 1076.7 140.22 1043.79 173.13 1070.06 173.13"><title>corner-deco</title></polygon>
        <polygon id="A205" points="796.34 216.84 796.34 216.91 792.21 216.91 792.21 252.1 759.04 252.1 752.5 252.1 747.21 252.1 723.82 252.1 719 252.1 719 215.14 532.57 215.14 532.57 309.82 686.38 309.82 686.38 309.89 723.82 309.89 723.82 317.6 835.06 317.6 835.06 261.19 835.06 216.84 796.34 216.84"><title>A205</title></polygon>
        </g>

			</motion.g>

			{/* Green interactive spots */}
			<motion.g
        id="GreenSpots"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
				{nonSelectedSpots.map((id) => renderSpot(id, dMap[id], latestSpot))}
			</motion.g>


      {/* Decorative Elements */}
			<motion.g
        id="Decorations"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
				<g id="Decorations" stroke="#545554" fill="none">
				{/* --- Stairs and Elevator --- */}
					<g id="Stair4">
						<rect className="cls-4" x="740.81" y="152.38" width="34.34" height="14.27" transform="translate(1406.74 -263.66) rotate(135)" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-3" x1={771.45 - i * 2.08} y1={156.24 + i * 2.08} x2={761.36 - i * 2.08} y2={146.16 + i * 2.08} />
							))}
						</g>
						<g>
							<g>
								<line className="cls-2" x1="768.64" y1="152.72" x2="748.61" y2="172.76" />
								<polygon className="cls-12" points="771.56 149.83 770.1 154.18 767.2 151.28 771.56 149.83" />
							</g>
							<g>
								<line className="cls-2" x1="746.32" y1="165.49" x2="766.35" y2="145.46" />
								<polygon className="cls-12" points="743.42 168.4 747.78 166.95 744.87 164.05 743.42 168.4" />
							</g>
						</g>
					</g>

					<g id="Stair4M">
						<rect className="cls-4" x="1052.97" y="152.38" width="34.34" height="14.27" transform="translate(1939.63 -484.39) rotate(135)" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-3" x1={1083.61 - i * 2.08} y1={156.24 + i * 2.08} x2={1073.52 - i * 2.08} y2={146.16 + i * 2.08} />
							))}
						</g>
						<g>
							<g>
								<line className="cls-2" x1="1080.8" y1="152.72" x2="1060.77" y2="172.76" />
								<polygon className="cls-12" points="1083.72 149.83 1082.26 154.18 1079.36 151.28 1083.72 149.83" />
							</g>
							<g>
								<line className="cls-2" x1="1058.48" y1="165.49" x2="1078.51" y2="145.46" />
								<polygon className="cls-12" points="1055.58 168.4 1059.94 166.95 1057.03 164.05 1055.58 168.4" />
							</g>
						</g>
					</g>

					<g id="Stair3M">
						<rect className="cls-6" x="759.18" y="181.17" width="67.67" height="28.12" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-5" x1={769.68 + i * 5.79} y1="181.01" x2={769.68 + i * 5.79} y2="209.13" />
							))}
						</g>
						<g>
							<g>
								<line className="cls-23" x1="768.67" y1="189.83" x2="824.51" y2="189.83" />
								<polygon className="cls-16" points="760.58 189.8 768.67 185.76 768.67 193.85 760.58 189.8" />
							</g>
							<g>
								<line className="cls-23" x1="817.58" y1="203.14" x2="761.74" y2="203.14" />
								<polygon className="cls-16" points="825.67 203.12 817.58 199.07 817.58 207.17 825.67 203.12" />
							</g>
						</g>
					</g>

					<g id="Stair3">
						<rect className="cls-6" x="1070.13" y="181.17" width="67.67" height="28.12" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-5" x1={1080.63 + i * 5.79} y1="181.01" x2={1080.63 + i * 5.79} y2="209.13" />
							))}
						</g>
						<g>
							<g>
								<line className="cls-23" x1="1079.63" y1="189.83" x2="1135.47" y2="189.83" />
								<polygon className="cls-16" points="1071.54 189.8 1079.63 185.76 1079.63 193.85 1071.54 189.8" />
							</g>
							<g>
								<line className="cls-23" x1="1128.54" y1="203.14" x2="1072.7" y2="203.14" />
								<polygon className="cls-16" points="1136.63 203.12 1128.54 199.07 1128.54 207.17 1136.63 203.12" />
							</g>
						</g>
					</g>

					<g id="Stair2">
						<rect className="cls-9" x="768.77" y="524.83" width="62.22" height="25.85" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-8" x1={778.43 + i * 5.33} y1="524.69" x2={778.43 + i * 5.33} y2="550.55" />
							))}
						</g>
						<g>
							<g>
								<line className="cls-11" x1="777.5" y1="532.8" x2="828.85" y2="532.8" />
								<polygon className="cls-30" points="770.06 532.78 777.5 529.06 777.5 536.5 770.06 532.78" />
							</g>
							<g>
								<line className="cls-11" x1="822.48" y1="545.04" x2="771.13" y2="545.04" />
								<polygon className="cls-30" points="829.92 545.02 822.48 541.3 822.48 548.74 829.92 545.02" />
							</g>
						</g>
					</g>

					<g id="Stair1">
						<rect className="cls-6" x="156.53" y="285.38" width="67.67" height="28.12" />
						<g>
							{[...Array(9)].map((_, i) => (
								<line key={i} className="cls-5" x1={167.03 + i * 5.79} y1="285.23" x2={167.03 + i * 5.79} y2="313.35" />
							))}
						</g>
						<g>
							<g>
								<line className="cls-23" x1="166.03" y1="294.04" x2="221.87" y2="294.04" />
								<polygon className="cls-16" points="157.94 294.02 166.03 289.97 166.03 298.07 157.94 294.02" />
							</g>
							<g>
								<line className="cls-23" x1="214.94" y1="307.36" x2="159.09" y2="307.36" />
								<polygon className="cls-16" points="223.03 307.34 214.94 303.29 214.94 311.38 223.03 307.34" />
							</g>
						</g>
					</g>		

					<g id="Elevator1">
						<path className="cls-35" d="M762.9,221.72c0-.1,0-.18,0-.26,0-.59,0-1.18,0-1.77,0-.29.1-.41.35-.41,3.05,0,6.1,0,9.15,0,.26,0,.36.11.36.42,0,.66,0,1.32,0,2.01.09,0,.17,0,.25,0,3.2,0,6.39,0,9.59,0,.37,0,.44.07.44.5,0,8.29,0,16.58,0,24.87,0,.42-.07.5-.43.5-7.32,0-14.63,0-21.95,0-.76,0-1.52,0-2.28,0-.31,0-.39-.09-.39-.44,0-8.33,0-16.67,0-25,0-.34.08-.43.38-.43,1.42,0,2.83,0,4.25,0,.09,0,.18,0,.3,0Z"/>
						<path className="cls-35" d="M779.09,234.21c-.52,0-1.04,0-1.56,0-.15,0-.28-.02-.34-.2-.06-.17.02-.28.12-.39.51-.57,1.01-1.14,1.52-1.71.21-.24.32-.24.54,0,.51.57,1.02,1.15,1.53,1.73.09.1.17.22.1.38-.06.15-.17.19-.31.19-.53,0-1.07,0-1.6,0Z"/>
						<path className="cls-35" d="M779.1,236.37c.53,0,1.06,0,1.59,0,.13,0,.28.02.3.18.02.12-.02.29-.09.37-.51.6-1.04,1.19-1.57,1.78-.17.19-.3.18-.47,0-.52-.58-1.04-1.17-1.56-1.76-.09-.1-.17-.21-.11-.37.06-.16.18-.19.33-.19.53,0,1.06,0,1.59,0Z"/>
					</g>

					<g id="Elevator1-2" data-name="Elevator1">
						<path className="cls-35" d="M1073.51,221.72c0-.1,0-.18,0-.26,0-.59,0-1.18,0-1.77,0-.29.1-.41.35-.41,3.05,0,6.1,0,9.15,0,.26,0,.36.11.36.42,0,.66,0,1.32,0,2.01.09,0,.17,0,.25,0,3.2,0,6.39,0,9.59,0,.37,0,.44.07.44.5,0,8.29,0,16.58,0,24.87,0,.42-.07.5-.43.5-7.32,0-14.63,0-21.95,0-.76,0-1.52,0-2.28,0-.31,0-.39-.09-.39-.44,0-8.33,0-16.67,0-25,0-.34.08-.43.38-.43,1.42,0,2.83,0,4.25,0,.09,0,.18,0,.3,0Z"/>
						<path className="cls-35" d="M1089.71,234.21c-.52,0-1.04,0-1.56,0-.15,0-.28-.02-.34-.2-.06-.17.02-.28.12-.39.51-.57,1.01-1.14,1.52-1.71.21-.24.32-.24.54,0,.51.57,1.02,1.15,1.53,1.73.09.1.17.22.1.38-.06.15-.17.19-.31.19-.53,0-1.07,0-1.6,0Z"/>
						<path className="cls-35" d="M1089.71,236.37c.53,0,1.06,0,1.59,0,.13,0,.28.02.3.18.02.12-.02.29-.09.37-.51.6-1.04,1.19-1.57,1.78-.17.19-.3.18-.47,0-.52-.58-1.04-1.17-1.56-1.76-.09-.1-.17-.21-.11-.37.06-.16.18-.19.33-.19.53,0,1.06,0,1.59,0Z"/>
					</g>

					<g id="staircase">
						<path className="cls-28" d="M429.22,426.87l-37.9-37.15-11.59,11.82.36,36.73,19.35,18.97c8.39,8.22,21.85,8.09,30.07-.3,8.22-8.39,8.09-21.85-.3-30.07Z"/>
						<path className="cls-28" d="M416.22,440.08l-27.49-26.95c-1.17-1.15-3.14-.31-3.13,1.33l.03,3.27,26.88,26.36c1.11,1.09,2.91,1.03,3.95-.15.98-1.11.81-2.82-.25-3.85Z"/>
						<g>
							<g>
								<line className="cls-26" x1="412.54" y1="444.06" x2="399.67" y2="457.18"/>
								<line className="cls-32" x1="413.66" y1="444.9" x2="406.38" y2="461.83"/>
								<line className="cls-20" x1="414.59" y1="445.04" x2="413.92" y2="463.31"/>
								<line className="cls-31" x1="415.36" y1="444.5" x2="421.45" y2="462.1"/>
								<line className="cls-21" x1="416.14" y1="444.26" x2="428.04" y2="458.31"/>
								<line className="cls-20" x1="416.82" y1="443.7" x2="432.87" y2="452.44"/>
								<line className="cls-20" x1="417.13" y1="442.86" x2="435.47" y2="445.23"/>
								<line className="cls-20" x1="416.97" y1="441.97" x2="435.22" y2="437.49"/>
								<line className="cls-22" x1="416.94" y1="440.96" x2="432.14" y2="430.32"/>
							</g>
							<line className="cls-20" x1="409.34" y1="441.09" x2="396.36" y2="454.33"/>
							<line className="cls-20" x1="406.25" y1="438.06" x2="393.27" y2="451.3"/>
							<line className="cls-20" x1="427.54" y1="425.39" x2="414.56" y2="438.62"/>
							<line className="cls-20" x1="424.45" y1="422.36" x2="411.47" y2="435.6"/>
							<line className="cls-20" x1="421.57" y1="419.53" x2="408.59" y2="432.77"/>
							<line className="cls-20" x1="418.48" y1="416.51" x2="405.5" y2="429.74"/>
							<line className="cls-20" x1="415.74" y1="413.82" x2="402.76" y2="427.06"/>
							<line className="cls-20" x1="412.65" y1="410.79" x2="399.67" y2="424.03"/>
						</g>
						<g>
							<g>
								<g>
									<path className="cls-20" d="M425.38,429.62c6.66,6.53,6.77,17.23.24,23.89-6.53,6.66-17.23,6.77-23.89.24"/>
									<line className="cls-20" x1="425.38" y1="429.62" x2="399.94" y2="404.68"/>
									<line className="cls-20" x1="401.72" y1="453.75" x2="389.66" y2="441.92"/>
								</g>
								<polygon className="cls-20" points="395.16 400 402.28 402.29 397.6 407.07 395.16 400 395.16 400"/>
							</g>
							<g>
								<g>
									<path className="cls-20" d="M419.6,436.76c3.06,3,3.1,7.9.11,10.96s-7.9,3.1-10.96.11"/>
									<line className="cls-20" x1="419.6" y1="436.76" x2="393.53" y2="411.21"/>
									<line className="cls-20" x1="408.75" y1="447.83" x2="396.06" y2="435.39"/>
								</g>
								<polygon className="cls-20" points="391.29 430.7 398.4 433 393.72 437.77 391.29 430.7 391.29 430.7"/>
							</g>
						</g>
					</g>
				</g>
			</motion.g>


							{/* --- Dashed Navigation Paths --- */}
			<motion.g
        id="Level2_Path"
        stroke="#545554"
        strokeWidth={1}
        strokeDasharray="10 6"
				fill="none"
        opacity={0.65}
        initial={{ strokeDashoffset: 80, opacity: 0 }}
				animate={{ strokeDashoffset: 0, opacity: 1 }}
				transition={{ delay: 1.2, duration: 1.2, ease: 'easeInOut' }}
      >
				
				{/* Horizontal main corridor */}
				<line x1="351.06" y1="193.25" x2="357.06" y2="193.25" />
				<line x1="369.06" y1="193.25" x2="722.85" y2="193.25" />
				<polyline points="728.84 193.25 734.84 193.25 734.84 199.25" />
				<line x1="734.84" y1="209.05" x2="734.84" y2="223.76" />
				<line x1="734.84" y1="228.66" x2="734.84" y2="234.66" />

				{/* Lower left path */}
				<line x1="216.46" y1="706.61" x2="216.46" y2="700.61" />
				<line x1="216.46" y1="688.68" x2="216.46" y2="599.2" />
				<polyline points="216.46 593.24 216.46 587.24 222.46 587.24" />
				<line x1="235.09" y1="587.24" x2="304.56" y2="587.24" />
				<polyline points="310.87 587.24 316.87 587.24 316.87 581.24" />
				<line x1="316.87" y1="568.75" x2="316.87" y2="550.01" />
				<polyline points="316.87 543.76 316.87 537.76 322.87 537.75" />
				<line x1="336.25" y1="537.71" x2="356.31" y2="537.65" />
				<polyline points="363 537.64 369 537.62 369 531.62" />
				<polyline points="369 519.26 369 313.5 352.86 205.29" />
				<polyline points="351.95 199.18 351.06 193.25 345.06 193.25" />
				<line x1="333.3" y1="193.25" x2="268.61" y2="193.25" />
				<polyline points="262.73 193.25 256.73 193.25 256.73 199.25" />
				<line x1="256.73" y1="211.93" x2="256.73" y2="281.7" />
				<line x1="256.73" y1="288.04" x2="256.73" y2="294.04" />

				{/* Right vertical path */}
				<line x1="316.87" y1="587.24" x2="316.87" y2="593.24" />
				<line x1="316.87" y1="605.17" x2="316.87" y2="694.64" />
				<line x1="316.87" y1="700.61" x2="316.87" y2="706.61" />

				{/* Horizontal bottom path */}
				<line x1="369" y1="537.62" x2="375" y2="537.62" />
				<line x1="386.67" y1="537.62" x2="730.93" y2="537.62" />
				<line x1="736.77" y1="537.62" x2="742.77" y2="537.62" />

				{/* Branching path top right */}
				<polyline points="734.84 193.25 734.84 181.17 740.62 175.36" />

				{/* Top right M200 vertical path */}
				<polyline points="767.83 126.56 767.83 43.42 1069.36 43.42 1069.36 126.56" />
				<polyline points="1046.53 243.34 1046.53 185.76 1055.58 175.53" />

			</motion.g>

			{latestSpot &&
        renderSpot(latestSpot, dMap[latestSpot], latestSpot)}
    </>
  );
}
