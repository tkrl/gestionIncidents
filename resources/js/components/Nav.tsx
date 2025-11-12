import React from 'react'
import { Button } from './ui/button'
import { Link, useForm } from '@inertiajs/react'

export default function Nav() {

    const {data, setData, post, processing, errors} = useForm()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/logout')
    }
  return (
    <>
        <div className="flex justify-between items-center h-15 shadow-md px-10">
            <div className="text-black font-medium">
                <Link href='/'>Incident</Link>
            </div>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <Button className='cursor-pointer' type='submit'>Logout</Button>
                </form>
            </div>
        </div>
    </>
  )
}
