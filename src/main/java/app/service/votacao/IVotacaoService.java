package app.service.votacao;

import org.springframework.web.client.RestClientException;

import app.dto.Resultados;
import app.dto.ValidacaoCPF;
import app.model.Associado;
import app.model.Pauta;
import app.model.Votacao;

public interface IVotacaoService {
	
	Votacao votar(Pauta pauta, Associado associado, int voto) throws Exception;
		
	Resultados informarResultado (Long idPauta) throws Exception;
	
	ValidacaoCPF validarCPF(String cpf) throws RestClientException;

}