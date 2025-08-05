'use client';

import RhinoSVG from './RhinoSVG';
import TagSVG from './svg/TagSVG';
import FrameSVG from './svg/FrameSVG';
import PoleSVG from './svg/PoleSVG';

export default function GalleryPhase() {
  return (
    <section className="h-full w-full relative overflow-hidden flex items-end">
      <svg
        viewBox="0 0 600 800"
        className="w-[600px] h-[600px] z-10 ml-[60px]"
        preserveAspectRatio="xMinYMax meet"
      >
        <g transform="translate(0, 0)">
          <FrameSVG />
          <g transform="translate(640,-40) scale(-0.9, 0.9)">
            <RhinoSVG />
          </g>
        </g>

        <g transform="translate(0, 0)">
          <TagSVG />
        </g>

        <g transform="translate(0, 0)">
          <PoleSVG />
        </g>
      </svg>
    </section>
  );
}
