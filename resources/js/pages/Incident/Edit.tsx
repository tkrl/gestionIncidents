import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Categorie, Categories, Incident, Priorite } from '@/types';
import { useForm } from '@inertiajs/react';
import { ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    incident: Incident
    categories: Categories
}

export default function Edit({ incident, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        titre: incident.titre,
        description: incident.description,
        priorite: incident.priorite,
        categorie_id: incident.categorie_id,
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState<string>(incident.image ? `${incident.image}` : '');
    const Priorites = ['elevée', 'moyenne', 'basse'];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/incident/${incident.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Nav />
            
            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" className="mb-6" asChild>
                    <a href="/incident">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </a>
                </Button>
                
                <div className="max-w-4xl mx-auto">
                    <Card className="border-0 shadow-xl dark:border-gray-700">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-2xl">Modifier l'Incident</CardTitle>
                            <CardDescription>
                                Mettez à jour les informations de l'incident #{incident.id}
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Colonne gauche */}
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="titre" className="text-base font-medium">
                                                Titre de l'incident
                                            </Label>
                                            <Input
                                                id="titre"
                                                value={data.titre}
                                                onChange={(e) => setData('titre', e.target.value)}
                                                className="mt-2"
                                                placeholder="Donnez un titre explicite"
                                            />
                                            {errors.titre && (
                                                <p className="mt-2 text-sm text-red-600">{errors.titre}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="description" className="text-base font-medium">
                                                Description détaillée
                                            </Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                className="mt-2 min-h-[120px]"
                                                placeholder="Décrivez le problème rencontré..."
                                            />
                                            {errors.description && (
                                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="priorite" className="text-base font-medium">
                                                Priorité
                                            </Label>
                                            <NativeSelect
                                                id="priorite"
                                                value={data.priorite}
                                                onChange={(e) => setData('priorite', e.target.value as Priorite)}
                                                className="mt-2"
                                            >
                                                <option value="">Sélectionnez une priorité</option>
                                                {Priorites.map((priorite) => (
                                                    <option key={priorite} value={priorite}>
                                                        {priorite.charAt(0).toUpperCase() + priorite.slice(1)}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                            {errors.priorite && (
                                                <p className="mt-2 text-sm text-red-600">{errors.priorite}</p>
                                            )}
                                        </div>
                                        
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
                                                <option value="">Sélectionnez une catégorie</option>
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
                                    
                                    {/* Colonne droite - Image */}
                                    <div className="space-y-6">
                                        <div>
                                            <Label className="text-base font-medium">
                                                Image de l'incident
                                            </Label>
                                            <div className="mt-2">
                                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                                    <div className="flex flex-col items-center">
                                                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                                        <Label htmlFor="image-upload" className="cursor-pointer">
                                                            <Input
                                                                id="image-upload"
                                                                type="file"
                                                                onChange={handleImageChange}
                                                                accept="image/*"
                                                                className="hidden"
                                                            />
                                                            <Button type="button" variant="outline">
                                                                <ImageIcon className="w-4 h-4 mr-2" />
                                                                Choisir une image
                                                            </Button>
                                                        </Label>
                                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                            PNG, JPG, GIF jusqu'à 5MB
                                                        </p>
                                                    </div>
                                                </div>
                                                {errors.image && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {previewUrl && (
                                            <div className="mt-4">
                                                <Label className="text-base font-medium mb-2 block">
                                                    Aperçu de l'image
                                                </Label>
                                                <div className="relative rounded-lg overflow-hidden border dark:border-gray-700">
                                                    <img
                                                        src={previewUrl}
                                                        alt="Aperçu de l'incident"
                                                        className="w-full h-64 object-cover"
                                                    />
                                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                                        {incident.image ? 'Image actuelle' : 'Nouvelle image'}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t dark:border-gray-700">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 transition-colors min-w-[120px]"
                                    >
                                        {processing ? 'Enregistrement...' : 'Mettre à jour'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}