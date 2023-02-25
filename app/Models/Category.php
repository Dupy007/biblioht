<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name','valeur','description','category_name_account','category_number_account'];
    public function pyramid()
    {
        return $this->hasMany(Pyramid::class);
    }
}
