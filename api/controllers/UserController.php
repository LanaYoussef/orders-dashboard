<?php 

require_once __DIR__ . '/../repositories/UserRepository.php';

class UserController{

    public function index(){
        header('Content-Type: application/json');

        $repo = new UserRepository();
        echo json_encode($repo->get());
    }
    public function show($id){
        header('Content-Type: application/json');

        $repo = new UserRepository();
        $user = $repo->find($id);
        if( $user == null){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        echo json_encode($user);
    }
    public function store(){
        header('Content-Type: application/json');

        $repo = new UserRepository();
        $data = json_decode(file_get_contents('php://input'), true);

        $user = $repo->create($data);
        http_response_code(201);
        echo json_encode($user);
    }
    public function update($id){
        header('Content-Type: application/json');

        $repo = new UserRepository();
        $data = json_decode(file_get_contents('php://input'), true);

        $user = $repo->update($id, $data);
        if( $user == null){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
            }
        echo json_encode($user);
            
    }
    public function destroy($id){
        header('Content-Type: application/json');

        $repo = new UserRepository();
        if(!$repo->delete($id)){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        echo json_encode(['ok' => true]);
    }

}