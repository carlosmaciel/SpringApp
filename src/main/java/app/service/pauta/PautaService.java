package app.service.pauta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.model.Pauta;
import app.repository.PautaRepository;

@Service
public class PautaService implements IPautaService {

	@Autowired
	private PautaRepository pautaRepository;

	@Override
	public List<Pauta> findAll() throws Exception{
		return pautaRepository.findAll();
	}
	
	@Override
	public Pauta findPautasByIdAndSessao(Long id) throws Exception{
		return pautaRepository.findPautasByIdAndSessao(id, 1);
	}

	@Override
	public Pauta savePauta(Pauta pauta) throws Exception {
		return pautaRepository.saveAndFlush(pauta);
	}

	@Override
	public Pauta encerraSessao(Pauta pauta) throws Exception {
		pauta.setSessao(1);
		return pautaRepository.saveAndFlush(pauta);
	}
}