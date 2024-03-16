export default function DashboardLoading() {
    return (
        <div className="mx-4 mt-3">
            <div className="flex items-center justify-between space-y-2">
                <div className="w-32 h-6 bg-gray-200 rounded"/>
                <div className="flex items-center space-x-2">
                    <div className="w-24 h-6 bg-gray-200 rounded"/>
                    <div className="w-24 h-6 bg-gray-200 rounded"/>
                </div>
            </div>
            <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                    <div className="w-full h-48 bg-gray-200 rounded"/>
                </div>
            </div>
        </div>
    )
}