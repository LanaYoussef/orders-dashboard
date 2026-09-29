<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::get('/users/{user}/orders', [OrderController::class, 'index']);
Route::get('/items',[ItemController::class,'index']);
Route::get('/items/{item}',[ItemController::class,'show']);