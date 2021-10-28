package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.Pauta;

public interface PautaRepository extends JpaRepository<Pauta, Long>{
	Pauta findPautasByIdAndSessao(Long id, Integer sessao);
}
