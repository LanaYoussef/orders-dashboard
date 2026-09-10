import StatusBar from "./StatusBar";
import { useEffect, useMemo, useState } from "react";
import { deleteUser, getUsers } from "./api";
import type { User } from "./types";
import UserTable from "./UserTable";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  async function loadUsers() {
    setUsers(await getUsers());
  }
  useEffect(() => {
    loadUsers();
  }, []);
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(q) ||
        user.lastName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q),
    );
    if (ageFilter === "kid") {
      list = list.filter((user) => user.age >= 6 && user.age <= 12);
    }
    if (ageFilter === "teen") {
      list = list.filter((user) => user.age >= 13 && user.age <= 17);
    }
    if (ageFilter === "adult") {
      list = list.filter((user) => user.age >= 18 && user.age <= 59);
    }
    if (ageFilter === "senior") {
      list = list.filter((user) => user.age >= 60);
    }
    if (genderFilter !== "all") {
      list = list.filter((user) => user.gender === genderFilter);
    }
    return list;
  }, [users, search, ageFilter, genderFilter]);

  async function handleDelete(id: number) {
    if (!confirm("are you sure?")) return;
    await deleteUser(id);
    await loadUsers();
  }

  return (
    <>
      <header className="header">
        <h1>User Management</h1>
      </header>

      <StatusBar onAdd={() => {}} />

      <UserTable
        users={filtered}
        search={search}
        ageFilter={ageFilter}
        genderFilter={genderFilter}
        onSearch={setSearch}
        onAgeFilter={setAgeFilter}
        onGenderFilter={setGenderFilter}
        onEdit={() => {}}
        onDelete={handleDelete}
      />
    </>
  );
}
