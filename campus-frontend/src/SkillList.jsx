import { useState, useEffect } from "react";
import axios from "axios";

function SkillList({ onEdit, refresh }) {
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/skills?page=${page}&size=5`)
      .then(res => {
        setSkills(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error("Error fetching skills:", err));
  }, [page, refresh]);

  const filteredSkills = skills.filter(skill => {
    return (
      skill.name.toLowerCase().includes(search.toLowerCase()) &&
      (levelFilter === "" || skill.level.toLowerCase() === levelFilter.toLowerCase()) &&
      (categoryFilter === "" || skill.category.toLowerCase() === categoryFilter.toLowerCase())
    );
  });

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/api/skills/${id}`)
      .then(() => {
        setSkills(skills.filter(skill => skill.id !== id));
      })
      .catch(err => console.error("Error deleting skill:", err));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Saved Skills</h2>

      {/* Search and filters */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>Clear</button>

        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="basic">Basic</option>
          <option value="melody">Melody</option>
          <option value="classical">Classical</option>
          <option value="carnatic">Carnatic</option>
        </select>
      </div>

      {/* Skill list */}
      <ul>
        {filteredSkills.map(skill => (
          <li key={skill.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
            <strong>{skill.name}</strong> - {skill.description} <br />
            Level: {skill.level} | Category: {skill.category} <br />
            {skill.studentName ? (
              <>
                👤 {skill.studentName} ({skill.department}) <br />
                📧 {skill.email} | 📞 {skill.phone}
              </>
            ) : (
              <em>No student info provided</em>
            )}
            <br />
            <button
              style={{ backgroundColor: "orange", marginRight: "5px" }}
              onClick={() => onEdit(skill)}
            >
              Edit
            </button>
            <button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => handleDelete(skill.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
        <span style={{ margin: "0 10px" }}>Page {page + 1} of {totalPages}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default SkillList;
