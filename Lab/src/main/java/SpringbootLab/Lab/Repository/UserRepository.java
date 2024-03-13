package SpringbootLab.Lab.Repository;

import SpringbootLab.Lab.Databases.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
