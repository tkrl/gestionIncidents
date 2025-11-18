import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Incident } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props {
    intervention: Incident
}
export default function show({intervention}: Props) {

    const {data, setData, put, processing, errors} = useForm({
        solution: 'Problème de virus ',
        conseil: 'Eviter de brancher nimporte quel clé usb'
    })

    const handleChange = (e: React.FormEvent) => {
        e.preventDefault()

        put(`/intervention/view/${intervention.id}`)
    }
    return (
        <div>
            <Nav />
            <div className=''>
                <Card className='mt-10 max-w-250 mx-10 md:mx-50'>
                    <CardHeader>
                        <CardTitle>Incident résolu</CardTitle>
                        <CardDescription>
                            Maintenant que l'intervention est résolu pouvez vous nous décrire la panne et donner quelques conseil à lutilisateur pour
                            ç a ne reproduise plus.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleChange} className=''>

                            <Textarea value={data.solution} onChange={e => setData('solution', e.target.value)} className='mb-3' placeholder='Desciption'/>
                            <Input value={data.conseil} onChange={e => setData('conseil', e.target.value)} className='mb-3' placeholder='Conseil'/>
                            <div className="w-full flex justify-center">
                            <Button type='submit' className='cursor-pointer w-full mx-10'>Confirmer</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
