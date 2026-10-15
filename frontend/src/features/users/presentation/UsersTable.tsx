import type { User } from "../domain/User";

type Props = {
  users: User[];
};

export default function UserTable({ users }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Orders</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              {user.firstName} {user.lastName}
            </td>
            <td>{user.email}</td>
            <td>{user.orderCount ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
