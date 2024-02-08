export type Department = {
    id: number;
    title: string;
    lectors: Lector[];
}

export type Lector = {
    id: number;
    name: string;
    degree: string;
    departments: Department[]
}