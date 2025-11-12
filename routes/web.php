<?php

use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IncidentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('/incident', IncidentController::class)->middleware(['auth', 'verified']);

Route::middleware('guest')->controller(UserController::class)->group(function(){

    Route::get('/login', 'login')->name('login');
    Route::post('/login', 'doLogin');
});

Route::post('/logout', [UserController::class,'logout'])->middleware('auth', 'verified')->name('logout');
