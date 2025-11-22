import Nav from '@/components/Nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import incident from '@/routes/incident';
import { Incident } from '@/types';
import { Link, useForm } from '@inertiajs/react';

interface Props {
    interventions: Incident[];
}

let color: string 

export default function view({ interventions }: Props) {


    return (
        <div>
            <Nav />
            <div className=" flex mt-10 mx-10 md:mx-30 flex-wrap gap-7">
                {interventions.map((intervention) => (
                  
                    <Card className="w-full max-w-85" key={intervention.id}>
                        <CardHeader>
                            {intervention.image ? (
                                <div className="h-40 rounded-md object-cover">{intervention.image}</div>
                            ) : (
                                <div className="flex h-40  items-center justify-center rounded-md bg-gray-300">
                                    <p>Pas d'image</p>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                            <CardTitle>{intervention.titre}</CardTitle>
                            <CardDescription>{intervention.description}</CardDescription>
                            <CardAction>
                                <Link href={`/intervention/view/${intervention.id}`} >
                                    <Button className='cursor-pointer'>Terminer</Button>
                                  </Link>
                            </CardAction>
                            
                        </CardContent>
                        <CardFooter className='flex justify-between'>
                          {intervention.priorite === 'elevée' && <Badge className='capitalize bg-red-500'>{intervention.priorite}</Badge> }
                          {intervention.priorite === 'moyenne' && <Badge className='capitalize bg-yellow-500'>{intervention.priorite}</Badge> }
                          {intervention.priorite === 'basse' && <Badge className='capitalize bg-green-500'>{intervention.priorite}</Badge> }
                          
                          <p className='capitalize'>{intervention.categorie.nom}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
