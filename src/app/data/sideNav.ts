import { NavItem } from '../models';

export const SIDE_NAV_ITEMS: NavItem[] = [
    {
        name: 'Dashboard',
        isMain: true,
        icon: 'home',
        path: 'dashboard'
    },
    {
        name: 'Master',
        isMain: true,
        icon: 'insert_chart_outlined',
        children: [
            {
                name: 'Vehicle',
                isFirstChild: true,
                children: [
                    { name: 'Add Vehicle', isFirstChild: true, path: 'ytd1' },
                    { name: 'View / Edit Vehicle', path: 'ytd2'},
                    { name: 'Vehicle Link / Unlink', isLastChild: true, path: 'ytd3'},
                ],
                lastNode: true
            },
            {
                name: 'Tyre',
                children: [
                    { name: 'Add New Tyre', isFirstChild: true, path: 'ytd4' },
                    { name: 'Tyre Link / Unlink', isLastChild: true, path: 'ytd5' },
                ],
                lastNode: true
            },
            {
                name: 'Bit',
                children: [
                    { name: 'Add Bit', isFirstChild: true, path: 'ytd6' },
                    { name: 'View Bit', isLastChild: true, path: 'ytd7' },
                ],
                lastNode: true
            },
            {
                name: 'Hammer',
                isLastChild: true,
                children: [
                    { name: 'Add Hammer', isFirstChild: true, path: 'ytd8' },
                    { name: 'View Hammer', isLastChild: true, path: 'ytd9' },
                ],
                lastNode: true
            },
        ]
    },
    {
        name: 'Point Details',
        icon: 'account_circle',
        isMain: true,
        children: [
            { name: 'Point Entry', isFirstChild: true, isLastChild: true, path: 'pointDetails/pointEntry' }
        ],
        lastNode: true
    },
    {
        name: 'Transactions',
        icon: 'account_balance_wallet',
        isMain: true,
        children: [
            {
                name: 'Receipts and Advance', isFirstChild: true,
                children: [
                    { name: 'Amount Receipt (Self)', isFirstChild: true, path: 'ytd10' },
                    { name: 'Amount Receipt (Agent)', path: 'ytd11' },
                    { name: 'Receipt & Agent Advance', isLastChild: true, path: 'ytd12' },
                ],
                lastNode: true
            },
            {
                name: 'Expenses and Payments', isFirstChild: true,
                children: [
                    { name: 'Purchase', isFirstChild: true, path: 'ytd13' },
                    { name: 'Fuel Expense', path: 'ytd14' },
                    { name: 'Material Expense', path: 'ytd15' },
                    { name: 'Miscellaneous Expense', isLastChild: true, path: 'ytd16' }
                ],
                lastNode: true
            },
            { name: 'Other Payment Issue', isLastChild: true, path: 'ytd17' },
        ]
    },
    {
        name: 'Labour Management Details',
        isMain: true,
        icon: 'account_circle',
        children: [
            { name: 'Labour Rule', isFirstChild: true, path: 'ytd18' },
            { name: 'Add Labour', path: 'ytd19' },
            { name: 'View / Edit Labour', path: 'ytd20' },
            { name: 'Labour Link / Unlink', path: 'ytd21' },
            { name: 'Labour Advance', path: 'ytd22' },
            { name: 'Labour Advance Refund', isLastChild: true, path: 'ytd23' },
        ]
    },
    {
        name: 'Services',
        isMain: true,
        icon: 'notifications',
        children: [
            { name: 'Vehicle Service Head', isFirstChild: true, path: 'ytd24' },
            { name: 'Vehicle Service Maintenance', isLastChild: true, path: 'ytd25' },
        ]
    },

];
