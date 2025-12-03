import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Incident, Incidents, User } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ThemeProvider } from "../../components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";


interface Props {
    incidents: Incident[]
    user: User
}

 export default function index({incidents, user}: Props){
    
     let filterIncidents = incidents.filter(incident => incident.statut !== 'Terminé')
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div>
        <Head title="Incident" />
        <Nav />
        <div className="flex justify-end mt-5 mr-10">
            {user.role=='technicien' && <Link href='/intervention/view'><Button className="cursor-pointer">Consulter mes incidents</Button></Link>}  
            {user.role=='user' && <Link href='/incident/create'><Button className="cursor-pointer">Créer</Button></Link>} </div>
        <div className="w-6/7 my-7 ml-30 border rounded-md p-5 shadow-md">
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
                    {user.role == 'technicien' && <TableHead>Intervention</TableHead>}
                    {user.role=='user' && <><TableHead>Statut</TableHead>
                    <TableHead>Edit</TableHead></>}
                </TableRow>
            </TableHeader>
            <TableBody>

            {filterIncidents.map(incident => (
                <TableRow key={incident.id}>
                
                    <TableCell>{incident.id}</TableCell>
                    <TableCell>{incident.titre}</TableCell>
                    <TableCell>{incident.description}</TableCell>
                    <TableCell>{incident.priorite}</TableCell>
                    <TableCell>{incident.categorie.nom}</TableCell>
                    <TableCell>{new Date(incident.created_at).toLocaleDateString('fr-FR', {year: "numeric", month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</TableCell>
                    <TableCell>{incident.ended_at ? new Date(incident.ended_at).toLocaleDateString('fr-FR', {year: "numeric", month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'}) : 'Pas encore terminé'}</TableCell>               
                    {user.role == 'technicien' && <TableCell>{ <Link href={`/incident/${incident.id}`}><Button className="cursor-pointer">Intervenntion</Button></Link>}</TableCell>  }             
                    {user.role=='user' && <><TableCell>{incident.statut!=='Résolu' ? <div>{incident.statut}</div> : <Link href={`/intervention/cloture/${incident.id}`}><Button className="cursor-pointer">Cloturer</Button></Link>}</TableCell>             
                    <TableCell>{<Button disabled={incident.statut !== 'En attente'} className="cursor-pointer"><Link href={`/incident/${incident.id}/edit`} >Edit</Link></Button>}</TableCell> </>}            
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
