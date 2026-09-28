<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;

class OrderSeeder extends Seeder
{
    
    public function run(): void
    {
        $items = Item::all();

        User::query()->each(function (User $user) use ($items) {
            $orderCount = fake()->numberBetween(5, 50);

            for ($i = 0; $i < $orderCount; $i++) {
                $order = Order::factory()->create([
                    'user_id' => $user->id,
                ]);

                $picked = $items->random(fake()->numberBetween(1, 5));
                $total = 0;

                foreach (collect($picked) as $item) {
                    $quantity = fake()->numberBetween(1, 4);

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
            }
        });
    }
}
