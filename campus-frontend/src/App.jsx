import { useState } from "react";
import axios from "axios";
import SkillList from "./SkillList";

function App() {
  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  function handleAddSkill() {
    if (!skillName || !description || !level || !category || category === "All") {
      alert("Please fill all fields and choose a valid category.");
      return;
    }

    const newSkill = {
      name: skillName,
      description,
      level,
      category,
    };

    const url = editingSkill
      ? `http://localhost:8080/api/skills/${editingSkill.id}`
      : "http://localhost:8080/api/skills";

    const method = editingSkill ? "put" : "post";

    axios[method](url, newSkill)
      .then(() => {
        setSkillName("");
        setDescription("");
        setLevel("Beginner");
        setCategory("");
        setEditingSkill(null);
        setRefreshFlag(!refreshFlag);
      })
      .catch((error) => console.error("Error saving skill:", error));
  }

  function handleEdit(skill) {
    setSkillName(skill.name);
    setDescription(skill.description);
    setLevel(skill.level);
    setCategory(skill.category);
    setEditingSkill(skill);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>Campus Skill Share</h1>

      {/* ✅ Add Skill Form */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#f5f5f5",
        }}
      >
        <h3>{editingSkill ? "Edit Skill" : "Add Skill"}</h3>

        <input
          type="text"
          placeholder="Skill Name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "200px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "250px" }}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "150px" }}
        />

        <button
          onClick={handleAddSkill}
          style={{
            padding: "8px 12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {editingSkill ? "Update Skill" : "Add Skill"}
        </button>
      </div>

      {/* ✅ Saved Skills List */}
      <SkillList onEdit={handleEdit} refresh={refreshFlag} />
    </div>
  );
}

export default App;
