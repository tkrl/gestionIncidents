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

        $incidents = Incident::with(['categorie','priorite'])->with(['technicien','user'])->get();
        $users = User::with('role')->get();

        return Inertia::render('dashboard', [
            'incidents' => $incidents,
            'users' => $users,
            'user' => Auth::user()
        ]);
    }

    public function utilisateur(){
        $users = User::with('role')->get();

        return Inertia::render("admin/utilisateur", [
            'users' => $users,
            'user' => Auth::user()
        ]);
    }
    public function statistique(){
        $users = User::with('role')->get();
        $incidents = Incident::with(['categorie','priorite'])->with(['technicien','user'])->get();

        return Inertia::render("admin/statistique", [
            'users' => $users,
            'incidents' => $incidents,
            'user' => Auth::user()

        ]);
    }

    public function incidents(){
        $incidents = Incident::with(['categorie','priorite'])->with(['technicien','user'])->get();


        return Inertia::render("admin/incident", [
            'incidents' => $incidents,
            'user' => Auth::user()

        ]);
    }
    
}
