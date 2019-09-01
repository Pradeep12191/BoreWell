import { NewBore } from './NewBore';
import { ReBore } from './ReBore';
import { Feet } from './Feet';

export interface Agent{
    address: string;
    agent_id: string;
    area: string;
    city: string;
    mobileNumber: string;
    name: string;
    feets: Feet[];
    newBore: NewBore;
    reBore: ReBore;
    state: string;
    type: string;
    user: string;
    user_id: string;
}