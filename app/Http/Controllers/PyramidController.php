<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Pyramid;
use App\Models\UserPyramid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        // ->where('expire_at','=',null)
        ->orderBy('id', 'desc')
        ->get();
        return response()->json($pyramids);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'user_id' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric'],
        ]);
        $validatedData->after(function ($validatedData) use ($request) {
            $category = Category::where('id',$request->category_id)->first();
            if(intval($category->category_max)<1)
                $category->category_max=1;
            $pyramids = Pyramid::where('category_id',$category->id)->where('statut',null)->get('id');
            if ( $pyramids->count()>0) {
                $userpyramids = UserPyramid::distinct()->where('user_id',$request->user_id)
                                            ->whereIn('pyramid_id',$pyramids)->get('position');
                if ( $userpyramids->count() > $category->category_max) {
                    $validatedData->errors()->add(
                        'pyramid', 'This user cannot exceed '.$category->category_max.' circles in '.$category->name.'!',
                    );
                }
            }
        });
        $validatedData = $validatedData->validate();

        $pyramid = Pyramid::createPyramid($validatedData);
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pyramid  $pyramid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pyramid $pyramid)
    {
        $validatedData = Validator::make($request->all(), [
            'user_id' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric'],
            'pyramid_name_account' => ['nullable','string'],
            'pyramid_number_account' => ['nullable','string'],
            'statut' => ['nullable','string'],
        ]);
        $validatedData->after(function ($validatedData) use ($request,$pyramid) {
            $category = Category::where('id',$request->category_id)->first();
            if(intval($category->category_max)<1)
                $category->category_max=1;
            $pyramids = Pyramid::where('category_id',$category->id)->where('statut',null)->get('id');
            if ( $pyramids->count()>0) {
                $userpyramids = UserPyramid::distinct()->where('user_id',$request->user_id)
                                            ->where('pyramid_id','<>',$pyramid->id)
                                            ->whereIn('pyramid_id',$pyramids)->get('position');
                if ( $userpyramids->count()>$category->category_max) {
                    $validatedData->errors()->add(
                        'pyramid', 'This user cannot exceed '.$category->category_max.' circles in '.$category->name.'!',
                    );
                }
            }
        });
        $validatedData = $validatedData->validate();
        $pyramid->fill($validatedData)->save();
        $userpyramid= UserPyramid::where([["position","=",1],["pyramid_id","=",$pyramid->id]])->first();
        $userpyramid->user_id = $pyramid->user_id;
        $userpyramid->save();
        return response()->json([
            'message' => 'Pyramid Updated Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }
    public function updatepyramid(Request $request, int $id)
    {
        $validatedData = Validator::make($request->all(), [
            'user_id' => ['required', 'numeric'],
            'category_id' => ['required', 'numeric'],
            'pyramid_name_account' => ['nullable','string'],
            'pyramid_number_account' => ['nullable','string'],
            'statut' => ['nullable','string'],
        ]);
        $validatedData = $validatedData->validate();
        $pyramid= Pyramid::where("id",$id)->first();
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
                ->update([  'expire_at' => \Carbon\Carbon::now()]);
        UserPyramidController::subdivise($id);
        return response()->json([
            'message' => 'Pyramid Updated Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }
        /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function confirmpayment(int $id)
    {
        $pyramid= Pyramid::where('id',$id)
                ->update(['payment_verified_at'   => \Carbon\Carbon::now()]);
        return response()->json([
            'message' => 'Pyramid Updated Successfully!!!',
            'pyramid' => $pyramid
        ]);
    }
        /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function nextpyramid(int $id)
    {
        $pyramid= Pyramid::where('id',$id)->first();
        $next_category = $this->checknextcategory($pyramid->category_id);
        $category = $next_category;
        if(intval($category->category_max)<1)
            $category->category_max=1;
        $pyramids = Pyramid::where('category_id',$category->id)->where('statut',null)->get('id');
        if ( $pyramids->count()>0) {
            $userpyramids = UserPyramid::distinct()->where('user_id',$pyramid->user_id)
                                        ->whereIn('pyramid_id',$pyramids)->get('position');
            if ( $userpyramids->count()>$category->category_max) {
                return response()->json([
                    'message' => 'You cannot exceed '.$category->category_max.' circles in '.$category->name.'!',
                    'pyramid' => $pyramid
                ]);
            }
        }
        if(!empty($next_category) && $next_category->id!=$pyramid->id){
            $pyramids_in_category = Pyramid::where('category_id',$next_category->id)->get();
            if (!empty($pyramids_in_category)) {
                $verificator=false;
                foreach ($pyramids_in_category as $key => $pyramid_in_category) {
                    $userpyramids_in_pyramid = UserPyramid::where('pyramid_id',$pyramid_in_category->id)->get();
                    if(!empty($userpyramids_in_pyramid) && count($userpyramids_in_pyramid)<15){
                        $tmp=array();
                        foreach ($userpyramids_in_pyramid as $key => $userpyramid_in_pyramid) {
                            $tmp[$userpyramid_in_pyramid->position]=$userpyramid_in_pyramid;
                        }
                        for ($i=1; $i < 16; $i++) {
                            if (!array_key_exists($i,$tmp)) {
                                $verificator=true;
                                UserPyramid::create( ['pyramid_id'=>$pyramid_in_category->id,'user_id'=>$pyramid->user_id,'position'=>$i ] );
                                break;
                            }
                        }
                        break;
                    }
                }
                $pyramid->fill(['statut'=>'a'])->save();
                if(!($verificator) ){
                    $pyramid =Pyramid::createPyramid(['category_id'=>$next_category->id,'user_id'=>$pyramid->user_id]);
                    UserPyramid::create( ['pyramid_id'=>$pyramid->id,'user_id'=>$pyramid->user_id,'position'=>1 ] );
                }
            }else {
                $pyramid->fill(['statut'=>'a'])->save();
                $pyramid =Pyramid::createPyramid(['category_id'=>$next_category->id,'user_id'=>$pyramid->user_id]);
                UserPyramid::create( ['pyramid_id'=>$pyramid->id,'user_id'=>$pyramid->user_id,'position'=>1 ] );
            }
            $msg= 'Welcome to '.$next_category->name;
        }else{
            $msg='No next level';
        }

        return response()->json([
            'message' => $msg,
            'pyramid' => $pyramid
        ]);
    }
    public function checknextcategory(int $id){
            $categories = Category::orderBy('valeur','desc')->get();
            $previous_key=$id;
            foreach ($categories as $key => $category) {
                if ($category->id==$id) {
                    break;
                }
                $previous_key=$category->id;
            }
            return Category::where('id',$previous_key)->first();
    }
}
