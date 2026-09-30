<?php

namespace App\Actions;
use App\Models\User;

class EditUserAction
{
    public function __invoke(User $user, array $data): User
    {
        $payload = [
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone_number' => $data['phoneNumber'],
            'dob' => $data['dob'],
            'gender' => $data['gender'],
        ];

        if (! empty($data['password'])) {
            $payload['password'] = $data['password'];
        }

        $user->update($payload);

        return $user;
    }
   
}
