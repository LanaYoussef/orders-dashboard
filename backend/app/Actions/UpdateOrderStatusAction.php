<?php

namespace App\Actions;
use App\Models\Order;
class UpdateOrderStatusAction
{
    /**
     * Create a new class instance.
     */
    public function __invoke(Order $order, array $data): Order
    {
        $order->update(['status' => $data['status']]);
        return $order;
    }
}
