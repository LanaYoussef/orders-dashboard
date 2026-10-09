<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\AuthController;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::get('/users/{user}/orders', [OrderController::class, 'index']);
Route::get('/items',[ItemController::class,'index']);
Route::get('/items/{item}',[ItemController::class,'show']);


Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);
Route::put('/items/{item}',[ItemController::class,'update']);
});

Route::post('/users/{user}/orders', [OrderController::class, 'store'])
    ->middleware('auth:sanctum');
Route::patch('/orders/{order}', [OrderController::class, 'update'])
    ->middleware('auth:sanctum');
