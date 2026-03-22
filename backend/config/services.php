<?php
return [
 'stripe' => ['secret' => env('STRIPE_SECRET'), 'webhook_secret' => env('STRIPE_WEBHOOK_SECRET')],
 'google' => ['client_id' => env('GOOGLE_CLIENT_ID'), 'client_secret' => env('GOOGLE_CLIENT_SECRET'), 'redirect' => env('GOOGLE_REDIRECT_URI')],
 'printfold' => ['hd_price' => env('HD_EXPORT_PRICE', 9.99)],
];
