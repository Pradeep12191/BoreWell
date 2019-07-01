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
                    { name: 'Add Vehicle', isFirstChild: true, },
                    { name: 'View / Edit Vehicle', },
                    { name: 'Vehicle Link / Unlink', isLastChild: true },
                ],
                lastNode: true
            },
            {
                name: 'Tyre',
                children: [
                    { name: 'Add New Tyre', isFirstChild: true },
                    { name: 'Tyre Link / Unlink', isLastChild: true },
                ],
                lastNode: true
            },
            {
                name: 'Bit',
                children: [
                    { name: 'Add Bit', isFirstChild: true },
                    { name: 'View Bit', isLastChild: true },
                ],
                lastNode: true
            },
            {
                name: 'Hammer',
                isLastChild: true,
                children: [
                    { name: 'Add Hammer', isFirstChild: true },
                    { name: 'View Hammer', isLastChild: true },
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
                    { name: 'Amount Receipt (Self)', isFirstChild: true },
                    { name: 'Amount Receipt (Agent)' },
                    { name: 'Receipt & Agent Advance', isLastChild: true },
                ],
                lastNode: true
            },
            {
                name: 'Expenses and Payments', isFirstChild: true,
                children: [
                    { name: 'Purchase', isFirstChild: true },
                    { name: 'Fuel Expense' },
                    { name: 'Material Expense' },
                    { name: 'Miscellaneous Expense', isLastChild: true }
                ],
                lastNode: true
            },
            { name: 'Other Payment Issue', isLastChild: true },
        ]
    },
    {
        name: 'Labour Management Details',
        isMain: true,
        icon: 'account_circle',
        children: [
            { name: 'Labour Rule', isFirstChild: true, },
            { name: 'Add Labour' },
            { name: 'View / Edit Labour' },
            { name: 'Labour Link / Unlink' },
            { name: 'Labour Advance' },
            { name: 'Labour Advance Refund', isLastChild: true },
        ]
    },
    {
        name: 'Services',
        isMain: true,
        icon: 'notifications',
        children: [
            { name: 'Vehicle Service Head', isFirstChild: true, },
            { name: 'Vehicle Service Maintenance', isLastChild: true },
        ]
    },

];
