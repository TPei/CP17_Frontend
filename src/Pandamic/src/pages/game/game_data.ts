    export interface Edge {
        from: number;
        to: number;
    }

    export interface Cube {
        color: string;
        count: number;
    }

    export interface Location {
        research_building: boolean;
        color: string;
        latitude: number;
        cubes: Cube[];
        alias: string;
        id: number;
        longitude: number;
    }

    export interface RootObject {
        city: string;
        edges: Edge[];
        locations: Location[];
    }
    