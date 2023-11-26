import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
    weight: ["400", "700"],
    subsets: ["latin"],
});

export default function AcmeLogo() {
    return (
        <div className={`${lusitana.className}`}>
            <GlobeAltIcon width={24} height={24} className="" />
            <p className="text-[44px]">Acme</p>
        </div>
    );
}
