import { trigger, state, style, transition, animate, animation } from '@angular/animations';


export const ROTATE_PLUS_ANIMATION = trigger('rotatePlus', [
    state('collapsed', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(90deg)' })),
    transition('collapsed <=> expanded', animate('0.5s ease-in-out')),
])

export const ROTATE_ARROW_ANIMATION = trigger('rotateArrow', [
    state('collapsed', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(180deg)' })),
    transition('collapsed <=> expanded', animate('0.5s ease-in-out')),
])