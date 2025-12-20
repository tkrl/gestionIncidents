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

    public function utilisateur(){
        $users = User::all();

        return Inertia::render("admin/utilisateur", [
            'users' => $users,
            'user' => Auth::user()
        ]);
    }
    public function statistique(){
        $users = User::all();
        $incidents = Incident::with('categorie')->with(['technicien','user'])->get();

        return Inertia::render("admin/statistique", [
            'users' => $users,
            'incidents' => $incidents,
            'user' => Auth::user()

        ]);
    }

    public function incidents(){
        $incidents = Incident::with('categorie')->with(['technicien','user'])->get();


        return Inertia::render("admin/incident", [
            'incidents' => $incidents,
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
