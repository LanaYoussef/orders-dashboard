<?php


require_once __DIR__ . '/UserRepository.php';
require_once __DIR__ . '/../db.php';

class PostgresUserRepository implements UserRepository{
    private PDO  $pdo;

    public function __construct(?PDO $pdo = null){
        $this->pdo = $pdo ?? getPdo();
    }

    public function findAll(){
        $stmt = $this->pdo->query('SELECT * FROM users ORDER BY id');
        $users = [];
        foreach ($stmt->fetchAll() as $row) {
            $users[] = $this->toApi($row);
        }
        return $users;
    }

    public function find($id){
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if(!$row) {
            return null;
        }
        return $this->toApi($row);

    }

    public function create($data){
        $stmt = $this->pdo->prepare(
            'INSERT INTO users (first_name, last_name, email, phone_number, dob, age, gender)
             VALUES (:first_name, :last_name, :email, :phone_number, :dob, :age, :gender)
             RETURNING *'
        );
        $stmt->execute([
            'first_name' => $data['firstName'],
            'last_name' => $data['lastName'],
            'email' => $data['email'],
            'phone_number' => $data['phoneNumber'],
            'dob' => $data['dob'],
            'age' => $data['age'],
            'gender' => $data['gender'],
    
        ]);
        return $this->toApi($stmt->fetch());
    }

    public function update($id,$data){
        $stmt = $this->pdo->prepare(
        'UPDATE users
            SET first_name = :first_name,
                last_name = :last_name,
                email = :email,
                phone_number = :phone_number,
                dob = :dob,
                age = :age,
                gender = :gender
            WHERE id = :id
            RETURNING *'
        );
        $stmt->execute([
            'id'           => $id,
            'first_name'   => $data['firstName'],
            'last_name'    => $data['lastName'] ?? '',
            'email'        => $data['email'],
            'phone_number' => $data['phoneNumber'],
            'dob'          => $data['dob'],
            'age'          => $data['age'],
            'gender'       => $data['gender'],
        ]);
        $row = $stmt->fetch();
        if(!$row){
            return null;
        }
        return $this->toApi($row);
    }
    public function delete($id){
        $stmt = $this->pdo->prepare('DELETE FROM users WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }
    private function toApi(array $row)
    {
        return [
            'id'          => (int) $row['id'],
            'firstName'   => $row['first_name'],
            'lastName'    => $row['last_name'],
            'email'       => $row['email'],
            'phoneNumber' => $row['phone_number'],
            'dob'         => $row['dob'],
            'age'         => (int) $row['age'],
            'gender'      => $row['gender'],
        ];
    }

}