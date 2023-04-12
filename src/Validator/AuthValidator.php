<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AuthValidator
{
    private ValidatorInterface $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validate(array $params)
    {
        $constraints = new Assert\Collection([
            'first_name' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Length([
                    'min' => 2,
                    'max' => 50,
                    'minMessage' => 'Your first name must be at least {{ limit }} characters long',
                    'maxMessage' => 'Your first name cannot be longer than {{ limit }} characters',
                ])
            ],
            'last_name' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Length([
                    'min' => 2,
                    'max' => 50,
                    'minMessage' => 'Your last name must be at least {{ limit }} characters long',
                    'maxMessage' => 'Your last name cannot be longer than {{ limit }} characters',
                ])
            ],
            'username' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Length([
                    'min' => 2,
                    'max' => 50,
                    'minMessage' => 'Your username must be at least {{ limit }} characters long',
                    'maxMessage' => 'Your username cannot be longer than {{ limit }} characters',
                ])
            ],
            'email' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Email()
            ],
            'password' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\Length([
                    'min' => 8,
                    'max' => 32,
                    'minMessage' => 'Your password must be at least {{ limit }} characters long',
                    'maxMessage' => 'Your password cannot be longer than {{ limit }} characters',
                ]),
            ],
            'password_confirmation' => [
                new Assert\NotBlank(),
                new Assert\Type('string'),
                new Assert\EqualTo(['value' => $params['password'], 'message' => 'Password and password confirmation do not match'])
            ]
        ]);

        $errors = $this->validator->validate($params, $constraints);

        return $errors->count() >= 1 ? $errors : null;
    }
}
