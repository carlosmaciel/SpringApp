package app.service.pauta;

import java.util.List;

import app.model.Pauta;

public interface IPautaService {
	
	List<Pauta> findAll() throws Exception;
	
	Pauta savePauta(Pauta pauta) throws Exception;
	
	Pauta findPautasByIdAndSessao(Long id) throws Exception;
	
	Pauta encerraSessao(Pauta pauta) throws Exception;
}