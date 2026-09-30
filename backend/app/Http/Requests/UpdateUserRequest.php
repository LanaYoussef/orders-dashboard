<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        $userId = $this->route('user')->id;
        return [
            'firstName' => ['required', 'string'],
            'lastName' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email,' . $userId],
            'phoneNumber' => ['required', 'string', 'unique:users,phone_number,' . $userId],
            'dob' => ['required', 'date'],
            'gender' => ['required', 'in:male,female,other'],
            'password' => ['sometimes', 'nullable', 'string', 'min:8'],
        ];
    }
}
