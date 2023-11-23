import Link from "next/link";

export default function TestButton() {
    return (
        <Link href="/authentication"
            className="m-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded">
            Button
        </Link>
    )
}
