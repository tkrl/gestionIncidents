import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Incident, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, FileText, Lightbulb, ThumbsUp, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    intervention: Incident;
    user: User
}

export default function Cloture({ intervention, user }: Props) {
    const { put, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/intervention/cloture/${intervention.id}`);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'elevée': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'moyenne': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
            case 'basse': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Nav user={user}/>
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="ghost" asChild>
                        <a href="/incident">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux incidents
                        </a>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="border-0 shadow-xl dark:border-gray-700">
                        <CardHeader className="pb-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Intervention Résolue !</CardTitle>
                                    <CardDescription>
                                        Voici le rapport de résolution fourni par le technicien
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                                <ThumbsUp className="h-4 w-4" />
                                <AlertDescription>
                                    Merci pour votre patience. L'incident a été traité avec succès.
                                </AlertDescription>
                            </Alert>

                            {/* Résumé de l'incident */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Incident</p>
                                            <p className="font-medium capitalize">{intervention.titre}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                            <Badge className={getPriorityColor(intervention.priorite)}>
                                                {intervention.priorite}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Priorité</p>
                                            <p className="font-medium capitalize">{intervention.priorite}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                            <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Résolu le</p>
                                            <p className="font-medium">
                                                {new Date().toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Solution et conseils */}
                            <div className="space-y-6">
                                <div>
                                    <Label className="text-base font-medium flex items-center gap-2 mb-3">
                                        <FileText className="w-5 h-5" />
                                        Description de la résolution
                                    </Label>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                            {intervention.solution || "Aucune description fournie"}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-base font-medium flex items-center gap-2 mb-3">
                                        <Lightbulb className="w-5 h-5" />
                                        Conseils du technicien
                                    </Label>
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5">
                                        <p className="text-green-800 dark:text-green-300">
                                            {intervention.conseil || "Aucun conseil spécifique fourni"}
                                        </p>
                                    </div>
                                </div>

                                {/* Formulaire de confirmation */}
                                <div className="pt-6 border-t dark:border-gray-700">
                                    <form onSubmit={handleSubmit}>
                                        <Alert className="mb-4 bg-gray-50 dark:bg-gray-800">
                                            <ThumbsUp className="h-4 w-4" />
                                            <AlertDescription className="text-sm">
                                                Confirmez la clôture de cet incident. Cette action est définitive.
                                            </AlertDescription>
                                        </Alert>
                                        
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="sm:w-auto w-full"
                                            >
                                                Retour
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-green-600 hover:bg-green-700 transition-colors sm:w-auto w-full"
                                            >
                                                {processing ? (
                                                    <>
                                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Confirmer la clôture
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}