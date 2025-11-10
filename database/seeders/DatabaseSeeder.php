<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Agence;
use App\Models\Service;
use App\Models\Categorie;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // User::factory(10)->create();



        Agence::create([
            'code' => ' DD6SAI',
            'nom' => fake()->name(),
            'adresse' => fake()->address()
        ]);

        Service::create([
            'nom' => 'HDDS8S',
            'description' => fake()->sentence(2),
        ]);

        User::factory()->create([
            'matricule' => '22DC2R',
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'telephone' => '8397278',
            'password' => '0000',
            'agence_id' => 1,
            'service_id' =>1
        ]);


        for($i=1 ; $i <= 4; $i++){
            Categorie::create([
                'nom' => "categorie $i",
  
            ]);
        }
    }
}
