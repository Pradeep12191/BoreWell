import { trigger, state, style, transition, animate } from '@angular/animations';

export const ROTATE_PLUS_ANIMATION = trigger('rotatePlus', [
    state('closed', style({ transform: 'rotate(0deg)' })),
    state('opened', style({ transform: 'rotate(90deg)' })),
    transition('closed <=> opened', animate('0.5s ease-in-out')),
])