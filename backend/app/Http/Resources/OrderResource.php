<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orderNumber' => $this->order_number,
            'status' => $this->status,
            'total' => $this->total,
            'createdAt' => $this->created_at?->toIso8601String(),
            'items' => OrderItemResource::collection($this->whenLoaded('orderItems')),
        ];
    }
}
