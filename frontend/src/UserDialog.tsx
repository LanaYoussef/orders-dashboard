import { useEffect, useRef } from "react";
import type { UserForm } from "./types";

type Props = {
  open: boolean;
  form: UserForm;
  error: string;
  onChange: (field: keyof UserForm, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function UserDialog({
  open,
  form,
  error,
  onChange,
  onClose,
  onSubmit,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="myDialog">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="addform">
          <div className="formrow">
            <label htmlFor="firstname">First name</label>
            <span className="req">*</span>
            <input
              id="firstname"
              type="text"
              required
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </div>
          <div className="formrow">
            <label htmlFor="lastname">Last name (optional)</label>
            <input
              id="lastname"
              type="text"
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </div>
          <div className="formrow">
            <label htmlFor="gender">Gender</label>
            <span className="req">*</span>
            <select
              id="gender"
              required
              value={form.gender}
              onChange={(e) => onChange("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="formrow">
            <label htmlFor="email">Email</label>
            <span className="req">*</span>
            <input
              id="email"
              type="text"
              required
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>
          <div className="formrow">
            <label htmlFor="phonenumber">Phone Number</label>
            <span className="req">*</span>
            <input
              id="phonenumber"
              type="tel"
              required
              value={form.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
            />
          </div>
          <div className="formrow">
            <label htmlFor="dob">Date Of Birth</label>
            <span className="req">*</span>
            <input
              id="dob"
              type="date"
              required
              value={form.dob}
              onChange={(e) => onChange("dob", e.target.value)}
            />
          </div>
          <p className="errormsg">{error}</p>
          <div className="btns2">
            <button type="submit" className="btn btn-success">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
