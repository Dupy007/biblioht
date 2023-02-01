<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPyramid;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use DB;
class UserController extends Controller
{
    var $therequest=null;
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all(['id','name','mobile_no','code','type_account','email','parrain']);
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    private function checkparrain($data){
        if (!empty($data)) {
            $parrain=$data["parrain"];
            $id=$data["id"];
            if (!empty($parrain)) {
                $users = User::where([['parrain', $parrain],
                                    ($id? ['id','<>',$id ] :['parrain', $parrain])])
                ->get();
                if ($users->count()>=2) {
                    return $users;
                }
            }
        }
        return false;
    }
    private function getUserPyramid($code){
        if (!empty($code)) {
            $user = User::where('code', $code)->first();
            if ($user->count()>0) {
                $userpyramid = UserPyramid::where(
                    'user_id',$user->id)->get();
                return $userpyramid;
            }
        }
        return false;
    }
    public function givePosition($position){
        $fav=array();
        for ($i=1; $i <8 ; $i++) {
            if ($position==$i) {
                $fav = [$i*2,$i*2+1];
            }
        }
        return $fav;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages=array();
        $validatedData = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'mobile_no' => ['required', 'numeric', 'digits_between:7,12'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'type_account' => ['string'],
            'parrain' => ['nullable','exists:users,code'],
        ]);
        $this->therequest = array('parrain' => $request->input('parrain'),'id'=>null);
        $validatedData->after(function ($validatedData) {
            $val= $this->checkparrain($this->therequest);
            if ($val) {
                $validatedData->errors()->add(
                    'parrain', 'This code has already sponsored two people!',
                );
            }
        });
        $validatedData = $validatedData->validate();
        $user = $this->createUser($validatedData);
        $messages[]= 'User Created Successfully!!!';
        $userPyramidParrain = $this->getUserPyramid($user->parrain);
        if ($userPyramidParrain) {
            $messages[]= 'UserPyramidParrain Successfully!!!';
            $favori = $this->givePosition($userPyramidParrain[0]->position);
            if (!empty($favori)) {
                $messages[]= 'Favori Successfully!!!';
                $messages[]= $userPyramidParrain;
                foreach ($favori as $value) {
                    $checkUserPyramidPosition = UserPyramid::where('pyramid_id',$userPyramidParrain[0]->pyramid_id)
                    ->where('position',$value)
                    ->first();
                    if ((!$checkUserPyramidPosition)) {
                        $messages[]= 'checkUserPyramidPosition Successfully!!!';
                        $iduser =  User::where('email', $user->email)->first();
                        UserPyramid::create([
                            'pyramid_id'    =>$userPyramidParrain[0]->pyramid_id,
                            'user_id'       =>$iduser->id,
                            'position'      =>$value
                        ]);
                        $messages[]= 'UserPyramid created Successfully!!!';
                        break;
                    }
                    unset($checkUserPyramidPosition);
                }
            }
        }
        return response()->json([
            'message' =>$messages,
            'user' => $user
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile_no' => ['required', 'numeric', 'digits_between:7,12'],
            'type_account' => ['string'],
            'parrain' => ['nullable','exists:users,code'],
        ]);
        $this->therequest = array('parrain' => $request->input('parrain'),'id'=>$user->id);
        $validatedData->after(function ($validatedData) {
            $val= $this->checkparrain($this->therequest);
            if ($val) {
                $validatedData->errors()->add(
                    'parrain', 'This code has already sponsored two people!',
                );
            }
        });
        $validatedData = $validatedData->validate();
        $user->fill($validatedData)->save();

        $messages=array();
        if (!empty($user->parrain)) {
            $checkUserPyramid = $this->getUserPyramid($user->code);
            if (!$checkUserPyramid) {
                $messages[] = "checuser";
                $userPyramidParrain = $this->getUserPyramid($user->parrain);
                if ($userPyramidParrain) {
                    $messages[] = "checuserparrain";
                    $favori = $this->givePosition($userPyramidParrain[0]->position);
                    if (!empty($favori)) {
                        $messages[] = "favori";
                        foreach ($favori as $value) {
                            $checkUserPyramidPosition = UserPyramid::where('pyramid_id',$userPyramidParrain[0]->pyramid_id)
                            ->where('position',$value)->first();
                            if ((!$checkUserPyramidPosition)) {
                                $messages[] = "checkUserPyramidPosition";
                                UserPyramid::create([
                                    'pyramid_id'    =>$userPyramidParrain[0]->pyramid_id,
                                    'user_id'       =>$user->id,
                                    'position'      =>$value
                                ]);
                                break;
                            }
                            unset($checkUserPyramidPosition);
                        }
                    }
                }
            }
        }
        $messages[] = "User 41 Updated Successfully!!!";
        return response()->json([
            'message' => $messages,
            'user' => $user
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'User Deleted Successfully!!!'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */
    protected function createUser(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'mobile_no' => $data['mobile_no'],
            'code' => User::generateUniqueCode($data['name']),
            'password' => Hash::make($data['password']),
            'type_account' => $data['type_account'],
            'parrain' => $data['parrain'],
        ]);
    }
}
