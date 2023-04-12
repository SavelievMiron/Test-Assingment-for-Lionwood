<?php


namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTDecodedEvent;

class JWTDecodedListener
{
    /**
     * @param JWTDecodedEvent $event
     *
     * @return void
     */
    public function onJWTDecoded(JWTDecodedEvent $event)
    {
        $payload = $event->getPayload();

        $created_at = new \DateTime('@' . $payload['iat']);
        $expires_at = new \DateTime('@' . $payload['exp']);

        if ($expires_at < $created_at) {
            $event->markAsInvalid();
        }
    }
}