import { NavItem } from '../models';
const LEVEL_0_PADDING = 15;
const LEVEL_1_PADDING = 30;
const LEVEL_2_PADDING = 45;

export const SIDE_NAV_ITEMS: NavItem[] = [
    {
        name: 'NAV.DASHBOARD',
        isMain: true,
        icon: 'home',
        path: 'dashboard',
        level: 0,
        paddingLeft: LEVEL_0_PADDING
    },
    {
        name: 'NAV.MASTER',
        isMain: true,
        icon: 'insert_chart_outlined',
        level: 0,
        paddingLeft: LEVEL_0_PADDING,
        children: [
            {
                name: 'NAV.VEHICLE',
                isFirstChild: true,
                children: [
                    { name: 'NAV.ADD_VEHICLE', isFirstChild: true, path: 'master/vehicle/addVehicle', level: 2, paddingLeft: LEVEL_2_PADDING, },
                    { name: 'NAV.VIEW_VEHICLE', path: 'master/vehicle/viewVehicle', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.LINK_VEHICLE', isLastChild: true, path: 'ytd3', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            // {
            //     name: 'Tyre',
            //     children: [
            //         { name: 'Add New Tyre', isFirstChild: true, path: 'ytd4', level: 2, paddingLeft: LEVEL_2_PADDING },
            //         { name: 'Tyre Link / Unlink', isLastChild: true, path: 'ytd5', level: 2, paddingLeft: LEVEL_2_PADDING },
            //     ],
            //     lastNode: true,
            //     level: 1,
            //     paddingLeft: LEVEL_1_PADDING
            // },
            {
                name: 'NAV.BIT',
                children: [
                    { name: 'NAV.ADD_BIT', isFirstChild: true, path: 'master/bit/addBit', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.VIEW_BIT', isLastChild: true, path: 'master/bit/viewBit', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.HAMMER',
                children: [
                    { name: 'NAV.ADD_HAMMER', isFirstChild: true, path: 'master/hammer/addHammer', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.VIEW_HAMMER', isLastChild: true, path: 'master/hammer/viewHammer', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.AGENT',
                isLastChild: true,
                children: [
                    { name: 'NAV.ADD_AGENT', isFirstChild: true, path: 'master/agent/addAgent', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.VIEW_AGENT', isLastChild: true, path: 'master/agent/viewAgent', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                lastNode: true,
                level: 1,
                paddingLeft: LEVEL_1_PADDING
            },
        ]
    },
    {
        name: 'NAV.POINT_DETAILS',
        icon: 'account_circle',
        paddingLeft: LEVEL_0_PADDING,
        isMain: true,
        level: 0,
        children: [
            {
                name: 'NAV.POINT_ENTRY', isFirstChild: true,
                isLastChild: true, path: 'rpmDetails/rpmEntry', level: 1,
                paddingLeft: LEVEL_1_PADDING
            }
        ],
        lastNode: true
    },
    // {
    //     name: 'Transactions',
    //     icon: 'account_balance_wallet',
    //     isMain: true,
    //     paddingLeft: LEVEL_0_PADDING,
    //     level: 0,
    //     children: [
    //         {
    //             name: 'Receipts and Advance', isFirstChild: true,
    //             children: [
    //                 { name: 'Amount Receipt (Self)', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
    //                 { name: 'Amount Receipt (Agent)', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
    //                 { name: 'Receipt & Agent Advance', isLastChild: true, path: 'ytd12', level: 2, paddingLeft: LEVEL_2_PADDING },
    //             ],
    //             lastNode: true,
    //             level: 1,
    //             paddingLeft: LEVEL_1_PADDING
    //         },
    //         {
    //             name: 'Expenses and Payments', isFirstChild: true,
    //             children: [
    //                 { name: 'Purchase', isFirstChild: true, path: 'ytd13', level: 2, paddingLeft: LEVEL_2_PADDING },
    //                 { name: 'Fuel Expense', path: 'ytd14', level: 2 , paddingLeft: LEVEL_2_PADDING},
    //                 { name: 'Material Expense', path: 'ytd15', level: 2, paddingLeft: LEVEL_2_PADDING },
    //                 { name: 'Miscellaneous Expense', isLastChild: true, path: 'ytd16', level: 2, paddingLeft: LEVEL_2_PADDING }
    //             ],
    //             lastNode: true,
    //             level: 1,
    //             paddingLeft: LEVEL_1_PADDING
    //         },
    //         { name: 'Other Payment Issue', isLastChild: true, path: 'ytd17', level: 1, paddingLeft: LEVEL_1_PADDING },
    //     ]
    // },
    {
        name: 'NAV.LABOUR_MANAGEMENT_DETAILS',
        isMain: true,
        icon: 'account_circle',
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            { name: 'NAV.LABOUR_RULE', isFirstChild: true, path: 'ytd18', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.ADD_LABOUR', path: 'ytd19', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.VIEW_LABOUR', path: 'ytd20', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.LABOUR_LINK', path: 'ytd21', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.LABOUR_ADVANCE', path: 'ytd22', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.LABOUR_ADVANCE_REFUND', isLastChild: true, path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING },
        ]
    },
    {
        name: 'NAV.REPORTS.TITLE',
        isMain: true,
        icon: 'library_books',
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            {
                name: 'NAV.REPORTS.POINT_DETAILS.TITLE', isFirstChild: true, path: 'ytd18',
                children: [
                    { name: 'NAV.REPORTS.POINT_DETAILS.DRILL_LOG', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.POINT_DETAILS.RPM_DETAILS', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.POINT_DETAILS.POINT_REPORT', isLastChild: true, path: 'reports/pointDetails/pointReport', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                level: 1, paddingLeft: LEVEL_1_PADDING
            },
            { name: 'NAV.REPORTS.AGENT_BALANCE_SHEET', path: 'ytd19', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.REPORTS.AGENT_DETAILS', path: 'ytd20', level: 1, paddingLeft: LEVEL_1_PADDING },
            {
                name: 'NAV.REPORTS.VEHICLE.TITLE', path: 'ytd21', level: 1,
                children: [
                    { name: 'NAV.REPORTS.VEHICLE.REPORT', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.VEHICLE.PAIR_REPORT', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.VEHICLE.SERVICE_REMAINDER', path: 'ytd12', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.VEHICLE.DARK_ENTRY', isLastChild: true, path: 'ytd12', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                paddingLeft: LEVEL_1_PADDING
            },
            { name: 'NAV.REPORTS.TYRE', path: 'ytd22', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.REPORTS.BIT', path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.REPORTS.HAMMER', path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING },
            {
                name: 'NAV.REPORTS.RECEIPTS.TITLE', path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING,
                children: [
                    { name: 'NAV.REPORTS.RECEIPTS.AMT', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.RECEIPTS.ADVANCES', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ]
            },
            {
                name: 'NAV.REPORTS.EXPENSES.TITLE', path: 'ytd23', level: 1,
                children: [
                    { name: 'NAV.REPORTS.EXPENSES.FUEL', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.EXPENSES.MATERIAL', path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.EXPENSES.MISCELLANEOUS', path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.EXPENSES.OTHER', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.REPORTS.CREDIT.TITLE',
                children: [
                    { name: 'NAV.REPORTS.CREDIT.MANAGER', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.CREDIT.VEHICLE', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.REPORTS.BALANCE.TITLE',
                children: [
                    { name: 'NAV.REPORTS.BALANCE.MANAGER', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.BALANCE.VEHICLE', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.BALANCE.COMPANY', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.REPORTS.LABOUR.TITLE',
                children: [
                    { name: 'NAV.REPORTS.LABOUR.DETAILS', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.LABOUR.ADVANCE_REFUND', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.LABOUR.DATE', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.LABOUR.ISSUED', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING
            },
            {
                name: 'NAV.REPORTS.GENERAL.TITLE',
                children: [
                    { name: 'NAV.REPORTS.GENERAL.VEHICLE', isFirstChild: true, path: 'ytd10', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.GENERAL.LABOUR', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.GENERAL.PERMIT', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.GENERAL.ROAD_TAX', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.GENERAL.FITNESS', path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                    { name: 'NAV.REPORTS.GENERAL.POLLUTION', isLastChild: true, path: 'ytd11', level: 2, paddingLeft: LEVEL_2_PADDING },
                ],
                isLastChild: true, path: 'ytd23', level: 1, paddingLeft: LEVEL_1_PADDING
            },
        ]
    },
    {
        name: 'NAV.SERVICES.TITLE',
        isMain: true,
        icon: 'notifications',
        paddingLeft: LEVEL_0_PADDING,
        level: 0,
        children: [
            { name: 'NAV.SERVICES.HEAD', isFirstChild: true, path: 'ytd24', level: 1, paddingLeft: LEVEL_1_PADDING },
            { name: 'NAV.SERVICES.MAINTENANCE', isLastChild: true, path: 'ytd25', level: 1, paddingLeft: LEVEL_1_PADDING },
        ]
    },

];
