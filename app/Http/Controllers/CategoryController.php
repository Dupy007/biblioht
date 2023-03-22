<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->get();
        return response()->json($categories);
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
            'name' => ['required', 'string'],
            'valeur' => ['required', 'numeric'],
            'description' => ['nullable','string'],
            'category_name_account' => ['nullable','string'],
            'category_number_account' => ['nullable','string'],
            'category_max' => ['nullable','numeric'],
        ]);
        $category = Category::create($validatedData);
        return response()->json([
            'message' => 'Category Created Successfully!!!',
            'category' => $category
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'valeur' => ['required', 'numeric'],
            'description' => ['nullable','string'],
            'category_name_account' => ['nullable','string'],
            'category_number_account' => ['nullable','string'],
            'category_max' => ['nullable','numeric'],
        ]);
        $category->fill($validatedData)->save();

        return response()->json([
            'message' => 'Category Updated Successfully!!!',
            'category' => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'Category Deleted Successfully!!!'
        ]);
    }
}
