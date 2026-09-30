<?php

namespace App\Actions;
use App\Models\Item;
class EditItemAction
{
    
    public function __invoke(Item $item, array $data): Item
    {
        $payload = [
            'sku' => $data['sku'],
            'title' => $data['title'],
            'description' => $data['description']?? null ,
            'picture' => $data['picture']?? null ,
            'price' => $data['price'],
            'currency' => $data['currency'],
            'meta' => $data['meta'] ?? null ,
        ];

        $item -> update($payload);
        return $item;
    }
}
