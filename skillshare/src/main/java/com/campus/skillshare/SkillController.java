package com.campus.skillshare;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    // ✅ Paginated GET
    @GetMapping
    public Page<Skill> getSkills(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return skillRepository.findAll(pageable);
    }

    // ✅ Add new skill
    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    // ✅ Update skill
    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable String id, @RequestBody Skill skill) {
        skill.setId(id);
        return skillRepository.save(skill);
    }

    // ✅ Delete skill
    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable String id) {
        skillRepository.deleteById(id);
    }

    // ✅ Get single skill
    @GetMapping("/{id}")
    public Optional<Skill> getSkill(@PathVariable String id) {
        return skillRepository.findById(id);
    }
}
