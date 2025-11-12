import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {  Categorie, Categories, Incident, Priorite } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props {
    incident: Incident
    categories: Categories
}

export default function Edit({ incident, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
      titre: incident.titre,
      description: incident.description,
      priorite: incident.priorite,
      categorie_id: incident.categorie_id
    });

    const Priorites = ['elevée', 'moyenne', 'basse']

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/incident/${incident.id}`);
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
                        <select value={data.priorite}  onChange={e => setData('priorite', e.target.value as Priorite)}>
                            {Priorites.map((priorite) => (
                                <option key={priorite} value={priorite}>{priorite}</option>
                            ))}
                        </select>
                        {errors.priorite && <div className='text-red-400'>{errors.priorite}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Categorie</Label>
                        <select value={data.categorie_id}  onChange={e => setData('categorie_id', parseInt(e.target.value) )}>
                            {categories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
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
