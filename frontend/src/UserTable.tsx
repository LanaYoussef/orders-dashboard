import type { User } from "./types";

type Props = {
  users: User[];
  search: string;
  ageFilter: string;
  genderFilter: string;

  onSearch: (value: string) => void;
  onAgeFilter: (value: string) => void;
  onGenderFilter: (value: string) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};
export default function UserTable({
  users,
  search,
  ageFilter,
  genderFilter,
  onSearch,
  onAgeFilter,
  onGenderFilter,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="search..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        className="form-select"
        value={ageFilter}
        onChange={(e) => onAgeFilter(e.target.value)}
      >
        <option value="all">All ages</option>
        <option value="kid">Kid</option>
        <option value="teen">Teen</option>
        <option value="adult">Adult</option>
        <option value="senior">Almost Dead</option>
      </select>
      <select
        className="form-select"
        value={genderFilter}
        onChange={(e) => onGenderFilter(e.target.value)}
      >
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
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dob}</td>
              <td>{user.age}</td>
              <td>
                <div className="btns">
                  <button
                    type="button"
                    className="dltbtn"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="editbtn"
                    onClick={() => onEdit(user.id)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
