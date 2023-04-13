<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pyramid;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Event\NewMessageChat;

class ChatMessageController extends Controller
{
    public function messages(int $pyramid_id){
        return ChatMessage::where("pyramid_id",$pyramid_id)->where("statut",null)
                            ->with("user")->orderBy("created_at","DESC")->get();
    }


    public function store(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'message' => ['required', 'string'],
            'pyramid_id' => ['required', 'numeric'],
            // 'statut' => ['nullable','string'],
            'type_message' => ['nullable','string'],
            'image'        => ['nullable', 'image','mimes:jpeg,png,jpg,gif'],
        ]);
        $validatedData = $validatedData->validate();
        $validatedData['user_id'] = Auth::id();
        if ( array_key_exists('type_message',$validatedData) && $validatedData['type_message'] == 'img')
        {
            $fileName = time().'.'.$request->image->getClientOriginalExtension();
            $request->image->storeAs("chat_".strval( $validatedData['pyramid_id']), $fileName);
            $validatedData['message'] = $fileName;
        }
        $ChatMessage = ChatMessage::create($validatedData);
        // broadcast(new NewMessageChat($ChatMessage))->toOthers();
        return response()->json([
            'message' => 'Message Created Successfully!!!',
            'ChatMessage' => $ChatMessage
        ]);
    }
}
