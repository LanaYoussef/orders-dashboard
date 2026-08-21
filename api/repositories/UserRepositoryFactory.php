<?php
require_once __DIR__ . '/UserRepository.php';
require_once __DIR__ . '/JsonUserRepository.php';
require_once __DIR__ . '/PostgresUserRepository.php';

class UserRepositoryFactory{

    public static function make(): UserRepository{
        $driver = getenv('STORAGE_DRIVER')?:'json';

        if($driver === 'postgres'){
            return new PostgresUserRepository();

        }

        return new JsonUserRepository();
    }
}