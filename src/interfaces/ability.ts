export interface Ability {
    name: string;
    src: string;
    alt: string;
    state: string;
    func: () => void;
}
