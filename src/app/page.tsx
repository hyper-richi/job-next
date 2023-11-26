import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import AcmeLogo from "@/components/acme-logo";

export default function Home() {
    return (
        <main className="">
            <div className="">
                <AcmeLogo />
            </div>
            <div className="">
                <div className="">
                    <div className="" />
                    <p className="">
                        <strong>Welcome to Acme.</strong> This is the example for the
                        <a href="https://nextjs.org/learn/" className="">
                            Next.js Learn Course
                        </a>
                        , brought to you by Vercel.
                    </p>
                    <Link href="/" className="">
                        <span>Log in</span> <ArrowRightIcon width={24} height={24} />
                    </Link>
                </div>
                <div className="">
                    {/* Add Hero Images Here */}
                    <Image
                        src="/images/hero-desktop.png"
                        width={1000}
                        height={760}
                        className="hidden md:block"
                        alt="Screenshots of the dashboard project showing desktop version"
                    />
                    <Image
                        src="/images/hero-mobile.png"
                        width={560}
                        height={620}
                        className="block md:hidden"
                        alt="Screenshot of the dashboard project showing mobile version"
                    />
                </div>
            </div>
        </main>
    );
}
