<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Broadcast::routes(['middleware' => ['auth:sanctum']]);
Route::middleware(['api','auth:sanctum'])->group(function () {
    Route::resource('category', App\Http\Controllers\CategoryController::class);
    Route::resource('pyramid', App\Http\Controllers\PyramidController::class);
    Route::resource('user', App\Http\Controllers\UserController::class);
    Route::resource('userpyramid', App\Http\Controllers\UserPyramidController::class);
});
Auth::routes();
