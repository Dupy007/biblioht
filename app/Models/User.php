<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'mobile_no',
        'code',
        'parrain',
        'type_account',
        'carte_identite',
        'departement',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function pyramids()
    {
        return $this->hasMany(Pyramid::class);
    }
    public function userpyramids()
    {
        return $this->hasMany(UserPyramid::class);
    }

    static function generateUniqueCode($strname)
    {

        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersNumber = strlen($characters);
        $codeLength = 6;
        $code = '';
        $name = explode(' ',$strname);
        array_map('trim',$name);
        foreach ($name as $key => $value) {
            if ($key>1) { break; }
            if (!empty($value)) {
                $code.=$value[0];
            }
        }
        while (strlen($code) < 6) {
            $position = rand(0, $charactersNumber - 1);
            $character = $characters[$position];
            $code = $code.$character;
        }
        $code= strtoupper($code);
        if (User::where('code', $code)->exists()) {
            generateUniqueCode($strname);
        }

        return $code;

    }

}
