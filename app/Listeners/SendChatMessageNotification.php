<?php

namespace App\Listeners;

use App\Event\NewMessageChat;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendChatMessageNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Event\NewMessageChat  $event
     * @return void
     */
    public function handle(NewMessageChat $event)
    {
        //
    }
}
