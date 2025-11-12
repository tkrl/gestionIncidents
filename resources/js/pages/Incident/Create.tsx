import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Categories } from '@/types';
import { useForm } from '@inertiajs/react';

export default function Create({ categories }: Categories) {
    const { data, setData, post, processing, errors } = useForm({
      titre: 'bonjour',
      description: 'bonsoir',
      priorite: 'basse',
      categorie_id: 1, 

    });

    const Priorite = ['eleve', 'moyenne', 'basse']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/incident');
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
                        <textarea value={data.description} onChange={e => setData('description', e.target.value )} />
                        {errors.description && <div className='text-red-400'>{errors.description}</div>}
                    </div>
                    <div className="mt-5">
                        <Label>Priorité</Label>
                        <Input value={data.priorite} onChange={e => setData('priorite', e.target.value)}/>
                        {errors.priorite && <div className='text-red-400'>{errors.priorite}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Categorie</Label>
                        <select value={data.categorie_id} onChange={e => setData('categorie_id', parseInt(e.target.value))}>
                            {categories.map((categorie) => (
                                <option value={categorie.id}>{categorie.nom}</option>
                            ))}
                        </select>
                        {errors.categorie_id && <div className='text-red-300'>{errors.categorie_id}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Image</Label>
                        <Input type="file" />
                        </div>

                   <div className='w-full mt-5 px-5'>
                            <Button type='submit' disabled={processing}  className='w-full'>Valider</Button>
                   </div>
                </form>
            </div>
        </div>
    );
}
