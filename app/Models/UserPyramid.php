<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPyramid extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id',
    'position',
    'pyramid_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pyramid()
    {
        return $this->belongsTo(Pyramid::class);
    }
}
