<?php
class UserRepository{
    private $store;
    public function __construct()
    {
        $this->store = new \SleekDB\Store(
            'users',
            __DIR__ . '/../data',
            ['timeout' => false]
        );
    }


    public function get(){
        $users = $this->store->findAll();
        $result = [];
        foreach ($users as $user) {
            $result[] = $this->withId($user);
        }
        return $result;
    }

    public function find($id){
        $user = $this->store->findById($id);
        if (empty($user)) {
            return null;
        }
        return $this->withId($user);
    }

    public function create($data){
        return $this->withId($this->store->insert($data));
    }

    public function update($id, $data){
        $updated = $this->store->updateById($id, $data);
        if (!$updated) {
            return null;
        }
        return $this->withId($updated);
    }

    public function delete($id){
       return (bool) $this->store->deleteById($id);
    }

    private function withId($user)
    {
        if (isset($user['_id']) && !isset($user['id'])) {
            $user['id'] = $user['_id'];
        }
        return $user;
    }


}