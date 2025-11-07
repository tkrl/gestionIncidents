<?php

use App\Models\Incident;
use App\Models\Technicien;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->integer('moyenne_etoile');
            $table->integer('nombre_avis');
            $table->integer('nombre_like');
            $table->foreignIdFor(Technicien::class);
            $table->foreignIdFor(Incident::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interventions');
    }
};
