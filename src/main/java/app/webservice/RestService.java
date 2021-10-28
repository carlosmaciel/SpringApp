package app.webservice;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import app.dto.ValidacaoCPF;

public class RestService {
		
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	public ValidacaoCPF consumir(String cpf) {	
		RestTemplate restTemplate = new RestTemplate();
		
		return restTemplate.getForObject(
				"https://user-info.herokuapp.com/users/" + cpf, ValidacaoCPF.class);
		
	}	
	
}
