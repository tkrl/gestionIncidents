<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    //
    public function index (){

        $incidents = Incident::with('categorie')->with(['technicien','user'])->get();
        $users = User::all();

        return Inertia::render('dashboard', [
            'incidents' => $incidents,
            'users' => $users,
            'user' => Auth::user()
        ]);
    }

    public function create(){
        //
    }

    public function strore(Request $request){

    }

    public function edit(Incident $incident){

    }

    public function update(Request $request, Incident $incident){

    }

    public function destroy(Incident $incident){

    }
    
}
