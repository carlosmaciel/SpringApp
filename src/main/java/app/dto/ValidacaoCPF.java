package app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ValidacaoCPF {
	
	private String status;

	public ValidacaoCPF() {}
	
	public ValidacaoCPF(String status) {
		super();
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ValidacaoCPF {status=" + status + "}";
	}
	
	
	
}