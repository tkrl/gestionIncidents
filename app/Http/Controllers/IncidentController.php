<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\IncidentRequest;
use Illuminate\Support\Facades\Storage;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incident = new Incident;

        $Incidents = $incident->find(1)->get([titre, desciption]);
        return Inertia::render('Incident/Index', [
            'incidents' => $Incidents   
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Incident/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncidentRequest $request)
    {
        $incident = new Incident;

        $data = $request->validated();

        if($data->has('image')){
            $path = $data['image']->store('Incident');
        }

        $incident->create([
            'titre' => $data['titre'],
            'slug' => Str::slug($data['titre']),
            'description' => $data['description'],
            'priorite' => $data['priorite'],
            'image' => $path,
            'user_id' => $incident->User()->id,
            'categorie_id' => $incident->Categorie()->id,
        ]);

        return redirect(route('Incident.index'))->with('success','Incident enregistrer avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Incident $incident)
    {
        return Inertia::render('Incident/Show', [
            'incident' => $incident
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incident $incident)
    {    
        return Inertia::render('Incident/Edit', [
            'incident' => $incident
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(IncidentRequest $request, Incident $incident)
    {
         
        $data = $request->validated();
    
        if($data->has('image')){
            Storage::delete($incident->image);
            $path = $data['image']->store('Incident');
        }

        $incident->update([
            'titre' => $data['titre'],
            'slug' => Str::slug($data['titre']),
            'description' => $data['description'],
            'priorite' => $data['priorite'],
            'image' => $path,
            'categorie_id' => $incident->Categorie()->id,
        ]);

        return redirect(route('Incident.index'))->with('success','Incident Mise à jour avec success');
  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incident $incident)
    {
        $incident->delete();
        return redirect()->back()->with('success','Incident supprimé avec success');
    }
}
