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
<<<<<<< HEAD
            'priorite_id' => ['required'],
=======
            'priorite' => ['required'],
>>>>>>> 338b8d603abcd8a562f42316f421d5fc9f323762
            'image' => ['nullable', 'file'],
            'user_id',
            'categorie_id' => ['required'],
        ];
    }
}
