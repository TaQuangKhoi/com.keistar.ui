'use client'

import Image from "next/image";

export default function ArtWork() {
    return <div className="absolute inset-0 bg-zinc-900">
        <Image src='/haovan/authartwork.jpg' alt="Hảo Văn" fill={true} style={{objectFit: "cover"}}/>
    </div>
}