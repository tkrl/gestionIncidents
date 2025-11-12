<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    public function EnCour(Incident $incident, Request $request){

        $data = $request->validate([
            'statut' => 'string'
        ]);

        $data['statut'] = 'En cours';

        $incident->update($data);

        return redirect()->route('incident.index')->with('success', 'Intervention en cours');
    }
}
