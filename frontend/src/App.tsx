import StatusBar from "./StatusBar";

export default function App() {
  return (
    <>
      <header className="header">
        <h1>User Management</h1>
      </header>

      <StatusBar onAdd={() => {}} />
      <input type="text" className="form-control" placeholder="search..." />
      <select className="form-select" defaultValue="all">
        <option value="all">All ages</option>
        <option value="kid">Kid</option>
        <option value="teen">Teen</option>
        <option value="adult">Adult</option>
        <option value="almost-dead">Almost Dead</option>
      </select>
      <select className="form-select" defaultValue="all">
        <option value="all">All genders</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
      </select>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Date of birth</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </>
  );
}
