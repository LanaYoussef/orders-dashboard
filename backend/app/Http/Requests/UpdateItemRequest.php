<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        $itemId = $this->route('item')->id;
        return [
            'sku' => ['required', 'string', 'unique:items,sku,' . $itemId],
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'picture' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'string', 'size:3'],
            'meta' => ['nullable', 'array'],
        ];
    }
}
