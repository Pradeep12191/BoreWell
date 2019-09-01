import { Casing } from './Casing';
import { Particulars } from './Particulars';

export interface NewBore {
    allowance: string;
    amtPerWelding: string;
    casing: Casing;
    particulars: Particulars[]
}