<?php

namespace App\Models;

use App\Models\Incident;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Priorite extends Model
{
    protected $fillable = [
        'nom'
    ];

    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }
}
