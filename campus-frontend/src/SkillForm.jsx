import { useState, useEffect } from "react";
import axios from "axios";

function SkillForm({ editingSkill, onUpdate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  // ✅ When editingSkill changes, fill the form automatically
  useEffect(() => {
    if (editingSkill) {
      setName(editingSkill.name);
      setDescription(editingSkill.description);
      setLevel(editingSkill.level);
      setCategory(editingSkill.category);
    }
  }, [editingSkill]);

  function handleSubmit(e) {
    e.preventDefault();

    const skillData = {
      name,
      description,
      level,
      category
    };

    // ✅ UPDATE existing skill
    if (editingSkill) {
      axios
        .put(`http://localhost:8080/api/skills/${editingSkill.id}`, skillData)
        .then(() => {
          alert("Skill updated!");
          onUpdate(); // clear editing mode
        })
        .catch((err) => console.error(err));
    }
    // ✅ ADD new skill
    else {
      axios
        .post("http://localhost:8080/api/skills", skillData)
        .then(() => {
          alert("Skill added successfully!");
        })
        .catch((err) => console.error(err));
    }

    // ✅ Clear form after submit
    setName("");
    setDescription("");
    setLevel("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingSkill ? "Edit Skill" : "Add Skill"}</h2>

      <input
        type="text"
        placeholder="Skill Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Level (Beginner/Intermediate)"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button type="submit">
        {editingSkill ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
}

export default SkillForm;
