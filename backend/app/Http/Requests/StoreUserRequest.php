<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string'],
            'lastName' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'phoneNumber' => ['required', 'string', 'unique:users,phone_number'],
            'dob' => ['required', 'date'],
            'gender' => ['required', 'in:male,female,other'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
