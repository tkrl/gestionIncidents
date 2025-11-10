<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Agence extends Model
{

    use HasFactory;
    
    protected $fillable = [
        'code',
        'nom',
        'adresse'
    ];

    public function Users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
 