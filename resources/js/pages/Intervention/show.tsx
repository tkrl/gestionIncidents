import Nav from '@/components/Nav';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { Incident, User } from '@/types';

import { useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, CheckCircle, FileText, Lightbulb, Send } from 'lucide-react';

interface Props {
    intervention: Incident;

    user: User;

}

export default function Show({ intervention, user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        solution: '',
        conseil: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/intervention/view/${intervention.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

            <Nav user={user} />


            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="ghost" asChild>
                        <a href="/intervention/view">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux interventions
                        </a>
                    </Button>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Informations de l'incident */}
                        <div className="lg:col-span-1">
                            <Card className="border-0 shadow-lg dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <AlertCircle className="h-5 w-5 text-blue-500" />
                                        Détails de l'incident
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">Titre</Label>
                                        <p className="font-medium capitalize">{intervention.titre}</p>
                                    </div>

                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">Priorité</Label>
                                        <div className="mt-1">
                                            <Badge
                                                className={
                                                    intervention.priorite.nom === 'elevée'
                                                        ? 'bg-red-500 text-white'
                                                        : intervention.priorite.nom === 'moyenne'
                                                          ? 'bg-orange-500 text-white'
                                                          : 'bg-green-500 text-white'
                                                }
                                            >
                                                {intervention.priorite.nom}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div>

                                        <Badge
                                            className={
                                                intervention.categorie.nom === 'categorie 1'
                                                    ? 'bg-red-500 text-white'
                                                    : intervention.categorie.nom === 'categorie 2'
                                                      ? 'bg-orange-500 text-white'
                                                      : 'bg-green-500 text-white'
                                            }
                                        >
                                            {intervention.categorie.nom}
                                        </Badge>

                                    </div>

                                    <div>
                                        <Label className="text-sm text-gray-500 dark:text-gray-400">Statut actuel</Label>
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
                                        <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                                    <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                                        <Lightbulb className="h-4 w-4" />
                                        <AlertDescription className="text-sm">
                                            Une description claire aide à documenter la résolution pour les futures références.
                                        </AlertDescription>
                                    </Alert>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Solution */}
                                        <div>
                                            <Label htmlFor="solution" className="mb-2 flex items-center gap-2 text-base font-medium">
                                                <FileText className="h-4 w-4" />
                                                Solution appliquée
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="solution"
                                                value={data.solution}
                                                onChange={(e) => setData('solution', e.target.value)}
                                                className="min-h-[140px] resize-y"
                                                placeholder="Décrivez en détail les étapes de résolution du problème, les outils utilisés, et la cause identifiée..."
                                                required
                                            />
                                            {errors.solution && <p className="mt-2 text-sm text-red-600">{errors.solution}</p>}
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Soyez le plus précis possible pour aider les futurs intervenants
                                            </p>
                                        </div>

                                        {/* Conseil */}
                                        <div>
                                            <Label htmlFor="conseil" className="mb-2 flex items-center gap-2 text-base font-medium">
                                                <Lightbulb className="h-4 w-4" />
                                                Conseils préventifs
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="conseil"
                                                value={data.conseil}
                                                onChange={(e) => setData('conseil', e.target.value)}
                                                className=""
                                                placeholder="Ex: Mettre à jour régulièrement l'antivirus, éviter les téléchargements non vérifiés..."
                                                required
                                            />
                                            {errors.conseil && <p className="mt-2 text-sm text-red-600">{errors.conseil}</p>}
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Recommandations pour éviter la reproduction du problème
                                            </p>
                                        </div>

                                        {/* Boutons d'action */}
                                        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row dark:border-gray-700">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="w-full sm:w-auto"
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-green-600 transition-colors hover:bg-green-700 sm:w-auto"
                                            >
                                                {processing ? (
                                                    <>
                                                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                                                        Enregistrement...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
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
