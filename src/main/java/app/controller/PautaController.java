package app.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.model.Pauta;
import app.service.pauta.IPautaService;

@Controller
@RequestMapping("/dbc/pautas")
public class PautaController {

	@Autowired
	private IPautaService pautaService;
	
	private Logger logger = Logger.getLogger(AssociadoController.class);

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
	}
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET)
	public ResponseEntity<?> findAll() {		
		try {
			logger.info("Consultando pautas");
			List<Pauta> pauta = pautaService.findAll();
			return ResponseEntity.ok(pauta);
		} catch (Exception e) {
			logger.error("Erro ao consultar: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@RequestMapping(value = "/validaSessao/{idPauta}", method = RequestMethod.GET)
	public ResponseEntity<?> validaSessao(@PathVariable("idPauta") Long idPauta) {		
		try {
			logger.info("Validando sessão.");
			Pauta pauta = pautaService.findPautasByIdAndSessao(idPauta);
			return ResponseEntity.ok(pauta);
		} catch (Exception e) {
			logger.error("Erro ao consultar: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST, produces = {"application/json"},  consumes = {"application/json"})
    public ResponseEntity<?> savePauta(@Valid @RequestBody Pauta pauta) {
		try {
			logger.error("Salvando pauta. Nome: " + pauta.getNome());
			return ResponseEntity.ok(pautaService.savePauta(pauta));
		} catch (Exception e) {
			logger.error("Erro ao salvar pauta: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}        
    }
	
	@RequestMapping(value = "/encerraSessao/", method = RequestMethod.PUT, produces = {"application/json"},  consumes = {"application/json"})
    public ResponseEntity<?> encerraSessao(@Valid @RequestBody Pauta pauta) {
		try {
			logger.error("Encerrando sessão. Nome: " + pauta.getNome());
			return ResponseEntity.ok(pautaService.encerraSessao(pauta));
		} catch (Exception e) {
			logger.error("Erro ao salvar: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}        
    }
}
