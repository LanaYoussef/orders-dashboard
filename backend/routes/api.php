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
Route::post('/users', [UserController::class, 'store'])
    ->middleware('auth:sanctum');
Route::put('/users/{user}', [UserController::class, 'update'])
    ->middleware('auth:sanctum');
Route::delete('/users/{user}', [UserController::class, 'destroy'])
    ->middleware('auth:sanctum');