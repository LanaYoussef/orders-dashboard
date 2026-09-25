<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    /** @use HasFactory<\Database\Factories\ItemFactory> */
    use HasFactory;

    
    protected $fillable = [
        'sku',
        'title',
        'description',
        'picture',
        'price',
        'currency',
        'meta',
    ];
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'meta' => 'array',
        ];
    }
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

}
