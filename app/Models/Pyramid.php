<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pyramid extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','category_id','expire_at','pyramid_name_account','pyramid_number_account','code_pyramid'];

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
    static function generateNextCode($id)
    {
        $code = 1;
        $pyramid= Pyramid::where('category_id',$id)->latest('created_at')->first();
        if (!empty($pyramid)) {
            $code = $pyramid->code_pyramid + 1;
        }
        return $code;
    }
}
