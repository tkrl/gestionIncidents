import React, { useState } from 'react'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { IconChevronDown, IconCircleCheckFilled, IconLayoutColumns, IconLoader } from '@tabler/icons-react'
import { Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { User } from '@/types'
import { Empty } from './ui/empty'

interface Props {
    data: User[]
}

let filterData: User[]

export default function UserTable({data}: Props) {

    const [filter, setFilter] = useState('all')


    if(filter === 'all'){
        filterData = data
    }else if(filter === 'employe'){
        filterData = data.filter(item => item.role === 'user')
    }else {
        filterData = data.filter(item => item.role === 'technicien')
    }

    const countAll = data.length
    const countUser = data.filter(item => item.role === 'user').length
    const countTechnicien = data.filter(item => item.role === 'technicien').length

  return (
    <div className='m-5'>
        <div className="flex justify-between">
            <div  className="hidden @4xl/main:flex rounded-2xl bg-gray-100 transition-all">
                <Label className={`my-1 py-1 ml-1 px-3 ${filter == 'all' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('all')}>Tous <Badge variant='secondary' className='bg-gray-300' >{countAll}</Badge></Label>
                <Label className={`my-1 py-1 px-3 ${filter == 'employe' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('employe')}>Employé <Badge variant='secondary' className='bg-gray-300' >{countUser}</Badge></Label>
                <Label className={`my-1 py-1 px-3 ${filter == 'technicien' && 'bg-white rounded-2xl'}`} onClick={() => setFilter('technicien')}>Technicien <Badge variant='secondary' className='bg-gray-300'>{countTechnicien}</Badge></Label>
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
                    <TableHead className='py-3 pl-3'>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Matricule</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Rôle</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {filterData.length > 0 ? filterData.map(item => (
                        <TableRow key={item.id} >
                            <TableCell className='capitalize h-20 pl-3 font-medium hover:underline '>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">{item.matricule}</Badge></TableCell>
                            <TableCell><Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">{item.telephone}</Badge></TableCell>
                            <TableCell className='capitalize'>{item.role}</TableCell>
                        </TableRow>
                    )) : <TableRow>
                            <TableCell className='flex justify-center items-center h-20' colSpan={2}>
                                Non disponible
                            </TableCell>
                </TableRow>}
                </TableBody>
            
        </Table>
        </div>
    </div>
  )
}
