<?php

use App\Models\User;
use App\Models\Piece;
use App\Models\Categorie;
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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->string('description');
            $table->string('priorite');
            $table->string('image')->nullable();
            $table->foreignIdFor(User::class, 'user_id')->constrained();
            $table->foreignIdFor(User::class, 'technicien_id')->nullable()->constrained();
            $table->foreignIdFor(Categorie::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Piece::class)->nullable();
            $table->timestamps();
            $table->timestamp('ended_at')->nullable();
            $table->string('statut')->default('En attente');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }

};
