export interface Auth {
    user: User;
}

export interface Users {
    users: User[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

interface chartData {
    date: Date
    desktop: number
     
  }
export interface User {
    id: number;
    matricule: string;
    name: string;
    email: string;
    telephone: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    agence_id: number;
    service_id: number;
    role: string;
    [key: string]: unknown; // This allows for additional properties..
    
}




type Priorite = 'elevée' | 'moyenne' |'basse'

type category = {
    id: number
    nom: string
}
export interface Incident {
    [key: string]: unknown; // This allows for additional properties..
    id: number;
    titre: string;
    slug: string | null
    description: string
    statut: string
    priorite: Priorite
    image?: string | null
    user_id: number
    technicien_id: number
    categorie: category;
    categorie_id: number
    piece_id?: number
    created_at: string
    updated_at: string
    ended_at: string
    technicien?: User
    user : User
    conseil: string
    solution: string
}

export interface Incidents {
    incidents: Incident[]
}

export interface Categorie {
    id: number,
    nom: string
}

export interface Categories {
    categories: Categorie[]
}


