<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserPyramid;
use App\Models\Pyramid;
use Illuminate\Support\Facades\Auth;
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
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])->get();
        $tmp=array();
        foreach ($UserPyramids as $key => $UserPyramid) {
            // $tmp[$UserPyramid->pyramid_id][]=$UserPyramid;
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
            'category_id'   => ['required', 'numeric'],
            'user_id'       => ['required', 'numeric'],
            'position'      => ['required', 'numeric'],
        ]);
        $UserPyramid = UserPyramid::create($validatedData);
        return response()->json([
            'message' => 'UserPyramid Created Successfully!!!',
            'UserPyramid' => $UserPyramid
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function show(UserPyramid $UserPyramid)
    {
        $UserPyramids = UserPyramid::with(['user','pyramid'=>['category']])
                                    ->orderBy('created_at', 'desc')
                                    ->firstwhere('user_id',Auth::id())
                                    ->get();
        $tmp=array();
        foreach ($UserPyramids as $key => $UserPyramid) {
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
        return response()->json($tmp);
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
     * @param  \App\Models\UserPyramid  $UserPyramid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserPyramid $UserPyramid)
    {
        $validatedData = $request->validate([
            'category_id'   => ['required', 'numeric'],
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

}
