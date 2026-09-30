<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Resources\ItemResource;
use App\Http\Requests\UpdateItemRequest;
use App\Actions\EditItemAction;

class ItemController extends Controller
{
    
    public function index()
    {
       $item= Item::query()->paginate(15);
        return ItemResource::collection($item);
    }

    
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        //
    }

    
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    
    public function edit(Item $item)
    {
        //
    }

    
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item = (new EditItemAction)($item, $request->validated());
        return new ItemResource($item);
    }

    
    public function destroy(Item $item)
    {
        //
    }
}
