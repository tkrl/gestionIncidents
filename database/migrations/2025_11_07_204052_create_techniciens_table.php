<?php

use App\Models\Equipe;
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
        Schema::create('techniciens', function (Blueprint $table) {
            $table->id();
            $table->string('matricule');
            $table->string('name');
            $table->string('competence');
            $table->string('disponibilite');
            $table->string('email')->unique();
            $table->string('telephone')->unique();
            $table->string('password');
            $table->foreignIdFor(Equipe::class)->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('techniciens');
    }
};
