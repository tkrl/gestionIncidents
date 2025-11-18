import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Incidents } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ThemeProvider } from "../../components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";




 export default function index({incidents}: Incidents){
    
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div>
        <Head title="Incident" />
        <Nav />
        <div className="flex justify-end mt-5 mr-10"><Link href='/incident/create'><Button className="cursor-pointer">Créer</Button></Link></div>
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
                    <TableHead>Statut</TableHead>
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
                    <TableCell>{incident.statut === 'Résolu' ? <Link href={`/intervention/cloture/${incident.id}`}><Button className="cursor-pointer">Cloturer</Button></Link> : <Link href={`/incident/${incident.id}`}><Button className="cursor-pointer">Intervenntion</Button></Link>}</TableCell>               
                    <TableCell>{ <div>{incident.statut}</div>}</TableCell>             
                    <TableCell>{<Link href={`/incident/${incident.id}/edit`} ><Button disabled={incident.statut !== 'En attente'} className="cursor-pointer">Edit</Button></Link>}</TableCell>             
                </TableRow>
                ))}
            </TableBody>

        </Table>
        </div>
        <Button><ModeToggle/></Button>
    </div>
    </ThemeProvider>
  )
}
