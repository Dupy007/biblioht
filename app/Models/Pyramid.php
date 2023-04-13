<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pyramid extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','category_id','expire_at','pyramid_name_account','pyramid_number_account','code_pyramid','statut'];

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
    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }
    static function generateNextCode($id)
    {
        $code = 1;
        $pyramid= Pyramid::where('category_id',$id)->orderBy('id', 'desc')->orderBy('created_at', 'desc')->first();
        if (!empty($pyramid)) {
            $code = $pyramid->code_pyramid + 1;
        }
        return $code;
    }
    protected static function createPyramid($data)
    {
        return Pyramid::create([
            'user_id' => $data['user_id'],
            'category_id' => $data['category_id'],
            'code_pyramid' => Pyramid::generateNextCode($data['category_id']),
        ]);
    }
}
