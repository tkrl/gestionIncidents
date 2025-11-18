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
        'description',
        'statut',
        'priorite',
        'image',
        'user_id',
        'technicien_id',
        'categorie_id',
        'piece_id',
        'conseil',
        'solution',
        'ended_at'
    ];


    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function technicien(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technicien_id');
    }
    
}
