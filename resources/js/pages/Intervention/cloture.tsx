import Nav from '@/components/Nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Incident } from '@/types';
import { useForm } from '@inertiajs/react';

interface Props {
    intervention: Incident;
}

export default function cloture({ intervention }: Props) {
    const { data, setData, put, processing, errors } = useForm();

    const handleChange = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/intervention/cloture/${intervention.id}`);
    };

    return (
        <div>
            <Nav />
            <div className="">
                <Card className="mx-10 mt-10 max-w-250 md:mx-50">
                    <CardHeader>
                        <CardTitle>Incident résolu</CardTitle>
                        <CardDescription>
                            Maintenant que l'intervention est résolu voici la description et le conseil du technicien
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label>Description</Label>
                        <div className='w-full shadow-sm pb-4 mt-1 pl-2 rounded-md'>
                          {intervention.solution}
                        </div>
                      </div>
                      <div className='my-4'>
                        <Label>Conseil</Label>
                        <div className='w-full shadow-sm pb-4 mt-1 pl-2 rounded-md'>
                            {intervention.conseil}
                          </div>
                      </div>
                        <form onSubmit={handleChange} className="">
                            <div className="flex w-full justify-center">
                                <Button type="submit" className="mx-10 w-full cursor-pointer">
                                    Confirmer
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
