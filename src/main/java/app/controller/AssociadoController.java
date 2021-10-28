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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import app.model.Associado;
import app.service.associado.IAssociadoService;

@Controller
@RequestMapping("/dbc/associados")
public class AssociadoController {

	@Autowired
	private IAssociadoService associadoService;
	
	private Logger logger = Logger.getLogger(AssociadoController.class);

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
	}
	
	@RequestMapping(value = "/findAll", method = RequestMethod.GET)
	public ResponseEntity<?> findAll(ModelMap model) {				
		try {
			logger.info("Consultando associados.");
			List<Associado> associados = associadoService.findAll();
			return ResponseEntity.ok(associados);
		} catch (Exception e) {
			logger.error("Erro ao consultar: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST, produces = {"application/json"},  consumes = {"application/json"})
    public ResponseEntity<?> saveAssociado(@Valid @RequestBody Associado associado) {
		try {
			logger.info("Salvando associado. Nome: " + associado.getNome());
			return ResponseEntity.ok(associadoService.saveAssociado(associado));
		}catch (Exception e) {
			logger.error("Erro ao salvar associado: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
    }
}
