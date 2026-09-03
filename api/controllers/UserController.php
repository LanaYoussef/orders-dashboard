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
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON body']);
            return;
        }

        $error = $this->validate($data);
        if ($error) {
            http_response_code(400);
            echo json_encode(['error' => $error]);
            return;
        }
        $data['age'] = $this->calculateAge($data['dob']);
        $user = $this->repo->create($data);
        http_response_code(201);
        echo json_encode($user);
    }
    public function update($id){
        header('Content-Type: application/json');

        $data = json_decode(file_get_contents('php://input'), true);
        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON body']);
            return;
        }
        $error = $this->validate($data);
        if ($error) {
            http_response_code(400);
            echo json_encode(['error' => $error]);
            return;
        }
        $data['age'] = $this->calculateAge($data['dob']);
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

    private function validate(array $data): ?string{
        if(empty($data['firstName']) || empty($data['email']) || empty($data['phoneNumber'])  || empty($data['dob']) || empty($data['gender'])){
            return 'Missing fields';
        }
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
            return 'Invalid email';
        }
        if(!preg_match('/^\d{8}$/', $data['phoneNumber'])){
            return 'Invalid phone number';
        }
        $dob = \DateTime::createFromFormat('Y-m-d', $data['dob']);
        if (!$dob || $dob->format('Y-m-d') !== $data['dob']) {
            return 'Invalid date of birth';
        }
        if ($dob > new \DateTime('today') || $this->calculateAge($data['dob']) < 6) {
            return 'Invalid date of birth';
        }
        return null;
    }

    private function calculateAge(string $dob): int{
        $birth = new \DateTime($dob);
        $today = new \DateTime('today');
        return(int)$birth->diff($today)->y;
    }

}