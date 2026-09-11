import StatusBar from "./StatusBar";
import { useEffect, useMemo, useState } from "react";
import { deleteUser, getUsers, getUser, saveUser } from "./api";
import UserTable from "./UserTable";
import { emptyForm } from "./types";
import type { User, UserForm } from "./types";
import UserDialog from "./UserDialog";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [error, setError] = useState("");

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

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(true);
  }
  function closeDialog() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setDialogOpen(false);
  }
  async function openEdit(id: number) {
    const user = await getUser(id);
    if (!user || "error" in user) return;
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dob: user.dob,
      gender: user.gender,
    });
    setEditingId(id);
    setError("");
    setDialogOpen(true);
  }

  async function handleSubmit() {
    setError("");
    const payload: UserForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      dob: form.dob,
      gender: form.gender,
    };
    const result = await saveUser(payload, editingId);
    if (!result.ok) {
      setError(result.error ?? "Request failed");
      return;
    }
    closeDialog();
    await loadUsers();
  }

  return (
    <>
      <header className="header">
        <h1>User Management</h1>
      </header>

      <StatusBar onAdd={openAdd} />

      <UserDialog
        open={dialogOpen}
        form={form}
        error={error}
        onChange={(field, value) =>
          setForm((prev) => ({ ...prev, [field]: value }))
        }
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />

      <UserTable
        users={filtered}
        search={search}
        ageFilter={ageFilter}
        genderFilter={genderFilter}
        onSearch={setSearch}
        onAgeFilter={setAgeFilter}
        onGenderFilter={setGenderFilter}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
