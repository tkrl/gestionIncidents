import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Incident, User } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Calendar,
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Props {
  incidents: Incident[]
  user: User
}

export default function Statistique({ incidents, user }: Props) {
  // Calcul des statistiques
  const incidentsParCategorie = incidents.reduce((acc, incident) => {
    const categorie = incident.categorie.nom
    acc[categorie] = (acc[categorie] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const incidentsParStatut = incidents.reduce((acc, incident) => {
    const statut = incident.statut
    acc[statut] = (acc[statut] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const incidentsParPriorite = incidents.reduce((acc, incident) => {
    const priorite = incident.priorite
    acc[priorite] = (acc[priorite] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Performance mensuelle
  const incidentsParMois = incidents.reduce((acc, incident) => {
    const date = new Date(incident.created_at)
    const mois = date.toLocaleDateString('fr-FR', { month: 'short' })
    acc[mois] = (acc[mois] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Taux de croissance
  const growthRate = 12 // À calculer

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
          <SiteHeader titre="Statistiques avancées" />
          
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6">
              <div className="px-4 pt-6 lg:px-6">
                <div className="mb-8">
                  {/* En-tête avec actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                        Statistiques avancées
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Analyses et métriques détaillées de votre plateforme
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700">
                        <Download className="mr-2 h-4 w-4" />
                        Exporter
                      </Button>
                      <Select defaultValue="90d">
                        <SelectTrigger className="w-[180px] bg-white dark:bg-slate-900">
                          <Calendar className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">7 derniers jours</SelectItem>
                          <SelectItem value="30d">30 derniers jours</SelectItem>
                          <SelectItem value="90d">3 derniers mois</SelectItem>
                          <SelectItem value="365d">12 derniers mois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Indicateurs clés */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-cyan-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Taux de croissance</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">+{growthRate}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-emerald-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Temps moyen</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">24h</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-orange-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500">
                            <AlertTriangle className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Urgents/mois</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                              {incidents.filter(i => i.priorite === 'elevée').length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Utilisateurs actifs</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="flex flex-col gap-6 px-4 lg:px-6 pb-8">
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      Vue d'ensemble
                    </TabsTrigger>
                    <TabsTrigger 
                      value="categories" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                    >
                      <PieChart className="h-4 w-4 mr-2" />
                      Catégories
                    </TabsTrigger>
                    <TabsTrigger 
                      value="performance" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Performance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trends" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Tendances
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Graphique principal */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-emerald-900/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                              <Activity className="h-5 w-5 text-emerald-500" />
                              Activité des incidents
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              Évolution et tendance des incidents au cours du temps
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1 border-emerald-200 dark:border-emerald-800">
                            <TrendingUp className="h-3 w-3 text-emerald-500" />
                            +{growthRate}% ce mois
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ChartAreaInteractive chartData={incidents} />
                      </CardContent>
                    </Card>

                    {/* Statistiques détaillées */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/10">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <PieChart className="h-5 w-5 text-blue-500" />
                            Répartition par statut
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            Distribution des incidents selon leur statut actuel
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {Object.entries(incidentsParStatut).map(([statut, count], index) => {
                              const colors = [
                                'from-yellow-400 to-orange-400',
                                'from-blue-400 to-cyan-400',
                                'from-green-400 to-emerald-400',
                                'from-gray-400 to-slate-400'
                              ]
                              const percentage = (count / incidents.length) * 100
                              
                              return (
                                <div key={statut} className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`} />
                                      <span className="font-medium text-slate-900 dark:text-white">
                                        {statut}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                                      <span className="text-sm text-slate-600 dark:text-slate-400">
                                        ({Math.round(percentage)}%)
                                      </span>
                                    </div>
                                  </div>
                                  <Progress 
                                    value={percentage} 
                                    className="h-2 bg-slate-200 dark:bg-slate-700"
                                    indicatorClassName={`bg-gradient-to-r ${colors[index % colors.length]}`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/10">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                            Répartition par priorité
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            Distribution selon le niveau de priorité
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {Object.entries(incidentsParPriorite).map(([priorite, count]) => {
                              const colors = {
                                'elevée': 'from-red-400 to-pink-400',
                                'moyenne': 'from-orange-400 to-yellow-400',
                                'basse': 'from-green-400 to-emerald-400'
                              }
                              const percentage = (count / incidents.length) * 100
                              
                              return (
                                <div key={priorite} className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <Badge className={`bg-gradient-to-r ${colors[priorite as keyof typeof colors]}`}>
                                        {priorite}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                                      <span className="text-sm text-slate-600 dark:text-slate-400">
                                        ({Math.round(percentage)}%)
                                      </span>
                                    </div>
                                  </div>
                                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full bg-gradient-to-r ${colors[priorite as keyof typeof colors]}`}
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="categories" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-indigo-900/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <PieChart className="h-5 w-5 text-indigo-500" />
                          Répartition par catégorie
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Analyse détaillée des incidents par type de problème
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {Object.entries(incidentsParCategorie).map(([categorie, count], index) => {
                            const colors = [
                              'from-blue-400 to-cyan-400',
                              'from-purple-400 to-violet-400',
                              'from-emerald-400 to-teal-400',
                              'from-orange-400 to-yellow-400',
                              'from-pink-400 to-rose-400'
                            ]
                            const percentage = (count / incidents.length) * 100
                            
                            return (
                              <div key={categorie} className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index % colors.length]}`} />
                                    <span className="font-medium text-slate-900 dark:text-white">
                                      {categorie}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      ({Math.round(percentage)}%)
                                    </span>
                                  </div>
                                </div>
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-pink-50 dark:from-slate-800 dark:to-pink-900/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <TrendingUp className="h-5 w-5 text-pink-500" />
                          Performance et efficacité
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Métriques de performance et indicateurs d'efficacité
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                                  <CheckCircle className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Taux de satisfaction
                                  </p>
                                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    94%
                                  </p>
                                </div>
                              </div>
                              <Progress value={94} className="h-2" />
                            </div>
                            
                            <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl">
                              <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                                  <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Temps de réponse moyen
                                  </p>
                                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    2h
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                              <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                                  <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Objectif atteint
                                  </p>
                                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    87%
                                  </p>
                                </div>
                              </div>
                              <Progress value={87} className="h-2 mt-4" />
                            </div>
                            
                            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                              <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                                  <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Productivité équipe
                                  </p>
                                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                    +18%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="trends" className="space-y-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 dark:from-slate-800 dark:to-orange-900/10">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                          <BarChart3 className="h-5 w-5 text-orange-500" />
                          Tendances et prévisions
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Analyses prédictives et tendances saisonnières
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <div className="inline-block relative mb-8">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-30"></div>
                            <div className="relative p-6 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30">
                              <TrendingUp className="h-16 w-16 text-orange-500" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                            Analyse prédictive avancée
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6">
                            Cette section utilise l'intelligence artificielle pour prédire
                            les tendances futures, optimiser les ressources et anticiper
                            les pics d'activité.
                          </p>
                          <div className="flex gap-4 justify-center">
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                              Générer rapport
                            </Button>
                            <Button variant="outline" className="border-slate-300 dark:border-slate-700">
                              <Filter className="h-4 w-4 mr-2" />
                              Personnaliser
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}