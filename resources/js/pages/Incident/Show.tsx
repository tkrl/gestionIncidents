import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Incident, User } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft,
  Image as ImageIcon,
  User as Userlucide,
  Folder
} from 'lucide-react'

interface Props {
  incident: Incident,
  user: User
}

export default function Show({ incident, user }: Props) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'elevée': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'moyenne': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'basse': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'En cours': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Résolu': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const { data, setData, put, processing, errors } = useForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/incident/${incident.id}/Encour`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Nav user={user}/>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/incident">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux incidents
            </Link>
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl dark:border-gray-700 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl capitalize">
                        {incident.titre}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Folder className="w-4 h-4" />
                        
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getPriorityColor(incident.priorite)} border`}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {incident.priorite}
                      </Badge>
                      <Badge className={getStatusColor(incident.statut)}>
                        {incident.statut}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Image */}
                  <div className="mb-8">
                    {incident.image ? (
                      <div className="rounded-lg overflow-hidden border dark:border-gray-700">
                        <img 
                          src={incident.image} 
                          alt={incident.titre}
                          className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Aucune image disponible</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Userlucide className="w-5 h-5" />
                      Description de l'incident
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {incident.description}
                      </p>
                    </div>
                  </div>

                  {/* Métadonnées */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Créé le</p>
                            <p className="font-medium">
                              {new Date(incident.created_at).toLocaleDateString('fr-FR', {
                                year: "numeric",
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Dernière mise à jour</p>
                            <p className="font-medium">
                              {new Date(incident.updated_at).toLocaleDateString('fr-FR', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Actions */}
            <div>
              <Card className="border-0 shadow-xl dark:border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                  <CardDescription>Gérer cet incident</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <form onSubmit={handleSubmit} className="w-full">
                      <Button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {processing ? 'Prise en charge...' : 'Prendre en charge'}
                      </Button>
                    </form>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/incident">
                        Voir tous les incidents
                      </Link>
                    </Button>
                    
                    <div className="pt-4 border-t dark:border-gray-700">
                      <h4 className="font-medium mb-2">Statut actuel</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Priorité:</span>
                          <Badge className={getPriorityColor(incident.priorite)}>
                            {incident.priorite}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Statut:</span>
                          <Badge className={getStatusColor(incident.statut)}>
                            {incident.statut}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}