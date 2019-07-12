export interface NavItem{
    name: string;
    isMain?: boolean;
    children?: NavItem[];
    isFirstChild?: boolean;
    isLastChild?: boolean;
    lastNode?: boolean;
    icon?: string;
    path?: string;
    level: number;
    paddingLeft: number;
}
