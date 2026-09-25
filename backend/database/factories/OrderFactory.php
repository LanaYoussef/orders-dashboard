<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\OrderStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' =>'#' . fake()->unique()->numerify('######'),
            'user_id' => User::factory(),
            'status' => fake()->randomElement(OrderStatus::cases()),
            'total' => 0,
        ];
    }
}
