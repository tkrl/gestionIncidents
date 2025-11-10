<?php

namespace App\Models;

use App\Models\User;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Incident extends Model
{

    use HasFactory;


    protected $fillable = [

        'titre',
        'slug',
        'desciption',
        'statut',
        'priorite',
        'image',
        'user_id',
        'categorie_id',
        'piece_id',
        'ended_at'
    ];


    public function Categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
}
