import {Metadata} from "next"
import AuthBox from "@/app/authentication/components/auth-box";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            <div
                className="min-h-screen flex-col items-center justify-center md:grid lg:grid-cols-2 lg:p-0">
                <div className="relative hidden lg:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900">
                        <Image src='/haovan/authartwork.jpg' alt="Hảo Văn" fill={true} style={{objectFit: "cover"}}/>
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                        </svg>
                        HavakoBPM
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Nhưng sự thật chứng minh, không phải mỗi một phần chân thành tha thiết tình cảm
                                đều sẽ đạt được đáp lại, trên thế giới cũng thật sự có tan không ra băng cứng.&rdquo;
                            </p>
                            <footer className="text-sm">Tạ Quang Khôi</footer>
                        </blockquote>
                    </div>
                </div>
                <AuthBox/>
            </div>
        </>
    )
}
