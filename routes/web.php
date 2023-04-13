<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
})->middleware(['guest']);
Route::post('/newuser', [App\Http\Controllers\UserController::class, 'store']);
Auth::routes();
Route::middleware(['auth'])->group(function () {
    
    Route::resource('plf/category', App\Http\Controllers\CategoryController::class)->middleware('admin');
    Route::resource('plf/pyramid', App\Http\Controllers\PyramidController::class)->middleware('admin');
    Route::resource('plf/user', App\Http\Controllers\UserController::class)->middleware('admin');
    Route::resource('plf/userpyramid', App\Http\Controllers\UserPyramidController::class)->middleware('admin');
    Route::get('plf/pyramid_user/{id}', [App\Http\Controllers\UserPyramidController::class, 'pyramid_user'])->middleware('admin');
    Route::get('plf/archived', [App\Http\Controllers\UserPyramidController::class, 'archived'])->middleware('admin');
    Route::get('plf/mypyramid', [App\Http\Controllers\UserPyramidController::class, 'mypyramid']);
    Route::post('plf/password_change', [App\Http\Controllers\UserController::class, 'password_change']);
    Route::get('plf/getAllUsers', [App\Http\Controllers\UserController::class, 'getAll'])->middleware('admin');
    Route::get('plf/endpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'endpyramid'])->middleware('admin');
    Route::get('plf/confirmpaymentpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'confirmpayment']);
    Route::get('plf/nextpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'nextpyramid']);
    Route::post('plf/pyramidedit/{id}', [App\Http\Controllers\PyramidController::class, 'updatepyramid']);
    Route::get('plf/chat/{pyramid_id}', [App\Http\Controllers\ChatMessageController::class, 'messages']);
    Route::post('plf/chat', [App\Http\Controllers\ChatMessageController::class, 'store']);
    
    Route::get('session', function () { return ['auth' => Auth::user()]; });
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('{any}', function () { return view('app'); })->where('any','.*');
});
