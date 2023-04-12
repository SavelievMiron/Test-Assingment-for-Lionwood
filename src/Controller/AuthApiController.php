<?php

namespace App\Controller;

use App\Service\UserService;
use App\Validator\AuthValidator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api_")
 */
class AuthApiController extends AbstractController
{
    /**
     * @var UserService
     */
    private UserService $userService;

    /***
     * @var AuthValidator $authValidator
     */
    private AuthValidator $authValidator;


    public function __construct(AuthValidator $authValidator, UserService $userService)
    {
        $this->authValidator = $authValidator;
        $this->userService = $userService;
    }

    #[Route('/register', name: 'app_register_api', methods: ['POST'])]
    public function register(Request $request): Response
    {
        $params = json_decode($request->getContent(), true);

        $errors = $this->authValidator->validate($params);

        if ($errors !== null) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }

            return new JsonResponse(
                [
                    'errors' => $errorMessages
                ], 400
            );
        }

        if ($this->userService->userExists($params['email'])) {
            return $this->json(
                [
                    'errors' => [
                        'email' => "The email '{$params['email']}' is already in use."
                    ]
                ],
                Response::HTTP_UNAUTHORIZED
            );
        }

        $this->userService->createUser($params['first_name'], $params['last_name'], $params['username'], $params['email'], $params['password']);

        return $this->json(
            [
                'message' => 'A user has been successfully created.'
            ], 201
        );
    }
}
