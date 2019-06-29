export interface NavItem{
    name: string;
    isMain?: boolean;
    children?: NavItem[]
}