import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Incident, User } from "@/types"
import IncidentTable from "@/components/IncidentTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Filter, 
  Download, 
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  SlidersHorizontal,
  BarChart3,
  FileText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  incidents: Incident[]
  user: User
}

export default function Incidents({ incidents, user }: Props) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filterIncidents = incidents.filter(incident => {
    if (activeFilter === "all") return true
    return incident.statut === activeFilter
  }).filter(incident => 
    incident.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFilterCount = (status: string) => {
    if (status === "all") return incidents.length
    return incidents.filter(i => i.statut === status).length
  }

  const filters = [
    { value: "all", label: "Tous", count: getFilterCount("all"), icon: FileText, color: "from-blue-500 to-cyan-500" },
    { value: "En attente", label: "En attente", count: getFilterCount("En attente"), icon: Clock, color: "from-yellow-500 to-orange-500" },
    { value: "En cours", label: "En cours", count: getFilterCount("En cours"), icon: AlertTriangle, color: "from-blue-500 to-indigo-500" },
    { value: "Résolu", label: "Résolu", count: getFilterCount("Résolu"), icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { value: "Terminé", label: "Terminé", count: getFilterCount("Terminé"), icon: CheckCircle, color: "from-gray-500 to-slate-500" },
  ]

  // Calcul des statistiques rapides
  const stats = {
    urgent: incidents.filter(i => i.priorite.nom === 'elevée' && i.statut !== 'Terminé').length,
    thisWeek: incidents.filter(i => {
      const date = new Date(i.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    }).length,
    avgResolution: '24h', // À calculer
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} />

      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          <SiteHeader titre="Gestion des incidents" />
          
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6">
              <div className="px-4 pt-6 lg:px-6">
                <div className="mb-8">
                  {/* En-tête avec actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Gestion des incidents
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Surveillez et gérez tous les incidents de votre organisation
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Download className="mr-2 h-4 w-4" />
                        Exporter
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                        <Plus className="mr-2 h-4 w-4" />
                        Nouvel incident
                      </Button>
                    </div>
                  </div>

                  {/* Cartes de statistiques rapides */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Incidents urgents</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.urgent}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                            <BarChart3 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Cette semaine</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.thisWeek}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Moy. résolution</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.avgResolution}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Tableau des incidents */}
              <div className="px-4 lg:px-6 pb-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-indigo-900/10">
                  <CardHeader className="pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">
                          Liste des incidents
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          {filterIncidents.length} incident{filterIncidents.length !== 1 ? 's' : ''} trouvé{filterIncidents.length !== 1 ? 's' : ''}
                          {searchQuery && ` pour "${searchQuery}"`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Mis à jour à l'instant
                        </span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <IncidentTable data={filterIncidents} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}