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
            avatar: "/toikhoi/mine.jpg",
        },
        amount: 1999.00,
    },
    {
        user: {
            name: "Jackson Lee",
            email: "jackson.lee@mailinator.com",
            avatar: "/toikhoi/mine.jpg",
        },
        amount: 39.00,
    },
    {
        user: {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@mailinator.com",
            avatar: "/toikhoi/mine.jpg",
        },
        amount: 299.00,
    },
    {
        user: {
            name: "William Kim",
            email: "will.kim@mailinator.com",
            avatar: "/toikhoi/mine.jpg",
        },
        amount: 99.00,
    },
    {
        user: {
            name: "Sofia Davis",
            email: "sofia.davis@mailinator.com",
            avatar: "/toikhoi/mine.jpg",
        },
        amount: 39.00,
    },
]

export function RecentSales() {
    return (
        <div className="space-y-8">
            {sales.map((sale, index) => (<SalesCard sale={sale} key={index}/>))}
        </div>
    )
}
