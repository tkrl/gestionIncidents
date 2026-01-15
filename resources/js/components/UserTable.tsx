import React, { useState } from 'react'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { IconChevronDown, IconCircleCheckFilled, IconLayoutColumns, IconLoader, IconUser, IconTool } from '@tabler/icons-react'
import { Plus, Search, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { User } from '@/types'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface Props {
    data: User[]
}

export default function UserTable({data}: Props) {
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    let filterData = data

    if(filter === 'all'){
        filterData = data
    }else if(filter === 'employe'){
        filterData = data.filter(item => item.role.nom === 'user')
    }else {
        filterData = data.filter(item => item.role.nom === 'technicien')
    }

    // Filtrer par recherche
    if (searchQuery) {
        filterData = filterData.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.matricule.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    // Filtrer par recherche
    if (searchQuery) {
        filterData = filterData.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.matricule.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    const countAll = data.length
    const countUser = data.filter(item => item.role.nom === 'user').length
    const countTechnicien = data.filter(item => item.role.nom === 'technicien').length

    const getRoleColor = (role: string) => {
        switch(role) {
            case 'technicien': return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
            case 'user': return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
            default: return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
        }
    }

    const getRoleIcon = (role: string) => {
        return role === 'technicien' ? <IconTool className="h-3 w-3 mr-1" /> : <IconUser className="h-3 w-3 mr-1" />
    }

    return (
        <div className='m-2 md:m-5'>
            {/* En-tête amélioré */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex flex-wrap gap-2 rounded-2xl bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 p-1 transition-all">
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'all' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('all')}
                        >
                            Tous 
                            <Badge variant='secondary' className={`${filter == 'all' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countAll}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'employe' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('employe')}
                        >
                            Employé 
                            <Badge variant='secondary' className={`${filter == 'employe' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countUser}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'technicien' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('technicien')}
                        >
                            Technicien 
                            <Badge variant='secondary' className={`${filter == 'technicien' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countTechnicien}
                            </Badge>
                        </Label>
                    </div>

                    {/* Barre de recherche pour mobile */}
                    <div className="w-full md:w-64 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                        />
                    </div>
                </div>



<<<<<<< HEAD
=======
    const getRoleColor = (role: string) => {
        switch(role) {
            case 'technicien': return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
            case 'user': return 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
            default: return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
        }
    }

    const getRoleIcon = (role: string) => {
        return role === 'technicien' ? <IconTool className="h-3 w-3 mr-1" /> : <IconUser className="h-3 w-3 mr-1" />
    }

    return (
        <div className='m-2 md:m-5'>
            {/* En-tête amélioré */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex flex-wrap gap-2 rounded-2xl bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 p-1 transition-all">
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'all' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('all')}
                        >
                            Tous 
                            <Badge variant='secondary' className={`${filter == 'all' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countAll}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'employe' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('employe')}
                        >
                            Employé 
                            <Badge variant='secondary' className={`${filter == 'employe' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countUser}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'technicien' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('technicien')}
                        >
                            Technicien 
                            <Badge variant='secondary' className={`${filter == 'technicien' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countTechnicien}
                            </Badge>
                        </Label>
                    </div>

                    {/* Barre de recherche pour mobile */}
                    <div className="w-full md:w-64 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                        />
                    </div>
                </div>



>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
            </div>

            {/* Table responsive */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
                <div className="overflow-x-auto">
                    <Table className='w-full'>
                        <TableHeader className='bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900'>
                            <TableRow className='border-b-0'>
                                <TableHead className='py-4 pl-4 md:pl-6 font-semibold text-gray-700 dark:text-gray-300 min-w-[150px]'>Nom</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[200px]'>Email</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]'>Matricule</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px] hidden sm:table-cell'>Téléphone</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]'>Rôle</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filterData.length > 0 ? filterData.map(item => (
                                <TableRow 
                                    key={item.id} 
                                    className='border-b border-gray-100 dark:border-slate-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-slate-800/50 dark:hover:to-blue-900/20 transition-all duration-200'
                                >
                                    <TableCell className='py-4 pl-4 md:pl-6'>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={item.avatar} alt={item.name} />
<<<<<<< HEAD
                                                <AvatarFallback className={getRoleColor(item.role.nom)}>
=======
                                                <AvatarFallback className={getRoleColor(item.role)}>
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                                                    {item.name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-4'>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
                                                <IconCircleCheckFilled className="h-3 w-3 text-green-500" />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">{item.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-4'>
                                        <Badge variant="outline" className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-gray-200 dark:border-slate-700 px-3 py-1">
                                            {item.matricule}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='py-4 hidden sm:table-cell'>
                                        <Badge variant="outline" className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-gray-200 dark:border-slate-700 px-3 py-1">
                                            {item.telephone}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='py-4'>
<<<<<<< HEAD
                                        <Badge className={`flex items-center justify-center gap-1 px-3 py-1.5 ${getRoleColor(item.role.nom)}`}>
                                            {getRoleIcon(item.role.nom)}
                                            <span className="capitalize">{item.role.nom === 'user' ? 'Employé' : 'Technicien'}</span>
=======
                                        <Badge className={`flex items-center justify-center gap-1 px-3 py-1.5 ${getRoleColor(item.role)}`}>
                                            {getRoleIcon(item.role)}
                                            <span className="capitalize">{item.role === 'user' ? 'Employé' : 'Technicien'}</span>
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )) : 
                            <TableRow>
                                <TableCell colSpan={5} className='py-12 text-center'>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="p-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 mb-4">
                                            <IconUser className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Aucun utilisateur trouvé
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucun utilisateur disponible'}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination/Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Affichage de <span className="font-semibold text-gray-900 dark:text-white">{filterData.length}</span> utilisateurs
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                        Précédent
                    </Button>
                    <div className="flex items-center gap-1">
                        <Button size="sm" className="h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">1</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
                        <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                        Suivant
                    </Button>
                </div>
            </div>
        </div>
    )
}