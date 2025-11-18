import React, { useState } from 'react'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { IconChevronDown, IconCircleCheckFilled, IconLayoutColumns, IconLoader } from '@tabler/icons-react'
import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Categorie, Incident } from '@/types'
import { Empty } from './ui/empty'

interface Props {
    data: Incident[]
}

let filterData: Incident[]
    


export default function IncidentTable({data}: Props) {

    const [filter, setFilter] = useState('all')


    if(filter === 'all'){
        filterData = data
    }else if(filter === 'resolu'){
        filterData = data.filter(item => item.statut === 'Résolu')
    }else if(filter === 'attente'){
        filterData = data.filter(item => item.statut === 'En attente')
    }else if(filter === 'termine'){
        filterData = data.filter(item => item.statut === 'Terminé')
    }else {
        filterData = data.filter(item => item.statut === 'En cours')
    }

    const countAll = data.length
    const countResolu = data.filter(item => item.statut === 'Résolu').length
    const countAttente = data.filter(item => item.statut === 'En attente').length
    const countTermine = data.filter(item => item.statut === 'Terminé').length
    const countEncours = data.filter(item => item.statut === 'En cours').length

  return (
    <div className='m-5'>
        <div className="flex justify-between">
            <div  className="hidden @4xl/main:flex rounded-2xl bg-gray-100 transition-all">
                <Label className={`my-1 py-1 ml-1 px-3 ${filter == 'all' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('all')}>Tous <Badge variant='secondary' className='bg-gray-300' >{countAll}</Badge></Label>
                <Label className={`my-1 py-1 px-3 ${filter == 'resolu' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('resolu')}>Résolu <Badge variant='secondary' className='bg-gray-300' >{countResolu}</Badge></Label>
                <Label className={`my-1 py-1 px-3 ${filter == 'attente' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('attente')}>En Attente <Badge variant='secondary' className='bg-gray-300'>{countAttente}</Badge></Label>
                <Label className={`my-1 py-1 px-2 mr-1 ${filter == 'termine' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('termine')}>Terminé <Badge variant='secondary' className='bg-gray-300' >{countTermine}</Badge></Label>
                <Label className={`my-1 py-1 px-2 mr-1 ${filter == 'enCours' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('enCours')}>En Cours <Badge variant='secondary' className='bg-gray-300' >{countEncours}</Badge></Label>
            </div>
            <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
            <div className="flex gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant='outline' className='shadow-sm'>
                        <IconLayoutColumns />
                        <div className='hidden lg:inline'>Customize Column</div>
                        <div className='lg:hidden'>Column</div>
                        <IconChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='w-56'>
                        <div>titre</div>
                        <div>titre</div>
                        <div>titre</div>
                        <div>titre</div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant='outline' className='shadow-sm'>
                    <Plus />
                    Add Selection
                </Button>
            </div>
        </div>
        <div className="overflow-hidden rounded-lg border my-4 md:my-6">
        <Table className=' rounded-md '>
            <TableHeader className='bg-muted sticky'>
                <TableRow className=''>
                    <TableHead className='py-3 pl-3'>Titre</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Employé</TableHead>
                    <TableHead>Technicien</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filterData.length > 0 ? filterData.map(item => (
                        <TableRow key={item.id} >
                            <TableCell className='capitalize h-20 pl-3 font-medium hover:underline '>{item.titre}</TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">{item.categorie.nom}</Badge></TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">{item.priorite}</Badge></TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground px-1.5 capitalize"> {item.statut === "Terminé" ? <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />: <IconLoader />}{item.statut}</Badge></TableCell>
                            <TableCell className='capitalize'>{item.user.name}</TableCell>
                            <TableCell className='capitalize'>{item.technicien ? item.technicien.name : <div className='font-medium'>pas disponible</div>}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                            <TableCell className='flex justify-center items-center h-20' colSpan={4}>
                                Non disponible
                            </TableCell>
                        </TableRow>}
                </TableBody>
            
        </Table>
        </div>
    </div>
  )
}
