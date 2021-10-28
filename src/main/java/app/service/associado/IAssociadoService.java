package app.service.associado;

import java.util.List;

import app.model.Associado;

public interface IAssociadoService {

	List<Associado> findAll() throws Exception;
	
	Associado saveAssociado(Associado associado) throws Exception;
}