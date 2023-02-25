<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pyramid extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','category_id','expire_at','description','pyramid_name_account','pyramid_number_account'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function userpyramid()
    {
        return $this->hasMany(UserPyramid::class);
    }
}
