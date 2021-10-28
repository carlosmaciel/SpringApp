package app.service.votacao;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import app.dto.Resultados;
import app.dto.ValidacaoCPF;
import app.exception.VotacaoException;
import app.model.Associado;
import app.model.Pauta;
import app.model.Votacao;
import app.repository.VotacaoRepository;
import app.webservice.RestService;

@Service
public class VotacaoService implements IVotacaoService {

	@Autowired
	private VotacaoRepository votacaoRepository;
	
	private Logger logger = Logger.getLogger(VotacaoService.class);

	@Override
	public Votacao votar(Pauta pauta, Associado associado, int voto) throws Exception{
				
		logger.info("Verificando se CPF já votou.");
		Votacao verificaVoto = verificaVotoAssociado(pauta, associado);
				
		if(verificaVoto != null)
			throw new VotacaoException("Associado já votou nesta pauta!");
				
		logger.info("Validando CPF " + associado.getCpf() + " em API REST.");		
		ValidacaoCPF valida = validarCPF(associado.getCpf());
		
		if(valida.getStatus().equalsIgnoreCase("UNABLE_TO_VOTE"))
			throw new VotacaoException ("O associado não está apto para votar.");  
		
		logger.info("CPF apto para votar.");	
		Votacao votacao = new Votacao(pauta, associado, voto);
		
		return votacaoRepository.saveAndFlush(votacao);
	}

	private Votacao verificaVotoAssociado(Pauta pauta, Associado associado) throws Exception{
		return votacaoRepository.findByPautaAndAssociado(pauta, associado);
	}

	@Override
	public Resultados informarResultado(Long idPauta) throws VotacaoException {
		
		Map<String, Object> map = votacaoRepository.informarResultado(idPauta);
				
		if(map == null) {
			throw new VotacaoException ("Nenhuma pauta foi encontrada.");
		} 
		
		Resultados resultado = new Resultados();
		logger.info("Resultado da pauta " + idPauta + ": SIM: " + resultado.getSim() + ", NAO: " + resultado.getNao());
		
		if (map.isEmpty()) {
			resultado.setIdPauta(idPauta);
			resultado.setSim(0);
			resultado.setNao(0);
		} else {
			resultado.setIdPauta(Long.parseLong(map.get("idPauta").toString()));
			resultado.setSim(Integer.parseInt(map.get("sim").toString()));
			resultado.setNao(Integer.parseInt(map.get("nao").toString()));
		}
		
		return resultado;
	}
	
	public ValidacaoCPF validarCPF(String cpf) throws RestClientException {
		RestService rest = new RestService();
		return rest.consumir(cpf);
	}

}