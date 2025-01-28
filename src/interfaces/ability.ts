export interface Ability {
    name: string;
    class: string;
    src: string;
    alt: string;
    state: string;
    func: () => void;
}
