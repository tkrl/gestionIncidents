<?php

use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncidentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::resource('/incident', IncidentController::class);
