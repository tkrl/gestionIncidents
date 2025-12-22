import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Incident } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, AlertCircle, Lightbulb, FileText, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    intervention: Incident;
}

export default function Show({ intervention }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        solution: '',
        conseil: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/intervention/view/${intervention.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Nav />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="ghost" asChild>
                        <a href="/intervention/view">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux interventions
                        </a>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Informations de l'incident */}
                        <div className="lg:col-span-1">
                            <Card className="border-0 shadow-lg dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-blue-500" />
                                        Détails de l'incident
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">
                                            Titre
                                        </Label>
                                        <p className="font-medium capitalize">{intervention.titre}</p>
                                    </div>
                                    
                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">
                                            Priorité
                                        </Label>
                                        <div className="mt-1">
                                            <Badge className={
                                                intervention.priorite === 'elevée' ? 'bg-red-500 text-white' :
                                                intervention.priorite === 'moyenne' ? 'bg-orange-500 text-white' :
                                                'bg-green-500 text-white'
                                            }>
                                                {intervention.priorite}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">
                                            Catégorie
                                        </Label>
                                    </div>
                                    
                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">
                                            Statut actuel
                                        </Label>
                                        <div className="mt-1">
                                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                {intervention.statut}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Formulaire de résolution */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-xl dark:border-gray-700">
                                <CardHeader>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Finaliser l'intervention</CardTitle>
                                            <CardDescription>
                                                Décrivez la solution appliquée et donnez des conseils pour éviter que le problème ne se reproduise
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                
                                <CardContent>
                                    <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                                        <Lightbulb className="h-4 w-4" />
                                        <AlertDescription className="text-sm">
                                            Une description claire aide à documenter la résolution pour les futures références.
                                        </AlertDescription>
                                    </Alert>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Solution */}
                                        <div>
                                            <Label htmlFor="solution" className="text-base font-medium flex items-center gap-2 mb-2">
                                                <FileText className="w-4 h-4" />
                                                Solution appliquée
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="solution"
                                                value={data.solution}
                                                onChange={e => setData('solution', e.target.value)}
                                                className="min-h-[140px] resize-y"
                                                placeholder="Décrivez en détail les étapes de résolution du problème, les outils utilisés, et la cause identifiée..."
                                                required
                                            />
                                            {errors.solution && (
                                                <p className="mt-2 text-sm text-red-600">{errors.solution}</p>
                                            )}
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Soyez le plus précis possible pour aider les futurs intervenants
                                            </p>
                                        </div>

                                        {/* Conseil */}
                                        <div>
                                            <Label htmlFor="conseil" className="text-base font-medium flex items-center gap-2 mb-2">
                                                <Lightbulb className="w-4 h-4" />
                                                Conseils préventifs
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="conseil"
                                                value={data.conseil}
                                                onChange={e => setData('conseil', e.target.value)}
                                                className=""
                                                placeholder="Ex: Mettre à jour régulièrement l'antivirus, éviter les téléchargements non vérifiés..."
                                                required
                                            />
                                            {errors.conseil && (
                                                <p className="mt-2 text-sm text-red-600">{errors.conseil}</p>
                                            )}
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Recommandations pour éviter la reproduction du problème
                                            </p>
                                        </div>

                                        {/* Boutons d'action */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t dark:border-gray-700">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="sm:w-auto w-full"
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-green-600 hover:bg-green-700 transition-colors sm:w-auto w-full"
                                            >
                                                {processing ? (
                                                    <>
                                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                        Enregistrement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Finaliser l'intervention
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}