<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Actions\CreateUserAction;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Actions\EditUserAction;

class UserController extends Controller
{
   
    public function index()
    {
        $users = User::query()
            ->withCount('orders')
            ->paginate(15);

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $user = (new CreateUserAction)($request->validated());

        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }


    public function show(User $user)
    {
        $user->loadCount('orders');
        return new UserResource($user);
    }

   
    public function update(UpdateUserRequest $request, User $user)
    {
        $user = (new EditUserAction)($user, $request->validated());
        return new UserResource($user);
    }

   
    public function destroy(User $user)
    {
        //
    }
}
