<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Incident>
 */
class IncidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titre = fake()->name();
        $created = fake()->dateTimeBetween('-1 year', 'now');
        return [
            'titre' => $titre,
            'slug' => Str::slug($titre),
            'description' => fake()->sentence(3),
            'statut' => "En attente",
            'priorite_id' => 1,
            'user_id' => 1,
            'categorie_id' => 1,
            'created_at' => $created,
            'updated_at'=> $created
        ];
    }
}
