'use client'

import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

export default function ArtWork() {
    const size = useWindowSize();

    return <div className="absolute inset-0 bg-zinc-900">
        <Image src='/haovan/authartwork.jpg' alt="Hảo Văn" width={2038} height={1366}/>
    </div>
}