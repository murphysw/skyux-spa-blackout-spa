import Card from './card';

export default interface Player {
    name: string;
    id: string;
    hand: Card[];
}
