import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import incident from '@/routes/incident'
import { Categorie, category, Incident } from '@/types'
import { Link } from '@inertiajs/react'
import React from 'react'

interface Props {
  incident: Incident,

}
 let color: string 

export default function Show({incident}: Props) {

 
  if(incident.priorite == 'elevée'){
    color = 'bg-red-500'
  }else if (incident.priorite == 'moyenne'){
    color = 'bg-green-300'
  }else{
    color = 'bg-yellow-400'
  }

  console.log(color)
  return (
    <div>
        <Nav />
        <div className='mx-20 mt-10  shadow-md bg-gree'>
          <div className='h-80 w-full shadow-md '>
            {incident.image 
               ? <img src={incident.image} className='w-full object-cover h-full rounded-md'/>
                : <div className='w-full bg-gray-300 flex justify-center items-center h-full rounded-md'><p>Pas d'image</p></div>}
          </div>
          <div className='mt-5'>
              <div className="flex items-center mb-2"><p className='font-medium text-3xl font-serif mr-7'>Les Infomation de l'incident</p> <p className='mr-2 text-md capitalize'>Priorité:</p><span className={`${color} rounded-md px-1 text-md capitalize`}>{incident.priorite}</span></div>
              <div className="font-medium text-xl font-serif mb-2">Nom de l'incident: <span className='text-2xl capitalize'>{incident.titre}</span></div>
              <div  className='font-medium text-lg font-serif'>Description de l'employé: <span className="text-xl capitalize">{incident.description}</span></div>
              <div className="flex items-center justify-between mx-3 py-2">
                <Button className='cursor-pointer'>Prendre en charge l'intervention</Button>
                <Link href='/incident'><Button className='cursor-pointer'>Voir plus d'incident</Button></Link>
              </div>
          </div>
        </div>
    </div>
  )
}
