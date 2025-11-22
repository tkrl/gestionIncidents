<?php

use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\InterventionController;


Route::resource('/incident', IncidentController::class)->middleware(['auth', 'verified']);

Route::middleware('guest')->controller(UserController::class)->group(function(){

    Route::get('/', 'login')->name('login');
    Route::post('/login', 'doLogin');
});

Route::post('/logout', [UserController::class,'logout'])->middleware('auth', 'verified')->name('logout');

Route::controller(InterventionController::class)->middleware('auth', 'verified')->group(function () {
    Route::put('/incident/{incident}/Encour', 'Encour')->name('Encour');
    Route::get('/intervention/view', 'view')->name('Intervention.view');
    Route::get('/intervention/view/{incident}', 'show')->name('Intervention.show');
    Route::put('/intervention/view/{incident}', 'Resolution')->name('Resolution');
    Route::get('/intervention/cloture/{incident}', 'cloture')->name('Intervention.cloture');
    Route::put('/intervention/cloture/{incident}', 'cloturer')->name('Intervention.cloturer');
});

Route::get('/admin', [AdminController::class, 'index'])->name('admin')->middleware('auth', 'verified')->name('admin');
