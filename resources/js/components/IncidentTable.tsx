import React, { useState } from 'react'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { IconChevronDown, IconCircleCheckFilled, IconLayoutColumns, IconLoader, IconAlertTriangle, IconClock, IconCheck } from '@tabler/icons-react'
import { Plus, Search, Filter } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Incident } from '@/types'
import { Input } from './ui/input'

interface Props {
    data: Incident[]
}

export default function IncidentTable({data}: Props) {
    const [filter, setFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    let filterData = data

    if(filter === 'all'){
        filterData = data
    }else if(filter === 'resolu'){
        filterData = data.filter(item => item.statut === 'Résolu')
    }else if(filter === 'attente'){
        filterData = data.filter(item => item.statut === 'En attente')
    }else if(filter === 'termine'){
        filterData = data.filter(item => item.statut === 'Terminé')
    }else if(filter === 'enCours'){
        filterData = data.filter(item => item.statut === 'En cours')
    }

    // Filtrer par recherche
    if (searchQuery) {
        filterData = filterData.filter(item => 
            item.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categorie.nom.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    const countAll = data.length
    const countResolu = data.filter(item => item.statut === 'Résolu').length
    const countAttente = data.filter(item => item.statut === 'En attente').length
    const countTermine = data.filter(item => item.statut === 'Terminé').length
    const countEncours = data.filter(item => item.statut === 'En cours').length

    const getStatusColor = (statut: string) => {
        switch(statut) {
            case 'En attente': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
            case 'En cours': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            case 'Résolu': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
            case 'Terminé': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
            default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
        }
    }

    const getPriorityColor = (priorite: string) => {
        switch(priorite) {
            case 'élevée': return 'border-red-500 text-red-600 dark:text-red-400'
            case 'moyenne': return 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
            case 'basse': return 'border-green-500 text-green-600 dark:text-green-400'
            default: return 'border-gray-500 text-gray-600 dark:text-gray-400'
        }
    }

    const getStatusIcon = (statut: string) => {
        switch(statut) {
            case 'En attente': return <IconClock className="h-3 w-3 mr-1" />
            case 'En cours': return <IconLoader className="h-3 w-3 mr-1 animate-spin" />
            case 'Résolu': return <IconCircleCheckFilled className="h-3 w-3 mr-1" />
            case 'Terminé': return <IconCheck className="h-3 w-3 mr-1" />
            default: return <IconAlertTriangle className="h-3 w-3 mr-1" />
        }
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
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'resolu' ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('resolu')}
                        >
                            Résolu 
                            <Badge variant='secondary' className={`${filter == 'resolu' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countResolu}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'attente' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('attente')}
                        >
                            En Attente 
                            <Badge variant='secondary' className={`${filter == 'attente' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countAttente}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'termine' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('termine')}
                        >
                            Terminé 
                            <Badge variant='secondary' className={`${filter == 'termine' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countTermine}
                            </Badge>
                        </Label>
                        <Label 
                            className={`flex items-center gap-2 my-1 py-1.5 px-4 rounded-xl cursor-pointer transition-all ${filter == 'enCours' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`} 
                            onClick={() => setFilter('enCours')}
                        >
                            En Cours 
                            <Badge variant='secondary' className={`${filter == 'enCours' ? 'bg-white/30 text-white' : 'bg-gray-300 dark:bg-slate-600'}`}>
                                {countEncours}
                            </Badge>
                        </Label>
                    </div>

                    {/* Barre de recherche pour mobile */}
                    <div className="w-full md:w-64 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher incidents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                        />
                    </div>
                </div>


            </div>

            {/* Table responsive */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
                <div className="overflow-x-auto">
                    <Table className='w-full'>
                        <TableHeader className='bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900'>
                            <TableRow className='border-b-0'>
                                <TableHead className='py-4 pl-4 md:pl-6 font-semibold text-gray-700 dark:text-gray-300 min-w-[200px]'>Titre</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]'>Priorité</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]'>Statut</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px] hidden md:table-cell'>Catégorie</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px] hidden lg:table-cell'>Employé</TableHead>
                                <TableHead className='py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px] hidden lg:table-cell'>Technicien</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filterData.length > 0 ? filterData.map(item => (
                                <TableRow 
                                    key={item.id} 
                                    className='border-b border-gray-100 dark:border-slate-800 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 dark:hover:from-slate-800/50 dark:hover:to-blue-900/20 transition-all duration-200'
                                >
                                    <TableCell className='py-4 pl-4 md:pl-6'>
                                        <div className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                                            {item.titre}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 md:hidden">
                                            {item.categorie.nom}
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-4'>
                                        <Badge 
                                            variant="outline" 
<<<<<<< HEAD
                                            className={`border-2 ${getPriorityColor(item.priorite.nom)} px-3 py-1 font-medium`}
                                        >
                                            {item.priorite.nom}
=======
                                            className={`border-2 ${getPriorityColor(item.priorite)} px-3 py-1 font-medium`}
                                        >
                                            {item.priorite}
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='py-4'>
                                        <Badge className={`flex items-center justify-center gap-1 px-3 py-1.5 ${getStatusColor(item.statut)}`}>
                                            {getStatusIcon(item.statut)}
                                            <span>{item.statut}</span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='py-4 hidden md:table-cell'>
                                        <Badge variant="outline" className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border-gray-200 dark:border-slate-700 px-3 py-1">
                                            {item.categorie.nom}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className='py-4 hidden lg:table-cell'>
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium">
                                                {item.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">{item.user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className='py-4 hidden lg:table-cell'>
                                        {item.technicien ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                                                    {item.technicien.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300">{item.technicien.name}</span>
                                            </div>
                                        ) : (
                                            <Badge variant="outline" className="border-dashed border-gray-300 dark:border-slate-600 text-gray-500 dark:text-gray-400 px-3 py-1">
                                                À assigner
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )) : 
                            <TableRow>
                                <TableCell colSpan={6} className='py-12 text-center'>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="p-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 mb-4">
                                            <IconAlertTriangle className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Aucun incident trouvé
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucun incident disponible'}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Stats et Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{filterData.length}</span> incidents trouvés
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span className="text-xs">En attente: {countAttente}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs">En cours: {countEncours}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-xs">Résolus: {countResolu + countTermine}</span>
                        </div>
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
        </div>
    )
}