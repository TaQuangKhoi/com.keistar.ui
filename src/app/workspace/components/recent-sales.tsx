import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface Sale {
    user: {
        name: string,
        email: string,
        avatar: string,
    },
    amount: number,
}

function formatNumber(inputNumber: number) {
    const formattedNumber = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(inputNumber);

    return Number(inputNumber) > 0 ? `+${formattedNumber}` : `${formattedNumber}`;
}

function SalesCard({sale}: { sale: Sale }) {
    function getFirstCharacters(name: string) {
        const words: string[] = name.split(' '); // Split the name into an array of words
        const initials = words.map(word => word.charAt(0)).join(''); // Extract first chars and join
        return initials.toUpperCase(); // Capitalize for AvataFallback convention
    }

    return <div className="flex items-center">
        <Avatar className="h-9 w-9">
            <AvatarImage src={sale.user.avatar} alt="Avatar"/>
            <AvatarFallback>
                {getFirstCharacters(sale.user.name)}
            </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.user.name}</p>
            <p className="text-sm text-muted-foreground">
                {sale.user.email}
            </p>
        </div>
        <div className="ml-auto font-medium">
            {formatNumber(sale.amount)}
        </div>
    </div>
}

const sales: Sale[] = [
    {
        user: {
            name: "Olivia Martin",
            email: "olivia.martin@mailinator.com",
            avatar: "/haovan/01.jpg",
        },
        amount: 1999.00,
    },
    {
        user: {
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            avatar: "/haovan/02.png",
        },
        amount: 39.00,
    },
    {
        user: {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            avatar: "/haovan/03.png",
        },
        amount: 39.00,
    }
]

export function RecentSales() {
    return (
        <div className="space-y-8">
            <SalesCard/>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar"/>
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                    <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar"/>
                    <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                    <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                    </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar"/>
                    <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">William Kim</p>
                    <p className="text-sm text-muted-foreground">will@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar"/>
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                    <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
            </div>
        </div>
    )
}
