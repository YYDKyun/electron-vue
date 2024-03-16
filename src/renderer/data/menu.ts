export type MenuItem = {
    children?: MenuItem[],
    hidden?: boolean,
    path: string,
    noShowingChildren? : boolean,
    meta?: Meta
}

export type Meta = {
    title: string,
    icon?: string
}