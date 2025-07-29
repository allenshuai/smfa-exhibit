import { motion } from 'framer-motion';
import React from "react";
import { SpotType } from '../data/allSpots'; 

interface Barnum_Level2Props {
  renderSpot: (
    id: string,
    d: string,
    latestSpot: string | undefined
  ) => React.JSX.Element;
  latestSpot: string | undefined;
}

export default function Barnum_Level2({
  renderSpot,
  latestSpot,
}: Barnum_Level2Props) {
  const dMap: Record<string, string> = {
		LLH0: "M464.09 357.01h262.79v18.77H464.09z",
  	LLH1: "M703.01 375.78h23.87v233.19H703.01z",
	};

  const nonSelectedSpots = Object.keys(dMap).filter(
    (id) => id !== latestSpot
  );

  return (
    <>
      {/* Base boundary */}
			<g id="BARNUM_L2_Base" fill="#f0ead2">
				<path
					d="M987.43 366.79 964.99 366.79 964.99 313.15 729.07 313.15 729.07 321.43 693.43 321.43 693.43 303.07 619.63 303.07 619.63 272.35 537.07 272.35 537.07 303.07 457.63 303.07 457.63 251.11 457.63 182.6 457.63 66.43 151.99 66.43 151.99 251.11 195.43 251.11 195.43 334.14 186.43 334.14 186.43 558.31 343.03 558.31 343.03 596.35 418.75 596.35 418.75 634.15 407.59 634.15 407.59 700.63 484.39 700.63 484.39 718.75 671.47 718.75 671.47 700.63 748.87 700.63 748.87 634.15 733.24 634.15 733.24 599.35 945.31 599.35 945.31 577.94 964.99 577.94 964.99 523.99 987.43 523.99 987.43 366.79Z"
					stroke="#6c584c"
					strokeWidth={1}
				/>
			</g>

    </>
  );
}
