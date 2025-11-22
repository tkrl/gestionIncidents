<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    
    public function login(){

        return Inertia::render('User/Login');
    }

    public function doLogin(UserRequest $request){

        $data = $request->validated();
        
        if(Auth::attempt($data)){
            $request->session()->regenerate();

            if(Auth::user()->role === 'admin'){
                
               return redirect()->intended('admin'); 
            }
            return redirect()->intended('incident.index');
        }

        return back()->withErrors([
            'email' => 'Email Incorrect'
        ])->onlyInput('eamil');
    }

    public function logout(){
        Auth::logout();

        return redirect()->route('login')->with('succes', 'Déconnexion éffectué avec success');
    }
}
