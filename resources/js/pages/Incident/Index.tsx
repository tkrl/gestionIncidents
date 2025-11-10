import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Incident } from "@/types";


export default function index({incidents} : Incident) {
    
  return (
    <div>
        <div className="w-3/4 my-10 ml-30">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>À vos marques</TableHead>
                    <TableHead>Prèt</TableHead>
                    <TableHead>Encore prèt</TableHead>
                    <TableHead>Parté</TableHead>
                </TableRow>
            </TableHeader>
            {incidents.id}
        </Table>
        </div>
    </div>
  )
}
