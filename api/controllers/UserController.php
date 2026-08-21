<?php 

require_once __DIR__ . '/../repositories/UserRepositoryFactory.php';

class UserController{

    private UserRepository $repo;

    public function __construct(){
        $this->repo = UserRepositoryFactory::make();
    }

    public function index(){
        header('Content-Type: application/json');

        echo json_encode($this->repo->findAll());
    }
    public function show($id){
        header('Content-Type: application/json');

        $user = $this->repo->find($id);
        if( $user == null){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        echo json_encode($user);
    }
    public function store(){
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);

        $user = $this->repo->create($data);
        http_response_code(201);
        echo json_encode($user);
    }
    public function update($id){
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);

        $user = $this->repo->update($id, $data);
        if( $user == null){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
            }
        echo json_encode($user);
            
    }
    public function destroy($id){
        header('Content-Type: application/json');

        if(!$this->repo->delete($id)){
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        echo json_encode(['ok' => true]);
    }

}