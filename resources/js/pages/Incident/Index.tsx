import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Incidents } from "@/types";
import { Head, Link } from "@inertiajs/react";




 export default function index({incidents}: Incidents){
    
  return (
    <div>
        <Head title="Incident" />
        <Nav />
        <div className="w-3/4 my-10 ml-30">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Créé le</TableHead>
                    <TableHead>Terminé le</TableHead>
                    <TableHead>Intervention</TableHead>
                    <TableHead>Créer</TableHead>
                    <TableHead>Edit</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>

            {incidents.map(incident => (
                <TableRow key={incident.id}>
                
                    <TableCell>{incident.id}</TableCell>
                    <TableCell>{incident.titre}</TableCell>
                    <TableCell>{incident.description}</TableCell>
                    <TableCell>{incident.priorite}</TableCell>
                    <TableCell>{incident.categorie.nom}</TableCell>
                    <TableCell>{new Date(incident.created_at).toLocaleDateString('fr-FR', {year: "numeric", month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</TableCell>
                    <TableCell>{incident.ended_at ? new Date(incident.ended_at).toLocaleDateString('fr-FR', {year: "numeric", month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'Pas encore terminé'}</TableCell>               
                    <TableCell><Link href={`/incident/${incident.id}`}><Button className="cursor-pointer">Intervenntion</Button></Link></TableCell>               
                    <TableCell><Link href='/incident/create'><Button className="cursor-pointer">Créer</Button></Link></TableCell>               
                    <TableCell><Link href={`/incident/${incident.id}/edit`} ><Button className="cursor-pointer">Edit</Button></Link></TableCell>               
                </TableRow>
                ))}
            </TableBody>

        </Table>
        </div>
    </div>
  )
}
