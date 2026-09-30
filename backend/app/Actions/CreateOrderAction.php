<?php

namespace App\Actions;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\OrderStatus;
use Illuminate\Support\Facades\DB;

class CreateOrderAction
{
    public function __invoke(User $user,array $data): Order
    {
       return DB::transaction(function () use ($user, $data) {
            do {
                $orderNumber = '#' . fake()->numerify('######');
            } 
            while (Order::query()->where('order_number', $orderNumber)->exists());

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'status' => OrderStatus::PENDING,
                'total' => 0,
            ]);

            $total = 0;

            foreach ($data['items'] as $line) {
                $item = Item::query()->findOrFail($line['itemId']);
                $quantity = $line['quantity'];
                OrderItem::create([
                    'order_id' => $order->id,
                    'item_id' => $item->id,
                    'quantity' => $quantity,
                    'unit_price' => $item->price,
                    'currency' => $item->currency,
                ]);
                $total += $item->price * $quantity;
            }

            $order->update(['total' => $total]);
            return $order;
        });

    }
}
