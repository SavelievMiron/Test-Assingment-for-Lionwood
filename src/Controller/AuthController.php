<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{
    #[Route('/login', name: 'app_login', methods: ['GET'])]
    public function login(): Response
    {
        if ($this->isAuthenticated()) {
            return $this->redirectToRoute('app_dashboard');
        }

        return $this->render('auth/login.html.twig', [
            'controller_name' => 'LoginController',
        ]);
    }

    #[Route('/register', name: 'app_register', methods: ['GET'])]
    public function register(): Response
    {
        if ($this->isAuthenticated()) {
            return $this->redirectToRoute('app_dashboard');
        }

        return $this->render('auth/register.html.twig', [
            'controller_name' => 'RegistrationController',
        ]);
    }

    #[Route('/logout', name: 'app_logout', methods: ['GET'])]
    public function logout(Request $request): RedirectResponse
    {
        $response = $this->redirectToRoute('app_index');

        $response->headers->clearCookie('__APP-JWT');

        return $response;
    }

    /* ------ HELPERS ------ */
    private function isAuthenticated()
    {
        $securityContext = $this->container->get('security.authorization_checker');

        return $securityContext->isGranted('IS_AUTHENTICATED_FULLY');
    }
}
