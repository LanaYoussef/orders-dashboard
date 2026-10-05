<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\User;
use App\Http\Requests\StoreOrderRequest;
use App\Actions\CreateOrderAction ;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Actions\UpdateOrderStatusAction;


class OrderController extends Controller
{
    
    public function index(User $user, Request $request)
    {
        $orders = $user->orders()
            ->with('orderItems.item')
            ->latest();
            
        if ($request->filled('minTotal'))
        {
            $orders->overAmount((float) $request->query('minTotal'));
        }
        return OrderResource::collection($orders->paginate(10));
    }

    
    public function store(StoreOrderRequest $request, User $user)
    {
        $order = (new CreateOrderAction)($user, $request->validated());
        $order->load('orderItems.item');
        return (new OrderResource($order))
            ->response()
            ->setStatusCode(201);
    }

   
    public function show(Order $order)
    {
        //
    }

   
    public function update(UpdateOrderStatusRequest $request, Order $order)
    {
        $order = (new UpdateOrderStatusAction)($order, $request->validated());
        return new OrderResource($order);
    }

    
    public function destroy(Order $order)
    {
        //
    }
}
