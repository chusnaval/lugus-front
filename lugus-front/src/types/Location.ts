export interface Location  {
    codigo: string
    descripcion: string
    count: number
    locationType: LocationType
}

export interface LocationType {
    id: number
    description : string
    count  : number
}