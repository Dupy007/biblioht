<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserPyramid;
use App\Models\Pyramid;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserPyramidController extends Controller
{
    //
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])->orderBy('pyramid_id', 'desc')->get();
        $tmp=array();
        foreach ($UserPyramids as $key => $UserPyramid) {
            $tmp[$UserPyramid->pyramid_id][$UserPyramid->id]=array(
                                                                    "pyramid_user_id"=>$UserPyramid->id,
                                                                    "pyramid_id"=>$UserPyramid->pyramid_id,
                                                                    "created_at"=>$UserPyramid->created_at,
                                                                    "position"=>$UserPyramid->position,
                                                                    "user_id"=>$UserPyramid->user_id,
                                                                    "user_code"=>$UserPyramid->user->code,
                                                                    "user_name"=>$UserPyramid->user->name,
                                                                    "user_mobile_no"=>$UserPyramid->user->mobile_no,
                                                                    "category_name"=>$UserPyramid->pyramid->category->name,
                                                                );
        }
        return response()->json($tmp);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'pyramid_id'   =>   ['required', 'numeric'],
            'user_id'       =>  ['required', 'numeric'],
            'position'      =>  ['required', 'numeric'],
        ]);
        $UserPyramid = UserPyramid::updateOrCreate(
            ['pyramid_id' => $request->pyramid_id, 'user_id' => $request->user_id ],
            ['position' => $request->position]
        );
        return response()->json([
            'message' => 'UserPyramid Created Successfully!!!',
            'UserPyramid' => $UserPyramid
        ]);
    }

    /**
     * Display the specified resource.
     *
    //  * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function show( $UserPyramid)
    {
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])
                                    ->where('pyramid_id',intval($UserPyramid))
                                    ->get();
        $tmp=array();
        $complete=false; $end=false;
        foreach ($UserPyramids as $key => $UserPyramid) {
            if ($this->checkend($UserPyramid->pyramid_id)) {
                $complete=true;
            }
            if (!empty($UserPyramid->pyramid->expire_at)) {
                $end=true;
            }
            $tmp[$UserPyramid->position]=array(
                                                                    "pyramid_user_id"   =>$UserPyramid->id,
                                                                    "pyramid_id"        =>$UserPyramid->pyramid_id,
                                                                    "position"          =>$UserPyramid->position,
                                                                    "user_id"           =>$UserPyramid->user_id,
                                                                );

        }
        return response()->json(['userpyramid'=>$tmp , 'iscomplete'=>$complete ,'isend' => $end]);
    }
    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mypyramid()
    {
        $PyramidId = UserPyramid::where('user_id',Auth::id())
                                    ->orderBy('created_at', 'desc')
                                    ->first();

        $tmp=array();
        $mine=false;
        $end=false;
        $complete=false;
        if (!empty($PyramidId)) {
            $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])
                                        ->where('pyramid_id',intval($PyramidId->pyramid_id))
                                        ->get();
            foreach ($UserPyramids as $key => $UserPyramid) {
                if (Auth::id()==$UserPyramid->user_id && $UserPyramid->position==1) {
                    $mine=true;
                }
                if (Auth::id()==$UserPyramid->user_id && !empty($UserPyramid->pyramid->expire_at)) {
                    $end=true;
                }
                if (Auth::id()==$UserPyramid->user_id && $this->checkend($UserPyramid->pyramid_id)) {
                    $complete=true;
                }
                $tmp[$UserPyramid->pyramid_id][$UserPyramid->id]=array(
                                                                        "pyramid_user_id"   =>$UserPyramid->id,
                                                                        "pyramid_id"        =>$UserPyramid->pyramid_id,
                                                                        "created_at"        =>$UserPyramid->created_at,
                                                                        "position"          =>$UserPyramid->position,
                                                                        "user_id"           =>$UserPyramid->user_id,
                                                                        "user_code"         =>$UserPyramid->user->code,
                                                                        "user_name"         =>$UserPyramid->user->name,
                                                                        "user_mobile_no"    =>$UserPyramid->user->mobile_no,
                                                                        "category_name"     =>$UserPyramid->pyramid->category->name,
                                                                    );

            }
        }
        return response()->json(['userpyramids' => $tmp,'ismine' => $mine,'isend' => $end,'iscomplete' => $complete]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function edit(UserPyramid $UserPyramid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
    //  * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        $UserPyramid = UserPyramid::find($id);
        $validatedData = $request->validate([
            'pyramid_id'   => ['required', 'numeric'],
            'user_id'       => ['required', 'numeric'],
            'position'      => ['required', 'numeric'],
        ]);
        $UserPyramid->fill($validatedData)->save();
        return response()->json([
            'message' => 'UserPyramid Updated Successfully!!!',
            'UserPyramid' => $UserPyramid
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserPyramid $UserPyramid)
    {
        $UserPyramid->delete();
        return response()->json([
            'message' => 'UserPyramid Deleted Successfully!!!'
        ]);
    }
    private function checkend($idpyramid){
        $val = false;
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])
                                    ->where('pyramid_id',intval($idpyramid))
                                    ->get();
        if (count($UserPyramids)>=15){
            $val=true;
        }
        return $val;
    }
    public static function subdivise(int $pyramid_id){
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])
        ->where('pyramid_id',intval($pyramid_id))
        ->get();
        $tmp=array();
        foreach ($UserPyramids as $key => $UserPyramid) {
            $category_id = $UserPyramid->pyramid->category_id;
            $tmp[$UserPyramid->position]=array(
                                                    "pyramid_user_id"   =>$UserPyramid->id,
                                                    "pyramid_id"        =>$UserPyramid->pyramid_id,
                                                    "position"          =>$UserPyramid->position,
                                                    "user_id"           =>$UserPyramid->user_id,
                                                );
        }

        $pyramid2 = Pyramid::create(['category_id'=>$category_id,'user_id'=>$tmp[2]['user_id']]);
        $pyramid3 = Pyramid::create(['category_id'=>$category_id,'user_id'=>$tmp[3]['user_id']]);

        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[2]['user_id'],'position'=>1 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[4]['user_id'],'position'=>2 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[5]['user_id'],'position'=>3 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[8]['user_id'],'position'=>4 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[9]['user_id'],'position'=>5 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[10]['user_id'],'position'=>6 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid2->id,'user_id'=>$tmp[11]['user_id'],'position'=>7 ] );

        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[3]['user_id'],'position'=>1 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[6]['user_id'],'position'=>2 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[7]['user_id'],'position'=>3 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[12]['user_id'],'position'=>4 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[13]['user_id'],'position'=>5 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[14]['user_id'],'position'=>6 ] );
        UserPyramid::create( ['pyramid_id'=>$pyramid3->id,'user_id'=>$tmp[15]['user_id'],'position'=>7 ] );
    }
}
