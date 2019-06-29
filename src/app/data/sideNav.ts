export const SIDE_NAV_ITEMS = [
    {
        name: 'Dashboard',
        isMain: true,
    },
    {
        name: 'Master',
        isMain: true,
        children: [
            {
                name: 'Vehicle',
                children: [
                    { name: 'Add Vehicle' },
                    { name: 'View / Edit Vehicle' },
                    { name: 'Vehicle Link / Unlink' },
                ]
            },
            {
                name: 'Tyre',
                children: [
                    { name: 'Add New Tyre' },
                    { name: 'Tyre Link / Unlink' },
                ]
            },
            {
                name: 'Bit',
                children: [
                    { name: 'Add Bit' },
                    { name: 'View Bit' },
                ]
            },
            {
                name: 'Hammer',
                children: [
                    { name: 'Add Hammer' },
                    { name: 'View Hammer' },
                ]
            },
        ]
    },
    {
        name: 'Point Details',
        isMain: true,
        children: [{name: 'Point Entry'}]
    }
]