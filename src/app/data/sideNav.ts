import { NavItem } from '../models';
const LEVEL_0_PADDING = 15;
const LEVEL_1_PADDING = 30;
const LEVEL_2_PADDING = 45;

export const SIDE_NAV_ITEMS: NavItem[] = [
    {
        name: 'Dashboard',
        isMain: true,
        icon: 'home',
        path: 'dashboard',
        level: 0,
        paddingLeft: LEVEL_0_PADDING
    },
    {
        name: 'Master',
        isMain: true,
        icon: 'insert_chart_outlined',
        level: 0,
        paddingLeft: LEVEL_0_PADDING,
        children: [
            {
                name: 'Vehicle',
                isFirstChild: true,
                children: [
                    { name: 'Add Vehicle', isFirstChild: true, path: 'master/vehicle/addVehicle', level: 2, paddingLeft: LEVEL_2_PADDING,  },
                    { name: 'View / Edit Vehicle', path: 'ytd2', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Vehicle Link / Unlink', isLastChild: true, path: 'ytd3', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'Tyre',
                children: [
                    { name: 'Add New Tyre', isFirstChild: true, path: 'ytd4', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Tyre Link / Unlink', isLastChild: true, path: 'ytd5', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'Bit',
                children: [
                    { name: 'Add Bit', isFirstChild: true, path: 'ytd6', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'View Bit', isLastChild: true, path: 'ytd7', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'Hammer',
                isLastChild: true,
                children: [
                    { name: 'Add Hammer', isFirstChild: true, path: 'master/hammer/addHammer', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'View Hammer', isLastChild: true, path: 'ytd9', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
        ]
    },
    {
        name: 'Point Details',
        icon: 'account_circle',
        paddingLeft: LEVEL_0_PADDING,
        isMain: true,
        level: 0,
        children: [
            {
                name: 'Point Entry', isFirstChild: true,
                isLastChild: true, path: 'pointDetails/pointEntry', level: 1,
                paddingLeft: LEVEL_1_PADDING
            }
        ],
        lastNode: true
    },
    {
        name: 'Transactions',
        icon: 'account_balance_wallet',
        isMain: true,
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            {
                name: 'Receipts and Advance', isFirstChild: true,
                children: [
                    { name: 'Amount Receipt (Self)', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Amount Receipt (Agent)', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Receipt & Agent Advance', isLastChild: true, path: 'ytd12', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'Expenses and Payments', isFirstChild: true,
                children: [
                    { name: 'Purchase', isFirstChild: true, path: 'ytd13', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Fuel Expense', path: 'ytd14', level: 2 , paddingLeft: LEVEL_2_PADDING},
                    { name: 'Material Expense', path: 'ytd15', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'Miscellaneous Expense', isLastChild: true, path: 'ytd16', level: 2, paddingLeft: LEVEL_2_PADDING }
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            { name: 'Other Payment Issue', isLastChild: true, path: 'ytd17', level: 1, paddingLeft: LEVEL_1_PADDING },
        ]
    },
    {
        name: 'Labour Management Details',
        isMain: true,
        icon: 'account_circle',
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            { name: 'Labour Rule', isFirstChild: true, path: 'ytd18', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'Add Labour', path: 'ytd19', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'View / Edit Labour', path: 'ytd20', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'Labour Link / Unlink', path: 'ytd21', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'Labour Advance', path: 'ytd22', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'Labour Advance Refund', isLastChild: true, path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING },
        ]
    },
    {
        name: 'Services',
        isMain: true,
        icon: 'notifications',
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            { name: 'Vehicle Service Head', isFirstChild: true, path: 'ytd24', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'Vehicle Service Maintenance', isLastChild: true, path: 'ytd25', level: 1, paddingLeft: LEVEL_1_PADDING },
        ]
    },

];
