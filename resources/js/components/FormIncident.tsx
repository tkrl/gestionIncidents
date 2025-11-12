import { Auth } from '@/types'
import { useForm } from '@inertiajs/react'
import React from 'react'


export default function FormIncident({user}: Auth) {

  const {data, setData,post, processing, errors} = useForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/incident/store')
  }
  return (
    <div>FormIncident</div>
  )
}