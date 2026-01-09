import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const categories = [
  { label: "Autism", value: "autism-adhd" },
  { label: "Teenage", value: "teenage" },
  { label: "Adults", value: "adults" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("/admin/course-status/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggle = async (userId, categoryValue, checked) => {
    await axios.post("/admin/course-status/admin/toggle", {
      userId,
      categoryValue,
      active: checked,
    });

    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId
          ? {
              ...u,
              courses: {
                ...u.courses,
                [categoryValue]: checked,
              },
            }
          : u
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin – Course Access</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-50">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            {categories.map((c) => (
              <th key={c.value}>{c.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t text-center">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>

              {categories.map((c) => (
                <td key={c.value}>
                  <input
                    type="checkbox"
                    checked={u.courses[c.value]}
                    onChange={(e) =>
                      toggle(u._id, c.value, e.target.checked)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
