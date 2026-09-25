<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sku' => strtoupper(fake()->unique()->bothify('??###')),
            'title' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'picture' => 'https://picsum.photos/seed/' . fake()->uuid() . '/400/300',
            'price' => fake()->randomFloat(2, 2, 80),
            'currency' => 'USD',
            'meta' => [
                'ingredients' => fake()->words(4),
            ],
        ];
    }
}
