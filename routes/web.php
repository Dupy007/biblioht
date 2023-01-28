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
    Route::get('session', function () { return ['auth' => Auth::user()]; });
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('{any}', function () { return view('app'); })->where('any','.*');
});