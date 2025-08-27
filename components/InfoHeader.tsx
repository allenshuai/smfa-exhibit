// components/InfoHeader.tsx
import Image from "next/image";
import NoticePill from "@/components/NoticePill";


export default function InfoHeader() {
  return (
    <div className="absolute inset-0 pointer-events-none">

      {/* Bottom Left: Divider Line + Logo + Contact Info */}
      <div className="absolute bottom-6 left-6 text-sm text-[#6c584c]">
        {/* Line */}
        <div className="w-120 h-px bg-[#6c584c] mb-2" />

        {/* Logo + Text Row */}
        <div className="flex items-center gap-4">
          <Image
            src="/SMFA_01_Brand_Orange_Blue_Green_Pink.png"
            alt="SMFA Logo"
            width={120}
            height={120}
          />
          <div className="leading-snug">
            <p className="font-semibold">SMFA | Student Exhibition Opportunities</p>
            <p>Contact: Kierra.Crenshaw@tufts.edu</p>
          </div>


         <div className="flex flex-row gap-4 ml-16 pointer-events-auto">
          <NoticePill variant="alert" size="sm">
            Mobile version is work in progress — desktop only for now.
          </NoticePill>
          <NoticePill variant="info" size="sm">
            More info about the student online features launching soon.
          </NoticePill>
        </div>

          
        </div>
      </div>
    </div>
  );
}
