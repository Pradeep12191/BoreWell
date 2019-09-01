import { Point } from './Point';

export interface Agent {
    address: string
    commission_casingPaymentType: string
    commission_casingPerFeet: string
    commission_casingType: string
    commission_perFeet: string
    commission_type: string
    mobileNumber: string
    name: string
    officeName: string,
    points: Point[]
    state: string
    type: string;
    agent_id?: string;
    user: string
}