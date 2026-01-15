<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\registerRequest;
use Illuminate\Support\Str;

class AdminUserController extends Controller
{
    //

    public function register(){
        $regions = ['ADAMAOUA','CENTRE', 'LITTORAL', 'OUEST', 'NORD', 'EXTREME-NORD', 'SUD', 'NORD-OUEST', 'SUD-OUEST', 'EST'];
        $roles = Role::all();
        return Inertia::render("admin/register", [
            'user' => Auth::user()->load('role'),
            'regions'=> $regions,
            'roles'=> $roles
        ]);
    }

    public function signUp(registerRequest $request){

        $generatePassword = Str::random(12);
        $user = Auth::user();
        $data = $request->validated();
        $data['password'] = Hash::make($generatePassword);
        $data['agence_id'] = $user->agence_id;
        $data['service_id'] = $user->service_id;
        if($data['region'] == null){
            $data['region'] = $user->region;
        }
        dd($data);
    }
}
