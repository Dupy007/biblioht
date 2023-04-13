<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','pyramid_id','statut','type_message','message'];

    public function pyramid()
    {
        return $this->belongsTo(Pyramid::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class );
    }
}
