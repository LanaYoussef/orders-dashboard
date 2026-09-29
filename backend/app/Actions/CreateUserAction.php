<?php

namespace App\Actions;

use App\Models\User;

class CreateUserAction
{
    /**
     * Create a new class instance.
     */
    public function __invoke(array $data): User
    {
        return User::create([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone_number' => $data['phoneNumber'],
            'dob' => $data['dob'],
            'gender' => $data['gender'],
            'password' => $data['password'],
        ]);
    }
}
