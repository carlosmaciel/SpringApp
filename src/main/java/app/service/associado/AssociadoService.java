package app.service.associado;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.model.Associado;
import app.repository.AssociadoRepository;

@Service
public class AssociadoService implements IAssociadoService {

	@Autowired
	private AssociadoRepository associadoRepository;

	@Override
	public List<Associado> findAll() throws Exception {
		return associadoRepository.findAll();
	}

	@Override
	public Associado saveAssociado(Associado associado) throws Exception {
		return associadoRepository.saveAndFlush(associado);	
	}

}