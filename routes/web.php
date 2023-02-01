<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::post('/newuser', [App\Http\Controllers\UserController::class, 'store']);
Auth::routes();
Route::middleware(['auth'])->group(function () {
    Route::resource('plf/category', App\Http\Controllers\CategoryController::class);
    Route::resource('plf/pyramid', App\Http\Controllers\PyramidController::class);
    Route::resource('plf/user', App\Http\Controllers\UserController::class);
    Route::resource('plf/userpyramid', App\Http\Controllers\UserPyramidController::class);
    Route::get('plf/mypyramid', [App\Http\Controllers\UserPyramidController::class, 'mypyramid']);
    Route::get('plf/endpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'endpyramid']);
    Route::get('plf/nextpyramid/{id}', [App\Http\Controllers\PyramidController::class, 'nexpyramid']);

    Route::get('session', function () { return ['auth' => Auth::user()]; });
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('{any}', function () { return view('app'); })->where('any','.*');
});