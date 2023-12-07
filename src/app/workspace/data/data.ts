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
        label: "Employee",
        value: "employee",
        href: "/workspace/office/employee",
    },
    ...default_items.slice(2),
]

export const personal_items = [
    ...default_items.slice(0, 2),
    {
        label: "E-leave",
        value: "e-leave",
        href: "/workspace/office/e-leave",
    },
    {
        label: "Travel",
        value: "travel",
        href: "/workspace/office/travel",
    },
    {
        label: "Car Booking",
        value: "car-booking",
        href: "/workspace/office/car-booking",
    },
    {
        label: "Weekly Report",
        value: "weekly-report",
        href: "/workspace/office/weekly-report",
    },
    ...default_items.slice(2),
]