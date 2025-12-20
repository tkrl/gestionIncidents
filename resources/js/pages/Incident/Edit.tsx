import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect } from '@/components/ui/native-select';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {  Categorie, Categories, Incident, Priorite } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';

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

    const[previeUrl, setPreviewUrl] = useState<string>(incident.image ? `${incident.image}` : '')

    const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0] ;
        if(file){
            setData('image', file);
            const reader = new FileReader()
            reader.onloadend = () =>{
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

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
                        <Textarea value={data.description} onChange={e => setData('description', e.target.value )} />
                        {errors.description && <div className='text-red-400'>{errors.description}</div>}
                    </div>
                    <div className="mt-5 w-full">
                        <Label>Priorité</Label>
                        <NativeSelect className='w-full' value={data.priorite}  onChange={(e: ChangeEvent<HTMLSelectElement>) => setData('priorite', e.target.value as Priorite)}>
                            {Priorites.map((priorite) => (
                                <option key={priorite} value={priorite}>{priorite}</option>
                            ))}
                        </NativeSelect>
                        {errors.priorite && <div className='text-red-400'>{errors.priorite}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Categorie</Label>
                        <NativeSelect value={data.categorie_id}  onChange={e => setData('categorie_id', parseInt(e.target.value) )}>
                            {categories.map((categorie) => (
                                <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                            ))}
                        </NativeSelect>
                        {errors.categorie_id && <div className='text-red-300'>{errors.categorie_id}</div>}
                        </div>
                    <div className="mt-5">
                        <Label>Image</Label>
                        <Input type="file" onChange={handleImageChange} accept='images/*'/>
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
