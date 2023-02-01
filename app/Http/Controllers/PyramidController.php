<?php

namespace App\Http\Controllers;

use App\Models\Pyramid;
use App\Models\UserPyramid;
use Illuminate\Http\Request;

class PyramidController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $pyramids = Pyramid::all(['id','user_id','category_id','expire_at']);
        $pyramids = Pyramid::with(['user','category'])
        ->where('expire_at','=',null)
        ->orderBy('id', 'desc')
        ->get();
        return response()->json($pyramids);
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
            'user_id' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric'],
        ]);
        $pyramid = Pyramid::create($validatedData);
        UserPyramid::create(array('pyramid_id'=>$pyramid->id,
                                  'user_id'=>$pyramid->user_id,
                                  'position'=>1 ));
        return response()->json([
            'message' => 'Pyramid Created Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pyramid  $pyramid
     * @return \Illuminate\Http\Response
     */
    public function show(Pyramid $pyramid)
    {
        return response()->json($pyramid);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pyramid  $pyramid
     * @return \Illuminate\Http\Response
     */
    public function edit(Pyramid $pyramid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pyramid  $pyramid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pyramid $pyramid)
    {
        $validatedData = $request->validate([
            'user_id' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric'],
        ]);
        $pyramid->fill($validatedData)->save();

        return response()->json([
            'message' => 'Pyramid Updated Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pyramid  $pyramid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pyramid $pyramid)
    {
        $pyramid->delete();
        return response()->json([
            'message' => 'Pyramid Deleted Successfully!!!'
        ]);
    }
        /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function endpyramid(int $id)
    {
        $pyramid= Pyramid::where('id',$id)
                ->update(['expire_at'=> \Carbon\Carbon::now()]);
        UserPyramidController::subdivise($id);
        return response()->json([
            'message' => 'Pyramid Updated Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }
}
