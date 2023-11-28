const default_items = [
    {
        label: "Dashboard",
        value: "dashboard",
        href: "/workspace/dashboard",
    },
    {
        label: "Tasks",
        value: "tasks",
        href: "/workspace/tasks",
    },
    {
        label: "Settings",
        value: "settings",
        href: "/workspace/settings",
    },
]

export const hr_department_items = [
    ...default_items.slice(0, 2),
    {
        label: "Employees",
        value: "onboarding",
        href: "/workspace/onboarding",
    },
    ...default_items.slice(2),
]

export const personal_items = [
    ...default_items.slice(0, 2),
    {
        label: "E-leave",
        value: "onboarding",
        href: "/workspace/office/e-leave",
    },
    {
        label: "Travel Request",
        value: "travel-request",
        href: "/workspace/travel-request",
    },
    {
        label: "Car Booking",
        value: "car-booking",
        href: "/workspace/car-booking",
    },
    {
        label: "Weekly Reports",
        value: "weekly-reports",
        href: "/workspace/weekly-reports",
    },
    ...default_items.slice(2),
]