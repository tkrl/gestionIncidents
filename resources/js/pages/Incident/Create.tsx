import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { Categories } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Create({ categories }: Categories) {
    const { data, setData, post, processing, errors } = useForm({
      titre: 'bonjour',
      description: 'bonsoir',
      priorite: 'basse',
      categorie_id: 1, 
      image: null

    });

    const Priorites = ['elevée', 'moyenne', 'basse']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/incident', {
            forceFormData: true,
        });
    };
    return (
        <div className=''>
            <Nav />
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className=" p-5 rounded-2xl shadow-2xl" >
                    <div className="mt-5" >
                        <Label>Titre</Label>
                        <Input value={data.titre} onChange={(e)=> setData('titre', e.target.value)}/>
                        {errors.titre && <div className='text-red-400'>{errors.titre}</div>}
                    </div>
                    <div className="mt-5">
                        <Label>Description</Label>
                        <Textarea value={data.description} onChange={e => setData('description', e.target.value )} />
                        {errors.description && <div className='text-red-400'>{errors.description}</div>}
                    </div>
                    <div className="mt-5 w-full">
                        <Label>Priorité</Label>
                        <NativeSelect className='w-full' value={data.priorite}  onChange={e => setData('priorite', e.target.value)}>
                            {Priorites.map((priorite) => (
                                <option key={priorite} value={priorite}>{priorite}</option>
                            ))}
                        </NativeSelect>
                        {errors.priorite && <div className='text-red-400'>{errors.priorite}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Categorie</Label>
                        <NativeSelect value={data.categorie_id} onChange={e => setData('categorie_id', parseInt(e.target.value))}>
                            {categories.map((categorie) => (
                                <option value={categorie.id}>{categorie.nom}</option>
                            ))}
                        </NativeSelect>
                        {errors.categorie_id && <div className='text-red-300'>{errors.categorie_id}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Image</Label>
                        <input
                            type="file"
                            onChange={(e) => setData("image", e.target.files[0])}
                            />
                        </div>
                        {errors.image && <div className='text-red-400'>{errors.image}</div>}
                        {previeUrl && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Image actuelle:</p>
                                <img src={previeUrl} alt="Image actuelle" className="mt-2 max-w-xs rounded" />
                            </div>
                        )}

                   <div className='w-full mt-5 px-5'>
                            <Button type='submit' disabled={processing}  className='w-full'>Valider</Button>
                   </div>
                </form>
            </div>
        </div>
    );
}
