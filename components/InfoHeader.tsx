// components/InfoHeader.tsx
import Image from "next/image";
import { FaMapMarkerAlt, FaPlusCircle, FaInbox, FaCheckCircle } from "react-icons/fa";

export default function InfoHeader() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Right: Steps Only */}
      <div className="absolute top-6 right-6 text-sm text-right leading-tight max-w-xs pointer-events-auto text-[#6c584c] space-y-2">
        <div className="flex items-start gap-2 justify-end">
          <FaMapMarkerAlt className="text-orange-500" />
          <span>1) <strong>Find</strong> the available green spots</span>
        </div>
        <div className="flex items-start gap-2 justify-end">
          <FaPlusCircle className="text-blue-500" />
          <span>2) <strong>Add</strong> it to your cart</span>
        </div>
        <div className="flex items-start gap-2 justify-end">
          <FaInbox className="text-purple-500" />
          <span>3) <strong>Request</strong> up to 3 locations</span>
        </div>
        <div className="flex items-start gap-2 justify-end">
          <FaCheckCircle className="text-green-600" />
          <span>4) <strong>Submit</strong> to be reviewed</span>
        </div>
      </div>

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
        </div>
      </div>
    </div>
  );
}
