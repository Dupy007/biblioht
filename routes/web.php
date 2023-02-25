<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
})->middleware(['guest']);
Route::post('/newuser', [App\Http\Controllers\UserController::class, 'store']);
Auth::routes();
Route::middleware(['auth'])->group(function () {
    Route::resource('plf/category', App\Http\Controllers\CategoryController::class);
    Route::resource('plf/pyramid', App\Http\Controllers\PyramidController::class);
    Route::resource('plf/user', App\Http\Controllers\UserController::class);
    Route::resource('plf/userpyramid', App\Http\Controllers\UserPyramidController::class);
    Route::get('plf/mypyramid', [App\Http\Controllers\UserPyramidController::class, 'mypyramid']);
    Route::post('plf/password_change', [App\Http\Controllers\UserController::class, 'password_change']);
    Route::get('plf/endpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'endpyramid']);
    Route::get('plf/confirmpaymentpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'confirmpayment']);
    Route::get('plf/nextpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'nextpyramid']);
    Route::get('plf/morepyramid/{id}', [App\Http\Controllers\UserPyramidController::class, 'morepyramid']);

    Route::get('session', function () { return ['auth' => Auth::user()]; });
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('{any}', function () { return view('app'); })->where('any','.*');
});