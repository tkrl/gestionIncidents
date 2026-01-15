<?php

namespace App\Http\Requests;

use App\Models\Incident;
use Illuminate\Foundation\Http\FormRequest;

class IncidentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
        return [
            'titre' => ['required'],
            'slug' => ["unique:incidents,slug"],
            'description' => ['required'],

            'priorite_id' => ['required'],

            'image' => ['nullable', 'file'],
            'user_id',
            'categorie_id' => ['required'],
        ];
    }
}
