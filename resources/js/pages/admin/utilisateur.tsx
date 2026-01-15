import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {  Link } from "@inertiajs/react";

import { User } from "@/types"
import UserTable from "@/components/UserTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Filter, 
  Download, 
  Search,
  Users,
  UserPlus,
  Shield,
  Briefcase,
  Mail,
  Phone,
  SlidersHorizontal
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
  users: User[]
  user: User
}

export default function Utilisateurs({ users, user }: Props) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filterUsers = users.filter(u => {
    if (activeFilter === "all") return true
<<<<<<< HEAD
    return u.role.nom === activeFilter
=======
    return u.role === activeFilter
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
  }).filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.matricule.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFilterCount = (role: string) => {
    if (role === "all") return users.length
<<<<<<< HEAD
    return users.filter(u => u.role.nom === role).length
=======
    return users.filter(u => u.role === role).length
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
  }

  const filters = [
    { value: "all", label: "Tous", count: getFilterCount("all"), icon: Users, color: "from-blue-500 to-cyan-500" },
    { value: "user", label: "Employés", count: getFilterCount("user"), icon: Briefcase, color: "from-green-500 to-emerald-500" },
    { value: "technicien", label: "Techniciens", count: getFilterCount("technicien"), icon: Shield, color: "from-purple-500 to-violet-500" },
  ]

  // Statistiques
  const totalUsers = users.length
  const activeUsers = users.length // À améliorer
  const newThisMonth = users.filter(u => {
    const date = new Date(u.created_at || new Date())
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    return date >= monthAgo
  }).length

  // Derniers utilisateurs ajoutés
  const recentUsers = users
    .sort((a, b) => new Date(b.created_at || new Date()).getTime() - new Date(a.created_at || new Date()).getTime())
    .slice(0, 4)

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
          <SiteHeader titre="Gestion des utilisateurs" />
          
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-6">
              <div className="px-4 pt-6 lg:px-6">
                <div className="mb-8">
                  {/* En-tête avec actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Gestion des utilisateurs
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Gérez et surveillez tous les utilisateurs de la plateforme
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Download className="mr-2 h-4 w-4" />
                        Exporter
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                        <UserPlus className="mr-2 h-4 w-4" />
<<<<<<< HEAD
                        <Link href="/users/register">
                            Ajouter utilisateur
                        </Link>
                      </Button> 
=======
                        Ajouter utilisateur
                      </Button>
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                    </div>
                  </div>

                  {/* Statistiques utilisateurs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Total utilisateurs</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-slate-800 dark:to-green-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                            <Briefcase className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Employés</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
<<<<<<< HEAD
                              {users.filter(u => u.role.nom === 'user').length}
=======
                              {users.filter(u => u.role === 'user').length}
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Techniciens</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
<<<<<<< HEAD
                              {users.filter(u => u.role.nom === 'technicien').length}
=======
                              {users.filter(u => u.role === 'technicien').length}
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-pink-50 dark:from-slate-800 dark:to-pink-900/20">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                            <UserPlus className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Nouveaux (mois)</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{newThisMonth}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Derniers utilisateurs ajoutés */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900/50 mb-8">
                    <CardHeader>
                      <CardTitle className="text-slate-900 dark:text-white">Derniers utilisateurs</CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Utilisateurs récemment ajoutés à la plateforme
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentUsers.map((user) => (
                          <div key={user.id} className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <Avatar className="h-16 w-16 mb-3">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-slate-900 dark:text-white text-center">
                              {user.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-2">
<<<<<<< HEAD
                              {user.role.nom === 'technicien' ? 'Technicien' : 'Employé'}
                            </p>
                            <Badge className={
                              user.role.nom === 'technicien' 
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500' 
                                : 'bg-gradient-to-r from-green-500 to-emerald-500'
                            }>
                              {user.role.nom}
=======
                              {user.role === 'technicien' ? 'Technicien' : 'Employé'}
                            </p>
                            <Badge className={
                              user.role === 'technicien' 
                                ? 'bg-gradient-to-r from-purple-500 to-violet-500' 
                                : 'bg-gradient-to-r from-green-500 to-emerald-500'
                            }>
                              {user.role}
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

   
                </div>
              </div>

              {/* Tableau des utilisateurs */}
              <div className="px-4 lg:px-6 pb-8">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/10">
                  <CardHeader className="pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-slate-900 dark:text-white">
                          Liste des utilisateurs
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          {filterUsers.length} utilisateur{filterUsers.length !== 1 ? 's' : ''} trouvé{filterUsers.length !== 1 ? 's' : ''}
                          {searchQuery && ` pour "${searchQuery}"`}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {activeUsers} actifs
                        </span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <UserTable data={filterUsers} />
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