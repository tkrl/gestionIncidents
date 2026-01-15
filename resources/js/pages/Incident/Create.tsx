import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Categorie, Incident, Priorite, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, AlertCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
    incident: Incident
    categories: Categorie[]
    priorites: Priorite[]
    user: User
}

export default function Create({ categories, incident, user, priorites }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        priorite_id: priorites.length > 0 ? priorites[0].id : 1,
        categorie_id: categories.length > 0 ? categories[0].id : 1,
        image: null
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/incident', {
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Nav user={user} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Button variant="ghost" asChild>
                            <a href="/incident">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour
                            </a>
                        </Button>
                    </div>

                    <Card className="border-0 shadow-xl dark:border-gray-700">
                        <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Signaler un nouvel incident</CardTitle>
                                    <CardDescription>
                                        Remplissez les informations ci-dessous pour créer un nouvel incident
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                                <HelpCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                    Assurez-vous de fournir une description claire et détaillée pour une prise en charge rapide.
                                </AlertDescription>
                            </Alert>

                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="space-y-6">
                                    {/* Titre */}
                                    <div>
                                        <Label htmlFor="titre" className="text-base font-medium flex items-center gap-2">
                                            Titre de l'incident
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="titre"
                                            value={data.titre}
                                            onChange={(e) => setData('titre', e.target.value)}
                                            className="mt-2"
                                            placeholder="Ex: Problème d'accès au serveur"
                                            required
                                        />
                                        {errors.titre && (
                                            <p className="mt-2 text-sm text-red-600">{errors.titre}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label htmlFor="description" className="text-base font-medium flex items-center gap-2">
                                            Description
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className="mt-2 min-h-[140px]"
                                            placeholder="Décrivez précisément le problème, les étapes pour le reproduire, et son impact..."
                                            required
                                        />
                                        {errors.description && (
                                            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Priorité */}
                                        <div>
                                            <Label htmlFor="priorite" className="text-base font-medium">
                                                Priorité
                                            </Label>
                                            <NativeSelect
                                                id="priorite"
                                                value={data.priorite_id}
                                                onChange={e => setData('priorite_id',parseInt(e.target.value))}
                                                className="mt-2"
                                            >
                                                {priorites.map((priorite) => (
                                                    <option key={priorite.id} value={priorite.id}>
                                                        {priorite.nom.charAt(0).toUpperCase() + priorite.nom.slice(1)}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                            {errors.priorite_id && (
                                                <p className="mt-2 text-sm text-red-600">{errors.priorite_id}</p>
                                            )}
                                        </div>

                                        {/* Catégorie */}
                                        <div>
                                            <Label htmlFor="categorie" className="text-base font-medium">
                                                Catégorie
                                            </Label>
                                            <NativeSelect
                                                id="categorie"
                                                value={data.categorie_id}
                                                onChange={e => setData('categorie_id', parseInt(e.target.value))}
                                                className="mt-2"
                                            >
                                                {categories.map((categorie) => (
                                                    <option key={categorie.id} value={categorie.id}>
                                                        {categorie.nom}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                            {errors.categorie_id && (
                                                <p className="mt-2 text-sm text-red-600">{errors.categorie_id}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <Label className="text-base font-medium">
                                            Image (optionnelle)
                                        </Label>
                                        <div className="mt-2">
                                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors group">
                                                <div className="flex flex-col items-center">
                                                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                                                        <Upload className="w-6 h-6 text-gray-500 group-hover:text-blue-500" />
                                                    </div>
                                                    <Label htmlFor="image-upload" className="cursor-pointer">
                                                        <div className='w-50  bg-black text-white text-center rounded-md py-3 hover:opacity-85'>Selectionner une image</div>
                                                        <Input
                                                            id="image-upload"
                                                            type="file"
                                                            onChange={(e) => setData("image", e.target.files?.[0] || null)}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />

                                                    </Label>
                                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                                        Une image peut aider à comprendre le problème plus rapidement
                                                    </p>
                                                    {data.image && (
                                                        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
                                                            ✓ Fichier sélectionné: {(data.image as File).name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {errors.image && (
                                                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Boutons d'action */}
                                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t dark:border-gray-700">
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
                                            className="bg-green-600 hover:bg-green-700 transition-colors sm:w-auto w-full min-w-[140px]"
                                        >
                                            {processing ? (
                                                <>
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                                                    Création en cours...
                                                </>
                                            ) : (
                                                'Créer l\'incident'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}