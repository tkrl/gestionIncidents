<?php

namespace App\Models;

use App\Models\Incident;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categorie extends Model
{

    use HasFactory;
    
    protected $fillable = [
        'nom',
    ];
    
    public function Incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }
}
