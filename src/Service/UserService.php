<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ObjectRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService {

    private EntityManagerInterface $entityManager;

    private ObjectRepository $userRepository;

    private UserPasswordHasherInterface $passwordHasher;

    /**
     * @param EntityManagerInterface $entityManager
     * @param UserPasswordHasherInterface $passwordHasher
     */
    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->userRepository = $this->entityManager->getRepository(User::class);
        $this->passwordHasher = $passwordHasher;
    }

    /**
     * @param string $email
     * @return bool
     */
    public function userExists(string $email): bool
    {
        return !!$this->userRepository->findOneBy(['email' => $email]);
    }

    /**
     * @param string $firstName
     * @param string $lastName
     * @param string $username
     * @param string $email
     * @param string $password
     *
     * @return User
     */
    public function createUser(string $firstName, string $lastName, string $username, string $email, string $password): User
    {
        $user = new User();

        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword($this->passwordHasher->hashPassword(
            $user,
            $password
        ));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }
}