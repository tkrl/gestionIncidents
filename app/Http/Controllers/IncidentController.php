<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Incident;
use App\Models\Categorie;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\IncidentRequest;
use Illuminate\Support\Facades\Storage;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {

            $incident = new Incident;
        if(Auth::user()->can('view', $incident)){
            $incidents = $incident->with('categorie')->get();
        }else {
            $incidents = $incident->with('categorie')->where('user_id', Auth::user()->id)->get();
        }

        return Inertia::render('Incident/Index', [
            'incidents' => $incidents   
        ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categorie::all();
        $priorite = ['eleve', 'moyenne', 'basse'];

        return Inertia::render('Incident/Create',[
            'categories' => $categories,
            'priorité' => $priorite
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncidentRequest $request, Incident $incident)
    {
        $incident = new Incident;

        $data = $request->validated();

        $data['slug'] = Str::slug($data['titre']);


        if($request->hasFile('image')){

            $data['image'] = $request->store('images', 'public');

            Auth::user()->incidents()->create($data);

            return redirect(route('incident.index'))->with('success','Incident enregistrer avec success');

        }

        Auth::user()->incidents()->create($data);

        return redirect(route('incident.index'))->with('success','Incident enregistrer avec success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Incident $incident)
    {

    if(Auth::user()->can('view', $incident)){
        
        return Inertia::render('Incident/Show', [
            'incident' => $incident
        ]);
    }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incident $incident)
    {    
 
        if(Auth::user()->can('update', $incident)){
            $categories = Categorie::all();
            $incident->with('categorie');
   
           return Inertia::render('Incident/Edit', [
               'incident' => $incident,
               'categories' => $categories
   
           ]);
        };

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(IncidentRequest $request, Incident $incident)
    {

        $data = $request->validated();

        $data['slug'] = Str::slug($data['titre']);

    
        if($request->has('image')){

            if($incident->image){
                Storage::delete($incident->image);
            }

            $data['image'] = $request->store('images', 'public');

            $incident->update($data);

            $path = $data['image']->store('Incident');

            return redirect(route('incident.index'))->with('success','Incident Mise à jour avec success');

        }

        $incident->update($data);
 
        return redirect()->route('incident.index')->with('success','Incident Mise à jour avec success');
  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incident $incident )
    {
        $incident->delete();
        return redirect()->back()->with('success','Incident supprimé avec success');
    }
}
