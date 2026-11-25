<?php

namespace App\Actions;
use App\Models\User;
use App\Models\Order;
class DeleteUserAction
{
    public function __invoke(User $user)
    {
        if(Order::query()->where('user_id',$user->id)->exists()){
            
        
            abort(403,'user already has orders');
        }
        $user->delete();
    }
}
